"use client";

import PageBanner from "../common/PageBanner";
import PageHeaderDropdown from "./PageHeaderDropdown";
import OverviewSection from "./OverviewSection";
import CTASection from "./CTASection";
import MainAccordionSection from "./MainAccordionSection";
import { useBoot } from "@/context/BootContext";

// Define the type
interface DynamicPageData {
  title?: string;
  banner?: {
    title?: string;
    subtitle?: string;
  };
  overview?: {
    heading?: string;
    description?: string;
    image?: string;
  };
  accordions?: {
    id: string;
    title: string;
    content: string;
  }[];
  cta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  videoId?: string | null;
}

export default function DynamicDetailPage({ data }: { data: DynamicPageData }) {
  const { breadcrumbImage } = useBoot();

  if (!data) return null;

  // Build accordion items correctly
  const mainAccordionItems = [
    {
      id: "overview",
      title: data.overview?.heading || "Overview",
      content: (
        <OverviewSection
          heading={data.overview?.heading || "Overview of Laboratory"}
          description={data.overview?.description || ""}
          image={data.overview?.image || ""}
        />
      )
    },

    // Dynamic sections
    ...(data.accordions || []).map((item) => ({
      id: item.id,
      title: item.title,
      content: (
        <div
          className="prose max-w-none text-gray-600
          [&>p]:mb-4 [&>p]:text-justify
          [&>b]:font-semibold"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      )
    }))
  ];

  return (
    <div className="bg-white">
      <PageBanner
        title={data.banner?.title || "Laboratory"}
        subtitle={data.banner?.subtitle || "SIFS India"}
        breadcrumbImage={breadcrumbImage}
      />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <MainAccordionSection items={mainAccordionItems} />

        {/* Video */}
        {data.videoId && (
          <div className="mt-16">
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${data.videoId}`}
                allowFullScreen
              />
            </div>
          </div>
        )}

        {data.cta && (
          <CTASection
            title={data.cta.title || "Connect with Our Experts"}
            description={data.cta.description || "No matter where you are located, we're here to help."}
            image={data.cta.image || "/images/cta-lab.jpg"}
          />
        )}
      </section>
    </div>
  );
}