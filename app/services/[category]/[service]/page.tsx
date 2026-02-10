"use client";

import React from 'react';
import { useParams } from 'next/navigation'; 
import { servicesData } from '../../../../data/services'; 
import PageBanner from "../../../../components/common/PageBanner";
import ServiceSidebar from "../../../../components/services/ServiceSidebar";
import QueryForm from "../../../../components/services/QueryForm";
import ServiceDetailContent from "../../../../components/services/ServiceDetailContent";
import FAQAccordion from "../../../../components/services/FAQAccordion";

export default function ServiceDetailPage() {
  const params = useParams();
  
  const categorySlug = params.category as string;
  const serviceSlug = params.service as string;

  const categoryData = servicesData[categorySlug as keyof typeof servicesData];
  const subService = categoryData?.subServices.find(s => s.slug === serviceSlug);

  const dynamicSubtitle = subService ? subService.title : "Forensic Services";

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
        <PageBanner
            title="Service Details"
            subtitle={dynamicSubtitle} 
            bgImage="/about/about-banner.png"
        />

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="lg:w-1/4 space-y-8">
            <ServiceSidebar />
            <QueryForm />
          </aside>

          <main className="lg:w-3/4 space-y-12">
            <ServiceDetailContent category={categorySlug} service={serviceSlug} />
            
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#04063E]">Forensic Examination Enquiries</h2>
                <p className="text-gray-400 text-xs mt-1">Frequently Asked Questions</p>
              </div>
              <FAQAccordion />
            </section>
          </main>
          
        </div>
      </div>
    </div>
  );
}