"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/config";
import { X, MapPin } from "lucide-react";

export default function OurAlliance() {
  const [alliances, setAlliances] = useState<any[]>([]);
  const [selectedAlliance, setSelectedAlliance] = useState<any | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/InvestigationServices/Website/front/alliances`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) setAlliances(result.data.alliances);
      });
  }, []);

  const extractLocation = (text: string) => {
    if (!text) return "Global";
    const parts = text.split(" ");
    return parts[parts.length - 1].replace(/[^a-zA-Z]/g, "") || "International";
  };

  return (
    <section className="relative bg-gradient-to-r from-[#020433] via-[#030653] to-[#020433] py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Section Header */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="text-white">
            <h2 className="mb-4 text-2xl font-semibold">Our Alliance</h2>
            <p className="mb-6 text-sm leading-relaxed text-white/80">
            Forensic science is a multidisciplinary field, and hence meaningful
              collaborations are a must to achieve the common goal of solving
              complex cases. SIFS India’s collaborative approach to doing
              business is a proof of our commitment to providing robust forensic
              investigation services. As an expert, we have made several national
              and international strategic collaborations with leading forensic
              laboratories, legal professionals, and law enforcement agencies.
              The concept of collaborative forensic investigations provides our
              clients with accurate solutions and helps solve even the most
              challenging cases.
            </p>
            <p className="text-sm text-white/70">
              Explore SIFS India’s partnerships to learn more about the trusted
              organizations and how together we uncover truth and deliver justice.
            </p>
          </div>

          {/* Grid View */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {alliances.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedAlliance(item)}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                {/* The Circle Container */}
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white p-4 shadow-xl transition-all group-hover:scale-105">
                  <div className="relative h-full w-full">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill
                      className="object-contain" 
                      unoptimized 
                    />
                  </div>
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase text-white tracking-wider">
                  {item.title.split('®')[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 30:70 RATIO MODAL */}
      {selectedAlliance && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[85vh] animate-in zoom-in-95 duration-200">
            
            {/* LEFT SIDEBAR (30%) */}
            <div className="w-full md:w-[30%] bg-[#F8FAFC] p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-100">
              {/* Force Image into Circle */}
              <div className="w-40 h-40 md:w-48 md:h-48 bg-white rounded-full shadow-lg p-6 flex items-center justify-center mb-6 border border-gray-50">
                <div className="relative h-full w-full">
                  <Image 
                    src={selectedAlliance.image} 
                    alt="Partner Logo" 
                    fill
                    className="object-contain" 
                    unoptimized 
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#020433] leading-tight mb-3">
                {selectedAlliance.title}
              </h3>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] uppercase tracking-widest">
                <MapPin size={14} strokeWidth={3} />
                {extractLocation(selectedAlliance.meta_title)}
              </div>
            </div>

            {/* RIGHT CONTENT (70%) */}
            <div className="w-full md:w-[70%] p-8 md:p-14 overflow-y-auto bg-white">
              <button 
                onClick={() => setSelectedAlliance(null)}
                className="absolute top-8 right-8 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="prose prose-slate max-w-none">
                <span className="text-blue-600 text-[11px] uppercase font-black tracking-[0.2em] mb-4 block">
                  Strategic Alliance Profile
                </span>
                <div 
                  className="text-gray-600 leading-[1.8] text-sm md:text-base 
                             [&_p]:mb-6 [&_b]:text-[#020433] [&_b]:font-bold 
                             [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:shadow-md"
                  dangerouslySetInnerHTML={{ __html: selectedAlliance.details }}
                />
              </div>
            </div>

          </div>
          {/* Close on backdrop click */}
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedAlliance(null)} />
        </div>
      )}
    </section>
  );
}