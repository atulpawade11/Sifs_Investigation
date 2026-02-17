"use client";

import React, { useState, useEffect } from 'react';
import PageBanner from "../../../components/common/PageBanner";
import { Play, X, ChevronUp, ArrowRight, Loader2 } from "lucide-react";

interface VideoItem {
  id: number;
  title: string;
  video_url: string;
  video_id: string;
  gallery_image: string;
}

export default function VideoGalleryPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const initialCount = 6; 
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/InvestigationServices/Website/front/video-gallery`);
        const result = await response.json();
        if (result.success) {
          setVideos(result.data.videos);
        }
      } catch (error) {
        console.error("Error fetching video gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const hasMore = displayCount < videos.length;
  const canShowLess = displayCount > initialCount;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-[#04063E]" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageBanner
        title="Video Gallery"
        subtitle="SIFS India"
        bgImage="/about/about-banner.png"
      />

      <div className="relative bg-[#FFFFFF] py-12">
        <section className="mx-auto max-w-7xl px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.slice(0, displayCount).map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col group cursor-pointer" 
                onClick={() => setSelectedVideo(item)}
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-black">
                  <img 
                    src={item.gallery_image.replace("http://", "https://")} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-[#F68A07] text-white rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 px-1 text-center">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg line-clamp-2 group-hover:text-[#0B4F8A] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-12">
            {hasMore ? (
              <button 
                onClick={() => setDisplayCount(prev => prev + 3)}
                className="bg-[#04063E] text-white px-10 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#0B10A4] transition-all"
              >
                Load More <ArrowRight size={18} />
              </button>
            ) : canShowLess && (
              <button 
                onClick={() => setDisplayCount(initialCount)}
                className="bg-white border-2 border-[#04063E] text-[#04063E] px-10 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-50 transition-all"
              >
                Show Less <ChevronUp size={18} />
              </button>
            )}
          </div>
        </section>
      </div>

      {/* YouTube Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="w-full max-w-5xl aspect-video relative bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 text-white bg-black/50 p-2 rounded-full hover:bg-[#F68A07] transition-all"
            >
              <X size={24} />
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.video_id}?autoplay=1&rel=0`}
              title={selectedVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}