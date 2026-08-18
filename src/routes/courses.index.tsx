import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Signal, CalendarDays } from "lucide-react";
import { PageHero, PageShell } from "@/components/sace/PageShell";
import { Reveal, SectionHead, ButtonLink } from "@/components/sace/ui";
import { COURSES } from "@/data/courses";
import campus from "@/assets/campus-classroom.jpg";

const TITLE = "English Courses in Adelaide | SACE";
const DESCRIPTION =
  "General English, ETS, English Plus, High School, Evergreen, IELTS, PTE and Cambridge CELTA courses at the South Australian College of English in Adelaide.";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursesIndex,
});

function CoursesIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Courses"
        title="Eight programmes. One clear path to the English you need."
        intro="Whether you are here for four weeks or a full year, every SACE course is built in levels so you always know what you are working towards."
        image={campus}
      />

      <section className="section">
        <div className="shell">
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {COURSES.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 0.05}>
                <article className="card-premium hover-lift group flex h-full flex-col overflow-hidden">
                  <img
                    src={c.image}
                    alt={`Students in the ${c.name} at SACE Adelaide`}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="display-3 text-foreground">{c.shortName}</h2>
                      {c.tag ? (
                        <span className="shrink-0 rounded-full bg-accent/18 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-accent-foreground">
                          {c.tag}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.intro}</p>

                    <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                      <div className="flex items-center gap-3">
                        <Clock aria-hidden className="size-4 shrink-0 text-primary" />
                        <dt className="sr-only">Duration</dt>
                        <dd className="text-foreground">{c.quickDuration}</dd>
                      </div>
                      <div className="flex items-center gap-3">
                        <Signal aria-hidden className="size-4 shrink-0 text-primary" />
                        <dt className="sr-only">Level</dt>
                        <dd className="text-foreground">{c.quickLevel}</dd>
                      </div>
                      <div className="flex items-center gap-3">
                        <CalendarDays aria-hidden className="size-4 shrink-0 text-primary" />
                        <dt className="sr-only">Start dates</dt>
                        <dd className="text-foreground">{c.quickStarts}</dd>
                      </div>
                    </dl>

                    <Link
                      to="/courses/$slug"
                      params={{ slug: c.slug }}
                      className="mt-7 inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-input px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      View course
                      <ArrowUpRight aria-hidden className="size-4" />
                      <span className="sr-only">- {c.name}</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="shell">
          <SectionHead
            align="center"
            eyebrow="Not sure?"
            title="Take a free placement chat."
            intro="Fifteen minutes with our academic team and you will know exactly which course and level to start at, with no obligation."
          />
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/#apply">Book a placement chat</ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
