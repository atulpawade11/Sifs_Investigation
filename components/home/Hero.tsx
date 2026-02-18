"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MoveDown } from 'lucide-react';
import { Skeleton } from '@/components/shared/Skeleton';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import API base URL from config
import { API_BASE_URL } from '@/lib/config';

// Define types based on the API response structure
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
      about_us?: string;
      website_title?: string;
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
    features?: Array<{
      id: number;
      title: string;
      icon: string;
    }>;
    portfolios?: Array<any>;
    testimonials?: Array<any>;
    blogs?: Array<any>;
    packages?: Array<any>;
    statistics?: Array<any>;
    faqs?: Array<any>;
    services?: Array<any>;
    serviceCategories?: Array<any>;
  };
}

const Hero = () => {
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch homepage data on component mount
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: HomePageData = await response.json();

        if (data.success) {
          setHomeData(data);
        } else {
          throw new Error(data.message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  // Get slides from API or use static fallback
  const apiSlides = homeData?.data?.sliders?.map(slider => {
    let slideSrc = "/hero-banner.png";
    if (slider.image && slider.image.trim() !== "") {
      if (slider.image.startsWith('http')) {
        slideSrc = slider.image;
      } else {
        const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
        const imgPath = slider.image.startsWith('/') ? slider.image : `/${slider.image}`;
        slideSrc = `${baseUrl}${imgPath}`;
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
    { src: "/hero-banner.png", alt: "Forensic Student Working", title: "Serving The Nation Forensically", text: "Delivering Justice Through Forensic Excellence", button_text: "Learn More", button_url: "/" },
    { src: "/about.png", alt: "About SIFS", title: "About SIFS India", text: "Pioneering Forensic Science Education", button_text: "Discover More", button_url: "/about" },
    { src: "/lab/overview.png", alt: "Lab Overview", title: "State-of-the-Art Laboratories", text: "Advanced Facilities for Practical Training", button_text: "View Labs", button_url: "/labs" },
  ];

  // Debugging logs
  useEffect(() => {
    if (slides.length > 0) {
      console.log("Hero Slides URLs:", slides.map(s => s.src));
    }
  }, [slides]);

  // Use API data or fallback to static data
  const currentSlideData = slides[activeIndex];

  const heroTitle = currentSlideData?.title || homeData?.data?.bs?.hero_section_title || "Serving The Nation Forensically";
  const heroText = currentSlideData?.text || homeData?.data?.bs?.hero_section_text || "Delivering Justice Through Forensic Excellence";
  const heroButtonText = currentSlideData?.button_text || homeData?.data?.bs?.hero_section_button_text || "Learn More";
  const heroButtonUrl = currentSlideData?.button_url || homeData?.data?.bs?.hero_section_button_url || "/";

  // Show loading state
  if (loading) {
    return (
      <section className="relative w-full bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-10 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Skeleton className="hidden md:block w-10 h-32 rounded-full" />
                <div className="space-y-6 w-full">
                  <Skeleton className="h-16 md:h-24 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-full lg:pl-10 space-y-8">
              <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <div className="space-y-4 w-full max-w-[280px]">
                <Skeleton className="h-12 w-full rounded-full" />
                <Skeleton className="h-14 w-full rounded-full" />
              </div>
            </div>
          </div>
          <div className="mt-12">
            <Skeleton className="h-[400px] md:h-[600px] w-full rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="relative w-full bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-10 py-12 md:py-20">
          <div className="text-center text-red-500">
            <p>Error loading content: {error}</p>
            <p className="mt-2 text-sm text-gray-600">Showing static content instead.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[300px]">

          {/* LEFT SIDE: Heading & Text */}
          <div className="relative z-10 transition-all duration-500 animate-in fade-in slide-in-from-left-4" key={activeIndex}>
            <div className="flex items-start gap-4">
              {/* Decorative Scroll Down Icon */}
              <div className="hidden md:flex flex-col items-center justify-center px-2.5 py-5 border mt-30 rounded-full text-gray-400">
                <MoveDown size={20} />
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold text-[#04063E] leading-tight mb-2">
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
                      {heroTitle.split('Nation')[1]}
                    </>
                  ) : (
                    heroTitle
                  )}
                </h1>

                <div className="flex items-center gap-2 text-gray-500 text-lg">
                  <p>{heroText}</p>
                  <span className="text-2xl">🎓</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Branding & Buttons */}
          <div className="flex flex-col items-start w-full relative lg:pl-10">

            {/* Branding Block: Now Left Aligned within the column */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden border border-gray-100">
                <div className="w-10 h-10 bg-slate-200 rounded-full opacity-40"></div>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[#1A365D] text-lg leading-tight uppercase tracking-wide">SIFS INDIA</h3>
                <p className="text-xs text-gray-400 border-t border-gray-100 pt-1 mt-1">Forensic Science Laboratory</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-[280px]">
              <Link
                href={heroButtonUrl}
                className="bg-gradient-to-r from-[#0B10A4] to-[#04063E] 
                          text-white px-8 py-3 rounded-full font-bold 
                          flex items-center gap-4 
                          hover:from-[#1217c0] hover:to-[#0a0f6b] 
                          transition-all group"
              >
                {heroButtonText}
                <div className="bg-white/10 p-1 rounded-full">
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <button className="flex items-center justify-between border border-gray-100 text-gray-400 pl-8 pr-6 py-4 rounded-full font-medium hover:bg-gray-50 transition-all group">
                Explore More Sifs
                <ArrowRight size={18} className="opacity-30 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* The Light Grey Star/Sparkle - Positioned relative to the buttons */}
            <div className="hidden lg:block absolute bottom-0 right-10 opacity-10">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
                <path d="M12 .5l2.5 7.5H22l-6 4.5 2.5 7.5-6.5-5-6.5 5 2.5-7.5-6-4.5h7.5L12 .5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* BOTTOM IMAGE SECTION */}
        <div className="mt-12 relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          <Swiper
            key={slides.length} // Force re-initialize Swiper when slide count changes
            slidesPerView={1}
            spaceBetween={0}
            loop={slides.length > 1}
            centeredSlides={true}
            speed={1000}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            autoplay={{
              delay: 4500, // Increased delay slightly for better reading
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-full hero-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    unoptimized={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Background decoration (optional star/sparkle from your screenshot) */}
      <div className="absolute top-1/2 right-10 opacity-10 pointer-events-none">
        <div className="w-20 h-20 border-8 border-gray-300 rounded-full border-dotted animate-spin-slow"></div>
      </div>
    </section>
  );
};

export default Hero;