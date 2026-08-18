import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./ui";

const NEWS = [
  {
    tag: "Graduation",
    date: "12 July 2026",
    title: "Mid-year graduation celebrates 214 students from 31 countries",
    body: "Families joined online and in person as our winter cohort collected their certificates.",
  },
  {
    tag: "Announcement",
    date: "28 June 2026",
    title: "New direct-entry agreement signed with a leading SA university",
    body: "Eligible English for Tertiary Studies graduates can now progress without sitting IELTS.",
  },
  {
    tag: "Events",
    date: "9 June 2026",
    title: "Club SACE winter programme: Barossa, footy and a night market",
    body: "Twelve weeks of trips and activities, free for every enrolled student.",
  },
];

export function News() {
  return (
    <section id="news" className="section">
      <div className="shell">
        <SectionHead eyebrow="News & events" title="What is happening at SACE right now." />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {NEWS.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 0.08}>
              <article className="card-premium hover-lift group flex h-full flex-col p-8">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary-soft px-3 py-1 font-bold uppercase tracking-[0.1em] text-primary">
                    {n.tag}
                  </span>
                  <time className="text-muted-foreground">{n.date}</time>
                </div>
                <h3 className="mt-5 font-display text-xl leading-snug font-bold text-foreground">
                  {n.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                <a
                  href="#news"
                  className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Read more
                  <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only">: {n.title}</span>
                </a>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-4xl border border-border bg-surface p-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Not sure which course suits you?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Ten quick questions, instant feedback and a course recommendation.
              </p>
            </div>
            <a
              href="#english-test"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              Let&apos;s test your English
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>

  );
}
