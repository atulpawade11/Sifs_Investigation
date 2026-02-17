"use client";

import React, { useEffect, useState, useMemo } from 'react';
import PageBanner from "@/components/common/PageBanner";
import CareerFilters from "@/components/career/CareerFilters";
import JobList from "@/components/career/JobList";
import LoadMoreButton from "@/components/career/LoadMoreButton";
import CareerFAQSection from "@/components/career/CareerFAQSection";
import DownloadsSlider from "@/components/common/DownloadsSlider";
import { API_BASE_URL } from '@/lib/config';

export default function CareerPage() {
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
        
        if (json.success) {
          setCareerData(json.data); 
          
          // --- Dynamic SEO Injection ---
          if (json.data.be) {
            const { career_meta_title, career_meta_description, career_meta_keywords } = json.data.be;
            
            // Update Tab Title
            document.title = career_meta_title || "Careers";

            // Update or Create Description Meta Tag
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
              metaDesc = document.createElement('meta');
              metaDesc.setAttribute('name', 'description');
              document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', career_meta_description || "");

            // Update or Create Keywords Meta Tag
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
              metaKeywords = document.createElement('meta');
              metaKeywords.setAttribute('name', 'keywords');
              document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', career_meta_keywords || "");
          }
        }
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
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0B10A4]"></div>
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
            {category !== "All" && (
              <button 
                onClick={() => setCategory("All")}
                className="text-[10px] font-bold text-[#0B10A4] uppercase underline"
              >
                Show All
              </button>
            )}
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