"use client";

import React, { useEffect, useState } from 'react';
import PageBanner from "../../../../components/common/PageBanner";
import ServiceSidebar from "../../../../components/services/ServiceSidebar";
import QueryForm from "../../../../components/services/QueryForm";
import ServiceDetailContent from "../../../../components/services/ServiceDetailContent";
import FAQAccordion from "../../../../components/services/FAQAccordion";
import { API_BASE_URL } from '@/lib/config';

interface Props {
  categorySlug: string;
  serviceSlug: string;
}

export default function ServiceDetailClient({ categorySlug, serviceSlug }: Props) {
  const [detailData, setDetailData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services`);
        const result = await res.json();
        
        if (result?.success && result?.data?.categories) {
          const categories = result.data.categories;
          const cleanCatSlug = decodeURIComponent(categorySlug).toLowerCase().replace(/[^a-z0-9]/g, '');
  
          const foundCat = categories.find((c: any) => {
            const apiName = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            return apiName.includes(cleanCatSlug) || cleanCatSlug.includes(apiName);
          });
  
          if (foundCat) {
            const sRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?category=${foundCat.id}`);
            const sData = await sRes.json();
            
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

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[#04063E] font-bold tracking-widest animate-pulse">
          OPENING FORENSIC FILE...
        </div>
      </div>
    </div>
  );

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
               <ServiceSidebar />
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