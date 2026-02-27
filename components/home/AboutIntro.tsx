"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { Skeleton } from '@/components/shared/Skeleton';

// Import API base URL from config
import { API_BASE_URL } from '@/lib/config';

// Define types based on the API response structure provided
interface AboutIntroData {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  data: {
    bs: {
      intro_bg: string;
      intro_section_title: string;
      intro_section_text: string;
      intro_section_button_text: string;
      intro_section_button_url: string;
      intro_section_video_link: string;
    };
  };
}

const AboutIntro = () => {
  const [aboutData, setAboutData] = useState<AboutIntroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
  // Static fallback highlights (Not provided in JSON, keeping as per original design)
  const staticHighlights = [
    "Forged Document Examination",
    "Handwriting Examination",
    "Signature Verification",
    "Fingerprint Comparison"
  ];
  */

  // Fetch data from API on mount
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: AboutIntroData = await response.json();

        if (data.success) {
          setAboutData(data);
        } else {
          throw new Error(data.message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Helper to resolve image paths
  const getImageUrl = (path: string | undefined) => {
    if (!path || path.trim() === "") return "/about.png";
    if (path.startsWith('http')) return path;

    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
    const imgPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${imgPath}`;
  };

  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-6 h-6 rounded-md" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 pt-4">
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
            <div className="relative aspect-[4/3]">
              <Skeleton className="w-full h-full rounded-[32px]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const content = aboutData?.data?.bs;
  const introBg = getImageUrl(content?.intro_bg);

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-10">

        {error && (
          <div className="mb-6 text-center text-xs text-red-400 opacity-50">
            Note: {error}. Using partial fallback data.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT CONTENT */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                {content?.intro_section_text || "SIFS India has successfully carved a niche in the field of forensics."}
              </h2>
              <span className="text-[#04063E] font-medium italic">
                {content?.intro_section_title || "Efficiency Meets the Finest Forensic Expertise"}
              </span>
            </div>

            {/* Feature List (Commented Out) */}
            {/*
            <div className="grid grid-cols-1 gap-4">
              {staticHighlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group mb-1">
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image
                      src="/orange-check.png"
                      alt="check"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-regular text-sm text-black group-hover:text-[#FF8C00] transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            */}

            <div className="flex items-center gap-6 pt-4">
              <button
                className="bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                          text-white px-8 py-3 rounded-full font-bold
                          flex items-center gap-4 hover:shadow-xl transition-all group"
                onClick={() => {
                  if (content?.intro_section_button_url) {
                    window.location.href = content.intro_section_button_url;
                  }
                }}
              >
                {content?.intro_section_button_text || "Explore SIFS"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="hidden md:block relative w-[80px] h-[50px]">
                <Image
                  src="/drawn-arrow.png"
                  alt="decorative arrow"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative group animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src={introBg}
                alt="Forensic Science Intro"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized={true}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-all">
                <button
                  className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center text-[#1A365D] shadow-2xl hover:scale-110 hover:bg-white transition-transform"
                  onClick={() => {
                    if (content?.intro_section_video_link) {
                      window.open(content.intro_section_video_link, '_blank');
                    }
                  }}
                >
                  <Play size={32} fill="currentColor" />
                </button>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 opacity-10 -z-10">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
                <path d="M12 .5l2.5 7.5H22l-6 4.5 2.5 7.5-6.5-5-6.5 5 2.5-7.5-6-4.5h7.5L12 .5z" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutIntro;