import { Play } from "lucide-react";
import classroom from "@/assets/campus-classroom.jpg";
import foyer from "@/assets/campus-lounge.jpg";
import adelaide from "@/assets/adelaide.jpg";
import building from "@/assets/hero-building.jpg";
import excursion from "@/assets/life-excursion.jpg";
import { Reveal, SectionHead } from "./ui";

const TILES = [
  { src: classroom, alt: "SACE students in class celebrating their course certificates with their teacher", label: "Classrooms", meta: "Max 18 students", span: "md:col-span-2 md:row-span-2", w: 2000, h: 1500, video: true },
  { src: foyer, alt: "The Woodards House foyer and reception at the SACE campus", label: "Reception & foyer", meta: "Level 1, Woodards House", span: "", w: 1160, h: 1740 },
  { src: building, alt: "Woodards House, the heritage building housing SACE on Waymouth Street", label: "Our building", meta: "47 Waymouth Street", span: "", w: 2400, h: 1600 },
  { src: adelaide, alt: "Adelaide city skyline and the River Torrens parklands", label: "The city", meta: "5 min walk", span: "", w: 451, h: 652 },
  { src: excursion, alt: "SACE students on an excursion at the University of Adelaide lawns", label: "Beyond campus", meta: "Weekly trips", span: "", w: 1600, h: 1200 },
];

export function Campus() {
  return (
    <section id="campus" className="section bg-surface">
      <div className="shell">
        <SectionHead
          eyebrow="Campus experience"
          title="Level 1, Waymouth Street — the best-located classroom in Adelaide."
          intro="Everything you need is in one building, and everything else is a short walk away."
        />

        <div className="mt-14 grid auto-rows-[13rem] gap-4 md:grid-cols-4 md:auto-rows-[15rem]">
          {TILES.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.08} className={t.span}>
              <figure className="group relative size-full overflow-hidden rounded-3xl shadow-soft">
                <img
                  src={t.src}
                  alt={t.alt}
                  width={t.w}
                  height={t.h}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-108"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                {t.video ? (
                  <button
                    type="button"
                    aria-label={`Play the ${t.label.toLowerCase()} video tour`}
                    className="absolute right-5 top-5 inline-flex size-12 items-center justify-center rounded-full bg-white/18 text-white backdrop-blur-md transition-colors hover:bg-white/32"
                  >
                    <Play aria-hidden className="size-5" />
                  </button>
                ) : null}
                <figcaption className="absolute inset-x-5 bottom-5 text-white">
                  <span className="block font-display text-lg font-bold">{t.label}</span>
                  <span className="block text-xs text-white/75">{t.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
