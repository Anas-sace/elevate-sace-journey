import { Quote, Play } from "lucide-react";
import s1 from "@/assets/student-1.jpg";
import s2 from "@/assets/student-2.jpg";
import s3 from "@/assets/student-3.jpg";
import { Reveal, SectionHead } from "./ui";

const STORIES = [
  {
    name: "Aiko Tanaka",
    country: "Japan",
    now: "Master of Marketing, University of Adelaide",
    quote:
      "I arrived too shy to order coffee. Eleven months later I presented my research in English to eighty people.",
    src: s1,
  },
  {
    name: "Julián Restrepo",
    country: "Colombia",
    now: "Bachelor of Engineering, UniSA",
    quote:
      "The teachers pushed me exactly as hard as I needed. My pathway offer arrived before I even finished the course.",
    src: s2,
  },
  {
    name: "Linh Nguyen",
    country: "Vietnam",
    now: "Registered Nurse, Adelaide",
    quote:
      "SACE helped me with IELTS, my visa and my first job interview. It felt like having family here.",
    src: s3,
  },
];

export function Stories() {
  return (
    <section id="stories" className="section">
      <div className="shell">
        <SectionHead
          eyebrow="Success stories"
          title="Their first week looked a lot like yours will."
          align="center"
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {STORIES.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.08}>
              <figure className="card-premium hover-lift flex h-full flex-col p-8">
                <Quote aria-hidden className="size-8 text-accent" />
                <blockquote className="mt-5 flex-1 font-display text-lg leading-snug font-semibold text-foreground">
                  “{s.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <img
                    src={s.src}
                    alt={`Portrait of ${s.name}`}
                    width={640}
                    height={640}
                    loading="lazy"
                    className="size-14 rounded-full object-cover"
                  />
                  <span>
                    <span className="block text-sm font-bold text-foreground">{s.name}</span>
                    <span className="block text-xs text-muted-foreground">{s.country}</span>
                    <span className="mt-1 block text-xs text-primary">{s.now}</span>
                  </span>
                </figcaption>
                <button
                  type="button"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Play aria-hidden className="size-4" />
                  Watch {s.name.split(" ")[0]}’s story
                </button>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
