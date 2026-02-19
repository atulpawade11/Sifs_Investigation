"use client";

import React, { useEffect, useState, useMemo } from 'react';
import PageBanner from "@/components/common/PageBanner";
import CareerFilters from "@/components/career/CareerFilters";
import JobList from "@/components/career/JobList";
import LoadMoreButton from "@/components/career/LoadMoreButton";
import CareerFAQSection from "@/components/career/CareerFAQSection";
import DownloadsSlider from "@/components/common/DownloadsSlider";
import { API_BASE_URL } from '@/lib/config';
import { Loader2 } from "lucide-react";

export default function CareerClient() {
  const [careerData, setCareerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/career/`);
        const json = await response.json();
        if (json.success) setCareerData(json.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const filteredJobs = useMemo(() => {
    const jobsArray = careerData?.data || [];
    return jobsArray.filter((job: any) => {
      const matchSearch = job.title?.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || job.category_name === category;
      return matchSearch && matchCategory;
    });
  }, [search, category, careerData]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin h-10 w-10 text-[#0B10A4]" />
    </div>
  );

  return (
    <>
      <PageBanner 
        title={careerData?.be?.career_title || "Careers"} 
        subtitle={careerData?.be?.career_subtitle} 
        bgImage="/about/about-banner.png" 
      />
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-10">
          <CareerFilters 
            search={search} 
            setSearch={setSearch} 
            category={category} 
            setCategory={setCategory} 
            categories={["All", ...(careerData?.jcats?.map((c: any) => c.name) || [])]} 
          />
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[10px] font-bold text-black uppercase tracking-[2px]">
              Available Positions ({filteredJobs.length})
            </p>
          </div>
          <JobList jobs={filteredJobs.slice(0, visible)} />
          <LoadMoreButton 
            canLoadMore={visible < filteredJobs.length} 
            canLoadLess={visible > 4}
            onLoadMore={() => setVisible(prev => prev + 4)} 
            onLoadLess={() => setVisible(4)}
          />
        </div>
      </section>
      <CareerFAQSection />
      <DownloadsSlider />
    </>
  );
}