import { Play } from "lucide-react";
import classroom from "@/assets/campus-classroom.jpg";
import lounge from "@/assets/campus-lounge.jpg";
import adelaide from "@/assets/adelaide.jpg";
import beach from "@/assets/life-beach.jpg";
import { Reveal, SectionHead } from "./ui";

const TILES = [
  { src: classroom, alt: "Small group class with a teacher in a bright SACE classroom", label: "Classrooms", meta: "Max 18 students", span: "md:col-span-2 md:row-span-2", w: 1200, h: 900, video: true },
  { src: lounge, alt: "Students relaxing in the SACE student lounge", label: "Student lounge", meta: "Open all day", span: "", w: 1200, h: 1500 },
  { src: adelaide, alt: "Adelaide city and parklands", label: "The city", meta: "5 min walk", span: "", w: 1400, h: 1600 },
  { src: beach, alt: "Students at a beach day in South Australia", label: "Beyond campus", meta: "Weekly trips", span: "md:col-span-2", w: 1000, h: 1400 },
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
