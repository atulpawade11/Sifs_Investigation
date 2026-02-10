"use client";

import React, { useState } from 'react';
import PageBanner from "../../../components/common/PageBanner";
import { galleryImages } from "../../../data/gallery";
import { ArrowRight, X, ChevronUp } from "lucide-react";

// 1. Define the Type for your Gallery Item
interface GalleryItem {
  title: string;
  description: string;
  image: string;
}

export default function ImageGalleryPage() {
  const initialCount = 4;
  const [displayCount, setDisplayCount] = useState(initialCount);
  
  // 2. Update the useState hook to accept the GalleryItem type or null
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const hasMore = displayCount < galleryImages.length;
  const canShowLess = displayCount > initialCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 4);
  };

  const handleShowLess = () => {
    setDisplayCount(initialCount);
    window.scrollTo({ top: 400, behavior: 'smooth' }); 
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="Image Gallery"
        subtitle="SIFS India"
        bgImage="/about/about-banner.png"
      />

      <div className="relative bg-[#FFFFFF] py-12">
        <section className="mx-auto max-w-7xl px-4">
          
          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryImages.slice(0, displayCount).map((item, index) => (
              <div key={index} className="relative group overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute bottom-4 left-4 right-50 bg-white p-1 rounded-lg shadow-xl z-20">
                  <div className="border border-[#a9a9a9] p-2 rounded-lg">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                    
                    <div 
                      onClick={() => setSelectedItem(item)}
                      className="absolute -right-4 bottom-0 w-10 h-10 bg-[#0B4F8A] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#F68A07] transition-colors"
                    >
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            {hasMore ? (
              <button 
                onClick={handleLoadMore}
                className="bg-[#04063E] text-white px-10 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#0B10A4] transition-all shadow-md"
              >
                Load More <ArrowRight size={18} />
              </button>
            ) : canShowLess && (
              <button 
                onClick={handleShowLess}
                className="bg-white border-2 border-[#04063E] text-[#04063E] px-10 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-md"
              >
                Show Less <ChevronUp size={18} />
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Popup Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-900" />
            </button>

            <div className="flex flex-col">
              <div className="w-full aspect-video">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-[#04063E] mb-3">
                  {selectedItem.title}
                </h2>
                <div className="h-1 w-20 bg-[#F68A07] mb-4"></div>
                <p className="text-gray-600 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}