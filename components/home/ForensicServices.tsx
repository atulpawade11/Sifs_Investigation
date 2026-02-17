"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { API_BASE_URL } from '@/lib/config';

interface ServiceCategory {
  id: number;
  name: string;
  short_text: string;
  image: string;
  serial_number: number;
}

const ForensicServices = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [sectionTitles, setSectionTitles] = useState({
    title: "Serving Justice Globally",
    subtitle: "Forensic Services"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);
        const result = await response.json();

        if (result.success && result.data) {
          // 1. Get Section Titles from 'bs'
          setSectionTitles({
            title: result.data.bs?.service_section_title || "Serving Justice Globally",
            subtitle: result.data.bs?.service_section_subtitle || "Forensic Services"
          });

          // 2. Get the Categories list from the JSON you provided
          if (result.data.serviceCategories) {
            // Sort by serial_number and take top 4 for the grid
            const sorted = result.data.serviceCategories
              .sort((a: any, b: any) => a.serial_number - b.serial_number)
              .slice(0, 4);
            setCategories(sorted);
          }
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Helper to resolve image paths
  const getImageUrl = (path: string | undefined) => {
    if (!path) return "/doc-exam.png";
    if (path.startsWith('http')) return path;
    
    // Most service icons are stored in the uploads folder
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
    return `${baseUrl}/uploads/Investigation-Services-Admin-ServiceCategory/${path}`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-10 flex justify-center items-center h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#04063E]"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative py-20 min-h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/forensic-bg.png')` 
      }}
    >
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-[#04063E] font-medium italic mb-2 uppercase tracking-widest text-sm">
            {sectionTitles.title}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            {sectionTitles.subtitle}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 group"
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 bg-[#04063E] rounded-full flex items-center justify-center mb-6 shadow-lg relative overflow-hidden transition-colors group-hover:bg-[#0B10A4]">
                <div className="relative w-7 h-7">
                    <Image 
                        src={getImageUrl(service.image)}
                        alt={service.name}
                        fill
                        className="object-contain brightness-0 invert" 
                        unoptimized
                    />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h3 className="font-bold text-black text-[15px] tracking-wide mb-3 uppercase line-clamp-2">
                  {service.name}
                </h3>
                <p className="text-[#868686] text-sm leading-relaxed mb-6 line-clamp-3">
                  {service.short_text}
                </p>
              </div>

              {/* Card Image */}
              <div className="relative w-full h-40 rounded-2xl overflow-hidden mt-auto">
                <Image
                  src={getImageUrl(service.image)}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForensicServices;