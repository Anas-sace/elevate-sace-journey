import { GraduationCap, Globe2, Route, HeartHandshake, Building2, Briefcase } from "lucide-react";
import { Reveal, SectionHead } from "./ui";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Experienced teachers",
    body: "Qualified, warm and endlessly patient. Our teachers average 12+ years in the classroom and know exactly how to move you up a level.",
  },
  {
    icon: Globe2,
    title: "Global community",
    body: "Students from more than 60 nationalities study here. English becomes the language you live in, not just the one you learn.",
  },
  {
    icon: Route,
    title: "University pathways",
    body: "Direct entry agreements with leading South Australian universities and colleges — no IELTS re-sit required.",
  },
  {
    icon: HeartHandshake,
    title: "Student support",
    body: "Free counselling, visa guidance, airport pickup and a team that answers in your language when you need it most.",
  },
  {
    icon: Building2,
    title: "Modern campus",
    body: "Light-filled classrooms in the heart of Adelaide, minutes from libraries, cafés, transport and the parklands.",
  },
  {
    icon: Briefcase,
    title: "Career preparation",
    body: "Workplace English, interview practice and part-time work advice, so your English earns its keep from day one.",
  },
];

export function WhyChoose() {
  return (
    <section id="why" className="section bg-surface">
      <div className="shell">
        <SectionHead
          eyebrow="Why SACE"
          title={<>A college built around one question: what do you need next?</>}
          intro="Since 1987 we have helped students arrive nervous and leave fluent. Here is what that support actually looks like."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 0.06}>
              <div className="card-premium hover-lift group h-full p-8">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon aria-hidden className="size-6" />
                </span>
                <h3 className="display-3 mt-6 text-foreground">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
