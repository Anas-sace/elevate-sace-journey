import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, Compass, Home, PartyPopper } from "lucide-react";
import { PageHero, PageShell } from "@/components/sace/PageShell";
import { ButtonLink, Reveal, SectionHead } from "@/components/sace/ui";
import lounge from "@/assets/campus-lounge.jpg";

const TITLE = "Student Services — TOEIC, Counselling, Accommodation, Club SACE";
const DESCRIPTION =
  "SACE Adelaide student services: official TOEIC testing, student counselling and educational placement, homestay and share accommodation, and the Club SACE activity programme.";

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

const SERVICES = [
  { id: "toeic", icon: ClipboardCheck, label: "TOEIC" },
  { id: "counselling", icon: Compass, label: "Student Counselling" },
  { id: "accommodation", icon: Home, label: "Accommodation" },
  { id: "club-sace", icon: PartyPopper, label: "Club SACE" },
];

function Block({
  id,
  eyebrow,
  title,
  children,
  tinted,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <section id={id} className={`section scroll-mt-24 ${tinted ? "bg-surface" : ""}`}>
      <div className="shell">
        <SectionHead eyebrow={eyebrow} title={title} />
        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">{children}</div>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services"
        title="Everything around the classroom, taken care of."
        intro="Testing, counselling, accommodation and a weekly social programme — the support that turns a course into an experience."
        image={lounge}
      />

      <section className="section pb-0">
        <div className="shell">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 0.05}>
                <a href={`#${s.id}`} className="card-premium hover-lift flex h-full items-center gap-3 p-5">
                  <s.icon aria-hidden className="size-5 shrink-0 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{s.label}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Block id="toeic" eyebrow="Testing" title="TOEIC testing at SACE Adelaide">
        <p>The South Australian College of English is an accredited TOEIC® Public Test Centre.</p>
        <p>
          <strong className="text-foreground">How to apply:</strong> complete the registration form and email it to{" "}
          <a className="text-primary underline-offset-4 hover:underline" href="mailto:registrar@sacecoll.sa.edu.au">
            registrar@sacecoll.sa.edu.au
          </a>{" "}
          before 5pm on the applicable registration closing date.
        </p>
        <p>
          <strong className="text-foreground">What to bring:</strong> photo ID and a current passport-sized
          photograph. <strong className="text-foreground">Cost:</strong> advised on registration.
        </p>
        <p>
          <strong className="text-foreground">Arrival time:</strong> please arrive at the campus (Level 1, 47
          Waymouth Street, Adelaide) by 1:30pm. The test commences at 2:00pm.
        </p>
      </Block>

      <Block id="counselling" eyebrow="Counselling" title="Student counselling and support" tinted>
        <p>Student counselling and advice is available to assist students in many areas:</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            "Learning needs",
            "Student performance",
            "Further education paths",
            "Accommodation",
            "Travel & tour opportunities",
            "Australian culture and way of life",
            "Finding work",
          ].map((x) => (
            <li key={x} className="rounded-xl border border-border bg-card p-3 text-sm text-foreground">
              {x}
            </li>
          ))}
        </ul>
        <p>
          <strong className="text-foreground">Educational placement:</strong> SACE has many years of experience
          assisting students who wish to continue their studies in Australia, with close links to leading
          Australian universities, business colleges and TAFE colleges in Adelaide, as well as many leading high
          schools.
        </p>
      </Block>

      <Block id="accommodation" eyebrow="Accommodation" title="Homestay, hostel or share housing">
        <p>
          Accommodation is an important part of a student's overall experience. SACE takes great care in selecting
          student accommodation — homestay, hostel or apartment.
        </p>
        <p>
          <strong className="text-foreground">Homestay</strong> is our most popular option. Families are carefully
          selected and students carefully matched. Homestay includes 3 meals per day and all bed linen and towels,
          with a minimum booking of four weeks unless the course is shorter.
        </p>
        <p>
          <strong className="text-foreground">Hostel accommodation:</strong> a number of hostels are within walking
          distance of the college, based on single, twin, triple or shared rooms with shared kitchen, bathroom and
          common room facilities. This is usually organised prior to arrival.
        </p>
        <p>
          <strong className="text-foreground">Share accommodation:</strong> for students who prefer to live with
          local people in an independent, non-catered environment. A noticeboard at the College lists current
          vacancies and staff can advise on the best places to look.
        </p>
      </Block>

      <Block id="club-sace" eyebrow="Activities" title="Club SACE" tinted>
        <p>
          Club SACE is a weekly afternoon activity programme organised by the college — a great way to make
          Australian and international friends. It includes a range of inexpensive, fun social activities around
          Adelaide: beaches, national parks, cultural institutes, seasonal events and sports like tennis and
          football.
        </p>
        <p>
          Adelaide is known as the 'Festival City'. Regional attractions include Kangaroo Island, the vineyards of
          the Barossa Valley and McLaren Vale just 40 minutes from the centre of Adelaide, the Adelaide Hills, and
          the outback stretching north through the Flinders Ranges.
        </p>
        <p>
          Getting around is easy: Adelaide has an integrated transport system of buses, trains and trams, plus the
          O-Bahn busway. The airport is 8km west of the city, and Adelaide is a relatively cyclist-friendly city.
        </p>
        <div className="pt-2">
          <ButtonLink href="/contact">Ask about student services</ButtonLink>
        </div>
      </Block>
    </PageShell>
  );
}
