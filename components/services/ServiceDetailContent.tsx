"use client";

import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { servicesData } from '../../data/services';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// --- ADD THIS INTERFACE ---
interface ServiceDetailContentProps {
  category: string;
  service: string;
}

export default function ServiceDetailContent({ category: categorySlug, service: serviceSlug }: ServiceDetailContentProps) {
  
  // Use the props passed from the parent
  const category = servicesData[categorySlug as keyof typeof servicesData];

  if (!category) {
    return <div className="py-20 text-center">Service content not found.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Dynamic Hero Image */}
      <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
        <img 
          src={category.bannerImage} 
          alt={category.title} 
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Dynamic Text Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-extrabold text-[#04063E] tracking-tight capitalize">
          {category.title} Services
        </h2>
        
        <div className="text-gray-500 text-[13px] leading-[1.8] space-y-5 font-medium">
          <p>{category.introDesc}</p>
        </div>
      </div>

      {/* Swiper Slider Section */}
      <div className="pt-10">
        <h3 className="text-xl font-bold text-[#04063E] mb-8">
          Services Our Organization Provides:
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
            {category.subServices.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start gap-4 h-full min-h-[220px]">
                  <span className="text-3xl font-bold text-gray-900">{item.id}</span>
                  <h4 className="font-bold text-[#04063E] text-[15px]">{item.title}</h4>
                  <p className="text-[11px] text-gray-400">{item.shortDesc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-custom absolute -left-5 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20"><ChevronLeft size={20}/></button>
          <button className="swiper-button-next-custom absolute -right-5 top-1/2 -translate-y-1/2 bg-[#044782] text-white p-3.5 rounded-full shadow-xl z-20"><ChevronRight size={22}/></button>
        </div>
      </div>
    </div>
  );
}