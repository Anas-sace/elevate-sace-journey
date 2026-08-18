import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { PageHero, PageShell } from "@/components/sace/PageShell";
import { ButtonLink, Reveal, SectionHead } from "@/components/sace/ui";

const TITLE = "Contact SACE Adelaide | Talk to Our Team";
const DESCRIPTION =
  "Contact the South Australian College of English: Woodards House, Level 1, 47 Waymouth Street, Adelaide SA 5000. Phone +61 8 8410 5222 or email registrar@sacecoll.sa.edu.au.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

const DETAILS = [
  {
    icon: MapPin,
    label: "Campus",
    value: "Woodards House, Level 1, 47 Waymouth Street, Adelaide SA 5000, Australia",
    href: "https://maps.google.com/?q=47+Waymouth+Street+Adelaide+SA+5000",
  },
  { icon: Phone, label: "Telephone", value: "+61 8 8410 5222", href: "tel:+61884105222" },
  { icon: Mail, label: "Email", value: "registrar@sacecoll.sa.edu.au", href: "mailto:registrar@sacecoll.sa.edu.au" },
  { icon: Printer, label: "Fax", value: "(08) 8410 5661" },
];

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Feel free to write to us anytime."
        intro="Our registrar team answers every enquiry personally, usually within one business day."
      />

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHead eyebrow="Get in touch" title="Where to find us." />
            <ul className="mt-8 space-y-4">
              {DETAILS.map((d) => (
                <li key={d.label} className="card-premium flex gap-4 p-6">
                  <d.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{d.label}</p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 block text-sm font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-foreground">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/#apply">Start your application</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-4xl border border-border shadow-lift">
              <iframe
                title="Map showing the SACE campus at 47 Waymouth Street, Adelaide"
                src="https://www.google.com/maps?q=47+Waymouth+Street+Adelaide+SA+5000&output=embed"
                loading="lazy"
                className="h-[26rem] w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
