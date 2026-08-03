import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import graduation from "@/assets/life-graduation.jpg";
import { Reveal } from "./ui";

const COURSES = [
  "General English",
  "IELTS Preparation",
  "English for Tertiary Studies",
  "High School Programme",
  "Cambridge CELTA",
  "Not sure yet",
];

const field =
  "min-h-13 w-full rounded-2xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

export function Apply() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="apply" className="section relative isolate overflow-hidden bg-primary-deep">
      <img
        src={graduation}
        alt=""
        aria-hidden
        width={1000}
        height={800}
        loading="lazy"
        className="absolute inset-0 -z-20 size-full object-cover opacity-25"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,var(--primary-deep)_10%,color-mix(in_oklab,var(--primary)_75%,transparent)_100%)]" />

      <div className="shell grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            Apply in 10 minutes
          </span>
          <h2 className="display-2 mt-5">Your Australian chapter starts with one form.</h2>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/80">
            No application fee. No agent required. A real person from our admissions team will reply
            to you personally — usually the same day.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-primary-foreground/85">
            {["Free placement assessment", "Offer letter within 2 business days", "Visa and accommodation guidance included"].map(
              (b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle2 aria-hidden className="size-5 shrink-0 text-accent" />
                  {b}
                </li>
              ),
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-4xl bg-card p-7 shadow-lift md:p-9">
            {sent ? (
              <div role="status" className="py-12 text-center">
                <CheckCircle2 aria-hidden className="mx-auto size-12 text-primary" />
                <h3 className="display-3 mt-5 text-foreground">Thank you — we have your enquiry.</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Our admissions team will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate={false}>
                <h3 className="display-3 text-foreground">Start your application</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fields marked with an asterisk are required.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first" className="mb-2 block text-sm font-medium text-foreground">
                      First name *
                    </label>
                    <input id="first" name="first" required autoComplete="given-name" className={field} />
                  </div>
                  <div>
                    <label htmlFor="last" className="mb-2 block text-sm font-medium text-foreground">
                      Last name *
                    </label>
                    <input id="last" name="last" required autoComplete="family-name" className={field} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      Email *
                    </label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={field} />
                  </div>
                  <div>
                    <label htmlFor="nationality" className="mb-2 block text-sm font-medium text-foreground">
                      Nationality
                    </label>
                    <input id="nationality" name="nationality" autoComplete="country-name" className={field} />
                  </div>
                  <div>
                    <label htmlFor="course" className="mb-2 block text-sm font-medium text-foreground">
                      Course of interest *
                    </label>
                    <select id="course" name="course" required defaultValue="" className={field}>
                      <option value="" disabled>
                        Choose a course
                      </option>
                      {COURSES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      Anything you would like us to know?
                    </label>
                    <textarea id="message" name="message" rows={3} className={`${field} py-3.5`} />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-deep hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  <Send aria-hidden className="size-4" />
                  Submit application
                </button>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  By submitting you agree to our privacy policy. We never share your details with
                  third parties.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
