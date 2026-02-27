"use client";

import PageBanner from "../common/PageBanner";
import PageHeaderDropdown from "./PageHeaderDropdown";
import OverviewSection from "./OverviewSection";
import PillDivider from "./PillDivider";
import TabbedContentSection from "./TabbedContentSection";
import AccordionSection from "./AccordionSection";
import CTASection from "./CTASection";
import { useBoot } from "@/context/BootContext";


// This interface matches the "mappedData" we created in your Laboratory page
interface DynamicPageProps {
  data: {
    title: string;
    banner: {
      title: string;
      subtitle: string;
      bgImage?: string;
    };
    overview: {
      heading: string;
      description: string; // HTML string from body_1
      image: string;
    };
    pillLabel: string;
    tabs: Array<{
      title: string;
      description: string;
      image: string;
    }>;
    accordions: Array<{
      title: string;
      content: string;
    }>;
    cta: {
      title: string;
      description: string;
      image: string;
    };
    videoId?: string; // Captured from video_id in your JSON
  };
}

export default function DynamicDetailPage({ data }: DynamicPageProps) {
  const { breadcrumbImage } = useBoot();
  return (
    <div className="bg-white">
      {/* 1. Page Banner */}
      <PageBanner
        title={data.banner?.title ?? "Laboratory"}
        subtitle={data.banner?.subtitle ?? "SIFS India"}
        breadcrumbImage={breadcrumbImage}
      />

      <section className="max-w-7xl mx-auto px-4 py-10">
        {/* 2. Top Navigation Dropdown */}
        <PageHeaderDropdown title={data.title} />

        {/* 3. Overview Section (Handles the main text) */}
        <OverviewSection {...data.overview} />

        {/* 4. Visual Label Divider */}
        <PillDivider label={data.pillLabel} />

        {/* 5. Methodology, Services, and Equipment Tabs */}
        <TabbedContentSection tabs={data.tabs} />

        {/* 6. Video Showcase Section (Renders only if video_id exists) */}
        {data.videoId && (
          <div className="mt-20 mb-10">
            <h3 className="text-2xl font-bold text-[#0B4F8A] mb-8 border-l-4 border-[#F68A07] pl-4">
              Laboratory Video Showcase
            </h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${data.videoId}`}
                title="Lab Procedure Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* 7. Additional Info / Metadata Accordions */}
        <div className="mt-16">
          <AccordionSection items={data.accordions} />
        </div>

        {/* 8. Call to Action Banner */}
        {/*<CTASection {...data.cta} /> */}
      </section>
    </div>
  );
}