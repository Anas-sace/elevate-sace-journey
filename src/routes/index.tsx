import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Nav } from "@/components/sace/Nav";
import { Hero } from "@/components/sace/Hero";
import { WhyChoose } from "@/components/sace/WhyChoose";
import { StudyAustralia } from "@/components/sace/StudyAustralia";
import { Courses } from "@/components/sace/Courses";
import { Journey } from "@/components/sace/Journey";
import { Campus } from "@/components/sace/Campus";
import { StudentLife } from "@/components/sace/StudentLife";
import { Accommodation } from "@/components/sace/Accommodation";
import { Pathways } from "@/components/sace/Pathways";
import { Stories } from "@/components/sace/Stories";
import { Stats } from "@/components/sace/Stats";
import { Faq } from "@/components/sace/Faq";
import { News } from "@/components/sace/News";
import { Apply } from "@/components/sace/Apply";
import { Footer } from "@/components/sace/Footer";
import { CmsProvider } from "@/components/cms/CmsProvider";
import { getSiteContent } from "@/lib/cms.functions";
import { normalizeContent } from "@/lib/cms";

const EditorOverlay = lazy(() =>
  import("@/components/cms/EditorOverlay").then((m) => ({ default: m.EditorOverlay })),
);

const TITLE = "SACE Adelaide — Study English in Australia";
const DESCRIPTION =
  "South Australian College of English: General English, IELTS and university pathway courses in the heart of Adelaide. NEAS accredited since 1987. Apply in 10 minutes.";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { cms?: "edit" } =>
    search["cms"] === "edit" ? { cms: "edit" } : {},
  loader: () => getSiteContent(),
  head: ({ loaderData }) => {
    const seo = normalizeContent(loaderData as Record<string, unknown> | undefined).seo;
    const title = seo.title || TITLE;
    const description = seo.description || DESCRIPTION;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollegeOrUniversity",
            name: "South Australian College of English",
            alternateName: "SACE Adelaide",
            description,
            telephone: "+61 8 8410 5222",
            email: "registrar@sacecoll.sa.edu.au",
            foundingDate: "1987",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Woodards House, Level 1, 47 Waymouth Street",
              addressLocality: "Adelaide",
              addressRegion: "SA",
              postalCode: "5000",
              addressCountry: "AU",
            },
          }),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  const content = Route.useLoaderData();
  const { cms } = Route.useSearch();

  return (
    <CmsProvider initial={content as Record<string, unknown>}>
      <Nav />
      <main>
        <Hero />
        <WhyChoose />
        <StudyAustralia />
        <Courses />
        <Journey />
        <Campus />
        <StudentLife />
        <Accommodation />
        <Pathways />
        <Stories />
        <Stats />
        <Faq />
        <News />
        <Apply />
      </main>
      <Footer />
      {cms === "edit" && (
        <Suspense fallback={null}>
          <EditorOverlay />
        </Suspense>
      )}
    </CmsProvider>
  );
}
