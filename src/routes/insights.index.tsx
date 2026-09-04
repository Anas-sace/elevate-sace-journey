import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, PageShell } from "@/components/sace/PageShell";
import { Reveal } from "@/components/sace/ui";
import { INSIGHTS } from "@/data/insights";

const TITLE = "Insights | English Learning Tips & Adelaide Study Guides | SACE";
const DESCRIPTION =
  "Articles, guides and updates from SACE Adelaide to help you improve your English, choose the right course and settle into life in Australia.";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const featured = INSIGHTS[0]!;
  const rest = INSIGHTS.slice(1);

  return (
    <PageShell>
      <PageHero
        eyebrow="Insights"
        title="English learning insights and study tips."
        intro="Explore articles, guides and updates to help you improve your English and stay connected with our college community."
      />

      <section className="section">
        <div className="shell">
          <Reveal>
            <Link
              to="/insights/$slug"
              params={{ slug: featured.slug }}
              className="card-premium hover-lift group grid overflow-hidden md:grid-cols-2"
            >
              <img
                src={featured.image}
                alt={featured.title}
                loading="eager"
                className="h-64 w-full object-cover md:h-full"
              />
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  {featured.category}
                </span>
                <h2 className="display-3 mt-3 text-foreground">{featured.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read more
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          </Reveal>

          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.05}>
                <Link
                  to="/insights/$slug"
                  params={{ slug: p.slug }}
                  className="card-premium hover-lift group flex h-full flex-col overflow-hidden"
                >
                  <img src={p.image} alt={p.title} loading="lazy" className="h-44 w-full object-cover" />
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      {p.category}
                    </span>
                    <h2 className="mt-3 font-display text-lg leading-snug font-bold text-foreground">
                      {p.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Read more
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
