"use client";

import React from 'react';

const CoreServices = () => {
  const services = [
    {
      title: "Crime Scene Investigation",
      points: [
        "Systematic crime scene investigations, including indoor and outdoor locations.",
        "Proper documentation of physical evidence, environmental factors, and spatial relationships."
      ]
    },
    {
      title: "Evidence Collection and Preservation",
      points: [
        "Advanced collection and preservation forensic techniques for physical and digital evidence.",
        "Maintaining the chain of custody to ensure the admissibility of evidence during legal proceedings."
      ]
    },
    {
      title: "Forensic Analysis",
      points: [
        "Use cutting-edge technologies and methodologies to interpret complex data, reconstruct events, and provide reliable opinions.",
        "Follow a multi-disciplinary approach, utilizing expertise from various fields to provide an all-around understanding of the case."
      ]
    },
    {
      title: "Expert Testimony",
      points: [
        "Preparation of expert reports, presenting findings in a detailed manner for juries.",
        "Skilled and well-qualified forensic experts capable of providing clear and compelling testimony in court."
      ]
    }
  ];

  return (
    <div className="relative py-16 px-4 md:px-10 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/department/bg.png')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white lg:max-w-md leading-tight">
            Our Core Forensic Investigation Services
          </h2>
          <p className="text-blue-50 text-sm md:text-base lg:max-w-2xl leading-relaxed">
            Our core forensic services, combined with our extensive experience, make us your trusted partner in solving complex cases. 
            Whether it is criminal investigations, document and fingerprint examination, cyber forensics, insurance and accounting 
            fraud analysis, accident site reconstruction, biological evidence examination, or specialized forensic support, 
            our Forensic Investigation Department is equipped to provide unmatched services across various domains.
          </p>
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`bg-white p-6 md:p-8 rounded-lg shadow-2xl border-t-4 border-[#F68A07] min-h-[320px] transition-transform hover:-translate-y-2
                ${idx % 2 !== 0 ? 'lg:mt-16' : ''}`}
            >
              <h3 className="text-xl font-bold text-[#04063E] mb-4">
                {service.title}
              </h3>
              <ul className="space-y-4">
                {service.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                    <span className="text-[#F68A07] font-bold text-lg leading-none">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreServices;