import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { normalizeContent, SECTION_IDS, THEME_TOKENS, type CmsContent } from "@/lib/cms";
import { DEFAULT_REVIEWS, type Review } from "@/lib/reviews";
import {
  Image as ImageIcon,
  Layers,
  LayoutTemplate,
  LogOut,
  Palette,
  Plus,
  Search,
  Star,
  Trash2,
  Type,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Superadmin · SACE" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

type Tab = "editor" | "content" | "sections" | "reviews" | "theme" | "media" | "seo";

const TABS: { id: Tab; label: string; Icon: typeof Palette }[] = [
  { id: "editor", label: "Visual editor", Icon: LayoutTemplate },
  { id: "content", label: "Content", Icon: Type },
  { id: "sections", label: "Sections", Icon: Layers },
  { id: "reviews", label: "Reviews", Icon: Star },
  { id: "theme", label: "Theme", Icon: Palette },
  { id: "media", label: "Media", Icon: ImageIcon },
  { id: "seo", label: "SEO", Icon: Search },
];

async function saveKey(key: string, value: unknown) {
  const { data: userData } = await supabase.auth.getUser();
  return supabase
    .from("site_content")
    .upsert(
      { key, value: value as never, updated_at: new Date().toISOString(), updated_by: userData.user?.id ?? null },
      { onConflict: "key" },
    );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("editor");
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [content, setContent] = useState<CmsContent>(() => normalizeContent(null));
  const [status, setStatus] = useState("");

  const load = async () => {
    const { data } = await supabase.from("site_content").select("key, value");
    const map: Record<string, unknown> = {};
    for (const row of data ?? []) map[row.key] = row.value;
    setContent(normalizeContent(map));
  };

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return setAllowed(false);
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: userData.user.id,
        _role: "superadmin",
      });
      setAllowed(Boolean(isAdmin));
      if (isAdmin) await load();
    })();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  const flash = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 2500);
  };

  if (allowed === null) {
    return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading…</div>;
  }
  if (!allowed) {
    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold">Not authorised</h1>
          <p className="mt-2 text-sm text-muted-foreground">This account has no superadmin role.</p>
          <button onClick={signOut} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-3">
          <h1 className="font-display text-base font-bold">SACE control room</h1>
          <nav className="flex flex-wrap gap-1">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                  tab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-3.5" /> {label}
              </button>
            ))}
          </nav>
          <span className="ml-auto text-xs text-accent-foreground">{status}</span>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs font-semibold"
          >
            <LogOut className="size-3.5" /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-6">
        {tab === "editor" && (
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <p className="border-b border-border px-4 py-3 text-xs text-muted-foreground">
              Click any element in the live preview to change its text, image, video, link or visibility.
            </p>
            <iframe title="Live site editor" src="/?cms=edit" className="h-[75vh] w-full" />
          </div>
        )}

        {tab === "content" && (
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-bold">Content overrides</h2>
            <p className="mt-1 text-xs text-muted-foreground">Everything edited through the visual editor lives here.</p>
            <ul className="mt-4 divide-y divide-border">
              {Object.entries(content.overrides).map(([path, ov]) => (
                <li key={path} className="flex flex-wrap items-center gap-3 py-3 text-sm">
                  <code className="rounded bg-muted px-2 py-1 text-[11px]">{path}</code>
                  <span className="min-w-0 flex-1 truncate text-muted-foreground">
                    {ov.text ?? ov.src ?? ov.video ?? ov.href ?? (ov.hidden ? "hidden" : "—")}
                  </span>
                  <button
                    onClick={async () => {
                      const next = { ...content.overrides };
                      delete next[path];
                      await saveKey("overrides", next);
                      await load();
                      flash("Override removed");
                    }}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold"
                  >
                    Reset
                  </button>
                </li>
              ))}
              {Object.keys(content.overrides).length === 0 && (
                <li className="py-6 text-sm text-muted-foreground">No overrides yet.</li>
              )}
            </ul>
          </section>
        )}

        {tab === "sections" && <SectionsPanel content={content} reload={load} flash={flash} />}
        {tab === "reviews" && <ReviewsPanel key={content.reviews.length} content={content} reload={load} flash={flash} />}
        {tab === "theme" && <ThemePanel content={content} reload={load} flash={flash} />}
        {tab === "media" && <MediaPanel />}
        {tab === "seo" && <SeoPanel content={content} reload={load} flash={flash} />}
      </main>
    </div>
  );
}

function ThemePanel({
  content,
  reload,
  flash,
}: {
  content: CmsContent;
  reload: () => Promise<void>;
  flash: (m: string) => void;
}) {
  const [colors, setColors] = useState<Record<string, string>>(content.theme.colors ?? {});
  const [radius, setRadius] = useState(content.theme.radius ?? "");

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="font-display text-lg font-bold">Brand & theme</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Leave a swatch untouched to keep the original SACE brand value.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THEME_TOKENS.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-3 rounded-xl border border-border p-3 text-xs font-semibold">
            <input
              type="color"
              value={colors[key] ?? "#520380"}
              onChange={(e) => setColors((c) => ({ ...c, [key]: e.target.value }))}
              className="size-9 cursor-pointer rounded-lg border border-border bg-transparent"
            />
            <span className="min-w-0 flex-1">
              {label}
              <span className="block font-normal text-muted-foreground">{colors[key] ?? "default"}</span>
            </span>
            {colors[key] && (
              <button
                type="button"
                onClick={() =>
                  setColors((c) => {
                    const next = { ...c };
                    delete next[key];
                    return next;
                  })
                }
                className="text-[11px] text-muted-foreground underline"
              >
                clear
              </button>
            )}
          </label>
        ))}
      </div>

      <label className="mt-5 block max-w-xs text-xs font-semibold">
        Corner radius (e.g. 1.25rem)
        <input
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="mt-1 w-full rounded-lg border border-input bg-background p-2 text-sm font-normal"
        />
      </label>

      <button
        onClick={async () => {
          await saveKey("theme", { ...content.theme, colors, radius: radius || undefined });
          await reload();
          flash("Theme saved");
        }}
        className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Save theme
      </button>
    </section>
  );
}

function MediaPanel() {
  const [files, setFiles] = useState<{ name: string; url: string; size: number }[]>([]);
  const [busy, setBusy] = useState("");
  const [query, setQuery] = useState("");

  const signed = async (name: string) => {
    const { data } = await supabase.storage.from("site-media").createSignedUrl(name, 60 * 60 * 24 * 365 * 10);
    return data?.signedUrl ?? "";
  };

  const list = async () => {
    const { data } = await supabase.storage
      .from("site-media")
      .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
    const rows = await Promise.all(
      (data ?? [])
        .filter((f) => f.name !== ".emptyFolderPlaceholder")
        .map(async (f) => ({
          name: f.name,
          url: await signed(f.name),
          size: Number((f.metadata as { size?: number } | null)?.size ?? 0),
        })),
    );
    setFiles(rows);
  };

  useEffect(() => {
    void list();
  }, []);

  const safe = (n: string) => n.replace(/[^a-zA-Z0-9.\-_]/g, "_");

  const uploadFiles = async (fileList: FileList) => {
    setBusy("Uploading…");
    for (const file of Array.from(fileList)) {
      await supabase.storage.from("site-media").upload(`${Date.now()}-${safe(file.name)}`, file, { upsert: true });
    }
    await list();
    setBusy("");
  };

  const replaceFile = async (name: string, file: File) => {
    setBusy("Replacing…");
    await supabase.storage.from("site-media").update(name, file, { upsert: true });
    await list();
    setBusy("");
  };

  const rename = async (name: string) => {
    const next = window.prompt("New file name", name);
    if (!next || next === name) return;
    setBusy("Renaming…");
    await supabase.storage.from("site-media").move(name, safe(next));
    await list();
    setBusy("");
  };

  const remove = async (name: string) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    setBusy("Deleting…");
    await supabase.storage.from("site-media").remove([name]);
    await list();
    setBusy("");
  };

  const shown = files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-lg font-bold">Media library</h2>
        <span className="text-xs text-accent-foreground">{busy}</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search media…"
          className="ml-auto w-48 rounded-lg border border-input bg-background p-2 text-xs"
        />
        <label className="cursor-pointer rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
          Upload images / videos
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files?.length && uploadFiles(e.target.files)}
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Upload, rename, replace or delete any image or video. Copy a URL and paste it into the
        visual editor to swap any picture on the site.
      </p>

      <ul className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((f) => (
          <li key={f.name} className="overflow-hidden rounded-xl border border-border">
            {/\.(mp4|webm|mov)$/i.test(f.name) ? (
              <video src={f.url} className="h-32 w-full object-cover" muted controls />
            ) : (
              <img src={f.url} alt={f.name} className="h-32 w-full object-cover" />
            )}
            <div className="space-y-1 p-2">
              <p className="truncate text-[11px] font-semibold" title={f.name}>{f.name}</p>
              <p className="text-[10px] text-muted-foreground">{Math.round(f.size / 1024)} KB</p>
              <div className="flex flex-wrap gap-1 pt-1">
                <button
                  onClick={() => navigator.clipboard.writeText(f.url)}
                  className="rounded-full border border-border px-2 py-1 text-[10px] font-semibold"
                >
                  Copy URL
                </button>
                <label className="cursor-pointer rounded-full border border-border px-2 py-1 text-[10px] font-semibold">
                  Replace
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && replaceFile(f.name, e.target.files[0])}
                  />
                </label>
                <button
                  onClick={() => rename(f.name)}
                  className="rounded-full border border-border px-2 py-1 text-[10px] font-semibold"
                >
                  Rename
                </button>
                <button
                  onClick={() => remove(f.name)}
                  className="rounded-full border border-destructive px-2 py-1 text-[10px] font-semibold text-destructive"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
        {shown.length === 0 && <li className="py-6 text-sm text-muted-foreground">No media yet.</li>}
      </ul>
    </section>
  );
}

function SectionsPanel({
  content,
  reload,
  flash,
}: {
  content: CmsContent;
  reload: () => Promise<void>;
  flash: (m: string) => void;
}) {
  const [sections, setSections] = useState<Record<string, boolean>>(content.sections ?? {});

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="font-display text-lg font-bold">Sections</h2>
      <p className="mt-1 text-xs text-muted-foreground">Show or hide whole sections of the site.</p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {SECTION_IDS.map((id) => {
          const hidden = sections[id] === false;
          return (
            <li key={id}>
              <button
                onClick={() => setSections((s) => ({ ...s, [id]: hidden }))}
                className={`flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-xs font-semibold ${
                  hidden ? "text-muted-foreground" : ""
                }`}
              >
                <span className="capitalize">{id}</span>
                <span className={hidden ? "text-muted-foreground" : "text-accent-foreground"}>
                  {hidden ? "Hidden" : "Visible"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <button
        onClick={async () => {
          await saveKey("sections", sections);
          await reload();
          flash("Sections saved");
        }}
        className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Save sections
      </button>
    </section>
  );
}

function SeoPanel({
  content,
  reload,
  flash,
}: {
  content: CmsContent;
  reload: () => Promise<void>;
  flash: (m: string) => void;
}) {
  const [title, setTitle] = useState(content.seo.title ?? "");
  const [description, setDescription] = useState(content.seo.description ?? "");

  return (
    <section className="max-w-2xl rounded-2xl border border-border bg-card p-5">
      <h2 className="font-display text-lg font-bold">Search & social</h2>
      <label className="mt-4 block text-xs font-semibold">
        Page title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-lg border border-input bg-background p-2 text-sm font-normal"
        />
      </label>
      <label className="mt-4 block text-xs font-semibold">
        Meta description
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-lg border border-input bg-background p-2 text-sm font-normal"
        />
      </label>
      <button
        onClick={async () => {
          await saveKey("seo", { title: title || undefined, description: description || undefined });
          await reload();
          flash("SEO saved");
        }}
        className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Save
      </button>
    </section>
  );
}
