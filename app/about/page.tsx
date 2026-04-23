import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/config';

import PageBanner from "../../components/common/PageBanner";
import AboutIntroSection from "../../components/about/AboutIntroSection";
import AboutMissionTabs from "../../components/about/AboutMissionTabs";
import TeamMembers from "../../components/about/TeamMembers";
import ClientelePortfolio from "../../components/common/ClientelePortfolio";
import OurAlliance from "../../components/about/OurAlliance";
import DownloadsSlider from "../../components/common/DownloadsSlider";

// ✅ FORCE DYNAMIC RENDERING (fixes Vercel build error)
export const dynamic = "force-dynamic";

// ✅ Shared Boot Fetch (optimized: called once and reused)
async function getBootData() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/InvestigationServices/Website/front/`,
      { cache: "no-store" }
    );

    return await response.json();
  } catch (error) {
    console.error("Boot data fetch error:", error);
    return null;
  }
}

// ✅ Cache boot data per request (prevents double fetch in metadata + page)
let cachedBootData: any = null;

async function getCachedBootData() {
  if (!cachedBootData) {
    cachedBootData = await getBootData();
  }
  return cachedBootData;
}

// ✅ SEO
export async function generateMetadata(): Promise<Metadata> {
  const result = await getCachedBootData();
  const bs = result?.success ? result.data.bs : null;

  if (!bs) return {};

  return {
    title: bs.about_seo_title,
    description: bs.about_seo_description,
    keywords: bs.about_seo_keywords,
    openGraph: {
      title: bs.about_seo_title,
      description: bs.about_seo_description,
    }
  };
}

// ✅ Page Component (Server)
export default async function AboutPage() {
  const result = await getCachedBootData();
  const bs = result?.success ? result.data.bs : null;

  const breadcrumbImage =
    bs?.breadcrumb || "/about/about-banner.png";

  return (
    <>
      <PageBanner
        title="About SIFS India"
        breadcrumbImage={breadcrumbImage}
      />

      <AboutIntroSection />
      <AboutMissionTabs />
      <TeamMembers />
      <ClientelePortfolio />
      <OurAlliance />
      <DownloadsSlider />
    </>
  );
}