import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Reveal, SectionHead } from "./ui";

const CATEGORIES = ["All", "Applying", "Visa", "Courses", "Living"] as const;
type Category = (typeof CATEGORIES)[number];

const FAQS: { q: string; a: string; cat: Exclude<Category, "All"> }[] = [
  { cat: "Applying", q: "Do I need an agent to apply?", a: "No. You can apply directly through our online form in about ten minutes, and it costs nothing to apply. If you already work with an agent, that's fine too." },
  { cat: "Applying", q: "How quickly will I get an offer?", a: "Most letters of offer are issued within two business days of a complete application." },
  { cat: "Visa", q: "Can SACE help with my student visa?", a: "Yes. We issue your Confirmation of Enrolment and our student services team walks you through each step of the Department of Home Affairs process." },
  { cat: "Visa", q: "Can I work while I study?", a: "Student visa holders can generally work up to 48 hours per fortnight during term. We also run workplace English and interview practice sessions." },
  { cat: "Courses", q: "What English level do I need to start?", a: "Any. General English starts from true beginner. You take a free placement test before your first class so you begin in the right level." },
  { cat: "Courses", q: "When can I start?", a: "General English has a new intake every Monday. Exam preparation and pathway programmes run to fixed intake dates each term." },
  { cat: "Living", q: "Where will I live?", a: "Choose homestay, a student residence, or vetted shared housing. Our accommodation team places you before you fly and checks in after two weeks." },
  { cat: "Living", q: "Is Adelaide expensive?", a: "It is the most affordable mainland capital in Australia. Most students budget A$400–550 per week including accommodation." },
];

export function Faq() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter(
      (f) =>
        (cat === "All" || f.cat === cat) &&
        (q === "" || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)),
    );
  }, [query, cat]);

  return (
    <section id="faq" className="section bg-surface">
      <div className="shell max-w-4xl!">
        <SectionHead eyebrow="FAQ" title="Everything students ask us first." align="center" />

        <Reveal delay={0.1} className="mt-10">
          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search visas, start dates, costs…"
              className="min-h-14 w-full rounded-full border border-input bg-card pl-13 pr-5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div role="group" aria-label="Filter questions by category" className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 space-y-3">
          {results.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <details name="sace-faq" className="card-premium group px-6 py-1 open:shadow-lift">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-base font-bold text-foreground marker:content-none">
                  {f.q}
                  <Plus
                    aria-hidden
                    className="size-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="pb-5 pr-10 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            </Reveal>
          ))}
          {results.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No questions match that search. Email{" "}
              <a className="text-primary underline" href="mailto:registrar@sacecoll.sa.edu.au">
                registrar@sacecoll.sa.edu.au
              </a>{" "}
              and we will answer personally.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
