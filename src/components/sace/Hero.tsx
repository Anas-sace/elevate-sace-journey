import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, PlayCircle, MouseIcon, Download, GraduationCap } from "lucide-react";
import heroImg from "@/assets/hero-students.jpg";
import buildingImg from "@/assets/hero-building.jpg";
import { ButtonLink, Counter } from "./ui";
import { VideoLightbox } from "./VideoLightbox";

const CAMPUS_FILM = "https://youtu.be/lczl252Y_Tc";

const STATS = [
  { value: 40, suffix: "+", label: "Years in Adelaide" },
  { value: 60, suffix: "+", label: "Nationalities" },
  { value: 40000, suffix: "+", label: "Students taught" },
  { value: 24, suffix: "/7", label: "Student support" },
];

const COUNTRIES = [
  { flag: "JP", name: "Japan", city: "Tokyo" },
  { flag: "CO", name: "Colombia", city: "Bogotá" },
  { flag: "VN", name: "Vietnam", city: "Hanoi" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  return (
    <section id="main" className="relative isolate overflow-hidden md:min-h-[100svh]">
      <div className="absolute inset-0 -z-20">
        <img
          src={heroImg}
          alt="International students smiling outside Woodards House, the SACE campus in Adelaide"
          width={1600}
          height={1067}
          fetchPriority="high"
          className="size-full object-cover object-[60%_top] md:ken-burns md:object-center"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(170deg,var(--primary-deep)_0%,color-mix(in_oklab,var(--primary)_82%,transparent)_58%,transparent_92%)] md:bg-[linear-gradient(100deg,var(--primary-deep)_0%,color-mix(in_oklab,var(--primary)_82%,transparent)_42%,transparent_78%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/45 md:bg-black/15" />

      <div className="shell flex flex-col justify-center pb-24 pt-28 md:min-h-[100svh] md:pb-24 md:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              NEAS accredited · Adelaide, South Australia
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="display-1 mt-6 max-w-2xl text-white"
            >
              Study English.
              <span className="block text-white/80">Build your future in Australia.</span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/85"
            >
              Join thousands of international students who chose SACE to improve their English,
              reach their academic goals and begin their Australian journey.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <ButtonLink href="#apply" variant="accent">
                Apply now <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="#english-test" variant="ghostLight">
                <GraduationCap aria-hidden className="size-4" /> Let&apos;s test your English
              </ButtonLink>
              <ButtonLink href="#courses" variant="ghostLight">
                Explore courses
              </ButtonLink>
              <ButtonLink href="/SACE-Brochure.pdf" variant="ghostLight">
                <Download aria-hidden className="size-4" /> Access Brochure
              </ButtonLink>
            </motion.div>

            <motion.dl
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/20 pt-8 sm:grid-cols-4 md:mt-14 md:gap-y-8"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-extrabold text-white md:text-4xl">
                      <Counter to={s.value} suffix={s.suffix} />
                    </span>
                    <span className="mt-1.5 block text-xs uppercase tracking-[0.12em] text-white/70">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="glass-dark overflow-hidden rounded-4xl p-2 shadow-lift">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
                <img
                  src={buildingImg}
                  alt="SACE students outside Woodards House, the college building on Waymouth Street, Adelaide"
                  width={2400}
                  height={1600}
                  fetchPriority="high"
                  className="size-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent" />
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play the SACE campus film"
                  className="absolute inset-x-5 bottom-5 flex min-h-11 items-center gap-3 rounded-2xl bg-white/14 px-4 py-3 text-left text-white backdrop-blur-md transition-colors hover:bg-white/24"
                >
                  <PlayCircle aria-hidden className="size-8 shrink-0 text-accent" />
                  <span>
                    <span className="block text-sm font-semibold">Watch campus film</span>
                    <span className="block text-xs text-white/70">2 min · Life at SACE Adelaide</span>
                  </span>
                </button>
              </div>
            </div>

            <ul className="pointer-events-none absolute -left-10 top-10 space-y-3">
              {COUNTRIES.map((c, i) => (
                <motion.li
                  key={c.name}
                  animate={reduce ? {} : { y: [0, -9, 0] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                  className="glass flex items-center gap-3 rounded-2xl px-4 py-2.5 shadow-soft"
                >
                  <span aria-hidden className="inline-flex size-8 items-center justify-center rounded-lg bg-primary-soft font-display text-[11px] font-extrabold text-primary">{c.flag}</span>
                  <span>
                    <span className="block text-xs font-semibold text-foreground">{c.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{c.city}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#why"
        aria-label="Scroll to why choose SACE"
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
      >
        <MouseIcon aria-hidden className="size-4" />
        Scroll
      </motion.a>

      {playing ? (
        <VideoLightbox src={CAMPUS_FILM} title="Life at SACE Adelaide" onClose={() => setPlaying(false)} />
      ) : null}
    </section>
  );
}
