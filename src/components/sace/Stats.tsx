import { Counter, Reveal } from "./ui";

const STATS = [
  { to: 40000, suffix: "+", label: "Students taught since 1987" },
  { to: 60, suffix: "+", label: "Nationalities on campus" },
  { to: 40, suffix: "+", label: "Years of accreditation" },
  { to: 96, suffix: "%", label: "Would recommend SACE" },
  { to: 18, suffix: "", label: "Pathway partnerships" },
];

export function Stats() {
  return (
    <section aria-labelledby="stats-heading" className="section bg-surface-2">
      <div className="shell">
        <h2 id="stats-heading" className="sr-only">
          SACE by the numbers
        </h2>
        <dl className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-extrabold text-primary md:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </span>
                <span className="mx-auto mt-3 block max-w-40 text-sm text-muted-foreground">
                  {s.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
