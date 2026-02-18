"use client";

import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface ServiceDetailContentProps {
  apiData: any; // Receives the full service object from the API
}

export default function ServiceDetailContent({ apiData }: ServiceDetailContentProps) {
  
  if (!apiData) {
    return <div className="py-20 text-center text-gray-400 italic">Select an investigation service to view details.</div>;
  }

  return (
    <div className="space-y-8">
      {/* 1. Dynamic Hero Image from API */}
      <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
        <img 
          src={apiData.main_image} 
          alt={apiData.title} 
          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* 2. Title and Dynamic HTML Content */}
      <div className="space-y-6">
        <div className="inline-block bg-blue-50 text-[#044782] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {apiData.category_name}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#04063E] tracking-tight">
          {apiData.title}
        </h2>
        
        {/* CRITICAL: The API returns raw HTML (p, b, br tags). 
            We use dangerouslySetInnerHTML to render it. 
        */}
        <div 
          className="api-content text-gray-600 text-[14px] leading-[1.8] font-medium prose prose-slate max-w-none
          [&>p]:mb-4 [&>b]:text-[#04063E] [&>ul]:list-disc [&>ul]:ml-5"
          dangerouslySetInnerHTML={{ __html: apiData.content }}
        />
      </div>

      {/* 3. Swiper Slider Section */}
      {/* Note: If the API doesn't provide a specific 'subServices' array, 
          you can hide this or use it to show 'Related Services' 
      */}
      <div className="pt-10 border-t border-gray-100">
        <h3 className="text-xl font-bold text-[#04063E] mb-8 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[#F68A07]"></span>
          Core Expertise Areas
        </h3>
        
        <div className="relative group px-2">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {/* Mapping over API keywords or a manual secondary list 
                since the main content is now inside the 'content' HTML string 
            */}
            {apiData.meta_keywords?.split(',').slice(0, 6).map((keyword: string, index: number) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start gap-4 h-full min-h-[180px] hover:border-blue-100 transition-colors">
                  <span className="text-2xl font-black text-gray-100">{(index + 1).toString().padStart(2, '0')}</span>
                  <h4 className="font-bold text-[#04063E] text-[14px] leading-tight capitalize">
                    {keyword.trim()}
                  </h4>
                  <div className="mt-auto text-[10px] text-blue-600 font-bold uppercase tracking-tighter">
                    Forensic Domain
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-custom absolute -left-5 top-1/2 -translate-y-1/2 bg-white p-2.5 rounded-full shadow-lg z-20 hover:bg-gray-50 transition-all border border-gray-100">
            <ChevronLeft size={20} className="text-gray-400" />
          </button>
          <button className="swiper-button-next-custom absolute -right-5 top-1/2 -translate-y-1/2 bg-[#044782] text-white p-3.5 rounded-full shadow-xl z-20 hover:bg-[#033663] transition-all">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}