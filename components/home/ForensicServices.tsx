"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/shared/Skeleton';
import { 
  FileText, 
  Fingerprint, 
  Search, 
  ShieldCheck, 
  Gavel, 
  Microscope, 
  HardDrive, 
  UserCheck 
} from 'lucide-react';

// Helper to pick icons based on keywords in service name
const getServiceIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('document') || n.includes('handwriting')) return <FileText className="w-7 h-7" />;
  if (n.includes('fingerprint')) return <Fingerprint className="w-7 h-7" />;
  if (n.includes('cyber') || n.includes('digital') || n.includes('computer')) return <HardDrive className="w-7 h-7" />;
  if (n.includes('investigation')) return <Search className="w-7 h-7" />;
  if (n.includes('legal') || n.includes('court')) return <Gavel className="w-7 h-7" />;
  if (n.includes('dna') || n.includes('biology') || n.includes('chemical')) return <Microscope className="w-7 h-7" />;
  if (n.includes('verification') || n.includes('background')) return <UserCheck className="w-7 h-7" />;
  return <ShieldCheck className="w-7 h-7" />; 
};

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
    if (!path) return "/placeholder.png";
    if (path.startsWith('http')) return path;
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
    return `${baseUrl}/uploads/Investigation-Services-Admin-ServiceCategory/${path}`;
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-12 space-y-4 text-center">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-10 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-[32px] p-6 space-y-6 shadow-sm border border-slate-100">
                <Skeleton className="h-14 w-14 rounded-2xl" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
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
      className="relative py-16 flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.94)), url('/forensic-bg.png')`
      }}
    >
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="mb-12 text-center">
          <p className="text-[#04063E] font-medium mb-2 uppercase tracking-wide">
            {sectionTitles.title}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            {sectionTitles.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((service) => (
            <Link 
              key={service.id} 
              href={`/services/${slugify(service.name)}`} 
              className="group"
            >
              <div className="bg-white rounded-[32px] p-3 shadow-xl shadow-slate-200/60 flex flex-col h-full hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-slate-100">
                
                {/* ICON BOX */}
                <div className="w-14 h-14 bg-[#04063E] text-white rounded-2xl flex items-center justify-center mb-3 shadow-lg transition-colors group-hover:bg-[#0B10A4]">
                  {getServiceIcon(service.name)}
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-black text-[16px] tracking-wide mb-3 uppercase line-clamp-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-md leading-relaxed mb-3 line-clamp-3">
                    {service.short_text}
                  </p>
                </div>

                {/* IMAGE BOX - Now using object-contain to prevent cutting */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mt-auto bg-[#F9F9F9] border border-slate-100 p-4">
                  <Image
                    src={getImageUrl(service.image)}
                    alt={service.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
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