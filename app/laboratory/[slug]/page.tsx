"use client";

import React, { useEffect, useState } from 'react';
import { useParams, notFound } from "next/navigation";
import DynamicDetailPage from "../../../components/shared/DynamicDetailPage";
import { API_BASE_URL } from '@/lib/config';
import { Loader2 } from 'lucide-react';

export default function LaboratoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLabData() {
      try {
        setLoading(true);
        // Replace this with your specific Laboratory API endpoint if different
        const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/laboratory/${slug}`);
        const result = await res.json();

        if (result.success && result.data?.page) {
          const p = result.data.page;

          // Mapping API to your PageData Interface
          const mappedData = {
            title: p.name,
            banner: {
              title: p.title,
              subtitle: p.subtitle,
              bgImage: "/images/laboratory-banner.jpg" // Fallback or logic to match slug
            },
            overview: {
              heading: p.heading_1,
              // Convert HTML string into an array of paragraphs for your OverviewSection
              description: [p.body_1.replace(/<[^>]*>/g, '').slice(0, 500) + '...'], 
              image: "/images/lab-overview.jpg" 
            },
            pillLabel: "Scientific Methodology",
            // Mapping headings 2, 3, and 4 into your TabbedContentSection
            tabs: [
              { title: p.heading_2, description: p.body_2, image: "/images/methodology.jpg" },
              { title: p.heading_3, description: p.body_3, image: "/images/services.jpg" },
              { title: p.heading_4, description: p.body_4, image: "/images/equipment.jpg" }
            ],
            // Use meta keywords or default for accordions
            accordions: [
                { title: "Expertise & Certification", content: p.meta_description },
                { title: "Legal Admissibility", content: "Our laboratory findings are prepared following strict forensic protocols to ensure they are admissible as evidence in legal proceedings." }
            ],
            cta: {
              title: "Consult Our Laboratory Experts",
              description: "Get precise and accurate examination reports for your legal or private investigations.",
              image: "/images/cta-lab.jpg"
            }
          };
          setPageData(mappedData);
        }
      } catch (err) {
        console.error("Lab Page Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchLabData();
  }, [slug]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-[#0B4F8A]" size={40} />
    </div>
  );

  if (!pageData) return notFound();

  return <DynamicDetailPage data={pageData} />;
}