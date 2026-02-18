"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { getDownloads } from '@/services/downloadService';
import { Skeleton } from '@/components/shared/Skeleton';
import 'swiper/css';

const DownloadsSlider = () => {
  const [data, setData] = useState({
    items: [] as any[],
    title: "Downloads",
    subtitle: "Access Forensic Resources"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDownloads = async () => {
      try {
        setLoading(true);
        const result = await getDownloads();

        if (result?.success) {
          const cleanItems = (result.data.downloads || []).filter(
            (item: any) => item && item.title && item.title.trim() !== ""
          );

          setData({
            items: cleanItems,
            title: result.data.bs?.download_section_title || result.data.title || "Downloads",
            subtitle: result.data.bs?.download_section_subtitle || result.data.subtitle || "Access Forensic Resources"
          });
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDownloads();
  }, []);

  const totalCount = data.items.length;

  // NEW THRESHOLD: Only slide if we have at least 12 items.
  // With 9 items, Layout 1 (Centered) will look much better.
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
          /* LAYOUT 1: CENTERED GRID (Best for 1-11 items) */
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
          /* LAYOUT 2: MARQUEE SLIDER (Best for 12+ items) */
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