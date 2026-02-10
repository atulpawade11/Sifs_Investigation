"use client"

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ClipboardCheck, Users, Briefcase, GraduationCap } from 'lucide-react';

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
  const stats = [
    { label: "Forensic Reports", val: 12, suffix: "K", icon: <ClipboardCheck className="w-6 h-6 md:w-10 md:h-10 text-white/40" /> },
    { label: "Happy Clients", val: 2500, suffix: "+", icon: <Users className="w-6 h-6 md:w-10 md:h-10 text-white/40" /> },
    { label: "Forensic Projects", val: 100, suffix: "+", icon: <Briefcase className="w-6 h-6 md:w-10 md:h-10 text-white/40" /> },
    { label: "Training Imparted", val: 10, suffix: "K+", icon: <GraduationCap className="w-6 h-6 md:w-10 md:h-10 text-white/40" /> },
  ];

  const logos = ["/client-logo.png", "/client-logo1.png", "/client-logo2.png", "/client-logo3.png", "/client-logo4.png", "/client-logo5.png", "/client-logo6.png"];

  return (
    <section className="bg-white pt-10 md:pt-20">
      {/* Container with responsive rounded corners */}
      <div className="bg-[#000040] rounded-t-[40px] md:rounded-t-[100px] relative pt-1 pb-16 md:pb-20 w-full overflow-hidden">
        
        {/* Responsive Curve: Hidden on small mobile, visible on tablet/desktop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[80%] lg:w-[75%] hidden md:block">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-[150px] lg:h-[330px] fill-white">
            <path d="M0,0 Q500,140 1000,0 L1000,0 L0,0 Z"></path>
          </svg>
        </div>

        <div className="relative z-10 text-center px-4">
          {/* Header section with responsive spacing */}
          <div className="mt-12 md:mt-24 mb-10 md:mb-14">
            <p className="text-white md:text-[#04063E] font-semibold text-xs md:text-sm tracking-widest mb-2 uppercase">
              Forensic Solutions
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white md:text-black tracking-tight max-w-2xl mx-auto">
              Showcasing Our Best Work
            </h2>
          </div>

          {/* Optimized Swiper for Mobile */}
          <div className="mb-12 md:mb-20 mt-12 md:mt-20">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={12}
                slidesPerView={2.5} 
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                breakpoints={{
                640: { slidesPerView: 3.5, spaceBetween: 15 },
                768: { slidesPerView: 4.5, spaceBetween: 20 },
                1024: { slidesPerView: 6.5, spaceBetween: 25 },
                }}
                className="w-full px-4"
            >
              {[...logos, ...logos].map((logo, index) => (
                <SwiperSlide key={index}>
                    <div className="bg-[#0A0A5A] rounded-xl md:rounded-2xl p-3 md:p-6 h-16 md:h-28 flex items-center justify-center border border-white/10 shadow-xl">
                    <img 
                        src={logo} 
                        alt={`Partner ${index}`} 
                        className="max-h-full max-w-full object-contain opacity-80" 
                    />
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* Dotted Separator */}
          <div className="max-w-7xl mx-auto px-6 mb-12 opacity-20">
            <div className="w-full border-b-[1px] md:border-b-[2px] border-dashed border-white" />
          </div>

          {/* Stats Grid: Fixed borders for mobile stacking */}
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-12">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`flex flex-col items-center lg:items-start text-white px-4 md:px-10 
                  ${i % 2 === 0 ? 'border-r border-white/10' : 'lg:border-r lg:border-white/10'} 
                  ${i === 2 ? 'lg:border-r' : ''} 
                  ${i === 3 ? 'border-none' : ''}`}
              >
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-2 md:mb-3">
                  {stat.icon}
                  <span className="text-2xl md:text-5xl font-bold tracking-tighter">
                    <Counter end={stat.val} duration={2000} />{stat.suffix}
                  </span>
                </div>
                <p className="text-gray-400 text-[9px] md:text-xs font-bold uppercase tracking-widest text-center lg:text-left">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseStats;