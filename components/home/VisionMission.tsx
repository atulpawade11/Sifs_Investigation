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
  const [showAll, setShowAll] = useState(false); // State for toggle
  const [content, setContent] = useState({
    title: "Forensic Services",
    subtitle: "Scientifically Revealing the Truth with Utmost Precision",
    btnText: "Our Services",
    btnUrl: "/about",
    image: "/visionmission.png" 
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
          setContent({
            title: bs.approach_title || "Forensic Services",
            subtitle: bs.approach_subtitle || "Scientifically Revealing the Truth with Utmost Precision",
            btnText: bs.approach_button_text || "Our Services",
            btnUrl: bs.approach_button_url || "/about",
            image: bs.approach_bg ? `${API_BASE_URL.replace('/api', '')}/${bs.approach_bg}` : "/visionmission.png"
          });

          if (result.data.points) {
            setPoints(result.data.points); // Store all points
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

  // Determine which points to display
  const displayedPoints = showAll ? points : points.slice(0, 3);

  const cardStyles = [
    { bgColor: "bg-[#04063E]", invertIcon: true, icon: "/vision.png" },
    { bgColor: "bg-white border-2 border-[#04063E]", invertIcon: false, icon: "/mission.png" },
    { bgColor: "bg-[#04063E]", invertIcon: true, icon: "/purpose.png" }
  ];

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-4 w-32 mx-auto mb-4" />
            <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 w-full rounded-2xl" />)}
            </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10 text-center">
        <p className="text-[#04063E] font-medium italic mb-2">{content.title}</p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#04063E] mb-16 leading-tight max-w-4xl mx-auto">
          {content.subtitle}
        </h2>

        {/* DYNAMIC GRID - Animates when showAll changes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10 transition-all duration-500">
          {displayedPoints.map((item, index) => {
            // Re-use 3 styles in a loop for any number of cards
            const style = cardStyles[index % 3]; 
            const cleanTitle = item.title.replace(/[,.]+$/, "").toUpperCase();
            const cleanText = item.short_text.replace(/[,.]+$/, "");

            return (
              <div key={item.id} className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`w-20 h-20 ${style.bgColor} rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-50 relative`}>
                  <div className="relative w-8 h-8">
                    <Image
                      src={style.icon} 
                      alt={cleanTitle}
                      fill
                      className={`object-contain ${style.invertIcon ? 'brightness-0 invert' : ''}`}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#04063E] mb-3">{cleanTitle}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">{cleanText}</p>
              </div>
            );
          })}
        </div>

        {/* VIEW MORE / LESS TOGGLE */}
        {points.length > 3 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="mb-16 text-[#04063E] font-bold text-sm underline decoration-2 underline-offset-4 hover:text-blue-700 transition-colors"
          >
            {showAll ? "View Less Content ↑" : "View More Content ↓"}
          </button>
        )}

        {/* DIVIDER & INFO BUTTON */}
        <div className="relative flex items-center justify-center mb-20">
          <div className="absolute w-full h-px bg-gray-100"></div>
          <div className="relative z-10 bg-white px-6 flex flex-col md:flex-row items-center gap-4">
            <span className="text-sm font-semibold text-gray-800 italic">For more information!</span>
            <Link
              href={content.btnUrl}
              className="bg-[#04063E] text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 group"
            >
              {content.btnText}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* BOTTOM IMAGE */}
        <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-[20px] md:rounded-[250px] overflow-hidden shadow-2xl">
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