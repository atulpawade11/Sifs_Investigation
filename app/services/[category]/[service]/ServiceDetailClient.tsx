"use client";

import React, { useEffect, useState } from 'react';
import PageBanner from "../../../../components/common/PageBanner";
import ServiceSidebar from "../../../../components/services/ServiceSidebar";
import QueryForm from "../../../../components/services/QueryForm";
import ServiceDetailContent from "../../../../components/services/ServiceDetailContent";
import FAQAccordion from "../../../../components/services/FAQAccordion";
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/shared/Skeleton';

interface Props {
  categorySlug: string;
  serviceSlug: string;
}

export default function ServiceDetailClient({ categorySlug, serviceSlug }: Props) {
  const [detailData, setDetailData] = useState<any>(null);
  const [sidebarData, setSidebarData] = useState<any>(null); // Added this to fix "data is not defined"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services`);
        const result = await res.json();
        
        if (result?.success && result?.data?.categories) {
          // Store the result data for the sidebar
          setSidebarData(result.data); 

          const categories = result.data.categories;
          const cleanCatSlug = decodeURIComponent(categorySlug).toLowerCase().replace(/[^a-z0-9]/g, '');
  
          const foundCat = categories.find((c: any) => {
            const apiName = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            return apiName.includes(cleanCatSlug) || cleanCatSlug.includes(apiName);
          });
  
          if (foundCat) {
            const sRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?category=${foundCat.id}`);
            const sData = await sRes.json();
            
            // Update sidebar data with the specific services of the found category
            if (sData?.success) {
                setSidebarData(sData.data);
            }
            
            if (sData?.success && sData?.data?.data) {
              const decodedServiceSlug = decodeURIComponent(serviceSlug).toLowerCase();
              const targetService = sData.data.data.find((s: any) => 
                s.slug.toLowerCase() === decodedServiceSlug
              );
  
              if (targetService) {
                setDetailData(targetService);
              }
            }
          }
        }
      } catch (err) {
        console.error("Detail Page Error:", err);
      } finally {
        setLoading(false);
      }
    }
    if (categorySlug && serviceSlug) loadDetail();
  }, [categorySlug, serviceSlug]);

  // --- SERVICE DETAIL SKELETON ---
  const ServiceDetailSkeleton = () => (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Banner Skeleton */}
      <div className="w-full h-[300px] bg-gray-200 animate-pulse flex flex-col items-center justify-center space-y-4">
        <Skeleton className="h-6 w-40 bg-gray-300" />
        <Skeleton className="h-10 w-80 bg-gray-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-16 relative">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Skeleton */}
          <aside className="lg:w-1/3 xl:w-1/4 space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-[400px] w-full rounded-2xl" /> {/* Sidebar box */}
              <Skeleton className="h-[300px] w-full rounded-2xl" /> {/* Form box */}
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <main className="lg:w-2/3 xl:w-3/4">
            <div className="bg-white p-6 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 space-y-8">
              <Skeleton className="w-full aspect-video rounded-2xl" /> {/* Featured Image */}
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" /> {/* Title placeholder */}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="pt-12 space-y-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );

  if (loading) return <ServiceDetailSkeleton />;

  if (!detailData) return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-[#04063E]">Investigation Not Found</h2>
      <p className="text-gray-500 mt-2">The requested forensic service could not be located.</p>
    </div>
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <PageBanner 
        title={detailData.category_name || "Investigation Service"} 
        subtitle={detailData.title} 
        bgImage={detailData.main_image || "/about/about-banner.png"} 
      />
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-16 relative">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/3 xl:w-1/4 space-y-8">
            <div className="sticky top-28">
               {/* Updated this to use sidebarData instead of undefined data */}
               <ServiceSidebar apiData={sidebarData} />
               <div className="mt-8">
                 <QueryForm serviceTitle={detailData?.title}/>
               </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-2/3 xl:w-3/4">
            <div className="bg-white p-6 md:p-12 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100">
               <div className="mb-10 overflow-hidden rounded-2xl border-b-4 border-[#96C11F]">
                  <img 
                    src={detailData.featured_image || detailData.main_image} 
                    alt={detailData.title} 
                    className="w-full h-auto object-cover max-h-[400px]"
                  />
               </div>
               
               <ServiceDetailContent apiData={detailData} />
               
               <div className="mt-12 pt-12 border-t border-gray-100">
                 <h4 className="text-xl font-bold text-[#04063E] mb-6">Frequently Asked Questions</h4>
                 <FAQAccordion />
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}