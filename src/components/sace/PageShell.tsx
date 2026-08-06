import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Eyebrow, Reveal } from "./ui";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-primary pb-20 pt-36 text-primary-foreground md:pb-28 md:pt-44">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-20 size-full object-cover opacity-25"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/95 via-primary/85 to-primary-deep/95" />
        </>
      ) : null}
      <div className="shell">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display-1 mt-6 max-w-4xl text-primary-foreground">{title}</h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">{intro}</p>
          ) : null}
          <nav aria-label="Breadcrumb" className="mt-8 text-sm text-primary-foreground/70">
            <Link to="/" className="underline-offset-4 hover:underline">
              Home
            </Link>
            <span aria-hidden className="px-2">
              /
            </span>
            <span>{breadcrumb ?? title}</span>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="space-y-5 text-base leading-relaxed text-muted-foreground">{children}</div>;
}
