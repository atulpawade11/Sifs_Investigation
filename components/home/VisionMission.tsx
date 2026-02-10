"use client";

import React from 'react';
import Image from 'next/image';

const VisionMission = () => {
  const data = [
    {
      title: "VISION",
      description: "Becoming India's foremost forensic service provider, a symbol of truth and trust.",
      iconPath: "/vision.png", 
      bgColor: "bg-[#04063E]",
      invertIcon: true 
    },
    {
      title: "MISSION",
      description: "Discover truth, promote trust and provide justice with scientific precision.",
      iconPath: "/mission.png",
      bgColor: "bg-white border-2 border-[#04063E]",
      invertIcon: false 
    },
    {
      title: "PURPOSE",
      description: "To serve justice and society, revealing truth through unwavering scientific precision.",
      iconPath: "/purpose.png",
      bgColor: "bg-[#04063E]",
      invertIcon: true
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10 text-center">
        {/* Header */}
        <p className="text-[#04063E] font-medium italic mb-2">Forensic Services</p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#04063E] mb-16 leading-tight">
          Scientifically Revealing the Truth <br className="hidden md:block" /> with Utmost Precision
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon Image Container */}
              <div className={`w-20 h-20 ${item.bgColor} rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-100 relative`}>
                <div className="relative w-8 h-8">
                  <Image 
                    src={item.iconPath}
                    alt={item.title}
                    fill
                    className={`object-contain ${item.invertIcon ? 'brightness-0 invert' : ''}`}
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-[#04063E] mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Divider with Button */}
        <div className="relative flex items-center justify-center mb-20">
          <div className="absolute w-full h-px bg-gray-100"></div>
          <div className="relative z-10 bg-white px-6 flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-800 italic">For more information!</span>
            <button className="bg-[#04063E] text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-[#e07b06] transition-all flex items-center gap-2 group">
              Read More 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Large Shaped Image */}
        <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-[20px] md:rounded-[250px] overflow-hidden shadow-xl">
          <Image 
            src="/visionmission.png" 
            alt="Forensic Expert at work"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default VisionMission;