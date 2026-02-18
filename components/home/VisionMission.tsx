"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/shared/Skeleton';

interface VisionPoint {
  id: number;
  title: string;
  short_text: string;
  icon: string;
}

const VisionMission = () => {
  const [points, setPoints] = useState<VisionPoint[]>([]);
  const [content, setContent] = useState({
    title: "Forensic Services",
    subtitle: "Scientifically Revealing the Truth with Utmost Precision",
    btnText: "Our Services",
    btnUrl: "/about",
    image: "/visionmission.png" // Fallback image
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisionData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);
        const result = await response.json();

        if (result.success && result.data) {
          const bs = result.data.bs;

          // 1. Map Global Section Content
          setContent({
            title: bs.approach_title || "Forensic Services",
            subtitle: bs.approach_subtitle || "Scientifically Revealing the Truth with Utmost Precision",
            btnText: bs.approach_button_text || "Our Services",
            btnUrl: bs.approach_button_url || "/about",
            image: bs.approach_bg ? `${API_BASE_URL.replace('/api', '')}/${bs.approach_bg}` : "/visionmission.png"
          });

          // 2. Map Vision/Mission Points (Taking top 3)
          if (result.data.points) {
            setPoints(result.data.points.slice(0, 3));
          }
        }
      } catch (err) {
        console.error('Error fetching VisionMission data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisionData();
  }, []);

  // Static styling configuration to keep the design consistent
  const cardStyles = [
    { bgColor: "bg-[#04063E]", invertIcon: true, icon: "/vision.png" },
    { bgColor: "bg-white border-2 border-[#04063E]", invertIcon: false, icon: "/mission.png" },
    { bgColor: "bg-[#04063E]", invertIcon: true, icon: "/purpose.png" }
  ];

  if (loading) {
    return (
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-10 text-center">
          <div className="flex flex-col items-center space-y-4 mb-16">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-full max-w-2xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center space-y-6">
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-12 w-full max-w-[280px]" />
              </div>
            ))}
          </div>
          <Skeleton className="w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-[32px] md:rounded-[250px]" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10 text-center">
        {/* DYNAMIC HEADER */}
        <p className="text-[#04063E] font-medium italic mb-2">
          {content.title}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#04063E] mb-16 leading-tight max-w-4xl mx-auto">
          {content.subtitle}
        </h2>

        {/* DYNAMIC CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {points.map((item, index) => {
            const style = cardStyles[index] || cardStyles[0];
            // Clean up titles (removes trailing dots/commas from API)
            const cleanTitle = item.title.replace(/[,.]+$/, "").toUpperCase();

            return (
              <div key={item.id} className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 ${style.bgColor} rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-100 relative`}>
                  <div className="relative w-8 h-8">
                    <Image
                      src={style.icon} // Using local icons as fallback since API uses font-awesome strings
                      alt={cleanTitle}
                      fill
                      className={`object-contain ${style.invertIcon ? 'brightness-0 invert' : ''}`}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#04063E] mb-3">
                  {cleanTitle}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
                  {item.short_text.replace(/[,.]+$/, "")}
                </p>
              </div>
            );
          })}
        </div>

        {/* DYNAMIC DIVIDER WITH BUTTON */}
        <div className="relative flex items-center justify-center mb-20">
          <div className="absolute w-full h-px bg-gray-100"></div>
          <div className="relative z-10 bg-white px-6 flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-800 italic">For more information!</span>
            <Link
              href={content.btnUrl}
              className="bg-[#04063E] text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-[#e07b06] transition-all flex items-center gap-2 group"
            >
              {content.btnText}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* LARGE SHAPED IMAGE */}
        <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-[20px] md:rounded-[250px] overflow-hidden shadow-xl">
          <Image
            src={content.image}
            alt="Forensic Science Vision"
            fill
            className="object-cover object-center"
            unoptimized={content.image.startsWith('http')}
          />
        </div>
      </div>
    </section>
  );
};

export default VisionMission;