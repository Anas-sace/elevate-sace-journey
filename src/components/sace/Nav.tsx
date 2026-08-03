import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import logo from "@/assets/sace-logo.svg";
import { ButtonLink } from "./ui";

type MenuItem = { label: string; href: string; blurb: string };
type NavGroup = { label: string; href: string; items?: MenuItem[] };

const NAV: NavGroup[] = [
  {
    label: "Courses",
    href: "#courses",
    items: [
      { label: "General English", href: "#courses", blurb: "Speak with confidence, every day." },
      { label: "IELTS Preparation", href: "#courses", blurb: "Target the band score you need." },
      { label: "English for Tertiary Studies", href: "#courses", blurb: "Academic English for university." },
      { label: "High School Programme", href: "#courses", blurb: "Bridge into an Australian school." },
      { label: "Cambridge CELTA", href: "#courses", blurb: "Qualify to teach English worldwide." },
    ],
  },
  {
    label: "Students",
    href: "#journey",
    items: [
      { label: "Your journey", href: "#journey", blurb: "From first enquiry to graduation." },
      { label: "Campus experience", href: "#campus", blurb: "Where you'll learn every day." },
      { label: "Student life", href: "#life", blurb: "Trips, clubs, friends and festivals." },
      { label: "Support & counselling", href: "#why", blurb: "Someone beside you the whole way." },
    ],
  },
  { label: "Accommodation", href: "#accommodation" },
  {
    label: "Pathways",
    href: "#pathways",
    items: [
      { label: "University pathways", href: "#pathways", blurb: "Direct entry partnerships." },
      { label: "Success stories", href: "#stories", blurb: "Where our graduates are now." },
    ],
  },
  { label: "About", href: "#australia" },
  { label: "Contact", href: "#footer" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenGroup(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "glass shadow-soft" : "border-b border-white/10 bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="shell flex h-18 items-center justify-between gap-4 py-3.5">
        <a href="#main" className="flex shrink-0 items-center" aria-label="SACE — South Australian College of English, home">
          <img
            src={logo}
            alt="South Australian College of English"
            width={168}
            height={39}
            className={`h-8 w-auto transition-all duration-500 md:h-9 ${solid ? "" : "ink-invert"}`}
          />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((group) => (
              <li
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.items ? group.label : null)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <a
                  href={group.href}
                  aria-expanded={group.items ? openGroup === group.label : undefined}
                  onFocus={() => setOpenGroup(group.items ? group.label : null)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    solid
                      ? "text-foreground/80 hover:bg-secondary hover:text-primary"
                      : "text-white/85 hover:bg-white/12 hover:text-white"
                  }`}
                >
                  {group.label}
                  {group.items ? (
                    <ChevronDown aria-hidden className={`size-3.5 transition-transform ${openGroup === group.label ? "rotate-180" : ""}`} />
                  ) : null}
                </a>

                {group.items && openGroup === group.label ? (
                  <div className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3">
                    <div className="card-premium overflow-hidden p-2 shadow-lift">
                      <ul>
                        {group.items.map((item) => (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              onClick={() => setOpenGroup(null)}
                              className="block rounded-2xl px-4 py-3 transition-colors hover:bg-secondary"
                            >
                              <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                              <span className="mt-0.5 block text-xs text-muted-foreground">{item.blurb}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+61884105222"
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors ${
              solid ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
            }`}
          >
            <Phone aria-hidden className="size-4" />
            +61 8 8410 5222
          </a>
          <ButtonLink href="#apply" variant={solid ? "primary" : "accent"} className="px-5 py-3">
            Apply now
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
            solid ? "border-border text-foreground" : "border-white/30 text-white"
          }`}
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="shell py-6">
            <ul className="space-y-1">
              {NAV.map((group) => (
                <li key={group.label}>
                  <a
                    href={group.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-2xl px-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {group.label}
                  </a>
                  {group.items ? (
                    <ul className="mb-2 ml-3 border-l border-border pl-4">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href="#apply">Apply now</ButtonLink>
              <ButtonLink href="tel:+61884105222" variant="outline">
                Call +61 8 8410 5222
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
