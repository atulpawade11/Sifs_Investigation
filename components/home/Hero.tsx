"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight, MoveDown } from 'lucide-react';
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

  // Use API data or fallback to static data
  const currentSlideData = slides[activeIndex];

  const heroTitle = currentSlideData?.title || homeData?.data?.bs?.hero_section_title || "Serving The Nation Forensically";
  const heroText = currentSlideData?.text || homeData?.data?.bs?.hero_section_text || "Delivering Justice Through Forensic Excellence";
  const heroButtonText = currentSlideData?.button_text || homeData?.data?.bs?.hero_section_button_text || "Learn More";
  const heroButtonUrl = currentSlideData?.button_url || homeData?.data?.bs?.hero_section_button_url || "/";

  if (loading) return <Skeleton className="w-full h-[1000px]" />;

  return (
    <section className="relative w-full h-[1000px]">
      <div className="container mx-auto py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center min-h-[200px]">
        {/* <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">*/}
          {/* LEFT SIDE: Heading & Text */}
          <div className="relative z-10 transition-all duration-500 animate-in fade-in slide-in-from-left-4 lg:col-span-2" key={activeIndex}>
            <div className="flex items-start gap-4">
              {/* Decorative Scroll Down Icon */}
              <div className="hidden md:flex flex-col items-center justify-center px-2.5 py-5 border mt-30 rounded-full text-gray-400">
                <MoveDown size={20} />
              </div>

              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-bold text-[#04063E] leading-tight mb-2">
                  {heroTitle.includes('Nation') ? (
                    <>
                      {heroTitle.split('Nation')[0]}
                      <span className="relative inline-block">
                        Nation
                        {/* The hand-drawn circle effect */}
                        <svg className="absolute -inset-x-4 -inset-y-2 w-[120%] h-[140%] text-gray-400 opacity-50 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M5,50 Q25,5 50,5 T95,50 T50,95 T5,50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                      <br />
                      {heroTitle.split('Nation')[1]}
                    </>
                  ) : (
                    heroTitle
                  )}
                </h2>

                <div className="flex items-center gap-2 text-gray-500 text-lg">
                  <p>{heroText}</p>
                  <span className="text-2xl">🎓</span>
                </div>
                
              </div>
            </div>
          </div>
          {/* RIGHT SIDE: Branding & Buttons */}
          <div className="flex flex-col items-start w-full relative lg:pl-10 lg:col-span-1">
            {/* Branding Block: Now Left Aligned within the column */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src="/shape-hero.svg" 
                  alt="Brand logo"
                  width={50}
                  height={50}
                  className="object-cover rounded-full"
                />
              </div>
              <div className="text-left">
                <h3 className="text-[18px] text-black font-medium leading-tight uppercase tracking-wide">SIFS INDIA</h3>
                <p className="text-[18px] text-black font-medium border-t border-[#D4D4D4] pt-1 mt-1">Forensic Science Laboratory</p>
              </div>
            </div>
            <div className="flex flex-col gap-4"> 
              <Link
                href={heroButtonUrl}
                className="bg-gradient-to-r from-[#0B10A4] to-[#04063E] 
                          text-white px-5 py-3 rounded-full font-bold 
                          flex items-center gap-4 
                          hover:from-[#1217c0] hover:to-[#0a0f6b] 
                          transition-all group w-fit text-[18px]"
              >
                {heroButtonText}
                <div className="rounded-full">
                  <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
                
              <button className="flex items-center gap-4 border border-[#DFDFDF] text-[#AFAFAF] pl-8 pr-6 py-3 rounded-full text-[18px] font-bold hover:bg-gray-50 transition-all group w-fit">  {/* Use 'w-fit' */}
                Explore More Sifs 
                <MoveRight size={18} className="text-[#AFAFAF] group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* The Light Grey Star/Sparkle - Positioned relative to the buttons */}
            <div className="hidden lg:block absolute bottom-0 right-10">
              <Image 
                src="/hero-star.png" 
                alt="Brand logo"
                width={50}
                height={50}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* 1. BACKGROUND SWIPER (Full BG Image with Fade) */}
      <div className="absolute  inset-0 z-0 top-74">
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

      

      <style jsx global>{`
        .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: #f97316 !important; opacity: 1; }
      `}</style>
    </section>
  );
};

export default Hero;