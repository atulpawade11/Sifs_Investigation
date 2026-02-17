"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, ChevronDown, Phone, Mail } from "lucide-react";

export default function ContactInfoSection({ locations, mainInfo }: { locations: any[], mainInfo: any }) {
  // State to manage which regional center is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-3">
          
          {/* 1. BRANDING COLUMN */}
          <div>
            <h2 className="mb-6 text-3xl font-semibold leading-snug text-[#04063E]">
              Convinced yet? <span className="text-[#F6BA13]">Let’s make something great together.</span>
            </h2>
            <div className="overflow-hidden rounded-xl shadow-md">
              <Image src="/contact/contact-desk.png" alt="Desk" width={500} height={350} className="w-full object-cover" />
            </div>
          </div>

          {/* 2. MAIN CORP OFFICE COLUMN */}
          <div className="space-y-6">
          <div className="overflow-hidden rounded-xl">
              <Image src="/contact/contact-person.png" alt="Support" width={500} height={300} className="w-full object-cover" />
            </div>
            <div className="rounded-2xl bg-gradient-to-b from-[#0C2783] to-[#1C274C] p-8 text-white shadow-xl">
              <h4 className="mb-3 text-2xl font-bold">Corp Office</h4>
              <hr className="mb-6 w-12 h-1 bg-[#F6BA13] border-none" />
              <div className="space-y-4">
                <p className="flex items-start gap-3 text-sm leading-relaxed">
                  <MapPin className="text-[#F6BA13] shrink-0" size={24} />
                  {mainInfo?.address}
                </p>
                <p className="flex items-center gap-3 text-sm">
                  <Phone className="text-[#F6BA13]" size={18} /> {mainInfo?.phone}
                </p>
                <p className="flex items-center gap-3 text-sm">
                  <Mail className="text-[#F6BA13]" size={18} /> {mainInfo?.email}
                </p>
              </div>
            </div>
            
          </div>

          {/* 3. REGIONAL CENTERS COLUMN (Accordion) */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 mb-4 px-1">Our Regional Centers</h3>
            <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
              {locations.map((loc, idx) => (
                <div key={loc.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className={`w-full flex justify-between items-center p-4 text-left transition-colors ${openIndex === idx ? "bg-gray-50" : "bg-white"}`}
                  >
                    <span className="font-bold text-[#1C274C]">{loc.title}</span>
                    <ChevronDown size={18} className={`transition-transform ${openIndex === idx ? "rotate-180 text-[#F6BA13]" : "text-gray-400"}`} />
                  </button>
                  {openIndex === idx && (
                    <div 
                      className="p-4 bg-white text-sm border-t border-gray-100 html-render-zone"
                      dangerouslySetInnerHTML={{ __html: loc.details }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <style jsx global>{`
        .html-render-zone p { margin-bottom: 8px; line-height: 1.6; color: #4b5563; }
        .html-render-zone .fa, .html-render-zone .fas { color: #F6BA13 !important; margin-right: 5px; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}</style>
    </section>
  );
}