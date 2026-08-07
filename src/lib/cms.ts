/** Shared CMS types + helpers used by both the public site and the dashboard. */

import { normalizeReviews, DEFAULT_REVIEWS, type Review } from "./reviews";

export type ElementOverride = {
  text?: string;
  src?: string;
  href?: string;
  video?: string;
  hidden?: boolean;
};

export type OverrideMap = Record<string, ElementOverride>;

export type ThemeSettings = {
  colors?: Record<string, string>;
  fontHeading?: string;
  fontBody?: string;
  radius?: string;
};

export type SeoSettings = {
  title?: string;
  description?: string;
};

export type CmsContent = {
  overrides: OverrideMap;
  theme: ThemeSettings;
  seo: SeoSettings;
  sections: Record<string, boolean>;
  reviews: Review[];
};

export const THEME_TOKENS = [
  { key: "primary", label: "Primary (brand purple)" },
  { key: "primary-deep", label: "Primary deep" },
  { key: "primary-soft", label: "Primary soft" },
  { key: "accent", label: "Accent (gold)" },
  { key: "accent-foreground", label: "Accent text" },
  { key: "background", label: "Page background" },
  { key: "foreground", label: "Body text" },
  { key: "surface", label: "Surface" },
  { key: "surface-2", label: "Surface alt" },
  { key: "muted-foreground", label: "Muted text" },
  { key: "border", label: "Borders" },
] as const;

export const SECTION_IDS = [
  "hero",
  "why",
  "australia",
  "courses",
  "journey",
  "campus",
  "life",
  "accommodation",
  "pathways",
  "stories",
  "stats",
  "faq",
  "news",
  "apply",
] as const;

export function emptyContent(): CmsContent {
  return { overrides: {}, theme: {}, seo: {}, sections: {}, reviews: DEFAULT_REVIEWS };
}

export function normalizeContent(raw: Record<string, unknown> | null | undefined): CmsContent {
  const base = emptyContent();
  if (!raw) return base;
  const overrides = raw["overrides"];
  const theme = raw["theme"];
  const seo = raw["seo"];
  const sections = raw["sections"];
  return {
    overrides: (overrides && typeof overrides === "object" ? overrides : {}) as OverrideMap,
    theme: (theme && typeof theme === "object" ? theme : {}) as ThemeSettings,
    seo: (seo && typeof seo === "object" ? seo : {}) as SeoSettings,
    sections: (sections && typeof sections === "object" ? sections : {}) as Record<string, boolean>,
    reviews: normalizeReviews(raw["reviews"]),
  };
}

/** Stable, index-based DOM path used as the content key for an element. */
export function elementPath(el: Element): string | null {
  const parts: number[] = [];
  let node: Element | null = el;
  while (node && node !== document.body) {
    const parent: Element | null = node.parentElement;
    if (!parent) return null;
    parts.unshift(Array.prototype.indexOf.call(parent.children, node));
    node = parent;
  }
  if (!node) return null;
  return parts.join(".");
}

export function elementFromPath(path: string): Element | null {
  if (typeof document === "undefined") return null;
  let node: Element = document.body;
  for (const part of path.split(".")) {
    const idx = Number(part);
    const next = node.children[idx];
    if (!next) return null;
    node = next;
  }
  return node;
}

/** Human label for an element, shown in the dashboard content list. */
export function describeElement(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const text = (el.textContent ?? "").trim().replace(/\s+/g, " ");
  if (tag === "img") return `Image · ${(el as HTMLImageElement).alt || "untitled"}`;
  return `${tag} · ${text.slice(0, 60) || "(empty)"}`;
}

/** Elements the visual editor lets you click. */
export const EDITABLE_SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,span,li,a,button,strong,em,blockquote,figcaption,label,img,video,section";

export function isTextEditable(el: Element): boolean {
  if (el.tagName === "IMG" || el.tagName === "VIDEO" || el.tagName === "SECTION") return false;
  return Array.from(el.childNodes).every((n) => n.nodeType === Node.TEXT_NODE);
}
