"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/shared/Skeleton';

// Helper to match the logic in your ServiceSidebar
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

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
          setSectionTitles({
            title: result.data.bs?.service_section_title || "Serving Justice Globally",
            subtitle: result.data.bs?.service_section_subtitle || "Forensic Services"
          });

          if (result.data.serviceCategories) {
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

  const getImageUrl = (path: string | undefined) => {
    if (!path) return "/doc-exam.png";
    if (path.startsWith('http')) return path;
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
    return `${baseUrl}/uploads/Investigation-Services-Admin-ServiceCategory/${path}`;
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-12 space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-64" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-[32px] p-6 space-y-6 shadow-sm border border-slate-100">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-40 w-full rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative py-12 min-h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/forensic-bg.png')`
      }}
    >
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="mb-12">
          <p className="text-[#04063E] font-medium italic mb-2 uppercase tracking-widest text-sm">
            {sectionTitles.title}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            {sectionTitles.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((service) => (
            <Link 
              key={service.id} 
              // We now slugify the name to match your Sidebar/Route logic
              href={`/services/${slugify(service.name)}`} 
              className="group"
            >
              <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-[#04063E] rounded-full flex items-center justify-center mb-6 shadow-lg relative overflow-hidden transition-colors group-hover:bg-[#0B10A4]">
                  <div className="relative w-7 h-7">
                    <Image
                      src={getImageUrl(service.image)}
                      alt={service.name}
                      fill
                      className="object-contain invert"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-black text-[15px] tracking-wide mb-3 uppercase line-clamp-2">
                    {service.name}
                  </h3>
                  <p className="text-[#868686] text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.short_text}
                  </p>
                </div>

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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForensicServices;