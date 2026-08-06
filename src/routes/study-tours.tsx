import { createFileRoute } from "@tanstack/react-router";
import { Bus, Home, Plane, Sparkles } from "lucide-react";
import { PageHero, PageShell } from "@/components/sace/PageShell";
import { ButtonLink, Reveal, SectionHead } from "@/components/sace/ui";
import beach from "@/assets/life-beach.jpg";

const TITLE = "Customised Study Tours in Adelaide — SACE";
const DESCRIPTION =
  "Tailored study tours for schools, universities, groups and organisations: English classes, afternoon excursions, homestay accommodation and airport transfers in Adelaide.";

export const Route = createFileRoute("/study-tours")({
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
  component: StudyToursPage,
});

const INCLUSIONS = [
  {
    icon: Sparkles,
    title: "The English course",
    body: "Students learn and practise social English to help them communicate in typical everyday situations.",
  },
  {
    icon: Bus,
    title: "Afternoon excursions",
    body: "A tour of Adelaide city, Aboriginal museums, Australian wildlife parks, Glenelg Beach, the Haigh's Chocolate factory and more.",
  },
  {
    icon: Home,
    title: "Homestay accommodation",
    body: "Students stay with an Australian family and share family life. All meals are included — breakfast, packed lunch and dinner.",
  },
  {
    icon: Plane,
    title: "Airport transfer",
    body: "A SACE representative meets students at Adelaide Airport and introduces them to their homestay family.",
  },
];

const CHOICES = [
  "Study Tours for Seniors",
  "Study Tour + Sports (e.g. golf and tennis)",
  "Study Tour for High School Students",
  "Study Tours for Juniors (10 to 13 years)",
];

const DETAILS = [
  { label: "When", value: "On demand" },
  { label: "Duration", value: "Minimum 7 days, maximum 8 weeks" },
  { label: "Group size", value: "Minimum 10 students" },
  { label: "Cost", value: "Price on application" },
];

const PROGRAMME = [
  "English course (16 – 25 hours per week)",
  "Afternoon tours (3 – 5 days per week)",
  "Homestay accommodation (3 meals per day)",
  "Airport transfer from Adelaide Airport",
  "Study tours built to meet the specific requirements of each group",
];

function StudyToursPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Study Tours"
        title="Customised study tours, built around your group."
        intro="SACE offers customised study tours for schools, universities, groups and organisations — tailored to each group's interests, requirements and focus."
        image={beach}
      />

      <section className="section">
        <div className="shell">
          <SectionHead eyebrow="Overview" title="What every study tour includes." />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {INCLUSIONS.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.06}>
                <div className="card-premium h-full p-7">
                  <item.icon aria-hidden className="size-7 text-primary" />
                  <h3 className="display-3 mt-5 text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHead eyebrow="Choices" title="Choose the shape of your tour." />
            <ul className="mt-8 space-y-3">
              {CHOICES.map((c) => (
                <li
                  key={c}
                  className="rounded-2xl border border-border bg-card p-4 text-sm font-semibold text-foreground"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Contact SACE to arrange a specific tour programme to meet your needs.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card-premium p-8">
              <h2 className="display-3 text-foreground">Details</h2>
              <dl className="mt-5 divide-y divide-border">
                {DETAILS.map((d) => (
                  <div key={d.label} className="flex flex-wrap justify-between gap-2 py-3">
                    <dt className="text-sm font-semibold text-muted-foreground">{d.label}</dt>
                    <dd className="text-sm font-semibold text-foreground">{d.value}</dd>
                  </div>
                ))}
              </dl>
              <h3 className="mt-7 text-sm font-bold uppercase tracking-[0.12em] text-primary">Programme</h3>
              <ol className="mt-4 space-y-2.5">
                {PROGRAMME.map((p, i) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[11px] font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink href="/contact">Enquire about a study tour</ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
