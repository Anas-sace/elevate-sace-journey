import { Check, ArrowUpRight } from "lucide-react";
import homestay from "@/assets/stay-homestay.jpg";
import residence from "@/assets/stay-residence.jpg";
import shared from "@/assets/stay-shared.jpg";
import { Reveal, SectionHead } from "./ui";

const OPTIONS = [
  {
    name: "Homestay",
    price: "from A$340",
    unit: "per week",
    src: homestay,
    alt: "An international student sharing dinner with an Australian host family",
    features: ["Private furnished room", "Meals included", "English every evening", "Airport pickup arranged"],
    best: "Best for first arrivals",
  },
  {
    name: "Student residence",
    price: "from A$390",
    unit: "per week",
    src: residence,
    alt: "A bright modern student residence studio apartment",
    features: ["Studio or shared apartment", "Bills and Wi-Fi included", "On-site support staff", "City-centre location"],
    best: "Most independent",
    featured: true,
  },
  {
    name: "Shared housing",
    price: "from A$230",
    unit: "per week",
    src: shared,
    alt: "Three flatmates cooking together in a shared apartment kitchen",
    features: ["Share with other students", "Lowest weekly cost", "Flexible lease lengths", "Vetted listings only"],
    best: "Best value",
  },
];

export function Accommodation() {
  return (
    <section id="accommodation" className="section bg-surface">
      <div className="shell">
        <SectionHead
          eyebrow="Accommodation"
          title="Somewhere safe to live, sorted before you land."
          intro="Our accommodation team places every student personally — and checks in again after your first fortnight."
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {OPTIONS.map((o, i) => (
            <Reveal as="li" key={o.name} delay={i * 0.08}>
              <article
                className={`card-premium hover-lift flex h-full flex-col overflow-hidden ${
                  o.featured ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={o.src}
                    alt={o.alt}
                    width={1000}
                    height={800}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-primary backdrop-blur-md">
                    {o.best}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <h3 className="display-3 text-foreground">{o.name}</h3>
                  <p className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-2xl font-extrabold text-primary">{o.price}</span>
                    <span className="text-sm text-muted-foreground">{o.unit}</span>
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {o.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#apply"
                    className={`mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                      o.featured
                        ? "bg-primary text-primary-foreground hover:bg-primary-deep"
                        : "border border-input text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    Request {o.name.toLowerCase()}
                    <ArrowUpRight aria-hidden className="size-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
