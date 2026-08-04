import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCms } from "./CmsProvider";
import { describeElement, elementPath, isTextEditable, type ElementOverride } from "@/lib/cms";
import { Eye, EyeOff, RotateCcw, Save, X } from "lucide-react";

type Selection = { path: string; el: HTMLElement; label: string };

const IGNORE = "[data-cms-ui]";

export function EditorOverlay() {
  const { content, refresh } = useCms();
  const [allowed, setAllowed] = useState(false);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [draft, setDraft] = useState<ElementOverride>({});
  const [saving, setSaving] = useState(false);
  const outline = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: data.user.id,
        _role: "superadmin",
      });
      setAllowed(Boolean(isAdmin));
    })();
  }, []);


  const current = useMemo(
    () => (selection ? (content.overrides[selection.path] ?? {}) : {}),
    [content.overrides, selection],
  );

  useEffect(() => setDraft(current), [current]);

  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el || el.closest(IGNORE)) return;
      const box = outline.current;
      if (!box) return;
      const r = el.getBoundingClientRect();
      box.style.cssText = `position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;border:2px solid #ffb025;border-radius:6px;pointer-events:none;z-index:2147483000;transition:all .08s`;
    };
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el || el.closest(IGNORE)) return;
      e.preventDefault();
      e.stopPropagation();
      const path = elementPath(el);
      if (!path) return;
      setSelection({ path, el, label: describeElement(el) });
    };
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  const persist = async (nextOverride: ElementOverride | null) => {
    if (!selection) return;
    setSaving(true);
    const next = { ...content.overrides };
    if (nextOverride === null || Object.keys(nextOverride).length === 0) delete next[selection.path];
    else next[selection.path] = nextOverride;
    const { data: userData } = await supabase.auth.getUser();
    await supabase
      .from("site_content")
      .upsert(
        { key: "overrides", value: next, updated_at: new Date().toISOString(), updated_by: userData.user?.id ?? null },
        { onConflict: "key" },
      );
    await refresh();
    setSaving(false);
  };

  const upload = async (file: File, field: "src" | "video") => {
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file);
    if (error) return;
    const { data } = await supabase.storage.from("site-media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (data?.signedUrl) setDraft((d) => ({ ...d, [field]: data.signedUrl }));
  };

  const editableText = selection ? isTextEditable(selection.el) : false;
  const isImage = selection?.el.tagName === "IMG";
  const isLink = selection?.el.tagName === "A";

  if (!allowed) return null;

  return (
    <>
      <div ref={outline} />
      <div
        data-cms-ui
        className="fixed left-1/2 top-4 z-[2147483100] -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-lift"
      >
        Visual editor · click any element to edit
      </div>

      {selection && (
        <aside
          data-cms-ui
          className="fixed bottom-4 right-4 z-[2147483100] max-h-[80vh] w-[22rem] overflow-auto rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-lift"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-semibold text-muted-foreground">{selection.label}</p>
            <button onClick={() => setSelection(null)} aria-label="Close editor panel">
              <X className="size-4" />
            </button>
          </div>

          {editableText && (
            <label className="mt-3 block text-xs font-semibold">
              Text
              <textarea
                rows={4}
                value={draft.text ?? selection.el.textContent ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, text: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-input bg-background p-2 text-sm font-normal"
              />
            </label>
          )}

          {isImage && (
            <div className="mt-3 space-y-2">
              <label className="block text-xs font-semibold">
                Image URL
                <input
                  value={draft.src ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, src: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-input bg-background p-2 text-sm font-normal"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], "src")}
                className="w-full text-xs"
              />
              <label className="block text-xs font-semibold">
                Replace with video URL
                <input
                  value={draft.video ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, video: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-input bg-background p-2 text-sm font-normal"
                />
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], "video")}
                className="w-full text-xs"
              />
            </div>
          )}

          {isLink && (
            <label className="mt-3 block text-xs font-semibold">
              Link target
              <input
                value={draft.href ?? selection.el.getAttribute("href") ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, href: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-input bg-background p-2 text-sm font-normal"
              />
            </label>
          )}

          <button
            onClick={() => setDraft((d) => ({ ...d, hidden: !d.hidden }))}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold"
          >
            {draft.hidden ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            {draft.hidden ? "Hidden on site" : "Visible on site"}
          </button>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => persist(draft)}
              disabled={saving}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-60"
            >
              <Save className="size-3.5" /> {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => persist(null)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold"
            >
              <RotateCcw className="size-3.5" /> Reset
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
