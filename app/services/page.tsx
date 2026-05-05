// app/services/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/shared/Skeleton';
import PageBanner from '@/components/common/PageBanner';
import { useBoot } from "@/context/BootContext";

const ITEMS_PER_PAGE = 6;

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const { breadcrumbImage } = useBoot();

  const getShortText = (html: string) => {
    if (!html || typeof html !== 'string') return "";
    
    const text = html.replace(/<[^>]*>/g, ' ');
    const cleanText = text
      .replace(/\s+/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .trim();
    
    if (cleanText.length > 200) {
      return cleanText.substring(0, 200).trim() + '...';
    }
    return cleanText;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        let allServices: any[] = [];
        
        const firstRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?page=1&per_page=100`);
        const data = await firstRes.json();
        
        if (data.success && data.data) {
          allServices = data.data.data || [];
          
          const totalPages = data.data.pagination?.total_pages || 1;
          for (let page = 2; page <= totalPages; page++) {
            const pageRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?page=${page}&per_page=100`);
            const pageData = await pageRes.json();
            if (pageData.success && pageData.data) {
              allServices = [...allServices, ...(pageData.data.data || [])];
            }
          }
          
          const allCategories = data.data.categories || [];
          
          const activeCategories = allCategories
            .filter((cat: any) => cat.status === 1)
            .sort((a: any, b: any) => a.serial_number - b.serial_number);

          const servicesWithCategory = allServices
            .filter((s: any) => activeCategories.some((cat: any) => cat.id === s.scategory_id))
            .map((s: any) => {
              const category = activeCategories.find((cat: any) => cat.id === s.scategory_id);
              return {
                ...s,
                categoryName: category?.name || '',
                categorySlug: category?.id || '',
                shortText: getShortText(s.content || ''),
              };
            })
            .sort((a: any, b: any) => (a.serial_number || 999) - (b.serial_number || 999));
          
          setServices(servicesWithCategory);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleToggle = () => {
    if (visibleCount >= services.length) {
      setVisibleCount(ITEMS_PER_PAGE);
    } else {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, services.length));
        setLoadingMore(false);
      }, 500);
    }
  };

  const visibleServices = services.slice(0, visibleCount);
  const hasMore = services.length > ITEMS_PER_PAGE;
  const isShowingAll = visibleCount >= services.length;

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B10A4]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageBanner
        title="SIFS India Services"
        subtitle="Expert & Trusted Forensic Service"
        breadcrumbImage={breadcrumbImage || "/about/about-banner.png"}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">
        {/* Title + Subtitle INLINE */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-36">
            <h2 className="text-2xl md:text-3xl font-bold text-[#04063E] whitespace-nowrap">
              We Provide Smart <br /> Solutions.
            </h2>
            <p className="text-gray-500 text-base text-right leading-relaxed">
              We have experts in countless forensic services such as Document Examination, Fingerprint Development, 
              Cyber Forensic, Speaker Identification, Mobile Forensics, Fire Forensic etc.
            </p>
          </div>
        </div>

        {/* Full Width Featured Image */}
        <div className="mb-16 rounded-2xl overflow-hidden">
          <img
            src="/services/service-list1.png"
            alt="Forensic Services"
            className="w-full h-64 md:h-96 object-cover rounded-2xl"
          />
        </div>

        {/* Services List */}
        <div className="relative">
          <div className="space-y-0">
            {visibleServices.map((service, index) => (
              <div 
                key={service.id} 
                className="py-8 border-b border-gray-200"
              >
                {/* Number + Title + Image INLINE */}
                <div className="flex gap-8 items-start">
                  <Link
                    href={`/services/${service.categorySlug}/${service.slug}`}
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center transition-colors duration-300 group/num"
                  >
                    <span className="text-lg md:text-[36px] font-bold text-[#000000] group-hover/num:text-white transition-colors duration-300">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </Link>

                  <div className="flex-1">
                    <Link href={`/services/${service.categorySlug}/${service.slug}`}>
                      <h3 className="text-xl md:text-[24px] font-regular text-[#000000] hover:text-[#0B10A4] transition-colors mb-1">
                        {service.title}
                      </h3>
                    </Link>
                    {service.shortText && (
                      <p className="text-black font-regular text-base md:text-[14px] leading-relaxed mb-2">
                        {service.shortText}
                      </p>
                    )}
                    <Link
                      href={`/services/${service.categorySlug}/${service.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#0B10A4] hover:text-[#F68A07] transition-colors group/link"
                    >
                      Read More
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {service.main_image && (
                    <div className="flex-shrink-0 w-56 h-32 rounded-lg overflow-hidden bg-gray-100 ml-4">
                      <img
                        src={service.main_image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasMore && !isShowingAll && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          )}
        </div>

        {hasMore && (
          <div className="mt-12 text-center relative z-10">
            <button
              onClick={handleToggle}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 border-2 border-[#0B10A4] text-[#0B10A4] px-8 py-2 rounded-full font-semibold text-lg  transition-all duration-300 disabled:opacity-50b bg-gradient-to-r from-[#0B10A4] to-[#04063E] text-white"
            >
              {loadingMore ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Loading...
                </>
              ) : isShowingAll ? (
                <>
                  Show Less
                  <ChevronUp size={20} />
                </>
              ) : (
                <>
                  Show More
                  <ChevronDown size={20} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}