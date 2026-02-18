"use client";

import React, { useEffect, useState } from 'react';
import { getTestimonials } from '@/services/testimonialService';
import { Skeleton } from '@/components/shared/Skeleton';

export default function Testimonials() {
  const [data, setData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getTestimonials();
        if (res) setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Safe data extraction
  const testimonialList = data?.data?.data || [];
  const testimonialTitle = data?.data?.bs?.testimonial_title || "Success Stories";
  const testimonialSubtitle = data?.data?.bs?.testimonial_subtitle || "Hear What Our Clients Say";

  const visibleItems = isExpanded ? testimonialList : testimonialList.slice(0, 4);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-[#F3F1F2] py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-xl space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-12 w-96" />
          </div>
          <div className="flex gap-6 mt-12 overflow-x-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[360px] rounded-2xl border border-[#D8D8D8] bg-white/50 p-8 space-y-6">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (testimonialList.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#F3F1F2] py-24">
      <div className="mx-auto max-w-7xl px-4">

        {/* ---------- TITLE ---------- */}
        <div className="relative z-0 max-w-xl">
          <p className="text-sm font-medium text-[#04063E]">
            {testimonialTitle}
          </p>
          <h2 className="mt-2 text-[42px] font-bold leading-tight text-gray-900">
            {testimonialSubtitle}
          </h2>
        </div>

        {/* ---------- VIEW ALL BUTTON ---------- */}
        <div className="absolute right-10 top-24 hidden md:block">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gradient-to-r from-[#0B10A4] to-[#04063E] text-white px-8 py-3 rounded-full font-bold flex items-center gap-4 cursor-pointer border-none"
          >
            {isExpanded ? "Show Less ↑" : "View All →"}
          </button>
        </div>

        {/* ---------- CARDS ---------- */}
        <div className={`relative z-10 mt-[-50px] transition-all duration-500 ${isExpanded ? 'w-[135%] ml-auto' : 'ml-auto w-[135%]'}`}>
          <div className={`flex gap-6 ${isExpanded ? 'flex-wrap ' : 'overflow-x-auto no-scrollbar pb-4'}`}>
            {visibleItems.map((item: any, index: number) => (
              <div
                key={item?.id || index}
                className="min-w-[360px] max-w-[360px] rounded-2xl border border-[#D8D8D8] bg-[#F3F1F2]/30 p-8 backdrop-blur-sm mt-8 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1C274C] text-xl text-white">
                    <span style={{ fontFamily: 'serif', fontSize: '24px' }}>“</span>
                  </div>
                  <p className="mb-8 text-[18px] leading-relaxed text-black">
                    {item?.comment}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-15 w-15 items-center justify-center rounded-full bg-[#DADCD2] overflow-hidden border border-gray-200">
                    {item?.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-contain p-2"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-[18px] font-bold text-black leading-tight">
                      {item?.name}
                    </p>
                    <p className="text-[14px] text-black">
                      {item?.rank}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Button */}
        <div className="mt-10 md:hidden flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gradient-to-r from-[#0B10A4] to-[#04063E] text-white px-8 py-3 rounded-full font-bold"
          >
            {isExpanded ? "Show Less" : "View All"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}