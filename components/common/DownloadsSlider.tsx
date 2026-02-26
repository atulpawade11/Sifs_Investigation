"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { getDownloads } from '@/services/downloadService';
import { Skeleton } from '@/components/shared/Skeleton';
import { API_BASE_URL } from '@/lib/config'; // Import your config
import 'swiper/css';

const DownloadsSlider = () => {
  const [data, setData] = useState({
    items: [] as any[],
    title: "Downloads",
    subtitle: "Access Forensic Resources"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch both Downloads and Home API (for titles)
        const [downloadResult, homeRes] = await Promise.all([
          getDownloads(),
          fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`).then(res => res.json())
        ]);

        let cleanItems = [];
        if (downloadResult?.success) {
          cleanItems = (downloadResult.data.downloads || []).filter(
            (item: any) => item && item.title && item.title.trim() !== ""
          );
        }

        // Extract titles from Home API 'bs' object
        const homeBs = homeRes?.success ? homeRes.data.bs : null;

        setData({
          items: cleanItems,
          title: homeBs?.download_section_title || "Access Forensic Resources",
          subtitle: homeBs?.download_section_subtitle || "Downloads"
        });

      } catch (err) {
        console.error('Error loading downloads data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalCount = data.items.length;
  const isSlider = totalCount >= 12;

  if (loading) {
    return (
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-12 flex flex-col items-center space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto px-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-14 w-48 rounded-full" />
          ))}
        </div>
      </section>
    );
  }
  
  if (totalCount === 0) return null;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <p className="text-[#04063E] font-bold italic text-sm mb-2 uppercase tracking-widest">
          {data.subtitle}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          {data.title}
        </h2>
      </div>

      <div className="w-full px-4">
        {!isSlider ? (
          <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
            {data.items.map((item) => (
              <a
                key={item.id}
                href={item.download_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-gray-100 bg-white text-[#04063E] font-medium shadow-sm hover:border-[#04063E] hover:shadow-md transition-all whitespace-nowrap"
              >
                {item.title}
              </a>
            ))}
          </div>
        ) : (
          <div className="relative space-y-6">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView="auto"
              loop={true}
              speed={8000}
              autoplay={{ delay: 0, disableOnInteraction: false }}
              className="swiper-free-mode"
            >
              {data.items.slice(0, Math.ceil(totalCount / 2)).map((item) => (
                <SwiperSlide key={`r1-${item.id}`} style={{ width: 'auto' }}>
                  <a href={item.download_pdf} target="_blank" className="flex items-center px-8 py-4 rounded-full border border-gray-100 bg-white text-[#04063E] font-medium shadow-sm whitespace-nowrap">
                    {item.title}
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView="auto"
              loop={true}
              speed={8000}
              autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
              className="swiper-free-mode"
            >
              {data.items.slice(Math.ceil(totalCount / 2)).map((item) => (
                <SwiperSlide key={`r2-${item.id}`} style={{ width: 'auto' }}>
                  <a href={item.download_pdf} target="_blank" className="flex items-center px-8 py-4 rounded-full border border-gray-100 bg-white text-[#04063E] font-medium shadow-sm whitespace-nowrap">
                    {item.title}
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      <style jsx global>{`
        .swiper-free-mode .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};

export default DownloadsSlider;