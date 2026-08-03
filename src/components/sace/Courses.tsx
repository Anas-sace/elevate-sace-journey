import { Clock, Signal, UserCheck, CalendarDays, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./ui";

const COURSES = [
  {
    name: "General English",
    tag: "Most popular",
    duration: "4 – 48 weeks",
    level: "Beginner → Advanced",
    who: "Anyone who wants to speak, listen and live in English with confidence.",
    starts: "Every Monday",
  },
  {
    name: "IELTS Preparation",
    duration: "5 – 12 weeks",
    level: "Intermediate +",
    who: "Students who need a specific band score for university, visa or registration.",
    starts: "Monthly intakes",
  },
  {
    name: "English for Tertiary Studies",
    tag: "Direct entry",
    duration: "10 – 20 weeks",
    level: "Upper-intermediate +",
    who: "Future university students who need academic writing, research and seminar skills.",
    starts: "5 intakes per year",
  },
  {
    name: "High School Programme",
    duration: "10 – 40 weeks",
    level: "Elementary +",
    who: "Students aged 12–17 bridging into an Australian secondary school.",
    starts: "Term-aligned",
  },
  {
    name: "Cambridge CELTA",
    duration: "5 – 11 weeks",
    level: "Teacher training",
    who: "Aspiring and practising teachers who want a globally recognised qualification.",
    starts: "Quarterly",
  },
];

export function Courses() {
  return (
    <section id="courses" className="section bg-surface">
      <div className="shell">
        <SectionHead
          eyebrow="Courses"
          title="Find the course that matches where you are going."
          intro="Every programme is built in levels, so you always know what you are working towards and when you will get there."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {COURSES.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 0.06}>
              <article className="card-premium hover-lift group flex h-full flex-col p-8">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="display-3 text-foreground">{c.name}</h3>
                  {c.tag ? (
                    <span className="shrink-0 rounded-full bg-accent/18 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-accent-foreground">
                      {c.tag}
                    </span>
                  ) : null}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.who}</p>

                <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                  <div className="flex items-center gap-3">
                    <Clock aria-hidden className="size-4 shrink-0 text-primary" />
                    <dt className="sr-only">Duration</dt>
                    <dd className="text-foreground">{c.duration}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <Signal aria-hidden className="size-4 shrink-0 text-primary" />
                    <dt className="sr-only">Level</dt>
                    <dd className="text-foreground">{c.level}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays aria-hidden className="size-4 shrink-0 text-primary" />
                    <dt className="sr-only">Start dates</dt>
                    <dd className="text-foreground">{c.starts}</dd>
                  </div>
                </dl>

                <a
                  href="#apply"
                  className="mt-8 inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-input px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Learn more
                  <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">about {c.name}</span>
                </a>
              </article>
            </Reveal>
          ))}

          <Reveal as="li" delay={0.36}>
            <div className="hover-lift flex h-full flex-col justify-between rounded-4xl bg-primary p-8 text-primary-foreground">
              <div>
                <UserCheck aria-hidden className="size-8 text-accent" />
                <h3 className="display-3 mt-6">Not sure which one?</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
                  Take a free 15-minute placement chat with our academic team. We will tell you
                  exactly which level to start at — no obligation.
                </p>
              </div>
              <a
                href="#apply"
                className="mt-8 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                Book a placement chat
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
