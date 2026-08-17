import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Check, X, ArrowRight, RotateCcw } from "lucide-react";
import { PageShell, PageHero } from "@/components/sace/PageShell";
import { Reveal } from "@/components/sace/ui";

const TITLE = "Test Your English Level | SACE Adelaide";
const DESCRIPTION =
  "Take the free 10-question SACE placement quiz to estimate your CEFR English level, see the correct answers with clear explanations, and find the right course in Adelaide.";

type Question = {
  prompt: string;
  options: string[];
  answer: number;
  why: string;
};

const QUESTIONS: Question[] = [
  {
    prompt: "Hi! ____ name is Marco and I'm from Italy.",
    options: ["My", "Me", "Mine", "I"],
    answer: 0,
    why: "“My” is the possessive adjective used before a noun. “Mine” is a possessive pronoun (it stands alone) and “me”/“I” are object and subject pronouns.",
  },
  {
    prompt: "She ____ to the beach every Saturday morning.",
    options: ["go", "goes", "going", "is go"],
    answer: 1,
    why: "In the present simple, third-person singular subjects (she/he/it) take an -s ending, so “she goes”.",
  },
  {
    prompt: "There isn't ____ milk left in the fridge.",
    options: ["many", "a few", "much", "several"],
    answer: 2,
    why: "“Milk” is an uncountable noun, so we use “much” in negatives and questions. “Many”, “a few” and “several” are used with countable nouns.",
  },
  {
    prompt: "I ____ my keys, so I couldn't open the door.",
    options: ["have lost", "lose", "had lost", "was losing"],
    answer: 2,
    why: "The past perfect “had lost” shows the action happened before another past action (“couldn't open”).",
  },
  {
    prompt: "If it ____ tomorrow, we'll move the barbecue indoors.",
    options: ["will rain", "rains", "rained", "would rain"],
    answer: 1,
    why: "In a first conditional, the if-clause uses the present simple and the main clause uses “will” — “If it rains, we'll…”.",
  },
  {
    prompt: "This building ____ in 1887 by a local architect.",
    options: ["was designed", "designed", "has designed", "is designing"],
    answer: 0,
    why: "A finished past action where the doer follows “by” needs the past simple passive: was/were + past participle.",
  },
  {
    prompt: "I'm really looking forward ____ you next month.",
    options: ["to meet", "meeting", "to meeting", "meet"],
    answer: 2,
    why: "“Look forward to” is followed by the -ing form, because “to” here is a preposition, not part of the infinitive.",
  },
  {
    prompt: "Choose the best word: The evidence was ____, so the case was dismissed.",
    options: ["inconclusive", "unbelievable", "incorrect", "invisible"],
    answer: 0,
    why: "“Inconclusive” means it did not prove anything either way — the precise reason a case would be dismissed.",
  },
  {
    prompt: "Hardly ____ the meeting started when the fire alarm went off.",
    options: ["the meeting had", "had the meeting", "the meeting has", "has the meeting"],
    answer: 1,
    why: "After a negative adverbial such as “hardly” at the start of a sentence, the subject and auxiliary invert: “Hardly had the meeting started…”.",
  },
  {
    prompt: "Her argument was compelling, ____ a few of the statistics were out of date.",
    options: ["despite", "although", "however", "in spite"],
    answer: 1,
    why: "“Although” is a conjunction joining two clauses. “Despite”/“in spite of” take a noun or -ing form, and “however” needs a full stop or semicolon before it.",
  },
];

function levelFor(score: number) {
  if (score <= 3) return { level: "A1–A2 · Elementary", course: "General English Course", blurb: "You have the basics. A full-time General English course will build your grammar and everyday speaking fast." };
  if (score <= 5) return { level: "B1 · Pre-Intermediate", course: "General English Course", blurb: "You can handle familiar topics. General English with an English Plus elective will lift your accuracy and confidence." };
  if (score <= 7) return { level: "B1+–B2 · Intermediate", course: "IELTS Preparation", blurb: "Strong working English. Exam preparation will sharpen your skills for university or migration requirements." };
  if (score <= 9) return { level: "B2+–C1 · Upper-Intermediate", course: "English for Tertiary Studies", blurb: "You're close to academic level. Tertiary Studies will prepare you for Australian university assessment." };
  return { level: "C1–C2 · Advanced", course: "Cambridge CELTA Online", blurb: "Excellent English. You may be ready for teacher training or a direct university pathway — talk to our team." };
}

export const Route = createFileRoute("/test-your-english")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/test-your-english" }],
  }),
  component: TestPage,
});

function TestPage() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[index]!;
  const score = answers.reduce((n, a, i) => (a === QUESTIONS[i]!.answer ? n + 1 : n), 0);

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setAnswers((prev) => [...prev, i]);
  };

  const next = () => {
    if (index + 1 >= QUESTIONS.length) {
      setDone(true);
      return;
    }
    setIndex(index + 1);
    setPicked(null);
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setAnswers([]);
    setDone(false);
  };

  const result = levelFor(score);

  return (
    <PageShell>
      <PageHero
        eyebrow="Free placement quiz"
        title="Test your English level"
        intro="Ten questions, about five minutes. You'll see the correct answer and why it's correct after every question, then get an estimated CEFR level and a recommended SACE course."
        breadcrumb="Test your English"
      />

      <section className="section bg-surface">
        <div className="shell max-w-3xl">
          {!done ? (
            <Reveal>
              <div className="rounded-4xl border border-border bg-card p-6 shadow-soft md:p-10">
                <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
                  <span>
                    Question {index + 1} of {QUESTIONS.length}
                  </span>
                  <span>{score} correct</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={false}
                    animate={{ width: `${((index + (picked !== null ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                <h2 className="mt-8 font-display text-2xl font-bold text-foreground md:text-3xl">{q.prompt}</h2>

                <ul className="mt-7 space-y-3">
                  {q.options.map((opt, i) => {
                    const isAnswer = i === q.answer;
                    const isPicked = picked === i;
                    const revealed = picked !== null;
                    const state = !revealed
                      ? "border-border bg-card hover:border-primary hover:bg-primary-soft"
                      : isAnswer
                        ? "border-emerald-500 bg-emerald-500/10"
                        : isPicked
                          ? "border-destructive bg-destructive/10"
                          : "border-border bg-card opacity-60";
                    return (
                      <li key={opt}>
                        <button
                          type="button"
                          onClick={() => choose(i)}
                          disabled={revealed}
                          aria-label={opt}
                          className={`flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl border px-5 py-3 text-left text-base font-medium text-foreground transition-colors ${state}`}
                        >
                          <span>{opt}</span>
                          {revealed && isAnswer ? (
                            <Check aria-hidden className="size-5 shrink-0 text-emerald-600" />
                          ) : revealed && isPicked ? (
                            <X aria-hidden className="size-5 shrink-0 text-destructive" />
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {picked !== null ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-7 rounded-3xl border border-border bg-surface p-5"
                    role="status"
                  >
                    <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-primary">
                      {picked === q.answer ? "Correct" : `Correct answer: ${q.options[q.answer]}`}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{q.why}</p>
                    <button
                      type="button"
                      onClick={next}
                      className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      {index + 1 === QUESTIONS.length ? "See my result" : "Next question"}
                      <ArrowRight aria-hidden className="size-4" />
                    </button>
                  </motion.div>
                ) : null}
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="rounded-4xl border border-border bg-card p-8 text-center shadow-soft md:p-12">
                <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-primary">Your result</p>
                <p className="mt-4 font-display text-6xl font-extrabold text-foreground">
                  {score}
                  <span className="text-3xl text-muted-foreground">/{QUESTIONS.length}</span>
                </p>
                <p className="mt-4 font-display text-2xl font-bold text-foreground">{result.level}</p>
                <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{result.blurb}</p>
                <p className="mt-6 rounded-2xl bg-primary-soft px-5 py-4 text-sm font-semibold text-primary">
                  Recommended course: {result.course}
                </p>

                <ul className="mt-9 space-y-4 text-left">
                  {QUESTIONS.map((question, i) => {
                    const given = answers[i];
                    const ok = given === question.answer;
                    return (
                      <li key={question.prompt} className="rounded-3xl border border-border bg-surface p-5">
                        <p className="flex items-start gap-3 font-medium text-foreground">
                          {ok ? (
                            <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                          ) : (
                            <X aria-hidden className="mt-0.5 size-5 shrink-0 text-destructive" />
                          )}
                          {question.prompt}
                        </p>
                        {!ok ? (
                          <p className="mt-2 pl-8 text-sm text-muted-foreground">
                            You chose “{given !== undefined ? question.options[given] : "—"}”. The correct answer is “
                            {question.options[question.answer]}”. {question.why}
                          </p>
                        ) : (
                          <p className="mt-2 pl-8 text-sm text-muted-foreground">{question.why}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    <RotateCcw aria-hidden className="size-4" />
                    Take the test again
                  </button>
                  <Link
                    to="/courses"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Find my course
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </PageShell>
  );
}
