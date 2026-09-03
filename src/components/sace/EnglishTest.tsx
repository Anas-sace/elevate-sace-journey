import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, X, ArrowRight, RotateCcw } from "lucide-react";
import { Reveal } from "./ui";

type Question = {
  prompt: string;
  options: string[];
  answer: number;
  why: string;
};

/** Deliberately tricky items, most takers will slip on several. */
const QUESTIONS: Question[] = [
  {
    prompt: "Scarcely ____ the door when the phone rang.",
    options: ["I had closed", "had I closed", "I closed", "did I close"],
    answer: 1,
    why: "After a fronted negative adverbial such as “scarcely”, the subject and auxiliary invert: “Scarcely had I closed…”.",
  },
  {
    prompt: "I'd rather you ____ that to anyone just yet.",
    options: ["don't mention", "didn't mention", "not mentioning", "won't mention"],
    answer: 1,
    why: "“I'd rather you” + past subjunctive refers to present or future preference: “I'd rather you didn't mention it”.",
  },
  {
    prompt: "The committee ____ still divided over the proposal at last night's meeting.",
    options: ["were", "was being", "has been", "is"],
    answer: 0,
    why: "In Australian English, a collective noun takes a plural verb when the members act individually, the committee were divided among themselves.",
  },
  {
    prompt: "Had she taken the earlier train, she ____ the interview.",
    options: [
      "would make",
      "would have made",
      "will have made",
      "would be making",
    ],
    answer: 1,
    why: "This is an inverted third conditional about the past, so the result clause needs “would have + past participle”.",
  },
  {
    prompt: "He objected ____ overtime without notice.",
    options: ["to work", "to working", "work", "for working"],
    answer: 1,
    why: "“Object to” is a prepositional verb, so the following verb takes the -ing form: “objected to working”.",
  },
  {
    prompt: "No sooner had the rain stopped ____ the crowd returned to the oval.",
    options: ["when", "then", "than", "that"],
    answer: 2,
    why: "The fixed pairing is “no sooner … than”. “When” pairs with “hardly/scarcely”.",
  },
  {
    prompt: "The findings, ____ were published last week, contradict earlier research.",
    options: ["that", "which", "what", "who"],
    answer: 1,
    why: "A non-defining relative clause set off by commas requires “which”; “that” cannot introduce one.",
  },
  {
    prompt: "Choose the most precise word: The minister gave a ____ answer that satisfied nobody.",
    options: ["evasive", "invisible", "reluctant", "adverse"],
    answer: 0,
    why: "“Evasive” means deliberately avoiding a direct reply, exactly why the answer satisfied nobody.",
  },
  {
    prompt: "It's high time we ____ about the deadline.",
    options: [
      "do something",
      "did something",
      "have done something",
      "are doing something",
    ],
    answer: 1,
    why: "“It's (high) time” is followed by the past simple with present meaning: “It's high time we did something”.",
  },
  {
    prompt: "Not only ____ the report late, but he also misread the data.",
    options: ["he submitted", "did he submit", "he did submit", "submitted he"],
    answer: 1,
    why: "“Not only” at the start of a clause triggers auxiliary inversion: “Not only did he submit…”.",
  },
];

function resultFor(score: number) {
  if (score <= 3)
    return {
      level: "A2–B1 · Elementary to Pre-Intermediate",
      course: "General English Course",
      slug: "general-english-courses-adelaide",
      blurb:
        "You have solid foundations but complex structures are still slipping. A full-time General English course will build accuracy and everyday fluency quickly.",
    };
  if (score <= 5)
    return {
      level: "B1+ · Intermediate",
      course: "English Plus Courses",
      slug: "english-plus",
      blurb:
        "You handle everyday English well. General English with an English Plus elective will push your grammar and speaking to the next band.",
    };
  if (score <= 7)
    return {
      level: "B2 · Upper-Intermediate",
      course: "IELTS Preparation",
      slug: "ielts-preparation",
      blurb:
        "Strong working English. Focused exam preparation will sharpen the precision you need for university entry or migration.",
    };
  if (score <= 9)
    return {
      level: "B2+–C1 · Advanced",
      course: "English for Tertiary Studies",
      slug: "english-for-tertiary-studies",
      blurb:
        "You're close to academic level. Tertiary Studies prepares you for Australian university reading, writing and assessment.",
    };
  return {
    level: "C1–C2 · Proficient",
    course: "Cambridge CELTA Online",
    slug: "cambridge-celta-online",
    blurb:
      "Outstanding control of complex English. You may be ready for teacher training or a direct university pathway, talk to our team.",
  };
}

export function EnglishTest() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[index]!;
  const score = answers.reduce((n, a, i) => (a === QUESTIONS[i]!.answer ? n + 1 : n), 0);
  const result = resultFor(score);

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

  return (
    <section id="english-test" className="section scroll-mt-24">
      <div className="shell">
        <Reveal>
          <div className="rounded-4xl border-8 border-[#7a4a22] bg-[#0f3d2e] p-6 shadow-lift md:p-12">
            <div className="mx-auto max-w-3xl text-white">
              <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-[#ffd98a]">
                Free placement quiz
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
                Let&apos;s test your English
              </h2>

              {!done ? (
                <>
                  <div className="mt-8 flex items-center justify-between text-sm font-semibold text-white/70">
                    <span>
                      Question {index + 1} of {QUESTIONS.length}
                    </span>
                    <span>{score} correct</span>
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                    <motion.div
                      className="h-full rounded-full bg-[#ffd98a]"
                      initial={false}
                      animate={{
                        width: `${((index + (picked !== null ? 1 : 0)) / QUESTIONS.length) * 100}%`,
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  <h3 className="mt-8 font-display text-xl leading-snug font-bold md:text-2xl">
                    {q.prompt}
                  </h3>

                  <ul className="mt-6 space-y-3">
                    {q.options.map((opt, i) => {
                      const revealed = picked !== null;
                      const isAnswer = i === q.answer;
                      const isPicked = picked === i;
                      const state = !revealed
                        ? "border-white/25 bg-white/5 hover:border-[#ffd98a] hover:bg-white/10"
                        : isAnswer
                          ? "border-emerald-400 bg-emerald-400/20"
                          : isPicked
                            ? "border-red-400 bg-red-500/25"
                            : "border-white/15 bg-white/5 opacity-60";
                      return (
                        <li key={opt}>
                          <button
                            type="button"
                            onClick={() => choose(i)}
                            disabled={revealed}
                            className={`flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl border px-5 py-3 text-left text-base font-medium text-white transition-colors ${state}`}
                          >
                            <span>{opt}</span>
                            {revealed && isAnswer ? (
                              <Check aria-hidden className="size-5 shrink-0 text-emerald-300" />
                            ) : revealed && isPicked ? (
                              <X aria-hidden className="size-5 shrink-0 text-red-300" />
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
                      role="status"
                      className={`mt-6 rounded-3xl border p-5 ${
                        picked === q.answer
                          ? "border-emerald-400/60 bg-emerald-400/15"
                          : "border-red-400/60 bg-red-500/15"
                      }`}
                    >
                      <p className="font-display text-sm font-bold uppercase tracking-[0.14em]">
                        {picked === q.answer
                          ? "Yes, you are right!"
                          : `Not quite. Correct answer: ${q.options[q.answer]}`}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">{q.why}</p>
                      <button
                        type="button"
                        onClick={next}
                        className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#ffd98a] px-6 text-sm font-semibold text-[#0f3d2e] transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        {index + 1 === QUESTIONS.length ? "See my result" : "Next question"}
                        <ArrowRight aria-hidden className="size-4" />
                      </button>
                    </motion.div>
                  ) : null}
                </>
              ) : (
                <div className="mt-8 text-center">
                  <p className="font-display text-6xl font-extrabold">
                    {score}
                    <span className="text-3xl text-white/60">/{QUESTIONS.length}</span>
                  </p>
                  <p className="mt-4 font-display text-2xl font-bold">{result.level}</p>
                  <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/80">
                    {result.blurb}
                  </p>
                  <p className="mt-6 inline-block rounded-2xl bg-[#ffd98a] px-5 py-3 text-sm font-bold text-[#0f3d2e]">
                    Recommended course: {result.course}
                  </p>

                  <ul className="mt-9 space-y-3 text-left">
                    {QUESTIONS.map((question, i) => {
                      const given = answers[i];
                      const ok = given === question.answer;
                      return (
                        <li
                          key={question.prompt}
                          className={`rounded-3xl border p-5 ${
                            ok
                              ? "border-emerald-400/50 bg-emerald-400/10"
                              : "border-red-400/50 bg-red-500/10"
                          }`}
                        >
                          <p className="flex items-start gap-3 font-medium">
                            {ok ? (
                              <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                            ) : (
                              <X aria-hidden className="mt-0.5 size-5 shrink-0 text-red-300" />
                            )}
                            {question.prompt}
                          </p>
                          <p className="mt-2 pl-8 text-sm text-white/75">
                            {!ok
                              ? `You chose “${given !== undefined ? question.options[given] : "-"}”. The correct answer is “${question.options[question.answer]}”. `
                              : ""}
                            {question.why}
                          </p>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={restart}
                      className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      <RotateCcw aria-hidden className="size-4" />
                      Take the test again
                    </button>
                    <Link
                      to="/courses/$slug"
                      params={{ slug: result.slug }}
                      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#ffd98a] px-6 text-sm font-semibold text-[#0f3d2e] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Explore {result.course}
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
