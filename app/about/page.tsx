"use client";
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/config';
import PageBanner from "../../components/common/PageBanner";
import AboutIntroSection from "../../components/about/AboutIntroSection";
import AboutMissionTabs from "../../components/about/AboutMissionTabs";
import TeamMembers from "../../components/about/TeamMembers";
import ClientelePortfolio from "../../components/about/ClientelePortfolio";
import OurAlliance from "../../components/about/OurAlliance";
import DownloadsSlider from "../../components/common/DownloadsSlider";

export default function AboutPage() {
    const [bannerData, setBannerData] = useState({ sub: "", bg: "" });

    useEffect(() => {
        fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`)
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    setBannerData({
                        sub: result.data.bs.about_seo_title,
                        bg: result.data.bs.breadcrumb
                    });
                }
            });
    }, []);

    return (
        <>
            <PageBanner
                title="About SIFS India"
                subtitle={bannerData.sub || "Leading forensic science laboratory in India"}
                bgImage={bannerData.bg || "/about/about-banner.png"}
            />

            <AboutIntroSection/>
            
            <AboutMissionTabs />
            <TeamMembers />
            <ClientelePortfolio />
            <OurAlliance />
            <DownloadsSlider />
        </>
    );
}
