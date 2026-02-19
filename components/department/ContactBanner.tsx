"use client";

import React from 'react';

const ContactBanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="bg-[#043464] rounded-2xl overflow-hidden flex flex-col md:flex-row items-stretch shadow-xl">
        {/* Image Section */}
        <div className="md:w-1/3">
          <img 
            src="/department/department3.png" 
            alt="Forensic Support" 
            className="w-full h-full min-h-[250px] object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-2/3 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Connect with Our Expert Forensic Investigators
          </h2>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed opacity-90">
            No matter where you are located, be it in India or beyond, our Forensic 
            Investigation Department is here to assist you. Contact us for the best 
            and most trustworthy forensic investigation services and expert opinions 
            that stand strong during legal proceedings. With our years of experience 
            and expertise, we are committed to delivering justice and safeguarding 
            your interests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;