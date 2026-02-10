"use client";

import React from 'react';
import PageBanner from "../../components/common/PageBanner";
import { sketchCopData } from "../../data/productData";
import { Play } from "lucide-react";

export default function SketchCopProductPage() {
  const data = sketchCopData;

  return (
    <div className="bg-white min-h-screen pb-20">
      <PageBanner 
        title={data.title} 
        subtitle={data.subtitle} 
        bgImage={data.bannerImage} 
      />

      <div className="max-w-6xl mx-auto px-4 mt-16 space-y-16">
        
        {/* 1. Header & Intro */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-[#04063E] border-b-4 border-[#F68A07] inline-block pb-2">
            {data.title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {data.introText}
          </p>
        </section>

        {/* 2. Highlights Grid */}
        <section className="space-y-8">
          <h3 className="text-2xl font-bold text-[#04063E]">Software Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.highlights.map((item, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-xl border-l-4 border-[#0B4F8A] hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#04063E] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Demo & Video Section */}
        <section className="bg-[#04063E] text-white rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-2xl font-bold">System Demo</h3>
              <p className="text-white/80 leading-relaxed">
                {data.demoText}
              </p>
              <button className="bg-[#F68A07] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
                Contact for Demo
              </button>
            </div>
            
            <div className="lg:w-1/2 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative group">
                <iframe
                  src={data.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                />
            </div>
          </div>
        </section>

        {/* 4. Detailed Accordions */}
        <section className="space-y-4 max-w-7xl mx-auto">
          {data.accordions.map((item, idx) => (
            <details key={idx} className="group border border-gray-200 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center p-5 cursor-pointer bg-white group-open:bg-gray-50 font-bold text-[#04063E]">
                {item.title}
                <span className="text-[#F68A07] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="p-6 bg-white text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                {item.content}
                </div>
            </details>
          ))}
        </section>

      </div>
    </div>
  );
}