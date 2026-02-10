"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { servicesData } from '../../../data/services';
import { ArrowRight } from 'lucide-react';

export default function ServiceListingPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const category = servicesData[categorySlug as keyof typeof servicesData];

  if (!category) return <div className="py-20 text-center">Category not found</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Top Section Header */}
      <div className="bg-gray-50 py-10 text-center border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">SIFS India Services</h1>
        <p className="text-gray-500 text-sm mt-1">{category.subtitle}</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Intro Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <h2 className="text-4xl font-extrabold text-[#04063E] leading-tight max-w-sm">
            {category.introTitle}
          </h2>
          <div className="md:w-1/2 text-right">
            <p className="text-xs text-gray-500 leading-relaxed italic">
              {category.introDesc}
            </p>
          </div>
        </div>

        {/* Hero Banner Image */}
        <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-20 shadow-xl">
          <img 
            src={category.bannerImage} 
            alt={category.title} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Listing of Sub-Services */}
        <div className="space-y-8">
          {category.subServices.map((item) => (
            <div key={item.id} className="group border-b border-gray-100 pb-8 last:border-0">
              <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Numbering */}
                <div className="text-4xl font-bold text-gray-900 md:w-16">
                  {item.id}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                    <Link href={`/services/${categorySlug}/${item.slug}`}>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0B10A4] transition-colors cursor-pointer inline-block">
                        {item.title}
                        </h3>
                    </Link>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Thumbnail */}
                <Link href={`/services/${categorySlug}/${item.slug}`} className="w-full md:w-[320px] aspect-[16/9] overflow-hidden rounded-2xl shadow-md">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-20">
          <button className="bg-[#04063E] text-white px-10 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-[#0B10A4] transition-all shadow-lg">
            Load More <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}