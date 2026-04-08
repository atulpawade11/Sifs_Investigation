"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/shared/Skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper Smooth Transition Imports
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import { API_BASE_URL } from '@/lib/config';

// --- RESTORED INTERFACE ---
interface HomePageData {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  data: {
    bs: {
      hero_section_title: string;
      hero_section_text: string;
      hero_section_button_text: string;
      hero_section_button_url: string;
      hero_bg?: string;
    };
    sliders: Array<{
      id: number;
      title: string;
      text: string;
      button_text: string;
      button_url: string;
      image: string;
      mobile_image: string;
    }>;
  };
}

const Hero = () => {
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: HomePageData = await response.json();
        if (data.success) setHomeData(data);
        else throw new Error(data.message || 'Failed to fetch data');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const apiSlides = homeData?.data?.sliders?.map(slider => {
    let slideSrc = "/hero-banner.png"; 
    if (slider.image && slider.image.trim() !== "") {
      if (slider.image.startsWith('http')) { slideSrc = slider.image; } 
      else {
        const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
        slideSrc = `${baseUrl}${slider.image.startsWith('/') ? slider.image : `/${slider.image}`}`;
      }
    }
    return {
      src: slideSrc,
      alt: slider.title || "Forensic Slide",
      title: slider.title,
      text: slider.text,
      button_text: slider.button_text,
      button_url: slider.button_url
    };
  }) || [];

  const slides = apiSlides.length > 0 ? apiSlides : [
    { src: "/hero-banner.png", alt: "Forensic Investigation", title: "Illuminating The Concealed Reality", text: "Forensic Excellence Creating Global Impact", button_text: "LEARN MORE", button_url: "/" },
  ];

  if (loading) return <Skeleton className="w-full h-[750px]" />;

  return (
    <section className="relative w-full h-[750px]">
      {/* 1. BACKGROUND SWIPER (Full BG Image with Fade) */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={slides.length > 1}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-full brightness-90 transition-transform duration-[7000ms] ease-out scale-110" 
                  priority={index === 0}
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. THE CONTENT OVERLAY */}
      <div className="relative z-10 h-full container mx-auto flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center gap-10">
          
          {/* LEFT SIDE: Spacer to keep text on the right as per screenshot */}
          <div className="hidden lg:block" />

          {/* RIGHT SIDE: Text Content */}
          <div className="flex flex-col justify-center px-6 lg:px-0 text-white text-center lg:text-left">
            <div 
              key={activeIndex} 
              className="max-w-xl space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000"
            >
              <h2 className="text-3xl md:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                {slides[activeIndex]?.title}
              </h2>
              
              <p className="text-lg md:text-2xl font-light opacity-90">
                {slides[activeIndex]?.text}
              </p>

              {/* Commented out button from your initial code
              <div className="pt-4">
                <Link
                  href={slides[activeIndex]?.button_url || "/"}
                  className="inline-block border-2 border-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
                >
                  {slides[activeIndex]?.button_text || "LEARN MORE"}
                </Link>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: #f97316 !important; opacity: 1; }
      `}</style>
    </section>
  );
};

export default Hero;