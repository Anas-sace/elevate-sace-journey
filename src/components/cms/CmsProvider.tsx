import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  elementFromPath,
  isTextEditable,
  normalizeContent,
  type CmsContent,
  type OverrideMap,
  type ThemeSettings,
} from "@/lib/cms";

type CmsContextValue = {
  content: CmsContent;
  refresh: () => Promise<void>;
  setLocal: (next: CmsContent) => void;
};

const CmsContext = createContext<CmsContextValue | null>(null);

export function useCms(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be used inside <CmsProvider>");
  return ctx;
}

function applyTheme(theme: ThemeSettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const applied = root.dataset["cmsTheme"] ? root.dataset["cmsTheme"].split(",") : [];
  for (const key of applied) root.style.removeProperty(`--${key}`);

  const nextKeys: string[] = [];
  for (const [key, value] of Object.entries(theme.colors ?? {})) {
    if (!value) continue;
    root.style.setProperty(`--${key}`, value);
    nextKeys.push(key);
  }
  if (theme.radius) {
    root.style.setProperty("--radius", theme.radius);
    nextKeys.push("radius");
  }
  root.dataset["cmsTheme"] = nextKeys.join(",");

  if (theme.fontHeading) root.style.setProperty("--font-display", theme.fontHeading);
  if (theme.fontBody) root.style.setProperty("--font-sans", theme.fontBody);
}

export function applyOverrides(overrides: OverrideMap) {
  if (typeof document === "undefined") return;

  // Reset elements that no longer carry an override.
  document.querySelectorAll<HTMLElement>("[data-cms-applied]").forEach((el) => {
    const path = el.dataset["cmsApplied"];
    if (path && !overrides[path]) {
      el.style.removeProperty("display");
      delete el.dataset["cmsApplied"];
    }
  });

  for (const [path, ov] of Object.entries(overrides)) {
    const el = elementFromPath(path) as HTMLElement | null;
    if (!el) continue;
    el.dataset["cmsApplied"] = path;

    el.style.display = ov.hidden ? "none" : el.style.display === "none" ? "" : el.style.display;

    if (typeof ov.text === "string" && isTextEditable(el) && el.textContent !== ov.text) {
      el.textContent = ov.text;
    }
    if (ov.src && el instanceof HTMLImageElement && el.src !== ov.src) {
      el.src = ov.src;
      el.removeAttribute("srcset");
    }
    if (ov.href && el instanceof HTMLAnchorElement && el.getAttribute("href") !== ov.href) {
      el.setAttribute("href", ov.href);
    }
    if (ov.video) {
      const existing = el.parentElement?.querySelector<HTMLVideoElement>(
        `video[data-cms-video="${CSS.escape(path)}"]`,
      );
      if (!existing && el.parentElement) {
        const video = document.createElement("video");
        video.dataset["cmsVideo"] = path;
        video.src = ov.video;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.className = el.className;
        el.parentElement.insertBefore(video, el.nextSibling);
        el.style.display = "none";
      } else if (existing && existing.src !== ov.video) {
        existing.src = ov.video;
      }
    }
  }
}

export function CmsProvider({
  initial,
  children,
}: {
  initial: Record<string, unknown> | null | undefined;
  children: ReactNode;
}) {
  const [content, setContent] = useState<CmsContent>(() => normalizeContent(initial));

  const refresh = useCallback(async () => {
    const { data } = await supabase.from("site_content").select("key, value");
    if (!data) return;
    const map: Record<string, unknown> = {};
    for (const row of data) map[row.key] = row.value;
    setContent(normalizeContent(map));
  }, []);

  useEffect(() => {
    applyTheme(content.theme);
  }, [content.theme]);

  useEffect(() => {
    for (const [id, visible] of Object.entries(content.sections)) {
      const el = document.getElementById(id);
      if (el) el.style.display = visible === false ? "none" : "";
    }
  }, [content.sections]);

  useEffect(() => {
    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => applyOverrides(content.overrides));
    };
    run();
    const observer = new MutationObserver(run);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [content.overrides]);

  const value = useMemo(
    () => ({ content, refresh, setLocal: setContent }),
    [content, refresh],
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}
