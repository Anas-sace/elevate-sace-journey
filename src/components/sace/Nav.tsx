import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import logo from "@/assets/sace-logo.svg";
import { ButtonLink } from "./ui";
import { COURSES } from "@/data/courses";

type MenuItem = { label: string; to: string; hash?: string; blurb: string };
type NavGroup = { label: string; to: string; hash?: string; items?: MenuItem[] };

const NAV: NavGroup[] = [
  {
    label: "About",
    to: "/about",
    items: [
      { label: "Our College", to: "/about", blurb: "40+ years of English teaching in Adelaide." },
      { label: "Our Accreditation", to: "/about", hash: "accreditation", blurb: "NEAS accredited, Cambridge approved." },
      { label: "Our Campus", to: "/about", hash: "campus", blurb: "A heritage building in the city centre." },
      { label: "Life at SACE Adelaide", to: "/", hash: "life", blurb: "Trips, clubs, friends and festivals." },
      { label: "FAQ", to: "/", hash: "faq", blurb: "Answers to the questions we hear most." },
    ],
  },
  {
    label: "Courses",
    to: "/courses",
    items: COURSES.map((c) => ({
      label: c.shortName,
      to: `/courses/${c.slug}`,
      blurb: c.tagline,
    })),
  },
  { label: "Pathways", to: "/pathways" },
  { label: "Study Tours", to: "/study-tours" },
  {
    label: "Services",
    to: "/services",
    items: [
      { label: "TOEIC", to: "/services", hash: "toeic", blurb: "An accredited TOEIC public test centre." },
      { label: "Student Counselling", to: "/services", hash: "counselling", blurb: "Advice for study, work and life." },
      { label: "Accommodation", to: "/services", hash: "accommodation", blurb: "Homestay, hostel or share house." },
      { label: "Club SACE", to: "/services", hash: "club-sace", blurb: "Weekly afternoon activities." },
    ],
  },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
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
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="SACE, South Australian College of English, home"
        >
          <img
            src={logo}
            alt="South Australian College of English"
            width={168}
            height={39}
            className={`h-8 w-auto transition-all duration-500 md:h-9 ${solid ? "" : "ink-invert"}`}
          />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((group) => (
              <li
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.items ? group.label : null)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <Link
                  to={group.to}
                  {...(group.hash ? { hash: group.hash } : {})}
                  aria-expanded={group.items ? openGroup === group.label : undefined}
                  onFocus={() => setOpenGroup(group.items ? group.label : null)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    solid
                      ? "text-foreground/80 hover:bg-secondary hover:text-primary"
                      : "text-white/85 hover:bg-white/12 hover:text-white"
                  }`}
                >
                  {group.label}
                  {group.items ? (
                    <ChevronDown
                      aria-hidden
                      className={`size-3.5 transition-transform ${openGroup === group.label ? "rotate-180" : ""}`}
                    />
                  ) : null}
                </Link>

                {group.items && openGroup === group.label ? (
                  <div className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3">
                    <div className="card-premium max-h-[70vh] overflow-auto p-2 shadow-lift">
                      <ul>
                        {group.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              to={item.to}
                              {...(item.hash ? { hash: item.hash } : {})}
                              onClick={() => setOpenGroup(null)}
                              className="block rounded-2xl px-4 py-3 transition-colors hover:bg-secondary"
                            >
                              <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                              <span className="mt-0.5 block text-xs text-muted-foreground">{item.blurb}</span>
                            </Link>
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

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href="tel:+61884105222"
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors ${
              solid ? "text-muted-foreground hover:text-primary" : "text-white/85 hover:text-white"
            }`}
          >
            <Phone aria-hidden className="size-4" />
            +61 8 8410 5222
          </a>
          <ButtonLink href="/#apply" variant={solid ? "primary" : "accent"} className="px-5 py-3">
            Enrol now
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors xl:hidden ${
            solid ? "border-border text-foreground" : "border-white/30 text-white"
          }`}
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-background xl:hidden"
        >
          <nav aria-label="Mobile" className="shell py-6">
            <ul className="space-y-1">
              {NAV.map((group) => (
                <li key={group.label}>
                  <Link
                    to={group.to}
                    {...(group.hash ? { hash: group.hash } : {})}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-2xl px-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {group.label}
                  </Link>
                  {group.items ? (
                    <ul className="mb-2 ml-3 border-l border-border pl-4">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.to}
                            {...(item.hash ? { hash: item.hash } : {})}
                            onClick={() => setOpen(false)}
                            className="flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href="/#apply">Enrol now</ButtonLink>
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
