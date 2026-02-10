"use client";

import React from 'react';
import Image from 'next/image';

const services = [
    {
        title: "DOCUMENT EXAMINATION",
        description: "Examination of Signature, Handwriting & questioned document",
        image: "/doc-exam.png", 
        iconImage: "/doc-icon.png", // Path to your icon image
      },
      {
        title: "FINGERPRINT ANALYSIS",
        description: "Latent print development, Fingerprint Matching, Fingerprint for PCC",
        image: "/fingerprint.png",
        iconImage: "/finger-icon.png",
      },
      {
        title: "CYBER FORENSICS INVESTIGATION",
        description: "Audio/video, Email, photographs examination, speaker Identification",
        image: "/cyber-forensics.png",
        iconImage: "/cyber-icon.png",
      },
      {
        title: "INSURANCE INVESTIGATION",
        description: "Life and General Insurance investigation, Property Claim Investigation",
        image: "/insurance-investigation.png",
        iconImage: "/insurance-icon.png",
      },
];

const ForensicServices = () => {
  return (
    <section 
      className="relative py-20 min-h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('/forensic-bg.png')` 
      }}
    >
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-[#04063E] font-medium italic mb-2">Serving Justice Globally</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Forensic Services</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Orange Icon Circle */}
              <div className="w-14 h-14 bg-[#04063E] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-200/50 relative overflow-hidden">
                <div className="relative w-7 h-7">
                    <Image 
                        src={service.iconImage}
                        alt="icon"
                        fill
                        className="object-contain brightness-0 invert" 
                    />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h3 className="font-bold text-black text-md tracking-wide mb-3 uppercase">
                  {service.title}
                </h3>
                <p className="text-[#868686] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Card Image */}
              <div className="relative w-full h-40 rounded-2xl overflow-hidden mt-auto">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForensicServices;