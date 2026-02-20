"use client";

import React, { useEffect, useState } from 'react';
import { useParams, notFound } from "next/navigation";
import DynamicDetailPage from "../../../components/shared/DynamicDetailPage";
import { API_BASE_URL } from '@/lib/config';                                                                                                                                                                                                                                                                                    
import { Skeleton } from '@/components/shared/Skeleton';

export default function LaboratoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLabData() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/laboratory/${slug}`);
        const result = await res.json();

        if (result.success && result.data?.page) {
          const p = result.data.page;

          const mappedData = {
            title: p.name,
            banner: {
              title: p.title,
              subtitle: p.subtitle,
              bgImage: "/images/laboratory-banner.jpg" 
            },
            overview: {
              heading: p.heading_1,
              description: [p.body_1.replace(/<[^>]*>/g, '').slice(0, 500) + '...'], 
              image: "/images/lab-overview.jpg" 
            },
            pillLabel: "Scientific Methodology",
            tabs: [
              { title: p.heading_2, description: p.body_2, image: "/images/methodology.jpg" },
              { title: p.heading_3, description: p.body_3, image: "/images/services.jpg" },
              { title: p.heading_4, description: p.body_4, image: "/images/equipment.jpg" }
            ],
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

  // --- LABORATORY PAGE SKELETON ---
  const LaboratorySkeleton = () => (
    <div className="bg-white min-h-screen">
      {/* Banner Skeleton */}
      <div className="w-full h-[400px] bg-gray-100 flex flex-col items-center justify-center space-y-4">
        <Skeleton className="h-6 w-48 bg-gray-200" />
        <Skeleton className="h-12 w-96 bg-gray-200" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 space-y-24">
        {/* Overview Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <Skeleton className="aspect-video w-full rounded-3xl" />
        </div>

        {/* Tabs Section Skeleton */}
        <div className="space-y-10">
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-32 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
          <div className="bg-gray-50 p-8 rounded-[2rem]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <LaboratorySkeleton />;

  if (!pageData) return notFound();

  return <DynamicDetailPage data={pageData} />;
}