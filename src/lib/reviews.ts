/** Student reviews, sample data plus the shape the superadmin dashboard edits. */

import s1 from "@/assets/student-1.jpg";
import s2 from "@/assets/student-2.jpg";
import s3 from "@/assets/student-3.jpg";

export type Review = {
  id: string;
  name: string;
  country: string;
  now: string;
  quote: string;
  rating: number;
  avatar: string;
  /** Optional video testimonial (YouTube link or mp4/webm URL). */
  video?: string;
  poster?: string;
};

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: "aiko",
    name: "Aiko Tanaka",
    country: "Japan",
    now: "Master of Marketing, University of Adelaide",
    quote:
      "I arrived too shy to order a coffee. Eleven months later I presented my research in English to eighty people.",
    rating: 5,
    avatar: s1,
  },
  {
    id: "julian",
    name: "Julián Restrepo",
    country: "Colombia",
    now: "Bachelor of Engineering, UniSA",
    quote:
      "The teachers pushed me exactly as hard as I needed. My pathway offer arrived before I even finished the course.",
    rating: 5,
    avatar: s2,
    video: "https://youtu.be/CPAo3GOEgJw",
  },
  {
    id: "linh",
    name: "Linh Nguyen",
    country: "Vietnam",
    now: "Registered Nurse, Adelaide",
    quote:
      "SACE helped me with IELTS, my visa and my first job interview. It felt like having family here.",
    rating: 5,
    avatar: s3,
    video: "https://youtu.be/C_Y_sV2SVnI",
  },
  {
    id: "marco",
    name: "Marco Rossi",
    country: "Italy",
    now: "General English, Upper Intermediate",
    quote:
      "Small classes mean the teacher knows your name on day one. I speak more English in a morning here than in a year at home.",
    rating: 5,
    avatar: s1,
  },
  {
    id: "sunmi",
    name: "Sun-mi Park",
    country: "South Korea",
    now: "English for Tertiary Studies graduate",
    quote:
      "The academic writing lessons are the reason my first university essay came back with a distinction.",
    rating: 5,
    avatar: s2,
  },
  {
    id: "pablo",
    name: "Pablo Herrera",
    country: "Chile",
    now: "IELTS Preparation graduate, Band 7.5",
    quote:
      "Four weeks of IELTS preparation and mock tests every Friday. I walked into the real exam already knowing the room.",
    rating: 5,
    avatar: s3,
    video: "https://youtu.be/I6K7T-fPkmg",
  },
];

export function normalizeReviews(raw: unknown): Review[] {
  if (!Array.isArray(raw)) return DEFAULT_REVIEWS;
  const rows = raw.filter((r): r is Review => Boolean(r) && typeof r === "object" && "name" in (r as object));
  return rows.map((r, i) => ({
    id: r.id || `review-${i}`,
    name: r.name ?? "",
    country: r.country ?? "",
    now: r.now ?? "",
    quote: r.quote ?? "",
    rating: Number(r.rating) || 5,
    avatar: r.avatar ?? "",
    ...(r.video ? { video: r.video } : {}),
    ...(r.poster ? { poster: r.poster } : {}),
  }));
}
