import beach from "@/assets/life-beach.jpg";
import food from "@/assets/life-food.jpg";
import graduation from "@/assets/life-graduation.jpg";
import lounge from "@/assets/campus-lounge.jpg";
import classroom from "@/assets/campus-classroom.jpg";
import { Reveal, SectionHead } from "./ui";

const ITEMS = [
  { src: beach, alt: "Students at a beach barbecue in South Australia", caption: "Beach days", w: 1000, h: 1400 },
  { src: graduation, alt: "Graduating students throwing their caps in the air", caption: "Graduation", w: 1000, h: 800 },
  { src: food, alt: "Students sharing street food at a night festival", caption: "Food nights", w: 1000, h: 1200 },
  { src: lounge, alt: "Students studying together in the lounge", caption: "Study clubs", w: 1200, h: 1500 },
  { src: classroom, alt: "Students laughing during a class activity", caption: "Class friends", w: 1200, h: 900 },
];

export function StudentLife() {
  return (
    <section id="life" className="section">
      <div className="shell">
        <SectionHead
          eyebrow="Student life"
          title="You will remember the friendships longer than the grammar."
          intro="Club SACE runs something every week — trips, sport, festivals, dinners. Joining in is the fastest way to become fluent."
        />

        <div className="mt-14 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.caption} delay={i * 0.06} className="break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-3xl shadow-soft">
                <img
                  src={it.src}
                  alt={it.alt}
                  width={it.w}
                  height={it.h}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-5 bottom-4 font-display text-base font-bold text-white">
                  {it.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}

          <Reveal delay={0.3} className="break-inside-avoid">
            <div className="rounded-3xl bg-primary p-7 text-primary-foreground">
              <p className="font-display text-2xl font-extrabold">Club SACE</p>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
                Free to join, open to every student, and the reason most people say their year here
                went too quickly.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
