"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import PageBanner from "../../../../components/common/PageBanner";
import ServiceSidebar from "../../../../components/services/ServiceSidebar";
import QueryForm from "../../../../components/services/QueryForm";
import ServiceDetailContent from "../../../../components/services/ServiceDetailContent";
import FAQAccordion from "../../../../components/services/FAQAccordion";
import { API_BASE_URL } from '@/lib/config';

export default function ServiceDetailPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const serviceSlug = params.service as string; // e.g., "fingerprint-in-DVI"

  const [detailData, setDetailData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        
        // 1. Fetch the data from your working endpoint
        const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services`);
        const result = await res.json();
        
        // Defensive Check: Ensure result.data and result.data.categories exist
        if (result?.success && result?.data?.categories) {
          const categories = result.data.categories;
          const cleanCatSlug = categorySlug.toLowerCase().replace(/[^a-z0-9]/g, '');
  
          // Find Category
          const foundCat = categories.find((c: any) => {
            const apiName = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            return apiName.includes(cleanCatSlug) || cleanCatSlug.includes(apiName);
          });
  
          if (foundCat) {
            // 2. Fetch services for this specific category
            const sRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?category=${foundCat.id}`);
            const sData = await sRes.json();
            
            if (sData?.success && sData?.data?.data) {
              // 3. Find the specific service matching the URL slug
              const targetService = sData.data.data.find((s: any) => 
                s.slug.toLowerCase() === serviceSlug.toLowerCase()
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
      <div className="animate-pulse text-[#04063E] font-bold">Retrieving Forensic Case File...</div>
    </div>
  );

  if (!detailData) return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800">Investigation Not Found</h2>
      <p className="text-gray-500 mt-2">The requested forensic service could not be located.</p>
    </div>
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <PageBanner 
        title={detailData.category_name || "Investigation Service"} 
        subtitle={detailData.title} 
        bgImage={detailData.main_image} 
      />
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4 space-y-8">
            <ServiceSidebar />
            <QueryForm serviceTitle={detailData?.title}/>
          </aside>
          <main className="lg:w-3/4">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
               {/* Pass the dynamic API data to your content component */}
               <ServiceDetailContent apiData={detailData} />
               <FAQAccordion />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}