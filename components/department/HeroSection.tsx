"use client";

import React from 'react';

interface HeroProps {
  name?: string;
  content?: string;
}

export default function HeroSection({ name, content }: HeroProps) {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Dynamic Title from API 'name' */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#04063E] leading-tight mb-10 border-l-8 border-[#F68A07] pl-6">
          {name || "Forensic Investigation Department"}
        </h2>

        {/* The 'prose' class is essential here. 
            It automatically styles the <img>, <p>, and <strong> tags 
            found inside your API's 'body' string.
        */}
        <div 
          className="prose prose-lg max-w-none text-gray-700 
            prose-img:rounded-3xl prose-img:shadow-2xl prose-img:mb-10 
            prose-p:leading-relaxed prose-strong:text-[#04063E] 
            prose-p:mb-6"
          dangerouslySetInnerHTML={{ 
            __html: content || "<p>Loading department details...</p>" 
          }}
        />
      </div>
    </div>
  );
}