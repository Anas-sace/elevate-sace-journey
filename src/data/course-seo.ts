/** Rich, SEO-oriented content blocks for individual course pages. */

export type CourseLevel = { level: string; stage: string; description: string };
export type TimetableTab = {
  title: string;
  note?: string;
  days: string[];
  rows: { time: string; cells: string[] }[];
};
export type CourseRich = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroBadges: string[];
  heroTitle: string;
  heroTagline: string;
  ctas: { label: string; href: string; variant: "primary" | "accent" | "outline" }[];
  overviewHeading: string;
  overview: string[];
  overviewFacts: { label: string; value: string }[];
  levelsHeading: string;
  levelsIntro: string;
  levels: CourseLevel[];
  optionsHeading: string;
  optionsIntro: string;
  options: { title: string; hours: string; detail: string }[];
  weekHeading: string;
  weekIntro: string[];
  timetables: TimetableTab[];
  focusHeading: string;
  focusIntro: string;
  pillars: { title: string; detail: string }[];
  specs: { label: string; value: string }[];
  benefitsHeading: string;
  benefits: { title: string; detail: string }[];
  pathwayNote: string[];
  faqs: { q: string; a: string; link?: { label: string; href: string } }[];
};

export const COURSE_SEO: Record<string, CourseRich> = {
  "general-english-courses-adelaide": {
    slug: "general-english-courses-adelaide",
    metaTitle: "General English Course Adelaide | SACE",
    metaDescription:
      "Improve your English for study, work or life in Australia. SACE General English courses in Adelaide start every Monday, 1 week onwards. Minimum age 13. Enrol today.",
    keywords: [
      "general english course adelaide",
      "english course adelaide",
      "learn english adelaide",
      "general english adelaide australia",
    ],
    heroBadges: ["NEAS Endorsed", "Est. 1987", "CELTA Training Centre"],
    heroTitle: "General English Courses in Adelaide, Australia",
    heroTagline: "Speak with Confidence. Connect with the World.",
    ctas: [
      { label: "Access Brochure", href: "/SACE-Brochure.pdf", variant: "accent" },
      { label: "Enrol Now", href: "/#apply", variant: "primary" },
      { label: "Test Your English Level", href: "/test-your-english", variant: "outline" },
    ],
    overviewHeading: "About the course",
    overview: [
      "The South Australian College of English (SACE), with over 40 years of experience and recognition as a certified CELTA training centre, delivers the General English programme, designed to improve your everyday communication skills for real-life situations.",
      "Whether you are preparing for future study, looking for work, planning to travel, or simply want to feel more confident speaking English, this course gives you the tools to succeed.",
      "General English is available as a full-time day course or an evening course; you can study around your schedule. Each class has a maximum of 18 students, ensuring every learner receives individual attention and meaningful feedback.",
    ],
    overviewFacts: [
      { label: "Course length", value: "1, 48 weeks" },
      { label: "Levels", value: "Elementary to Advanced" },
      { label: "Intakes", value: "Every Monday" },
      { label: "Timetable", value: "Day and evening" },
      { label: "Minimum age", value: "13 years" },
      { label: "Accreditation", value: "NEAS endorsed · CRICOS 00094M" },
    ],
    levelsHeading: "Choose your starting point",
    levelsIntro:
      "Our General English programme supports learners from Elementary to Advanced. We place students based on individual proficiency confirmed by a free placement test on arrival.",
    levels: [
      {
        level: "Elementary",
        stage: "Foundation",
        description:
          "Build the basics for everyday life. Practise greetings, simple grammar, and short conversations from day one.",
      },
      {
        level: "Pre-Intermediate",
        stage: "Building",
        description:
          "Grow your vocabulary and sentence skills to handle familiar situations with greater confidence.",
      },
      {
        level: "Intermediate",
        stage: "Developing",
        description:
          "Communicate on a wider range of topics. Strengthen reading and listening skills so longer texts and conversations become easier to follow and understand.",
      },
      {
        level: "Upper-Intermediate",
        stage: "Advancing",
        description:
          "Handle academic and professional English with ease. Explain ideas clearly and participate in discussions with confidence.",
      },
      {
        level: "Advanced",
        stage: "Proficient",
        description:
          "Refine your English to the highest level. Develop the precision and fluency needed to read complex material, write academic texts, and communicate naturally across professional and academic settings.",
      },
    ],
    optionsHeading: "Find the study format that fits your life",
    optionsIntro:
      "Every student has different goals, schedules, and learning speeds. Review our course options below to find the right fit.",
    options: [
      {
        title: "General English Intensive",
        hours: "25 hrs/week",
        detail:
          "Core General English Monday to Friday, plus Special Studies sessions on Mondays and Wednesdays focusing on Academic Skills and Vocabulary in Context. Best for students who want to progress as quickly as possible.",
      },
      {
        title: "General English Standard",
        hours: "20 hrs/week",
        detail:
          "Core General English Monday to Friday, covering speaking, listening, reading, vocabulary, writing and grammar. Ideal for focused full-time classroom learning.",
      },
      {
        title: "Intensive Plus",
        hours: "25 hrs/week",
        detail:
          "Combines 20 hours of General Standard English with 5 additional hours of focused study per week. A strong choice for students who want extra support alongside their core classes.",
      },
      {
        title: "General English Part-Time",
        hours: "16 hrs/week",
        detail:
          "A flexible option for students who need to balance study with other commitments. Core classes in speaking, listening, reading and writing.",
      },
      {
        title: "Private Tuition",
        hours: "Flexible",
        detail:
          "One-to-one lessons designed around your specific needs and goals. Contact SACE to discuss your requirements and arrange a personalised programme.",
      },
    ],
    weekHeading: "What your week looks like at SACE",
    weekIntro: [
      "Your week at SACE is structured to give you meaningful practice across all key language skills, every day.",
      "Day course (Intensive, 25 hrs): Monday to Friday, 9:00 am to 3:30 pm core classes, plus Special Studies on Monday and Wednesday focusing on Academic Skills and Vocabulary in Context.",
      "Day course (Standard, 20 hrs): Monday to Friday, 9:00 am to 3:30 pm core classes.",
      "Evening course (16 to 20 hrs): Monday to Friday, 5:00 pm to 9:15 pm core classes. Course duration: 1 to 48 weeks.",
    ],
    timetables: [
      {
        title: "Day course (20/25 hrs/wk)",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        rows: [
          {
            time: "9:00, 11:00",
            cells: [
              "Intro to Unit · Writing",
              "Grammar · Listening & Speaking",
              "Vocabulary · Reading Task",
              "Speaking & Writing · Vocabulary",
              "Weekly Revision Test",
            ],
          },
          {
            time: "11:30, 13:30",
            cells: [
              "Reading · Speaking",
              "Pronunciation · Vocabulary",
              "Media/Music · Listening",
              "Authentic Reading",
              "Weekly Test · Speaking",
            ],
          },
          {
            time: "14:00, 15:30",
            cells: [
              "Special Studies (25h/wk only)",
              "-",
              "Special Studies (25h/wk only)",
              "-",
              "Club SACE Excursion",
            ],
          },
        ],
      },
      {
        title: "Evening course (16/20 hrs/wk)",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        rows: [
          {
            time: "17:00, 19:00",
            cells: [
              "Intro to theme",
              "Grammar in use",
              "Vocabulary / Speaking",
              "Writing / Reading",
              "Review / Presentations",
            ],
          },
          {
            time: "19:15, 21:15",
            cells: [
              "Reading / Speaking",
              "Reading / Writing",
              "Research skills, projects",
              "Media Studies / Listening",
              "Communication activities",
            ],
          },
        ],
      },
    ],
    focusHeading: "What skills will you develop",
    focusIntro:
      "True fluency requires balance. Our General English programme develops all four core language skills, blending practical speaking and listening with strong reading, writing, and grammar training.",
    pillars: [
      {
        title: "Speaking skills",
        detail:
          "Practise real conversations and build the confidence to express yourself clearly. Each class includes structured speaking activities, group discussions, and role plays that develop fluency and natural expression.",
      },
      {
        title: "Listening skills",
        detail:
          "Develop your ability to understand a range of accents, speaking speeds, and contexts. Guided listening tasks help you follow conversations, pick up key information, and engage with authentic spoken English.",
      },
      {
        title: "Reading and vocabulary",
        detail:
          "Expand your vocabulary and strengthen your reading skills through a variety of texts, from everyday materials to more complex passages. Learn to identify meaning in context and read with greater speed and accuracy.",
      },
      {
        title: "Writing and grammar",
        detail:
          "Build accuracy and confidence in written English. Develop your understanding of grammar in context and practise a range of writing tasks, from informal messages to structured paragraphs and academic texts.",
      },
    ],
    specs: [
      { label: "Course duration", value: "1, 48 weeks" },
      { label: "Students per class", value: "Max 18" },
      { label: "Minimum age", value: "13+" },
      { label: "Starts", value: "Every Monday" },
    ],
    benefitsHeading: "Why choose General English at SACE?",
    benefits: [
      {
        title: "Easy pathways to further study",
        detail:
          "Move straight from our English classes into degree programmes at major local universities and colleges, including the University of Adelaide, Flinders University, and TAFE SA.",
      },
      {
        title: "Practical English for life in Adelaide",
        detail:
          "Learn real, everyday language that helps you get around, make friends, and feel at home in Australia from your very first day.",
      },
      {
        title: "Clear, step-by-step levels",
        detail:
          "Progress smoothly through our five-level system, built on decades of trusted teaching experience since 1987. Each level builds on the last.",
      },
      {
        title: "Friendly, global classrooms",
        detail:
          "Meet and study with students from around the world, practising English together in a supportive, welcoming environment, with a maximum of 18 students per class.",
      },
    ],
    pathwayNote: [
      "Unsure about your university pathway? Our education advisors are here to support you.",
      "Successful completion of our General English programme can provide a pathway into our English for Tertiary Studies (ETS) programme. Completing ETS allows eligible students to progress to Australian universities without needing an IELTS test, subject to entry requirements.",
    ],
    faqs: [
      {
        q: "What level do I need to start General English?",
        a: "No previous English is required for the Elementary level. Before your first class, you take a free placement test so you begin in the right level for your current ability.",
      },
      {
        q: "How old do I need to be to study General English at SACE?",
        a: "The minimum age for General English is 13 years.",
      },
      {
        q: "How long do I need to study?",
        a: "General English is available from 1 week. Most students study for 4 to 48 weeks depending on their goals and starting level.",
      },
      {
        q: "Can I study in the evening?",
        a: "Yes. The General English Evening Course runs Monday to Friday from 5:00 pm to 9:15 pm. It is ideal if you have commitments during the day.",
      },
      {
        q: "Will I get a certificate?",
        a: "Yes. Students who complete their General English programme receive a SACE certificate showing their level of achievement.",
      },
      {
        q: "Can General English lead to university study in Australia?",
        a: "Successful completion of our General English programme can provide a pathway into our English for Tertiary Studies (ETS) programme. Completing ETS allows eligible students to progress to Australian universities without needing an IELTS test, subject to entry requirements.",
      },
      {
        q: "How many students are in each class?",
        a: "Each class will have a maximum of 18 students.",
      },
      {
        q: "When do new classes start?",
        a: "General English has a new intake every Monday.",
      },
    ],
  },
};

export function getCourseRich(slug: string): CourseRich | undefined {
  return COURSE_SEO[slug];
}
