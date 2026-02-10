import PageBanner from "../../components/common/PageBanner";
import AboutIntroSection from "../../components/about/AboutIntroSection";
import AboutMissionTabs from "../../components/about/AboutMissionTabs";
import TeamMembers from "../../components/about/TeamMembers";
import ClientelePortfolio from "../../components/about/ClientelePortfolio";
import OurAlliance from "../../components/about/OurAlliance";
import DownloadsSlider from "../../components/common/DownloadsSlider";

export default function AboutPage() {
    return (
        <>
            <PageBanner
                title="About SIFS India"
                subtitle="Leading forensic science laboratory in India"
                bgImage="/about/about-banner.png"
            />

            <AboutIntroSection
                title="Established in 2006, SIFS India emerged as a pioneer in the field of forensics."
                imageSrc="/about/about-us.png"
                paragraphs={[
                    "It is a leading forensic science laboratory in India that is registered with the Government of India and certified with ISO 9001:2015 and 10002:2014.",
                    "Despite the initial hurdles, SIFS India, guided by a positive and dedicated approach to clients and adherence to Indian law and order, successfully carved a niche in the field of forensics.",
                    "The journey reflects the continuous efforts of Dr. Ranjeet Singh (CEO and founder), showcasing the company’s commitment to delivering qualitative forensic expert services across several domains.",
                ]}
            />
            
            <AboutMissionTabs />
            <TeamMembers />
            <ClientelePortfolio />
            <OurAlliance />
            <DownloadsSlider />
        </>
    );
}
