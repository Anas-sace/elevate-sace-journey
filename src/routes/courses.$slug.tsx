import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { PageShell } from "@/components/sace/PageShell";
import { ButtonLink, Eyebrow, Reveal } from "@/components/sace/ui";
import { COURSES, getCourse, type CourseDetail } from "@/data/courses";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course not found — SACE Adelaide" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.course.name} — SACE Adelaide`;
    const description = loaderData.course.intro;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CourseNotFound,
  component: CoursePage,
});

function CourseNotFound() {
  return (
    <PageShell>
      <section className="section pt-40">
        <div className="shell text-center">
          <h1 className="display-2 text-foreground">We couldn't find that course</h1>
          <p className="lede mx-auto mt-4 max-w-xl">It may have been renamed. Browse the full catalogue instead.</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/courses">All courses</ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function CoursePage() {
  const { course } = Route.useLoaderData() as { course: CourseDetail };
  const others = COURSES.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-primary pb-20 pt-36 text-primary-foreground md:pb-28 md:pt-44">
        <img src={course.image} alt="" aria-hidden className="absolute inset-0 -z-20 size-full object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/95 via-primary/85 to-primary-deep/95" />
        <div className="shell">
          <Reveal>
            <Eyebrow>{course.tag ?? "Course"}</Eyebrow>
            <h1 className="display-1 mt-6 max-w-4xl text-primary-foreground">{course.name}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">{course.tagline}</p>
            <nav aria-label="Breadcrumb" className="mt-8 text-sm text-primary-foreground/70">
              <Link to="/" className="underline-offset-4 hover:underline">
                Home
              </Link>
              <span aria-hidden className="px-2">/</span>
              <Link to="/courses" className="underline-offset-4 hover:underline">
                Courses
              </Link>
              <span aria-hidden className="px-2">/</span>
              <span>{course.shortName}</span>
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <Reveal>
              <h2 className="display-2 text-foreground">About the course</h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
                {course.overview.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="display-2 mt-16 text-foreground">Curriculum</h2>
              <div className="mt-6 space-y-8">
                {course.curriculum.map((block) => (
                  <div key={block.title} className="card-premium p-7">
                    <h3 className="display-3 text-foreground">{block.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                          <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="display-2 mt-16 text-foreground">Duration and timetable</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {course.timetables.map((t) => (
                  <div key={t.title} className="rounded-4xl bg-surface p-7">
                    <div className="flex items-center gap-2 text-primary">
                      <Clock aria-hidden className="size-4" />
                      <h3 className="text-sm font-bold uppercase tracking-[0.12em]">{t.title}</h3>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {t.lines.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>

            {course.options ? (
              <Reveal delay={0.05}>
                <h2 className="display-2 mt-16 text-foreground">Course options</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {course.options.map((o) => (
                    <li key={o.title} className="card-premium p-6">
                      <h3 className="text-base font-bold text-foreground">{o.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{o.detail}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {course.extras?.map((extra) => (
              <Reveal key={extra.title} delay={0.05}>
                <h2 className="display-2 mt-16 text-foreground">{extra.title}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {extra.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground"
                    >
                      <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="card-premium p-7">
                <h2 className="display-3 text-foreground">Course details</h2>
                <dl className="mt-5 divide-y divide-border">
                  {course.facts.map((f) => (
                    <div key={f.label} className="flex flex-wrap justify-between gap-2 py-3">
                      <dt className="text-sm font-semibold text-muted-foreground">{f.label}</dt>
                      <dd className="text-sm font-semibold text-foreground">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href="/#apply">Enrol now</ButtonLink>
                  <ButtonLink href="/contact" variant="outline">
                    Ask a question
                  </ButtonLink>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Fee structures for 2026 and detailed brochures are available on request from{" "}
                  <a className="text-primary underline-offset-4 hover:underline" href="mailto:registrar@sacecoll.sa.edu.au">
                    registrar@sacecoll.sa.edu.au
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="shell">
          <h2 className="display-2 text-foreground">Other courses</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 0.06}>
                <Link
                  to="/courses/$slug"
                  params={{ slug: c.slug }}
                  className="card-premium hover-lift group flex h-full flex-col p-7"
                >
                  <h3 className="display-3 text-foreground">{c.shortName}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    View course <ArrowUpRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
