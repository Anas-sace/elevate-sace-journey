import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell } from "@/components/sace/PageShell";
import { Reveal } from "@/components/sace/ui";
import food from "@/assets/life-food.jpg";
import beach from "@/assets/life-beach.jpg";
import adelaide from "@/assets/adelaide.jpg";

const TITLE = "Insights | Study English in Adelaide | SACE";
const DESCRIPTION =
  "Articles, guides and updates from SACE Adelaide to help you improve your English, choose the right course and settle into life in Australia.";

export const Route = createFileRoute("/insights")({
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

const POSTS = [
  {
    title: "7 Things International Students Love About Living in Adelaide",
    excerpt:
      "Ask an international student who came to study English in Adelaide what they miss most after they go home. It's rarely the classroom, and rarely even the English course itself.",
    image: adelaide,
    category: "Student life",
  },
  {
    title: "General English vs IELTS Preparation: Which Course Is Right for You?",
    excerpt:
      "Choosing the wrong course is an expensive mistake. A student with Upper-Intermediate English who needs a 6.5 for university but enrols in General English will waste weeks.",
    image: food,
    category: "Courses",
  },
  {
    title: "Study English in Adelaide vs Sydney vs Melbourne: Which City Is Right for You?",
    excerpt:
      "You have decided to study English in Australia. Now comes the harder question, which city gives you the best mix of cost, class size and everyday English practice?",
    image: beach,
    category: "Guides",
  },
];

function InsightsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Insights"
        title="Guides, stories and updates from the college."
        intro="Explore articles, guides and updates to help you improve your English and stay connected with our college community."
      />

      <section className="section">
        <div className="shell">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06}>
                <article className="card-premium hover-lift flex h-full flex-col overflow-hidden">
                  <img src={p.image} alt="" aria-hidden loading="lazy" className="h-44 w-full object-cover" />
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{p.category}</span>
                    <h2 className="display-3 mt-3 text-foreground">{p.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
