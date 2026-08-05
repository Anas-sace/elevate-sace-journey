import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Globe } from "lucide-react";
import graduation from "@/assets/life-graduation.jpg";
import logo from "@/assets/sace-logo.svg";
import { COURSE_OPTIONS, NATIONALITIES } from "@/lib/courses";
import { Reveal } from "./ui";

const label = "mb-2 block text-sm font-semibold text-foreground";
const field =
  "min-h-12 w-full rounded-xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none";

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
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,var(--primary-deep)_10%,color-mix(in_oklab,var(--primary)_75%,transparent)_100%)]"
      />

      <div className="shell flex justify-center">
        <Reveal className="w-full max-w-3xl">
          <div className="rounded-4xl bg-card p-6 shadow-lift sm:p-10">
            {sent ? (
              <div role="status" className="py-16 text-center">
                <CheckCircle2 aria-hidden className="mx-auto size-12 text-primary" />
                <h2 className="display-3 mt-5 text-foreground">Account created — welcome to SACE.</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  An 8-digit login code is on its way to your email. Our admissions team will be in
                  touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="flex items-center justify-between gap-4">
                  <a
                    href="#top"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft aria-hidden className="size-4" />
                    Back to website
                  </a>
                  <span className="inline-flex items-center gap-2 rounded-full border border-input px-3.5 py-2 text-sm font-medium text-foreground">
                    <Globe aria-hidden className="size-4" />
                    <span className="text-xs uppercase text-muted-foreground">AU</span> English
                  </span>
                </div>

                <img src={logo} alt="SACE — South Australian College of English" className="mx-auto mt-8 h-12 w-auto" />

                <h2 className="display-3 mt-6 text-center text-primary">Create your account</h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Start your SACE journey — takes 60 seconds
                </p>

                <div className="mt-8 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first" className={label}>First name *</label>
                    <input id="first" name="first" required autoComplete="given-name" placeholder="Maria" className={field} />
                  </div>
                  <div>
                    <label htmlFor="last" className={label}>Last name *</label>
                    <input id="last" name="last" required autoComplete="family-name" placeholder="Santos" className={field} />
                  </div>

                  <div>
                    <label htmlFor="dob" className={label}>Date of birth *</label>
                    <input id="dob" name="dob" type="date" required className={field} />
                  </div>
                  <div>
                    <label htmlFor="nationality" className={label}>Nationality *</label>
                    <select id="nationality" name="nationality" required defaultValue="" className={field}>
                      <option value="" disabled>Select...</option>
                      {NATIONALITIES.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="start" className={label}>Preferred start date</label>
                    <input id="start" name="start" type="date" aria-describedby="start-help" className={field} />
                    <p id="start-help" className="mt-2 text-xs text-muted-foreground">
                      We&apos;ll show you upcoming courses starting on or after this date.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="course" className={label}>Select course *</label>
                    <select id="course" name="course" required defaultValue="" className={field}>
                      <option value="" disabled>Select course</option>
                      {COURSE_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="email" className={label}>Email *</label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Phone *</label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+61 4XX XXX XXX" className={field} />
                  </div>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  By registering you agree to our{" "}
                  <a href="#faq" className="font-semibold text-primary underline-offset-2 hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#faq" className="font-semibold text-primary underline-offset-2 hover:underline">Privacy Policy</a>.
                  After registering, an 8-digit login code will be sent to your email.
                </p>

                <button
                  type="submit"
                  className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-bold text-primary-foreground transition-all duration-300 hover:bg-primary-deep hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  Create Account
                </button>

                <p className="mt-5 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a href="#apply" className="font-semibold text-primary underline-offset-2 hover:underline">Sign in</a>
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
