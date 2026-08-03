import { Reveal, SectionHead } from "./ui";

const STEPS = [
  { step: "Discover", body: "Tell us your goal. We match you to a course and a start date." },
  { step: "Apply", body: "One short online form. No application fee, no agent required." },
  { step: "Offer", body: "Receive your letter of offer, usually within two business days." },
  { step: "Visa", body: "We issue your CoE and guide you through the student visa steps." },
  { step: "Arrival", body: "Airport pickup, accommodation and orientation in your first week." },
  { step: "Study", body: "Small classes, weekly feedback and a clear path to the next level." },
  { step: "Graduate", body: "Certificate, transcript and a pathway offer if you want one." },
  { step: "Career", body: "University, work, or home again — with English that opens doors." },
];

export function Journey() {
  return (
    <section id="journey" className="section">
      <div className="shell">
        <SectionHead
          eyebrow="Student journey"
          title="Eight steps from curious to graduated."
          intro="No confusion, no hidden stages. This is exactly what happens between today and your first day of class."
          align="center"
        />

        <ol className="relative mt-16 grid gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          <li aria-hidden className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-linear-to-r from-transparent via-border to-transparent lg:block" />
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 0.07} className="relative px-2">
              <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-card font-display text-sm font-extrabold text-primary shadow-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">{s.step}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
