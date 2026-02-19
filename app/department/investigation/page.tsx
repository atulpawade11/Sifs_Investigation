"use client";

import React, { useEffect, useState } from 'react';
import PageBanner from "@/components/common/PageBanner";
import HeroSection from "@/components/department/HeroSection";
import CoreServices from "@/components/department/CoreServices";
import WhyChooseUs from "@/components/department/WhyChooseUs";
import ContactBanner from "@/components/department/ContactBanner";
import { API_BASE_URL } from '@/lib/config';
import { Loader2 } from 'lucide-react';

export default function ForensicInvestigationPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDeptData() {
      try {
        // Fetching specifically for the forensic-investigations slug
        const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/page/forensic-investigations`);
        const result = await res.json();
        if (result.success) {
          setData(result.data.page);
        }
      } catch (err) {
        console.error("Error fetching investigation data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDeptData();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-[#0B4F8A]" size={40} />
    </div>
  );

  return (
    <main className="bg-white min-h-screen">
      <PageBanner
        title={data?.title || "Forensic Investigation"}
        subtitle={data?.subtitle || "SIFS India Department"}
        bgImage="/about/about-banner.png"
      />

      {/* Passing the rich HTML 'body' to the HeroSection */}
      <HeroSection 
        name={data?.name}
        content={data?.body} 
      />

      {/* These sections can remain static or be toggled based on page status */}
      <CoreServices />
      <WhyChooseUs />
      <ContactBanner />
    </main>
  );
}