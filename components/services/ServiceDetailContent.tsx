"use client";

import React from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface ServiceDetailContentProps {
  apiData: any; // Receives the full service object from the API
}

export default function ServiceDetailContent({ apiData }: ServiceDetailContentProps) {
  const [showVideo, setShowVideo] = React.useState(false);

  if (!apiData) {
    return <div className="py-20 text-center text-gray-400 italic">Select an investigation service to view details.</div>;
  }

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(apiData.youtubelink);

  return (
    <div className="space-y-8">
      {/* 1. Dynamic Hero Image with Overlay Badge */}
      <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-100 bg-gray-50 group">
        {/* Country Badge / Featured Image Overlay */}
        {apiData.featured_image && (
          <div className="absolute top-6 left-6 z-10 w-20 h-20 md:w-28 md:h-28 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white/50 shadow-2xl transition-transform duration-500 hover:rotate-3">
            <img
              src={apiData.featured_image}
              alt="Featured Badge"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Primary Background Image */}
        <img
          src={apiData.main_image}
          alt={apiData.title}
          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Subtle Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>

      {/* 2. Title and Dynamic HTML Content */}
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="inline-block bg-blue-50 text-[#044782] text-[14px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {apiData.category_name}
          </div>
          {apiData.youtubelink && (
            <button
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-2 bg-[#FF0000]/10 text-[#FF0000] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest hover:bg-[#FF0000] hover:text-white transition-all duration-300 group border border-[#FF0000]/20 shadow-sm"
            >
              <span className="w-5 h-5 flex items-center justify-center bg-[#FF0000] rounded-full group-hover:bg-white transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-2.5 h-2.5 text-white group-hover:text-[#FF0000]"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </span>
              Watch Video
            </button>
          )}
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

      {/* Video Modal Interface */}
      {showVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#414264e6]/90 backdrop-blur-sm transition-all duration-500">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 hover:rotate-90"
          >
            <X size={28} />
          </button>

          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative bg-black">
            {videoId ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="Forensic Education Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-white text-xl font-bold italic">
                Video not available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
