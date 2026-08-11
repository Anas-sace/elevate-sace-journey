import { createFileRoute } from "@tanstack/react-router";
import { Award, Building2, GraduationCap, HeartHandshake, Globe2, Users } from "lucide-react";
import { PageHero, PageShell } from "@/components/sace/PageShell";
import { Counter, Reveal, SectionHead } from "@/components/sace/ui";
import campusLounge from "@/assets/campus-lounge.jpg";
import campusClassroom from "@/assets/campus-classroom.jpg";
import adelaide from "@/assets/adelaide.jpg";

const TITLE = "About SACE Adelaide — English College Since 1987";
const DESCRIPTION =
  "Established in 1987, the South Australian College of English is one of Australia's longest-running NEAS-accredited English colleges, in the heart of Adelaide.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

const STATS = [
  { value: 40, suffix: "+", label: "Years" },
  { value: 10, suffix: "+", label: "Courses" },
  { value: 25000, suffix: "+", label: "Students certified" },
  { value: 30, suffix: "", label: "Countries represented" },
];

const PILLARS = [
  {
    icon: Building2,
    title: "Wonderful location",
    body: "Our Adelaide campus is housed in a beautifully renovated 1920s heritage building right in the heart of the city — cafés, shopping and cultural landmarks at your doorstep, with excellent public transport all around.",
  },
  {
    icon: HeartHandshake,
    title: "Student support",
    body: "Academic counselling and personalised study plans, plus practical help for Working Holiday and Student Visa holders with job hunting and career advice.",
  },
  {
    icon: Globe2,
    title: "Nationality mix",
    body: "Every year SACE welcomes students from over 30 different countries. No single language dominates, so you practise English every day and make friends from all over the world.",
  },
  {
    icon: Users,
    title: "Campus facilities",
    body: "A student common room and fully equipped kitchen, computer access with free internet, a Self Access Centre for independent study, and spacious classrooms.",
  },
  {
    icon: GraduationCap,
    title: "Further study pathways",
    body: "Many students use their time at SACE to prepare for Australian schools, universities and vocational colleges, supported by flexible courses and exam preparation.",
  },
  {
    icon: Award,
    title: "Accommodation",
    body: "Homestays with welcoming local families, hostels and share housing — each option chosen to give students a safe, comfortable and enjoyable stay.",
  },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="One of Australia's longest-running English language colleges."
        intro="Established in 1987, SACE has built a proud tradition of excellence in language education — and continues to help students from around the world reach their goals."
        image={campusLounge}
      />

      <section className="section">
        <div className="shell grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHead
              eyebrow="Our College"
              title="Nearly four decades of teaching English in Adelaide."
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                With more than four decades of experience, the South Australian College of English is one of
                Australia's most respected English language colleges, and continues to be a leader in helping
                students from around the world achieve their goals.
              </p>
              <p>
                Accredited by the National ELT Accreditation Scheme (NEAS), SACE upholds the highest global
                standards in English teaching. It is also a recognised Teacher Training Centre — not only do
                students learn from the best, many English teachers come here to be trained and mentored.
              </p>
              <p>
                Every year, students from over 30 nationalities choose SACE. This unique nationality mix ensures
                that no single language dominates, creating the perfect environment to practise English every day,
                make international friends and discover new cultures.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <img
              src={campusClassroom}
              alt="A SACE Adelaide classroom with students and a teacher"
              loading="lazy"
              className="h-full w-full rounded-4xl object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </section>

      <section className="section bg-primary text-primary-foreground">
        <div className="shell">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 0.06} className="text-center">
                <p className="display-1 text-accent">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground/75">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="accreditation" className="section scroll-mt-24">
        <div className="shell">
          <SectionHead
            eyebrow="Our Accreditation"
            title="Held to the highest standards in English language teaching."
            intro="SACE is accredited by the National ELT Accreditation Scheme (NEAS) and has delivered University of Cambridge CELTA courses since 1992."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "NEAS accredited",
                body: "Independent quality assurance covering teaching, resources, student welfare and management.",
              },
              {
                title: "Cambridge approved centre",
                body: "An approved centre for the Cambridge CELTA since 1992, training teachers from around the world.",
              },
              {
                title: "TOEIC public test centre",
                body: "SACE is an accredited TOEIC public test centre, running official test dates in Adelaide.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="card-premium h-full p-7">
                  <Award aria-hidden className="size-7 text-accent" />
                  <h3 className="display-3 mt-5 text-foreground">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="shell">
          <SectionHead
            eyebrow="Outstanding teachers"
            title="Small classes. Individual attention. Genuine care."
            intro="At the heart of SACE's success are dedicated, highly qualified teachers who bring experience, passion and personal care to every lesson."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="card-premium h-full p-7">
                  <p.icon aria-hidden className="size-7 text-primary" />
                  <h3 className="display-3 mt-5 text-foreground">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="campus" className="section scroll-mt-24">
        <div className="shell grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <img
              src={adelaide}
              alt="Adelaide city, home of the SACE campus on Waymouth Street"
              loading="lazy"
              className="w-full rounded-4xl object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHead eyebrow="Our Campus" title="A 1920s heritage building in the centre of the city." />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Woodards House, Level 1, 47 Waymouth Street — a beautifully renovated heritage building minutes
                from Rundle Mall, the Central Market, the Art Gallery and the tram line to Glenelg Beach.
              </p>
              <p>
                Inside you will find spacious classrooms, a student common room with a fully equipped kitchen,
                computer access with free internet before, during and after classes, and a Self Access Centre for
                quiet independent study.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="shell">
          <SectionHead
            align="center"
            eyebrow="The SACE promise"
            title="More than a place to study English."
            intro="With its long history, diverse student community, world-class teachers and genuinely caring atmosphere, SACE is a place to grow, connect and succeed. Our goal is simple: to help you communicate in English as quickly and effectively as possible while enjoying an unforgettable Australian experience."
          />
        </div>
      </section>
    </PageShell>
  );
}
