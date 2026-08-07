import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, Globe, Loader2 } from "lucide-react";
import { translateBatch } from "@/lib/translate.functions";

export type Language = { code: string; label: string; name: string; rtl?: boolean };

/** English first, then the languages our students most often speak at home. */
export const LANGUAGES: Language[] = [
  { code: "en", label: "AU English", name: "Australian English" },
  { code: "zh", label: "简体中文", name: "Simplified Chinese" },
  { code: "zh-TW", label: "繁體中文", name: "Traditional Chinese" },
  { code: "ja", label: "日本語", name: "Japanese" },
  { code: "ko", label: "한국어", name: "Korean" },
  { code: "vi", label: "Tiếng Việt", name: "Vietnamese" },
  { code: "th", label: "ไทย", name: "Thai" },
  { code: "id", label: "Bahasa Indonesia", name: "Indonesian" },
  { code: "es", label: "Español", name: "Spanish" },
  { code: "pt", label: "Português", name: "Brazilian Portuguese" },
  { code: "fr", label: "Français", name: "French" },
  { code: "it", label: "Italiano", name: "Italian" },
  { code: "de", label: "Deutsch", name: "German" },
  { code: "tr", label: "Türkçe", name: "Turkish" },
  { code: "ru", label: "Русский", name: "Russian" },
  { code: "ar", label: "العربية", name: "Arabic", rtl: true },
  { code: "fa", label: "فارسی", name: "Persian", rtl: true },
  { code: "hi", label: "हिन्दी", name: "Hindi" },
  { code: "ne", label: "नेपाली", name: "Nepali" },
  { code: "mn", label: "Монгол", name: "Mongolian" },
];

type Ctx = { lang: string; setLang: (code: string) => void; busy: boolean };
const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, busy: false });

export function useLanguage() {
  return useContext(LanguageContext);
}

const STORAGE_KEY = "sace-lang";
const cacheKey = (code: string) => `sace-i18n-${code}`;
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "TEXTAREA"]);
const hasLetters = (s: string) => /\p{L}{2,}/u.test(s);

function collectNodes(): Text[] {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.nodeValue ?? "";
      if (!hasLetters(text)) return NodeFilter.FILTER_REJECT;
      const parent = (node as Text).parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const out: Text[] = [];
  let n = walker.nextNode();
  while (n) {
    out.push(n as Text);
    n = walker.nextNode();
  }
  return out;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState("en");
  const [busy, setBusy] = useState(false);
  const originals = useRef(new WeakMap<Text, string>());
  const dict = useRef<Record<string, string>>({});
  const langRef = useRef("en");
  const running = useRef(false);

  const loadDict = useCallback((code: string) => {
    try {
      dict.current = JSON.parse(window.localStorage.getItem(cacheKey(code)) ?? "{}") as Record<string, string>;
    } catch {
      dict.current = {};
    }
  }, []);

  const saveDict = useCallback((code: string) => {
    try {
      window.localStorage.setItem(cacheKey(code), JSON.stringify(dict.current));
    } catch {
      /* quota — cache is best effort */
    }
  }, []);

  const apply = useCallback(
    async (code: string) => {
      if (running.current) return;
      running.current = true;
      try {
        const nodes = collectNodes();
        for (const node of nodes) {
          if (!originals.current.has(node)) originals.current.set(node, node.nodeValue ?? "");
        }

        if (code === "en") {
          for (const node of nodes) {
            const original = originals.current.get(node);
            if (original !== undefined && node.nodeValue !== original) node.nodeValue = original;
          }
          return;
        }

        const language = LANGUAGES.find((l) => l.code === code);
        const missing: string[] = [];
        for (const node of nodes) {
          const source = (originals.current.get(node) ?? "").trim();
          if (source && !dict.current[source] && !missing.includes(source)) missing.push(source);
        }

        if (missing.length) {
          setBusy(true);
          const chunks: string[][] = [];
          for (let i = 0; i < missing.length; i += 30) chunks.push(missing.slice(i, i + 30));
          await Promise.all(
            chunks.map(async (chunk) => {
              try {
                const res = await translateBatch({
                  data: { texts: chunk, languageName: language?.name ?? code },
                });
                chunk.forEach((src, idx) => {
                  const value = res.texts[idx];
                  if (value) dict.current[src] = value;
                });
              } catch {
                /* keep the English source for this chunk */
              }
            }),
          );
          if (langRef.current !== code) return;
          saveDict(code);
          setBusy(false);
        }

        for (const node of nodes) {
          const original = originals.current.get(node) ?? "";
          const source = original.trim();
          const translated = dict.current[source];
          if (!translated) continue;
          const next = original.replace(source, translated);
          if (node.nodeValue !== next) node.nodeValue = next;
        }
      } finally {
        setBusy(false);
        running.current = false;
      }
    },
    [saveDict],
  );

  const setLang = useCallback(
    (code: string) => {
      langRef.current = code;
      setLangState(code);
      try {
        window.localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* ignore */
      }
      loadDict(code);
      const language = LANGUAGES.find((l) => l.code === code);
      document.documentElement.lang = code;
      document.documentElement.dir = language?.rtl ? "rtl" : "ltr";
      void apply(code);
    },
    [apply, loadDict],
  );

  // Restore the visitor's saved language on first paint.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && saved !== "en" && LANGUAGES.some((l) => l.code === saved)) setLang(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-translate content that React renders later (route changes, modals, CMS updates).
  useEffect(() => {
    if (lang === "en") return;
    let timer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => void apply(langRef.current), 400);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [lang, apply]);

  const value = useMemo(() => ({ lang, setLang, busy }), [lang, setLang, busy]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <LanguageSwitcher />
    </LanguageContext.Provider>
  );
}

function LanguageSwitcher() {
  const { lang, setLang, busy } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]!;

  return (
    <div data-no-translate data-cms-ui className="fixed bottom-5 left-5 z-[400] print:hidden">
      {open && (
        <div
          role="listbox"
          aria-label="Choose a language"
          className="mb-3 max-h-[60vh] w-56 overflow-auto rounded-2xl border border-border bg-card p-1.5 shadow-lift"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-secondary ${
                l.code === lang ? "font-semibold text-primary" : "text-foreground"
              }`}
            >
              <span>{l.label}</span>
              {l.code === lang && <Check className="size-4" aria-hidden />}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Language: ${current.label}. Change website language`}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-lift transition-colors hover:bg-secondary"
      >
        {busy ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Globe className="size-4 text-primary" aria-hidden />
        )}
        {current.label}
      </button>
    </div>
  );
}
