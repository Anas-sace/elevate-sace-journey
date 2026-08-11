import { Reveal } from "./ui";
import asqa from "@/assets/partners/asqa.png";
import neas from "@/assets/partners/neas.png";
import toeic from "@/assets/partners/toeic.png";
import cambridge from "@/assets/partners/cambridge.png";

const BOARDS = [
  { name: "Australian Skills Quality Authority", logo: asqa },
  { name: "NEAS Quality Endorsed Centre", logo: neas },
  { name: "TOEIC Authorised Test Centre", logo: toeic },
  { name: "University of Cambridge", logo: cambridge },
];

export function Accreditations() {
  return (
    <section id="accreditations" aria-labelledby="accreditations-title" className="border-b border-border bg-background py-12 md:py-16">
      <div className="shell">
        <Reveal>
          <h2
            id="accreditations-title"
            className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            Accredited, endorsed and authorised
          </h2>
        </Reveal>
        <ul className="mt-8 grid grid-cols-2 items-center gap-4 md:grid-cols-4">
          {BOARDS.map((b, i) => (
            <Reveal as="li" key={b.name} delay={i * 0.06}>
              <div className="flex h-28 items-center justify-center rounded-2xl border border-border bg-card p-6">
                <img
                  src={b.logo}
                  alt={b.name}
                  loading="lazy"
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
