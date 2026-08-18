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
  "general-english": {
    slug: "general-english",
    metaTitle: "General English Course Adelaide | SACE",
    metaDescription:
      "Study General English in Adelaide with SACE, Cambridge CELTA-qualified teachers, direct university pathways, and immersive learning from day one. Start today.",
    keywords: [
      "General English course Adelaide",
      "General English course Australia",
      "ELICOS course Adelaide",
      "English language course Adelaide",
      "English immersion Adelaide",
      "day English course",
      "evening English course",
      "international students Adelaide",
      "NEAS accredited",
    ],
    heroBadges: ["NEAS Endorsed", "Est. 1987", "CELTA Training Centre"],
    heroTitle: "General English Course in Adelaide, Australia",
    heroTagline: "Speak with Confidence. Connect with the World.",
    ctas: [
      { label: "Access Brochure (2026)", href: "/SACE-Brochure.pdf", variant: "accent" },
      { label: "Enrol Now", href: "/#apply", variant: "primary" },
      { label: "Test Your English Level", href: "/test-your-english", variant: "outline" },
    ],
    overviewHeading: "Overview",
    overview: [
      "With over 40 years of experience and recognition as a certified CELTA training centre, the South Australian College of English (SACE) delivers General English courses that focus on practical, real-life communication.",
      "Our courses help students build confidence in everyday conversations as well as more advanced academic and professional discussions.",
    ],
    overviewFacts: [
      { label: "Course length", value: "2 – 48 weeks" },
      { label: "Levels", value: "Elementary to Advanced" },
      { label: "Intakes", value: "Every Monday" },
      { label: "Timetable", value: "Day and evening" },
      { label: "Delivery", value: "On campus, Adelaide CBD" },
      { label: "Accreditation", value: "NEAS endorsed · CRICOS 00094M" },
    ],
    levelsHeading: "Course levels",
    levelsIntro:
      "Our General English programme supports learners from Elementary to Advanced English. English ability is broadly grouped into five recognised levels to guide learning progression, with class placement based on individual proficiency and availability.",
    levels: [
      {
        level: "Elementary",
        stage: "Foundation",
        description:
          "Build a solid foundation in everyday English, greetings, basic grammar, and simple conversation for daily life.",
      },
      {
        level: "Pre-Intermediate",
        stage: "Building",
        description:
          "Develop essential vocabulary and sentence structures to handle familiar everyday situations with growing confidence.",
      },
      {
        level: "Intermediate",
        stage: "Developing",
        description:
          "Communicate clearly on a wide range of topics. Understand the main points of complex texts on familiar subjects.",
      },
      {
        level: "Upper-Intermediate",
        stage: "Advancing",
        description:
          "Express yourself fluently and spontaneously. Handle most academic and professional situations with ease.",
      },
      {
        level: "Advanced",
        stage: "Proficient",
        description:
          "Understand virtually everything you read or hear. Express yourself precisely and fluently in all academic and professional contexts.",
      },
    ],
    optionsHeading: "Course options",
    optionsIntro:
      "SACE offers General English classes during the day and evening, giving students flexible study options to suit work, study, or personal schedules.",
    options: [
      {
        title: "General English Intensive",
        hours: "25 hrs/week",
        detail:
          "A full-time day programme designed for immersive language learning. Students attend core General English classes, with Special Studies offered on Mondays and Wednesdays, focusing on Academic Skills and Vocabulary in Context. This course supports strong academic development in a focused timeframe and suits students preparing for further study, including ETS.",
      },
      {
        title: "General English Standard",
        hours: "20 hrs/week",
        detail:
          "A balanced full-time day programme that focuses on improving speaking, listening, reading, and writing skills for everyday and academic use.",
      },
      {
        title: "General English Part-Time",
        hours: "16 hrs/week",
        detail:
          "Ideal for students balancing work or other commitments alongside study. Day or evening schedule available.",
      },
      {
        title: "Accelerated English / Private Tuition",
        hours: "Flexible",
        detail: "Tailored one-to-one lessons available on demand to fast-track your progress.",
      },
    ],
    weekHeading: "What does a typical week look like?",
    weekIntro: [
      "Your week at SACE is structured to give you meaningful practice across all key language skills, every day.",
      "The day General English course focuses on grammar, vocabulary, speaking, listening, reading, writing and pronunciation using real-life contexts. For students enrolled in the Intensive or Intensive Plus option, afternoon Special Studies sessions run twice a week, giving you extra time to explore topics in greater depth.",
      "The evening General English course is designed for students who need flexibility during the day, whether you are working, on a working holiday visa, or managing other commitments. Classes cover the same core skill areas as the day programme: grammar, vocabulary, speaking, listening, reading and writing.",
    ],
    timetables: [
      {
        title: "Day course (20/25 hrs/wk)",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        rows: [
          {
            time: "9:00 – 11:00",
            cells: [
              "Intro to Unit · Writing",
              "Grammar · Listening & Speaking",
              "Vocabulary · Reading Task",
              "Speaking & Writing · Vocabulary",
              "Weekly Revision Test",
            ],
          },
          {
            time: "11:30 – 13:30",
            cells: [
              "Reading · Speaking",
              "Pronunciation · Vocabulary",
              "Media/Music · Listening",
              "Authentic Reading",
              "Weekly Test · Speaking",
            ],
          },
          {
            time: "14:00 – 15:30",
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
        title: "Evening course (20 hrs/wk)",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        rows: [
          {
            time: "17:00 – 19:00",
            cells: [
              "Intro to theme",
              "Grammar in use",
              "Vocabulary / Speaking",
              "Writing / Reading",
              "Review / Presentations",
            ],
          },
          {
            time: "19:15 – 21:15",
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
    focusHeading: "What the course focuses on",
    focusIntro:
      "Every class at SACE builds the four macro skills through engaging resources, podcasts, media, guest speakers, and excursions. The SACE “English Only” policy ensures real practice beyond the classroom.",
    pillars: [
      { title: "Speaking & Pronunciation", detail: "Real-life situations, debates, presentations." },
      { title: "Listening", detail: "Podcasts, media and authentic audio content." },
      { title: "Reading & Vocabulary", detail: "Academic texts, comprehension and word-building." },
      { title: "Writing & Grammar", detail: "Structured writing and grammar in context." },
    ],
    specs: [
      { label: "Course duration", value: "2 – 48 weeks" },
      { label: "Students per class", value: "Max 18" },
      { label: "Actual class size", value: "Avg 14" },
      { label: "Minimum age", value: "13+" },
    ],
    benefitsHeading: "What are the benefits of studying General English at SACE?",
    benefits: [
      {
        title: "Personalised learning and dedicated feedback",
        detail:
          "Small class sizes mean your teachers know your goals and give you tailored guidance throughout your course.",
      },
      {
        title: "Progressive assessment and level mastery",
        detail:
          "Regular structured progress tests every four weeks confirm when you are ready to advance, and keep you on track.",
      },
      {
        title: "Modern campus facilities and independent study spaces",
        detail:
          "Full access to SACE's Adelaide CBD campus facilities, including quiet study areas for self-directed learning.",
      },
      {
        title: "Academic and career pathway guidance",
        detail:
          "Professional advice on IELTS and PTE preparation, university pathways via the ETS programme, and direct-entry institutional partnerships.",
      },
      {
        title: "Recognition of achievement",
        detail:
          "Official certificate ceremonies and social events mark your milestones and build community among SACE's global student body.",
      },
      {
        title: "Accommodation and student welfare support",
        detail:
          "Carefully selected homestays and modern student residences to choose from, with full support from the SACE welfare team for the duration of your stay.",
      },
    ],
    pathwayNote: [
      "Unsure about your university pathway? Our education advisors are here to support you.",
      "Successful completion of our General English course can provide a pathway into our English for Tertiary Studies (ETS) programme. Completing ETS allows eligible students to progress to Australian universities without needing an IELTS test, subject to entry requirements.",
    ],
    faqs: [
      {
        q: "How do I enrol in a General English course?",
        a: "Complete the SACE enrolment form and either send it to your local SACE representative or submit it directly to our team in Adelaide. Once we receive it, we will send you a letter of offer and an invoice for payment of fees.",
      },
      {
        q: "What is the minimum age for General English students?",
        a: "The minimum age for our General English courses is 13 years. Our Study Tours programme accepts students aged 13 and older.",
      },
      {
        q: "Will I receive a certificate on completion?",
        a: "Yes. All students receive a SACE Certificate at the end of their course, indicating their level of achievement. A progress report is also issued at the end of each four-week period.",
      },
      {
        q: "Can I switch between day and evening classes?",
        a: "Subject to availability, students may request a schedule change. Please speak to our student services team on campus; we will do our best to accommodate your needs.",
      },
      {
        q: "What are Special Studies classes?",
        a: "Special Studies are specialised afternoon classes available to students enrolled in 25-hour-per-week programmes (General English Intensive and ETS). They cover Academic Skills and Vocabulary in Context. Special Studies can also be purchased separately by students on 20-hour programmes.",
      },
      {
        q: "Can I transfer from General English to Exam Preparation?",
        a: "Yes. Once you achieve Intermediate (B1/B2) proficiency, you can consult our academic team to move into IELTS Preparation or Cambridge examination courses (B2 First / C1 Advanced). SACE monitors student progress every four weeks to identify the right time for this transition.",
      },
      {
        q: "What accommodation options does SACE provide?",
        a: "Students can choose a SACE homestay for authentic cultural immersion with a carefully selected local family, or opt for independent living in a central student hostel located within walking distance of our Adelaide campus.",
      },
      {
        q: "Am I permitted to work while studying in South Australia?",
        a: "Under current Australian student visa regulations, eligible students are generally permitted to work up to 48 hours per fortnight. Work entitlements depend on your visa type and individual circumstances. We recommend checking current conditions with the Australian Government's official immigration website.",
        link: {
          label: "Work rights for student visa holders, homeaffairs.gov.au",
          href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/temporary-relaxation-of-working-hours-for-student-visa-holders",
        },
      },
    ],
  },
};

export function getCourseRich(slug: string): CourseRich | undefined {
  return COURSE_SEO[slug];
}
