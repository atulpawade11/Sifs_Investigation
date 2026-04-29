"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
import { ArrowRight } from 'lucide-react';
import { getTestimonials } from '@/services/testimonialService';
import { Skeleton } from '@/components/shared/Skeleton';
import { API_BASE_URL } from '@/lib/config';

export default function Testimonials() {
  const [data, setData] = useState<any>(null);
  const [homeBs, setHomeBs] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [testRes, homeRes] = await Promise.all([
          getTestimonials(),
          fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`).then(res => res.json())
        ]);

        if (testRes) setData(testRes);
        if (homeRes?.success) setHomeBs(homeRes.data.bs);

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const testimonialList = data?.data?.data || [];
  const testimonialTitle = homeBs?.testimonial_title || "Success Stories";
  const testimonialSubtitle = homeBs?.testimonial_subtitle || "Hear What Our Clients Say";

  const visibleItems = testimonialList.slice(0, 4);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-[#F3F1F2] py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-xl mx-auto space-y-4 text-center">
            <Skeleton className="h-5 w-32 mx-auto" />
            <Skeleton className="h-12 w-96 mx-auto" />
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
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonialList.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#F3F1F2] py-16">
      <div className="container mx-auto px-4 md:px-10">

        {/* ---------- TITLE (Centered) ---------- */}
        <div className="relative z-0 max-w-xl">
          <p className="text-[#04063E] font-semibold text-[18px] mb-2 tracking-wide">
            {testimonialTitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            {testimonialSubtitle}
          </h2>
        </div>

        {/* ---------- VIEW ALL BUTTON ---------- */}
        <div className="absolute right-60 top-24 hidden md:block">
          <Link
            href="/testimonials"
            className="bg-gradient-to-r from-[#0B10A4] to-[#04063E]
            text-white px-8 py-3 rounded-full font-bold
            flex items-center gap-4 hover:shadow-xl transition-all group"
          >
            View All 
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ---------- CARDS ---------- */}
        <div className="relative z-10 mt-8 md:mt-[-60px] ml-0 md:ml-auto w-full md:w-[115%] lg:w-[125%] xl:w-[135%]">
          <div className="flex gap-6">
            {visibleItems.map((item: any, index: number) => (
              <div
                key={item?.id || index}
                className="min-w-[400px] max-w-[450px] rounded-2xl border border-[#D8D8D8] bg-[#F3F1F2]/30 p-8 backdrop-blur-sm mt-8 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1C274C] text-xl text-white relative">
                    <span style={{ fontFamily: 'serif', fontSize: '50px', position: 'absolute', top: '-3px'}}>“</span>
                  </div>
                  {/* Reduced margin-bottom here (mb-4 instead of mb-8) and added line-clamp */}
                  <p className="mb-4 text-[18px] font-medium leading-relaxed text-black line-clamp-3 overflow-hidden text-ellipsis">
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
                    <p className="text-[14px] font-regular text-black">
                      {item?.rank}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}

        <div className="mt-10 md:hidden mx-auto">
          <Link
            href="#"
            className="bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                        text-white px-8 py-3 rounded-full font-bold
                        flex items-center gap-4
                        hover:from-[#1217c0] hover:to-[#0a0f6b]
                        transition-all group text-center w-auto justify-center"
          >
            View All →
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Fallback for line-clamp if plugin is not configured */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}