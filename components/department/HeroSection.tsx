import React from 'react';

export default function HeroSection() { 
    return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <img 
              src="/department/department1.png" 
              alt="Forensic Tools" 
              className="rounded-3xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#04063E] leading-tight mb-6">
              Deciphering Truths, Unlocking Mysteries, and Securing Justice
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Welcome to SIFS India's Forensic Investigation Services Department. Timely delivery 
                of quality and unbiased services for over 17 years makes us your most trusted 
                private forensic investigation service provider across the nation.
              </p>
              <p>
                Our commitment to excellence has helped us emerge as a leader in the forensic 
                domain, not just in India but across borders as well. So, whether you are looking 
                for accurate criminal investigation services, forensic analysis, or specialized 
                forensic support, we are here to help you bring forth the truth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};