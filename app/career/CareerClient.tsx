"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import PageBanner from "@/components/common/PageBanner";
import CareerFilters from "@/components/career/CareerFilters";
import JobList from "@/components/career/JobList";
import LoadMoreButton from "@/components/career/LoadMoreButton";
import CareerFAQSection from "@/components/career/CareerFAQSection";
import DownloadsSlider from "@/components/common/DownloadsSlider";
import { API_BASE_URL } from '@/lib/config';
import { Loader2 } from "lucide-react";

export default function CareerClient({ initialData }: { initialData: any }) {
  // Use initialData if available, otherwise start with null
  const [careerData, setCareerData] = useState<any>(initialData);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(4);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const isFirstRender = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchCareers = useCallback(async (isFilterChange: boolean = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (debouncedSearch) params.append('search', debouncedSearch);
      
      if (category !== "All" && careerData?.jcats) {
        const selectedCat = careerData.jcats.find((c: any) => c.name === category);
        if (selectedCat) params.append('category', selectedCat.id.toString());
      }

      const url = `${API_BASE_URL}/InvestigationServices/Website/front/career/?${params.toString()}`;

      // Bypass cache here as well
      const response = await fetch(url, { cache: 'no-store' });
      const json = await response.json();

      if (json.success) {
        setCareerData(json.data);
        if (isFilterChange) setVisible(4);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category]);

  useEffect(() => {
    // Skip fetching on mount because we have initialData from the server
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchCareers(true);
  }, [fetchCareers]);

  const jobs = careerData?.data || [];
  const totalFound = jobs.length;

  // Final Layout (Unchanged)
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
              Available Positions ({totalFound})
            </p>
          </div>

          <div className={`transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"}`}>
            <JobList jobs={jobs.slice(0, visible)} />
            {!loading && totalFound === 0 && (
              <div className="py-20 text-center text-gray-400 italic text-sm">
                No positions found.
              </div>
            )}
          </div>

          <LoadMoreButton 
            canLoadMore={visible < totalFound} 
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