import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/sace/PageShell";
import { Eyebrow, Reveal } from "@/components/sace/ui";
import { INSIGHTS, getPost, type Block } from "@/data/insights";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable | SACE" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    const title = `${post.title} | SACE Adelaide`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: InsightPost,
  notFoundComponent: PostNotFound,
});

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

const clean = (s: string) => s.replace(/^\s*#{1,6}\s*/, "").trim();

const isTableRow = (b: Block) =>
  b.t === "p" && typeof b.v === "string" && /^\s*\|.*\|\s*$/.test(b.v);
const isTableDivider = (v: string) => /^\s*\|[\s|:-]+\|\s*$/.test(v);
const cells = (v: string) =>
  v.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

type Node = { kind: "block"; b: Block } | { kind: "table"; rows: string[][] };

function toNodes(blocks: Block[]): Node[] {
  const out: Node[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]!;
    if (isTableRow(b)) {
      const rows: string[][] = [];
      while (i < blocks.length && isTableRow(blocks[i]!)) {
        const v = (blocks[i] as { v: string }).v;
        if (!isTableDivider(v)) rows.push(cells(v));
        i++;
      }
      i--;
      if (rows.length) out.push({ kind: "table", rows });
      continue;
    }
    out.push({ kind: "block", b });
  }
  return out;
}

function TableView({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full border-collapse text-left text-sm">
        {head ? (
          <thead className="bg-surface">
            <tr>
              {head.map((c, i) => (
                <th key={i} className="border-b border-border px-4 py-3 font-display font-bold text-foreground">
                  <Inline text={clean(c)} />
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {body.map((r, ri) => (
            <tr key={ri} className="even:bg-surface/60">
              {r.map((c, ci) => (
                <td key={ci} className="border-b border-border px-4 py-3 align-top text-muted-foreground">
                  <Inline text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  if (b.t === "h2") return <h2 className="display-3 mt-12 text-foreground">{clean(b.v)}</h2>;
  if (b.t === "h3")
    return <h3 className="mt-8 font-display text-xl font-bold text-foreground">{clean(b.v)}</h3>;
  if (b.t === "img")
    return (
      <img src={b.v} alt="" aria-hidden loading="lazy" className="mt-8 w-full rounded-3xl object-cover" />
    );
  if (b.t === "ul")
    return (
      <ul className="mt-5 space-y-2.5 pl-5">
        {b.items.map((it, i) => (
          <li key={i} className="list-disc text-base leading-relaxed text-muted-foreground">
            <Inline text={clean(it)} />
          </li>
        ))}
      </ul>
    );
  if (/^\s*#{1,6}\s/.test(b.v))
    return <h3 className="mt-8 font-display text-xl font-bold text-foreground">{clean(b.v).replace(/\*\*/g, "")}</h3>;
  return (
    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
      <Inline text={b.v} />
    </p>
  );
}

function InsightPost() {
  const { post } = Route.useLoaderData();
  const related = INSIGHTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const faqJsonLd = post.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-primary pb-20 pt-36 text-primary-foreground md:pb-24 md:pt-44">
        <img
          src={post.image}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-20 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/95 via-primary/85 to-primary-deep/95" />
        <div className="shell">
          <Reveal>
            <Eyebrow>{post.category}</Eyebrow>
            <h1 className="display-1 mt-6 max-w-4xl text-primary-foreground">{post.title}</h1>
            <nav aria-label="Breadcrumb" className="mt-8 text-sm text-primary-foreground/70">
              <Link to="/" className="underline-offset-4 hover:underline">
                Home
              </Link>
              <span aria-hidden className="px-2">
                /
              </span>
              <Link to="/insights" className="underline-offset-4 hover:underline">
                Insights
              </Link>
            </nav>
          </Reveal>
        </div>
      </section>

      <article className="section">
        <div className="shell max-w-3xl">
          <img src={post.image} alt={post.title} className="w-full rounded-4xl object-cover" />
          {post.blocks.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}

          {post.faqs.length ? (
            <div className="mt-16">
              <h2 className="display-3 text-foreground">Frequently asked questions</h2>
              <dl className="mt-6 space-y-4">
                {post.faqs.map((f) => (
                  <div key={f.q} className="card-premium p-6">
                    <dt className="font-display text-base font-bold text-foreground">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <div className="mt-14 flex flex-col items-center gap-4 rounded-4xl border border-border bg-surface p-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">Ready to start in Adelaide?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Courses start every Monday, from one week onwards.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore courses
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </article>

      <section className="section pt-0">
        <div className="shell">
          <h2 className="display-3 text-foreground">More insights</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/insights/$slug"
                  params={{ slug: p.slug }}
                  className="card-premium hover-lift flex h-full flex-col overflow-hidden"
                >
                  <img src={p.image} alt={p.title} loading="lazy" className="h-40 w-full object-cover" />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      {p.category}
                    </span>
                    <h3 className="mt-2 font-display text-base leading-snug font-bold text-foreground">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
    </PageShell>
  );
}

function PostNotFound() {
  return (
    <PageShell>
      <div className="section shell text-center">
        <h1 className="display-2 text-foreground">Article not found</h1>
        <Link to="/insights" className="mt-6 inline-block font-semibold text-primary">
          Back to Insights
        </Link>
      </div>
    </PageShell>
  );
}
