import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/config';
import PageBanner from "../../components/common/PageBanner";
import AboutIntroSection from "../../components/about/AboutIntroSection";
import AboutMissionTabs from "../../components/about/AboutMissionTabs";
import TeamMembers from "../../components/about/TeamMembers";
import ClientelePortfolio from "../../components/common/ClientelePortfolio";
import OurAlliance from "../../components/about/OurAlliance";
import DownloadsSlider from "../../components/common/DownloadsSlider";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, {
            next: { revalidate: 3600 }
        });
        const result = await response.json();

        if (result.success && result.data && result.data.bs) {
            const bs = result.data.bs;
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
    } catch (error) {
        console.error("About metadata fetch error:", error);
    }
    return {};
}

async function getAboutData() {
    try {
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, {
            next: { revalidate: 3600 }
        });
        return await response.json();
    } catch (error) {
        console.error("About data fetch error:", error);
        return null;
    }
}

export default async function AboutPage() {
    const result = await getAboutData();
    const bs = result?.success ? result.data.bs : null;

    return (
        <>
            <PageBanner
                title="About SIFS India"
                subtitle={bs?.about_seo_title || "Leading forensic science laboratory in India"}
                bgImage={bs?.breadcrumb || "/about/about-banner.png"}
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
