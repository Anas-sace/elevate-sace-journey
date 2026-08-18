import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Elegant fade-up reveal used across every section. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-secondary-foreground">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="display-2 mt-5 text-foreground">
        {title}
      </h2>
      {intro ? <p className="lede mt-5">{intro}</p> : null}
    </Reveal>
  );
}

/** Animated statistic counter. */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    // Always land on the final number, even if the in-view observer never fires
    // (small viewports, clipped ancestors, background tabs).
    const safety = window.setTimeout(() => setValue(to), 2600);
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (inView) run();
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
    };
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString("en-AU")}
      {suffix}
    </span>
  );
}

type BtnProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "outline" | "ghostLight" | "accent";
  className?: string;
};

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold min-h-11 transition-all duration-300 ease-out active:scale-[0.98]";

const btnVariants: Record<NonNullable<BtnProps["variant"]>, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:bg-primary-deep hover:shadow-lift hover:-translate-y-0.5",
  accent:
    "bg-accent text-accent-foreground shadow-soft hover:brightness-105 hover:shadow-lift hover:-translate-y-0.5",
  outline:
    "border border-input bg-card text-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5",
  ghostLight:
    "border border-white/35 text-white hover:bg-white/12 hover:-translate-y-0.5",
};

export function ButtonLink({ children, href, variant = "primary", className = "" }: BtnProps) {
  return (
    <a href={href} className={`${btnBase} ${btnVariants[variant]} ${className}`}>
      {children}
    </a>
  );
}
