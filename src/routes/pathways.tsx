import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, GraduationCap, School } from "lucide-react";
import { PageHero, PageShell } from "@/components/sace/PageShell";
import { ButtonLink, Reveal, SectionHead } from "@/components/sace/ui";
import graduation from "@/assets/life-graduation.jpg";

const TITLE = "University & TAFE Pathways | SACE Adelaide";
const DESCRIPTION =
  "SACE pathway partnerships with Flinders University, CQUniversity, Deakin College, TAFE SA, Equals International and Quality College of Australia, plus leading Adelaide high schools.";

export const Route = createFileRoute("/pathways")({
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
  component: PathwaysPage,
});

const PARTNERS = [
  {
    name: "Flinders University",
    blurb:
      "For over 50 years, Flinders has been a centre of inspiring achievement: from pioneering research and excellence in teaching to the positive impact it has in the communities it serves.",
    offers: ["Undergraduate degrees", "Postgraduate degrees", "Professional and research programs"],
  },
  {
    name: "CQUniversity",
    blurb:
      "One of Australia's largest regional universities, with a presence in every mainland state and a strong reputation for real-world graduate outcomes and industry collaboration.",
    offers: ["Undergraduate degrees", "Postgraduate degrees", "Professional and research programs"],
  },
  {
    name: "Deakin College",
    blurb:
      "Deakin is renowned for strong industry connections and career-focused education, and is recognised by local and international ranking bodies for teaching, research and student success.",
    offers: [
      "University foundation programs",
      "Diploma programs (Business, IT, Health Sciences)",
      "Pathway to Deakin University undergraduate programs",
    ],
  },
  {
    name: "TAFE South Australia",
    blurb:
      "South Australia's largest vocational education and training provider, delivering job-focused training across a range of industries from entry-level certificates to bachelor degrees.",
    offers: [
      "Vocational Education & Training (VET) certificates",
      "Diplomas & advanced diplomas in various trades",
      "Business, IT and Community Services courses",
    ],
  },
  {
    name: "Equals International",
    blurb:
      "Founded over 30 years ago with the dream of promoting and developing human potential, Equals is an independent tertiary provider offering nationally recognised accredited courses.",
    offers: [
      "Health & Nursing courses",
      "Human Services courses",
      "Education & Community Services courses",
      "Integrative Health courses",
      "Leadership & Management courses",
    ],
  },
  {
    name: "Quality College of Australia",
    blurb:
      "Industry expert staff help students build rewarding and dynamic careers across Cookery, Hospitality, Management and Leadership.",
    offers: ["Hospitality certificates & diplomas", "Food & beverage training", "Event management courses"],
  },
];

const SCHOOLS = [
  "Scotch College (Co-Ed)",
  "Pembroke (Co-Ed)",
  "Westminster (Co-Ed)",
  "Sacred Heart College (Co-Ed)",
  "Concordia (Co-Ed)",
  "St Aloysius (Female only)",
  "Loreto (Female only)",
  "St Peters Girls (Female only)",
  "Our Lady of the Sacred Heart – OLSH (Female only)",
  "Blackfriars Priory School (Male only)",
  "Prince Alfred College (Male only)",
];

function PathwaysPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pathways"
        title="From English classes to an Australian qualification."
        intro="SACE has built a dynamic network of pathway partnerships with leading institutions across South Australia and beyond, so your English course becomes the first step of a longer journey."
        image={graduation}
      />

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHead eyebrow="Overview" title="Pathway partnerships and course offerings." />
          </Reveal>
          <Reveal delay={0.06}>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Through collaborations with institutions such as Equals International, TAFE South Australia,
                Flinders University, Quality Training & Hospitality College and Deakin College, SACE students can
                move seamlessly from English language studies into nationally accredited qualifications and higher
                education programmes.
              </p>
              <p>
                These pathways span health and community services, early childhood education, hospitality,
                electrotechnology, business, IT and social work.
              </p>
              <p>
                By fostering these strategic alliances, SACE equips students with the language skills and academic
                foundations needed to pursue meaningful careers and further study in Australia's education sector.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="shell">
          <SectionHead
            eyebrow="Partner institutions"
            title="Our pathway partners and the courses they offer."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {PARTNERS.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 0.05}>
                <article className="card-premium h-full p-7">
                  <GraduationCap aria-hidden className="size-7 text-primary" />
                  <h3 className="display-3 mt-5 text-foreground">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {p.offers.map((o) => (
                      <li key={o} className="flex gap-3 text-sm text-foreground">
                        <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="Other institutions"
            title="SACE also works with many leading Adelaide high schools."
            intro="Our counsellors help families choose the right school and manage the application and enrolment process."
          />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SCHOOLS.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 0.03}>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm font-medium text-foreground">
                  <School aria-hidden className="size-4 shrink-0 text-primary" />
                  {s}
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/courses/english-for-tertiary-studies">Explore direct entry (ETS)</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Speak to a counsellor
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
