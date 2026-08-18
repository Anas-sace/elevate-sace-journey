import campusClassroom from "@/assets/campus-classroom.jpg";
import campusLounge from "@/assets/campus-lounge.jpg";
import heroStudents from "@/assets/hero-students.jpg";
import adelaide from "@/assets/adelaide.jpg";
import lifeBeach from "@/assets/life-class.jpg";
import lifeFood from "@/assets/life-awards.jpg";
import lifeGraduation from "@/assets/life-graduation.jpg";
import stayResidence from "@/assets/teachers.jpg";

export type CourseDetail = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  tag?: string;
  image: string;
  intro: string;
  overview: string[];
  facts: { label: string; value: string }[];
  quickDuration: string;
  quickLevel: string;
  quickStarts: string;
  curriculum: { title: string; items: string[] }[];
  timetables: { title: string; lines: string[] }[];
  options?: { title: string; detail: string }[];
  extras?: { title: string; items: string[] }[];
};

export const COURSES: CourseDetail[] = [
  {
    slug: "general-english",
    name: "General English Course",
    shortName: "General English",
    tagline: "Speak, listen and live in English with confidence.",
    tag: "Most popular",
    image: campusClassroom,
    intro:
      "Designed to improve your everyday communication for future study, work, travel or a career change, available day or evening.",
    overview: [
      "SACE General English programmes are designed to improve students’ English language communication skills to prepare for future study, work, travel or career change.",
      "Core classes concentrate on developing grammar, vocabulary, speaking, listening, reading, writing and pronunciation skills in real-life situations. Afternoon special-studies classes for General English (Intensive) are offered twice a week.",
      "The General English Evening Course is suitable for students who have limited time during the day to focus on their English studies.",
    ],
    facts: [
      { label: "Duration", value: "1 – 48 weeks" },
      { label: "Levels", value: "Elementary to Advanced" },
      { label: "Timetable", value: "Day / Evening" },
      { label: "Skills", value: "Communication skills" },
    ],
    quickDuration: "1 – 48 weeks",
    quickLevel: "Elementary → Advanced",
    quickStarts: "Every Monday",
    curriculum: [
      {
        title: "Day course levels",
        items: ["Elementary", "Pre-Intermediate", "Intermediate", "Upper Intermediate", "Advanced"],
      },
      {
        title: "Evening course levels",
        items: ["Pre-Intermediate", "Intermediate", "Upper Intermediate", "Advanced"],
      },
      {
        title: "What you study",
        items: [
          "Grammar and vocabulary in real-life contexts",
          "Speaking and pronunciation",
          "Listening for everyday and workplace situations",
          "Reading and writing skills",
        ],
      },
    ],
    timetables: [
      { title: "Timetable (Day)", lines: ["16 – 25 hours per week", "Monday to Friday, 9:00am – 3:15pm"] },
      { title: "Timetable (Evening)", lines: ["16 – 20 hours per week", "Monday to Friday, 5:00pm – 9:15pm"] },
    ],
    options: [
      { title: "General English Intensive", detail: "25 hours per week" },
      { title: "General English Standard", detail: "20 hours per week" },
      { title: "Intensive Plus", detail: "25 hours per week (20 hours General Standard English)" },
      { title: "General English Part-Time", detail: "16 hours per week" },
      { title: "Private Tuition", detail: "On demand, flexible hours" },
    ],
  },
  {
    slug: "english-for-tertiary-studies",
    name: "English for Tertiary Studies",
    shortName: "English for Tertiary Studies",
    tagline: "Direct entry to university, TAFE and VET, without an IELTS test.",
    tag: "Direct entry",
    image: lifeGraduation,
    intro:
      "A full-time academic English (EAP) course for students planning to study at an Australian university, TAFE, VET or hospitality institution.",
    overview: [
      "English for Tertiary Studies (ETS) is offered face to face. Our ETS classes provide direct entry to SACE partner institutions after successful completion, without the requirement of an IELTS test.",
      "The course is designed for students who need to improve their English language to meet the admission requirements of tertiary institutions.",
      "Academic English Preparation is also available online, allowing students to begin working towards the entry requirements for Australian TAFE, VET and universities from home.",
    ],
    facts: [
      { label: "Duration", value: "12 – 48 weeks" },
      { label: "Levels", value: "ETS 1–4 (minimum IELTS 5.0 or equivalent)" },
      { label: "Timetable", value: "Full-time 25h/week (day only)" },
      { label: "Options", value: "Face-to-face / Online" },
    ],
    quickDuration: "12 – 48 weeks",
    quickLevel: "Intermediate +",
    quickStarts: "Regular intakes",
    curriculum: [
      {
        title: "Academic English training",
        items: [
          "Academic reading and critical analysis",
          "Academic writing",
          "Academic listening and note-taking",
          "Oral presentations and tutorials",
          "Research and study skills",
          "Grammar",
        ],
      },
      {
        title: "English entry requirements",
        items: [
          "ETS 1: SACE Intermediate / IELTS 5.0 / equivalent",
          "ETS 2: SACE ETS 1 / IELTS 5.5 / equivalent",
          "ETS 3: SACE ETS 2 / IELTS 6.0 / equivalent",
          "ETS 4: SACE ETS 3 / IELTS 6.5 / equivalent",
        ],
      },
      {
        title: "Which level do you need?",
        items: [
          "ETS 1, for courses with a minimum IELTS 5.5 requirement",
          "ETS 2, for courses with a minimum IELTS 6.0 requirement",
          "ETS 3, for courses with a minimum IELTS 6.5 requirement",
          "ETS 4, for courses with a minimum IELTS 7.0 requirement",
        ],
      },
    ],
    timetables: [
      {
        title: "Timetable (Full-time)",
        lines: ["25 hours per week", "Mon and Wed: 9:00am – 3:30pm", "Tue, Thu, Fri: 9:00am – 1:30pm"],
      },
    ],
    extras: [
      {
        title: "Direct entry arrangements",
        items: [
          "Flinders University",
          "TAFE South Australia",
          "Quality College of Australia (QCA)",
          "International College of Hotel Management (ICHM)",
          "Adelaide Hospitality & Training School (AHTS)",
          "Equals International",
        ],
      },
    ],
  },
  {
    slug: "english-plus",
    name: "English Plus Courses",
    shortName: "English Plus",
    tagline: "General English combined with golf, tennis or real work experience.",
    image: lifeBeach,
    intro:
      "Combine Standard General English classes with the thing you love, on the course, on the court, or in an Australian workplace.",
    overview: [
      "English plus Golf: golf is an accessible and popular sport in Australia, and Adelaide has a large number of both public and private golf courses. The SACE English & Golf programme lets students learn and practise golf while improving their English.",
      "English plus Tennis: tennis coaching and practice at the Memorial Drive Tennis Club and the Peter Smith Tennis Academy, combined with Standard General English instruction at SACE. The facilities include grass, clay, rebound ace and synthetic grass courts, and are just a short walk or five-minute tram ride from the college.",
      "English plus Work Experience (18+ only): SACE is an Australian leader in this area and has run English and Work Experience programmes since 1990. Students develop professional work skills while practising English in the workplace. Work placements are unpaid.",
    ],
    facts: [
      { label: "Duration", value: "From 4 weeks" },
      { label: "Levels", value: "Pre-Intermediate +" },
      { label: "Timetable", value: "General English + afternoon activity" },
      { label: "Suitable for", value: "Working Holiday and student visa holders" },
    ],
    quickDuration: "From 4 weeks",
    quickLevel: "Pre-Intermediate +",
    quickStarts: "Every Monday",
    curriculum: [
      {
        title: "Popular work experience placements",
        items: [
          "Business",
          "Accounting and Finance",
          "Architecture",
          "Media and Public Relations",
          "Tourism and Hospitality",
          "Education",
          "Conservation and Environmental areas",
          "Information Technology",
        ],
      },
      {
        title: "Sport options",
        items: [
          "English plus Golf, public and private Adelaide courses",
          "English plus Tennis, coaching at Memorial Drive Tennis Club",
        ],
      },
    ],
    timetables: [
      {
        title: "Timetable",
        lines: ["General English classes at the SACE campus", "Afternoon coaching or work placement sessions"],
      },
    ],
  },
  {
    slug: "high-school-programme",
    name: "High School Programme",
    shortName: "High School Programme",
    tagline: "Bridge confidently into an Australian secondary school.",
    image: heroStudents,
    intro:
      "An international high school bridging programme for students aged 12–17 preparing to enter a leading Adelaide secondary school.",
    overview: [
      "The SACE High School Programme prepares young international students for entry into Australian secondary schools. Students build the academic English, study skills and classroom confidence that a mainstream Australian school expects.",
      "Alongside language work, students are introduced to the Australian school system, assessment styles and classroom culture, so the transition into Year 7–12 feels familiar rather than daunting.",
      "SACE works closely with many of Adelaide's leading independent high schools, and our counsellors assist families with school selection, application and enrolment.",
    ],
    facts: [
      { label: "Duration", value: "10 – 40 weeks" },
      { label: "Ages", value: "12 – 17 years" },
      { label: "Levels", value: "Elementary +" },
      { label: "Timetable", value: "Full-time, term aligned" },
    ],
    quickDuration: "10 – 40 weeks",
    quickLevel: "Elementary +",
    quickStarts: "Term-aligned intakes",
    curriculum: [
      {
        title: "What you study",
        items: [
          "Academic English for secondary study",
          "Note-taking, research and assignment writing",
          "Maths and science vocabulary",
          "Presentation and classroom participation skills",
          "Australian school culture and expectations",
        ],
      },
      {
        title: "Partner high schools include",
        items: [
          "Scotch College, Pembroke, Westminster (co-ed)",
          "Sacred Heart College, Concordia (co-ed)",
          "St Aloysius, Loreto, St Peters Girls, OLSH (female only)",
          "Blackfriars Priory School, Prince Alfred College (male only)",
        ],
      },
    ],
    timetables: [
      { title: "Timetable", lines: ["Full-time study, Monday to Friday", "Aligned to South Australian school terms"] },
    ],
  },
  {
    slug: "evergreen-programme",
    name: "Evergreen Programme",
    shortName: "Evergreen Programme",
    tagline: "English and Australian culture for learners aged 50+.",
    image: adelaide,
    intro:
      "Morning English classes plus three organised cultural afternoons every week, designed for mature learners on a visitor visa.",
    overview: [
      "The SACE Evergreen Programme is for people aged 50+ and consists of English language classes in the morning plus three organised afternoon cultural activities each week.",
      "Evergreen students are also welcome to join the Club SACE activity programme organised each week, which includes beaches, national parks, cultural institutes and seasonal events around Adelaide.",
      "This course is suitable for visitor visa holders and can be booked for as little as one week.",
    ],
    facts: [
      { label: "Duration", value: "Minimum 1 week" },
      { label: "Levels", value: "Elementary +" },
      { label: "Timetable", value: "20 hours per week + 3 excursions" },
      { label: "Skills", value: "English + cultural immersion" },
    ],
    quickDuration: "From 1 week",
    quickLevel: "Elementary +",
    quickStarts: "Every Monday",
    curriculum: [
      {
        title: "Your week",
        items: [
          "20 hours per week of General English",
          "Three organised afternoon cultural activities",
          "Optional Club SACE weekly social programme",
        ],
      },
    ],
    timetables: [
      { title: "Timetable", lines: ["20 hours per week General English", "Plus 3 afternoon excursions"] },
    ],
  },
  {
    slug: "ielts-preparation",
    name: "IELTS Preparation",
    shortName: "IELTS Preparation",
    tagline: "Target the exact band score you need.",
    image: campusLounge,
    intro:
      "An intensive 12 to 24 week course preparing you for all four areas of the IELTS exam, plus strategies and practice tests.",
    overview: [
      "The International English Language Testing System (IELTS) assesses the English level of non-native speakers who require English for academic or professional purposes, or for an Australian visa application. This course is offered face to face.",
      "The SACE IELTS Preparation programme is an intensive 12 to 24 week course designed to prepare students for the four main areas of the exam, plus IELTS exam strategies, techniques and examination practice.",
      "Both day and evening IELTS Preparation classes are available for students who want to focus on Speaking, Reading, Writing and Listening.",
    ],
    facts: [
      { label: "Duration", value: "12 – 24 weeks" },
      { label: "Levels", value: "Upper Intermediate / IELTS 5" },
      { label: "Timetable", value: "20 hours per week" },
      { label: "Options", value: "Face-to-face, day or evening" },
    ],
    quickDuration: "12 – 24 weeks",
    quickLevel: "Upper Intermediate +",
    quickStarts: "Monthly intakes",
    curriculum: [
      {
        title: "Exam areas covered",
        items: [
          "Speaking",
          "Listening",
          "Reading (Academic + General)",
          "Writing (Academic + General)",
          "IELTS exam strategies and techniques",
          "Full IELTS examination practice",
        ],
      },
    ],
    timetables: [
      { title: "Timetable (Day)", lines: ["20 hours per week", "Monday to Friday, 9:00am – 1:30pm"] },
      { title: "Timetable (Evening)", lines: ["20 hours per week", "Monday to Friday, 5:00pm – 9:15pm"] },
    ],
  },
  {
    slug: "pte-preparation",
    name: "PTE Preparation",
    shortName: "PTE Preparation",
    tagline: "Prepare for the PTE Academic examination.",
    image: lifeFood,
    intro:
      "A 20 hour per week course introducing and preparing you for the Pearson Test of English (Academic).",
    overview: [
      "The Pearson Test of English (PTE) is an official English proficiency test recognised by Australian universities, colleges and the Australian Government. It provides an alternative English test for non-native speakers who need a recognised proficiency assessment for tertiary study, employment or the Department of Home Affairs.",
      "The SACE PTE Academic Preparation course covers the four macro skills as relevant to this examination, along with a study skills and examination practice component.",
      "Students are tested on their first day. Students below Upper Intermediate level are placed in a General English class until their English level is sufficient.",
    ],
    facts: [
      { label: "Duration", value: "4 – 24 weeks" },
      { label: "Levels", value: "Upper Intermediate or IELTS 5.0" },
      { label: "Timetable", value: "Day / Evening" },
      { label: "Skills", value: "Speaking, Listening, Reading, Writing" },
    ],
    quickDuration: "4 – 24 weeks",
    quickLevel: "Upper Intermediate +",
    quickStarts: "Monthly intakes",
    curriculum: [
      {
        title: "What you study",
        items: [
          "Speaking and Listening for PTE Academic",
          "Reading strategies and timing",
          "Writing tasks and scoring criteria",
          "Study skills and full examination practice",
        ],
      },
    ],
    timetables: [
      {
        title: "Timetable",
        lines: ["Monday to Friday", "Day: 9:00am – 1:30pm", "Evening: 5:00pm – 9:15pm"],
      },
    ],
  },
  {
    slug: "cambridge-celta-online",
    name: "Cambridge CELTA Online",
    shortName: "Cambridge CELTA Online",
    tagline: "The world's best known English teaching qualification.",
    tag: "Teacher training",
    image: stayResidence,
    intro:
      "SACE has run University of Cambridge CELTA courses since 1992, now delivered 100% online, full-time or part-time.",
    overview: [
      "The Cambridge CELTA is the best known TEFL / TESL / TESOL / ELT qualification of its kind in the world, and is often requested by employers nationally and internationally. Over 9,000 people a year take CELTA courses worldwide, with all successful participants receiving a certificate from Cambridge University.",
      "SACE's TESOL courses are delivered 100% online and are available as either a part-time 10 week or a full-time 4 week intensive course. The course combines self-guided study and real-time teaching practice coordinated by experienced CELTA trainers.",
      "Input sessions are delivered online with tutor support through Cambridge's Moodle platform, while lesson planning and teaching practice are conducted via Teams. Both formats follow the same syllabus and lead to the same internationally recognised certificate.",
    ],
    facts: [
      { label: "Duration", value: "Full-time (4 weeks) or Part-time (10 weeks)" },
      { label: "Next intake", value: "05 Oct 2026 (part-time)" },
      { label: "Application cutoff", value: "4 Sept 2026" },
      { label: "Delivery", value: "Online only" },
    ],
    quickDuration: "4 – 10 weeks",
    quickLevel: "Teacher training",
    quickStarts: "Quarterly",
    curriculum: [
      {
        title: "Minimum entry requirements",
        items: [
          "Age 18 years +",
          "Educated to the standard required for entry into higher education",
          "For non-native English speakers, IELTS 8.0 in all bands (7.5 accepted at SACE's discretion)",
          "Pre-course task and online interview",
          "Commitment to attend all scheduled online sessions",
        ],
      },
      {
        title: "Skills required",
        items: [
          "Clear, fluent English (spoken and written)",
          "Fundamental awareness of English grammar",
          "Ability to communicate instructions clearly",
          "Good time-management and ability to meet deadlines",
          "Openness to feedback and willingness to improve",
          "Confidence speaking in front of groups",
          "Comfort using digital tools (Teams, docs, slides, email)",
        ],
      },
    ],
    timetables: [
      {
        title: "Part-time Online (10 weeks)",
        lines: [
          "Minimum 120 contact hours",
          "Additional 80 hours home study",
          "60 hours of practice teaching",
          "6 hours of observed & assessed teaching practice",
          "6 hours observing experienced CELTA trainers",
        ],
      },
      {
        title: "Full-time Intensive Online (4 weeks)",
        lines: [
          "Minimum 120 contact hours",
          "Additional 80 hours home study",
          "60 hours of practice teaching",
          "6 hours of observed & assessed teaching practice",
          "6 hours observing experienced CELTA trainers",
        ],
      },
    ],
    extras: [
      {
        title: "Recognition & credit",
        items: [
          "CELTA is given credit points for courses at a number of Australian universities.",
          "The qualification is recognised by employers worldwide.",
        ],
      },
    ],
  },
];

export function getCourse(slug: string): CourseDetail | undefined {
  return COURSES.find((c) => c.slug === slug);
}
