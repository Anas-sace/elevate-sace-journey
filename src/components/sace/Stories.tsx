import { useState } from "react";
import { Quote, Play, Star, X } from "lucide-react";
import { Reveal, SectionHead } from "./ui";
import { useCms } from "@/components/cms/CmsProvider";
import type { Review } from "@/lib/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={`size-4 ${i < rating ? "fill-accent text-accent" : "text-border"}`}
        />
      ))}
    </span>
  );
}

export function Stories() {
  const { content } = useCms();
  const reviews = content.reviews;
  const [playing, setPlaying] = useState<Review | null>(null);

  return (
    <section id="stories" className="section">
      <div className="shell">
        <SectionHead
          eyebrow="Student reviews"
          title="Their first week looked a lot like yours will."
          align="center"
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal as="li" key={r.id} delay={(i % 3) * 0.08}>
              <figure className="card-premium hover-lift flex h-full flex-col p-8">
                <div className="flex items-center justify-between gap-3">
                  <Quote aria-hidden className="size-8 text-accent" />
                  <Stars rating={r.rating} />
                </div>
                <blockquote className="mt-5 flex-1 font-display text-lg leading-snug font-semibold text-foreground">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  {r.avatar ? (
                    <img
                      src={r.avatar}
                      alt={`Portrait of ${r.name}`}
                      width={640}
                      height={640}
                      loading="lazy"
                      className="size-14 rounded-full object-cover"
                    />
                  ) : null}
                  <span>
                    <span className="block text-sm font-bold text-foreground">{r.name}</span>
                    <span className="block text-xs text-muted-foreground">{r.country}</span>
                    <span className="mt-1 block text-xs text-primary">{r.now}</span>
                  </span>
                </figcaption>
                {r.video ? (
                  <button
                    type="button"
                    onClick={() => setPlaying(r)}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Play aria-hidden className="size-4" />
                    Watch {r.name.split(" ")[0]}’s story
                  </button>
                ) : null}
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>

      {playing?.video ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Video review by ${playing.name}`}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
          onClick={() => setPlaying(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-card shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <p className="text-sm font-semibold">
                {playing.name} · {playing.country}
              </p>
              <button type="button" onClick={() => setPlaying(null)} aria-label="Close video">
                <X className="size-5" />
              </button>
            </div>
            <video
              src={playing.video}
              {...(playing.poster ? { poster: playing.poster } : {})}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
