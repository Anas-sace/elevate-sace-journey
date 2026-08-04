import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, AlertCircle } from "lucide-react";
import logo from "@/assets/sace-logo.svg";
import { SecretAdminTrigger } from "@/components/cms/AdminLoginDialog";

const QUICK = [
  { label: "Our college", href: "#why" },
  { label: "Our campus", href: "#campus" },
  { label: "Accreditation", href: "#footer" },
  { label: "Privacy policy", href: "#footer" },
  { label: "Terms of use", href: "#footer" },
];

const EXPLORE = [
  { label: "Club SACE", href: "#life" },
  { label: "FAQ", href: "#faq" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Pathways", href: "#pathways" },
  { label: "News & events", href: "#news" },
];

const SOCIALS = [
  { label: "Facebook", Icon: Facebook },
  { label: "Instagram", Icon: Instagram },
  { label: "LinkedIn", Icon: Linkedin },
  { label: "YouTube", Icon: Youtube },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer id="footer" className="bg-primary-deep text-primary-foreground">
      <div className="shell py-18 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <SecretAdminTrigger>
              <img src={logo} alt="South Australian College of English" width={200} height={46} className="ink-invert h-9 w-auto" />
            </SecretAdminTrigger>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Teaching English in the heart of Adelaide since 1987. NEAS accredited, CRICOS
              registered, student-obsessed.
            </p>
            <address className="mt-7 space-y-3 text-sm not-italic text-primary-foreground/80">
              <p className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                Woodards House, Level 1, 47 Waymouth Street, Adelaide SA 5000, Australia
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href="tel:+61884105222" className="hover:text-white hover:underline">
                  +61 8 8410 5222
                </a>
              </p>
              <p className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href="mailto:registrar@sacecoll.sa.edu.au" className="hover:text-white hover:underline">
                  registrar@sacecoll.sa.edu.au
                </a>
              </p>
            </address>
          </div>

          <nav aria-labelledby="footer-quick">
            <h2 id="footer-quick" className="font-display text-sm font-bold uppercase tracking-[0.14em]">
              Quick links
            </h2>
            <ul className="mt-5 space-y-1">
              {QUICK.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="flex min-h-10 items-center text-sm text-primary-foreground/75 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="font-display text-sm font-bold uppercase tracking-[0.14em]">
              Explore
            </h2>
            <ul className="mt-5 space-y-1">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="flex min-h-10 items-center text-sm text-primary-foreground/75 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em]">Stay in touch</h2>
            <p className="mt-5 text-sm text-primary-foreground/70">
              Intake dates, scholarships and student stories — once a month.
            </p>
            <form onSubmit={onSubmit} className="mt-5">
              <label htmlFor="newsletter" className="sr-only">
                Email address for the SACE newsletter
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="newsletter"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                  className="min-h-12 w-full rounded-full border border-white/25 bg-white/10 px-5 text-sm text-white placeholder:text-white/55 focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="min-h-12 shrink-0 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Subscribe
                </button>
              </div>
              <p role="status" className="mt-2 min-h-5 text-xs text-accent">
                {subscribed ? "Thanks — you're on the list." : ""}
              </p>
            </form>

            <ul className="mt-4 flex gap-2">
              {SOCIALS.map(({ label, Icon }) => (
                <li key={label}>
                  <a
                    href="#footer"
                    aria-label={`SACE on ${label}`}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-primary-foreground/80 transition-colors hover:bg-white/12 hover:text-white"
                  >
                    <Icon aria-hidden className="size-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3 rounded-3xl border border-white/15 bg-white/5 p-5 text-sm">
          <AlertCircle aria-hidden className="size-5 shrink-0 text-accent" />
          <span className="text-primary-foreground/80">
            Student emergency (24/7):{" "}
            <a href="tel:+61400000000" className="font-semibold text-white hover:underline">
              +61 400 000 000
            </a>{" "}
            · Police, Fire, Ambulance:{" "}
            <a href="tel:000" className="font-semibold text-white hover:underline">
              000
            </a>
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-8 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} South Australian College of English. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>NEAS Quality Assured</li>
            <li>English Australia member</li>
            <li>CRICOS Provider 00075B</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
