import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui";
import flinders from "@/assets/partners/partner-1.png";
import cqu from "@/assets/partners/partner-2.png";
import tafesa from "@/assets/partners/partner-3.png";
import deakin from "@/assets/partners/partner-4.png";
import equals from "@/assets/partners/partner-5.png";
import qthc from "@/assets/partners/partner-6.png";

const STAGES = [
  { label: "English", detail: "General or Tertiary English at SACE" },
  { label: "Academic preparation", detail: "Study skills, research, academic writing" },
  { label: "University", detail: "Direct entry, no IELTS re-sit" },
  { label: "Degree", detail: "Bachelor or Masters in South Australia" },
  { label: "Career", detail: "Graduate work rights and industry networks" },
];

const PARTNERS = [
  { name: "Flinders University", logo: flinders },
  { name: "CQUniversity Australia", logo: cqu },
  { name: "TAFE SA", logo: tafesa },
  { name: "Deakin College", logo: deakin },
  { name: "EQUALS International", logo: equals },
  { name: "Quality Training & Hospitality College", logo: qthc },
];

export function Pathways() {
  return (
    <section id="pathways" className="section bg-primary text-primary-foreground">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            University pathways
          </span>
          <h2 className="display-2 mt-5">English is the first step. We have mapped the rest.</h2>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/80">
            Finish your SACE pathway programme at the required level and walk into your partner
            university without sitting IELTS again.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-4 md:grid-cols-5">
          {STAGES.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.08}>
              <div className="glass-dark relative h-full rounded-3xl p-6">
                <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  Stage {i + 1}
                </span>
                <p className="mt-3 font-display text-lg font-bold">{s.label}</p>
                <p className="mt-2 text-sm text-primary-foreground/75">{s.detail}</p>
                {i < STAGES.length - 1 ? (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-3.5 top-1/2 hidden size-6 -translate-y-1/2 text-accent md:block"
                  />
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
            Pathway and articulation partners
          </p>
          <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <ul className="marquee-track flex w-max items-center gap-4">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <li
                  key={`${p.name}-${i}`}
                  className="flex h-24 w-56 shrink-0 items-center justify-center rounded-2xl border border-white/18 bg-white p-5"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    loading="lazy"
                    className="max-h-14 w-auto object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
