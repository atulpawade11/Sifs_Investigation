"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ClipboardCheck, Users, Briefcase, GraduationCap } from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/shared/Skeleton';

// Counter animation component
const Counter = ({ end, duration }: { end: number; duration: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: null | number = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return <span>{count.toLocaleString()}</span>;
};

const ShowcaseStats = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [logoSlides, setLogoSlides] = useState<string[]>([]);
  const [content, setContent] = useState({
    title: "Forensic Solutions",
    subtitle: "Showcasing Our Best Work"
  });
  const [loading, setLoading] = useState(true);

  const iconMap = [
    <ClipboardCheck key="1" className="w-6 h-6 md:w-10 md:h-10 text-white/40" />,
    <Users key="2" className="w-6 h-6 md:w-10 md:h-10 text-white/40" />,
    <Briefcase key="3" className="w-6 h-6 md:w-10 md:h-10 text-white/40" />,
    <GraduationCap key="4" className="w-6 h-6 md:w-10 md:h-10 text-white/40" />
  ];

  const formatStatValue = (valStr: string) => {
    const num = parseInt(valStr);
    if (isNaN(num)) return { val: 0, suffix: "" };
    if (num >= 1000) return { val: num / 1000, suffix: "K" };
    return { val: num, suffix: "+" };
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Following the Hero pattern, we fetch the front-end data
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);
        const result = await response.json();

        if (result.success && result.data) {
          // 1. Map Titles
          const bs = result.data.bs;
          setContent({
            title: bs.portfolio_section_title || "Forensic Solutions",
            subtitle: bs.portfolio_section_text || "Showcasing Our Best Work"
          });

          // 2. Map Stats
          setStats(result.data.statistics || []);

          // 3. Map Logo Slider (Portfolios)
          // We extract the featured_image from the portfolios array
          const images = result.data.portfolios
            ?.filter((p: any) => p.featured_image)
            .map((p: any) => p.featured_image) || [];

          setLogoSlides(images);
        }
      } catch (err) {
        console.error('Error fetching ShowcaseStats data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <section className="bg-white pt-10 md:pt-20">
        <div className="bg-[#000040] rounded-t-[40px] md:rounded-t-[100px] relative pt-1 pb-16 md:pb-20 w-full overflow-hidden">
          <div className="relative z-10 text-center px-4">
            <div className="mt-12 md:mt-24 mb-10 md:mb-14 flex flex-col items-center space-y-4">
              <Skeleton className="h-4 w-32 bg-white/20" />
              <Skeleton className="h-12 w-full max-w-2xl bg-white/20" />
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-4 px-10">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-md bg-white/20" />
                    <Skeleton className="h-10 w-24 bg-white/20" />
                  </div>
                  <Skeleton className="h-4 w-32 bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-10 md:pt-20">
      <div className="bg-[#000040] rounded-t-[40px] md:rounded-t-[100px] relative pt-1 pb-16 md:pb-20 w-full overflow-hidden">

        {/* Decorative Curve */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[80%] lg:w-[75%] hidden md:block">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-[150px] lg:h-[330px] fill-white">
            <path d="M0,0 Q500,140 1000,0 L1000,0 L0,0 Z"></path>
          </svg>
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="mt-12 md:mt-24 mb-10 md:mb-14">
            <p className="text-white md:text-[#04063E] font-semibold text-xs md:text-sm tracking-widest mb-2 uppercase">
              {content.title}
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white md:text-black tracking-tight max-w-2xl mx-auto">
              {content.subtitle}
            </h2>
          </div>

          {/* DYNAMIC LOGO SWIPER */}
          {logoSlides.length > 0 && (
            <div className="mb-12 md:mb-20 mt-12 md:mt-20">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={12}
                slidesPerView={2.5}
                loop={logoSlides.length > 4}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 3.5, spaceBetween: 15 },
                  768: { slidesPerView: 4.5, spaceBetween: 20 },
                  1024: { slidesPerView: 6.5, spaceBetween: 25 },
                }}
                className="w-full px-4"
              >
                {logoSlides.map((imgUrl, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-[#0A0A5A] rounded-xl md:rounded-2xl p-3 md:p-6 h-16 md:h-28 flex items-center justify-center border border-white/10 shadow-xl">
                      <img
                        src={imgUrl}
                        alt="Client Logo"
                        className="max-h-full max-w-full object-contain opacity-80"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <div className="max-w-7xl mx-auto px-6 mb-12 opacity-20">
            <div className="w-full border-b-[1px] md:border-b-[2px] border-dashed border-white" />
          </div>

          {/* DYNAMIC STATS GRID */}
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-12">
            {stats.slice(0, 4).map((stat, i) => {
              const { val, suffix } = formatStatValue(stat.quantity);
              return (
                <div
                  key={stat.id || i}
                  className={`flex flex-col items-center lg:items-start text-white px-4 md:px-10 
                    ${i % 2 === 0 ? 'border-r border-white/10' : 'lg:border-r lg:border-white/10'} 
                    ${i === 2 ? 'lg:border-r' : ''} 
                    ${i === 3 ? 'border-none' : ''}`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-2 md:mb-3">
                    {iconMap[i] || iconMap[0]}
                    <span className="text-2xl md:text-5xl font-bold tracking-tighter">
                      <Counter end={val} duration={2000} />{suffix}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[9px] md:text-xs font-bold uppercase tracking-widest text-center lg:text-left">
                    {stat.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseStats;