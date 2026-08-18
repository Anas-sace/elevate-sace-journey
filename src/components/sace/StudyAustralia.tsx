import { ShieldCheck, Users, Briefcase, Sun, Landmark, BookOpenCheck, ArrowRight } from "lucide-react";
import adelaide from "@/assets/adelaide.jpg";
import { ButtonLink, Reveal, Eyebrow } from "./ui";

const REASONS = [
  { icon: ShieldCheck, title: "Safe", body: "Adelaide is consistently ranked among the world's most liveable and safest cities." },
  { icon: Users, title: "Multicultural", body: "A city where more than 200 languages are already spoken at home." },
  { icon: Briefcase, title: "Career", body: "Work up to 48 hours a fortnight while you study on a student visa." },
  { icon: Sun, title: "Lifestyle", body: "Beaches, wine regions and festivals | all within 30 minutes of campus." },
  { icon: Landmark, title: "Universities", body: "Three world-ranked universities and a strong regional migration profile." },
  { icon: BookOpenCheck, title: "Quality", body: "Nationally regulated education with student protections built into law." },
];

export function StudyAustralia() {
  return (
    <section id="australia" className="section">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-4xl shadow-lift">
            <img
              src={adelaide}
              alt="Aerial view of Adelaide city and its surrounding parklands at golden hour"
              width={1400}
              height={1600}
              loading="lazy"
              className="aspect-4/5 w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
            />
          </div>
          <div className="glass absolute -right-4 bottom-8 max-w-[15rem] rounded-3xl p-5 shadow-lift md:-right-10">
            <p className="font-display text-3xl font-extrabold text-primary">#1</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Most affordable major city in Australia for international students.
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>Study in Australia</Eyebrow>
            <h2 className="display-2 mt-5">
              A small city with a big future, and room for you in it.
            </h2>
            <p className="lede mt-5">
              Adelaide gives you everything a bigger city does: world-class education, real career
              opportunity and a community that welcomes you. Just calmer, kinder and more affordable.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 0.05} className="flex gap-4">
                <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <r.icon aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-foreground">{r.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{r.body}</span>
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2} className="mt-10">
            <ButtonLink href="#apply">
              Start your Australian journey <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
