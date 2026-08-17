import { useState } from "react";
import {
  ArrowUpRight,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Ear,
  GraduationCap,
  Headphones,
  Home,
  Mic,
  PenLine,
  Sparkles,
  Timer,
  Trophy,
  Users,
} from "lucide-react";
import { Reveal } from "./ui";
import type { CourseRich } from "@/data/course-seo";

const PILLAR_ICONS = [Mic, Headphones, BookOpenCheck, PenLine];
const BENEFIT_ICONS = [Users, Timer, Home, GraduationCap, Trophy, Ear];

export function CourseOverviewPanel({ rich }: { rich: CourseRich }) {
  return (
    <section className="section">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <Reveal>
          <h2 className="display-2 text-foreground">{rich.overviewHeading}</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            {rich.overview.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="card-premium p-7">
            <h3 className="display-3 text-foreground">At a glance</h3>
            <dl className="mt-5 divide-y divide-border">
              {rich.overviewFacts.map((f) => (
                <div key={f.label} className="flex flex-wrap justify-between gap-2 py-3">
                  <dt className="text-sm font-semibold text-muted-foreground">{f.label}</dt>
                  <dd className="text-sm font-semibold text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CourseLevels({ rich }: { rich: CourseRich }) {
  const [active, setActive] = useState(0);
  const level = rich.levels[active]!;
  return (
    <section className="section bg-surface">
      <div className="shell">
        <Reveal>
          <h2 className="display-2 text-foreground">{rich.levelsHeading}</h2>
          <p className="lede mt-5 max-w-3xl">{rich.levelsIntro}</p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Course levels">
          {rich.levels.map((l, i) => (
            <button
              key={l.level}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`min-h-11 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                i === active
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-input bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {l.level}
            </button>
          ))}
        </div>

        <div className="card-premium mt-8 p-8">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground">
            {level.stage}
          </span>
          <h3 className="display-3 mt-3 text-foreground">{level.level}</h3>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {level.description}
          </p>
        </div>
      </div>
    </section>
  );
}

export function CourseOptions({ rich }: { rich: CourseRich }) {
  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          <h2 className="display-2 text-foreground">{rich.optionsHeading}</h2>
          <p className="lede mt-5 max-w-3xl">{rich.optionsIntro}</p>
        </Reveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {rich.options.map((o, i) => (
            <Reveal as="li" key={o.title} delay={i * 0.05}>
              <div className="card-premium h-full p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="display-3 text-foreground">{o.title}</h3>
                  <span className="rounded-full bg-accent/18 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-accent-foreground">
                    {o.hours}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{o.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CourseWeek({ rich }: { rich: CourseRich }) {
  const [tab, setTab] = useState(0);
  const table = rich.timetables[tab]!;
  return (
    <section className="section bg-surface">
      <div className="shell">
        <Reveal>
          <h2 className="display-2 text-foreground">{rich.weekHeading}</h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            {rich.weekIntro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Sample timetable">
          {rich.timetables.map((t, i) => (
            <button
              key={t.title}
              type="button"
              role="tab"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              className={`min-h-11 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                i === tab
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-input bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-4xl border border-border bg-card">
          <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
            <caption className="sr-only">Sample timetable — {table.title}</caption>
            <thead>
              <tr className="bg-secondary">
                <th scope="col" className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-secondary-foreground">
                  Time
                </th>
                {table.days.map((d) => (
                  <th
                    key={d}
                    scope="col"
                    className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-secondary-foreground"
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((r) => (
                <tr key={r.time} className="border-t border-border align-top">
                  <th scope="row" className="whitespace-nowrap px-5 py-4 font-semibold text-foreground">
                    {r.time}
                  </th>
                  {r.cells.map((c, i) => (
                    <td key={`${r.time}-${i}`} className="px-5 py-4 leading-relaxed text-muted-foreground">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function CourseFocus({ rich }: { rich: CourseRich }) {
  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          <h2 className="display-2 text-foreground">{rich.focusHeading}</h2>
          <p className="lede mt-5 max-w-3xl">{rich.focusIntro}</p>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {rich.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length]!;
            return (
              <Reveal as="li" key={p.title} delay={i * 0.05}>
                <div className="card-premium flex h-full gap-4 p-7">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display text-base font-bold text-foreground">{p.title}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{p.detail}</span>
                  </span>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-4xl bg-border sm:grid-cols-2 lg:grid-cols-4">
          {rich.specs.map((s) => (
            <div key={s.label} className="bg-card p-7">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{s.label}</dt>
              <dd className="display-3 mt-2 text-primary">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function CourseBenefits({ rich }: { rich: CourseRich }) {
  return (
    <section className="section bg-surface">
      <div className="shell">
        <Reveal>
          <h2 className="display-2 max-w-3xl text-foreground">{rich.benefitsHeading}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rich.benefits.map((b, i) => {
            const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length]!;
            return (
              <Reveal as="li" key={b.title} delay={i * 0.05}>
                <div className="card-premium hover-lift h-full p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-4xl bg-primary p-8 text-primary-foreground md:p-10">
            <Sparkles aria-hidden className="size-7 text-accent" />
            <div className="mt-5 max-w-3xl space-y-4 text-sm leading-relaxed text-primary-foreground/85">
              {rich.pathwayNote.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <a
              href="/contact"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              Talk to an education advisor
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CourseFaqs({ rich }: { rich: CourseRich }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="shell max-w-4xl">
        <Reveal>
          <h2 className="display-2 text-foreground">Frequently asked questions</h2>
        </Reveal>
        <ul className="mt-10 space-y-3">
          {rich.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} delay={i * 0.03}>
                <div className="overflow-hidden rounded-3xl border border-border bg-card">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-4 text-left text-base font-semibold text-foreground"
                    >
                      {f.q}
                      <ChevronDown
                        aria-hidden
                        className={`size-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>
                  {isOpen ? (
                    <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      <p>{f.a}</p>
                      {f.link ? (
                        <a
                          className="mt-3 inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline"
                          href={f.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {f.link.label}
                          <ArrowUpRight aria-hidden className="size-4" />
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function CourseHeroExtras({ rich }: { rich: CourseRich }) {
  return (
    <>
      <ul className="mt-6 flex flex-wrap gap-2.5">
        {rich.heroBadges.map((b) => (
          <li
            key={b}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground/90"
          >
            <CheckCircle2 aria-hidden className="size-3.5 text-accent" />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        {rich.ctas.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
              c.variant === "accent"
                ? "bg-accent text-accent-foreground shadow-soft"
                : c.variant === "primary"
                  ? "bg-white text-primary shadow-soft"
                  : "border border-white/35 text-primary-foreground hover:bg-white/12"
            }`}
          >
            {c.label}
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        ))}
      </div>
    </>
  );
}
