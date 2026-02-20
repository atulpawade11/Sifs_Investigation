"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/shared/Skeleton';

interface Props {
  categorySlug: string;
}

export default function ServiceListingClient({ categorySlug }: Props) {
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [subServices, setSubServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services`);
        const result = await res.json();
  
        if (result.success && result.data.categories) {
          const categories = result.data.categories;
          const decodedSlug = decodeURIComponent(categorySlug).toLowerCase().replace(/[^a-z0-9]/g, '');
          
          const foundCat = categories.find((c: any) => {
            const apiName = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            return apiName.includes(decodedSlug) || decodedSlug.includes(apiName);
          });
  
          if (foundCat) {
            setCategoryInfo(foundCat);
            const sRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?category=${foundCat.id}`);
            const sData = await sRes.json();
            
            if (sData.success && sData.data) {
              const rawList = sData.data.data || sData.data || [];
              const filtered = rawList.filter((item: any) => 
                String(item.category_id) === String(foundCat.id)
              );
              setSubServices(filtered.length > 0 ? filtered : rawList);
            }
          }
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    if (categorySlug) fetchData();
  }, [categorySlug]);

  // --- SKELETON COMPONENT ---
  const ListingSkeleton = () => (
    <div className="bg-white min-h-screen">
      {/* Header Skeleton */}
      <div className="bg-gray-50 py-10 text-center border-b border-gray-100">
        <Skeleton className="h-8 w-64 mx-auto mb-2" />
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Intro Section Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <Skeleton className="h-12 w-64 rounded-lg" />
          <div className="md:w-1/2 w-full">
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        </div>

        {/* List Items Skeleton */}
        <div className="space-y-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-gray-100 pb-16 flex flex-col md:flex-row items-center gap-12">
              <Skeleton className="h-16 w-20 rounded-lg hidden md:block" /> {/* Number */}
              <div className="flex-1 space-y-4 w-full">
                <Skeleton className="h-8 w-3/4 rounded-md" /> {/* Title */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-4 w-32 rounded-full" /> {/* Link */}
              </div>
              <Skeleton className="w-full md:w-[400px] aspect-[16/9] rounded-3xl" /> {/* Image */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) return <ListingSkeleton />;

  if (!categoryInfo) return (
    <div className="py-20 text-center text-gray-500">
      Category "{decodeURIComponent(categorySlug)}" not found.
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Visual Header */}
      <div className="bg-gray-50 py-10 text-center border-b border-gray-100">
        <h1 className="text-2xl font-bold text-[#04063E]">SIFS India Services</h1>
        <p className="text-[#96C11F] text-xs font-black mt-1 uppercase tracking-[0.2em]">
          {categoryInfo.name}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <h2 className="text-4xl font-extrabold text-[#04063E] leading-tight max-w-sm uppercase">
            Expert {categoryInfo.name}
          </h2>
          <div className="md:w-1/2">
            <p className="text-gray-500 leading-relaxed border-l-4 border-[#96C11F] pl-6 py-2">
              {categoryInfo.short_text || "Specialized forensic investigation services tailored to legal and corporate requirements."}
            </p>
          </div>
        </div>

        {/* Services List Rendering */}
        <div className="space-y-16">
          {subServices.length > 0 ? subServices.map((item, index) => (
            <div 
              key={item.id} 
              className="group border-b border-gray-100 pb-16 last:border-0 flex flex-col md:flex-row items-center gap-12"
            >
              {/* Numbering */}
              <div className="text-6xl font-black text-gray-50 md:w-20 select-none">
                {(index + 1).toString().padStart(2, '0')}
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-4">
                <Link href={`/services/${categorySlug}/${item.slug}`}>
                  <h3 className="text-2xl font-bold text-[#04063E] group-hover:text-[#0B10A4] transition-colors cursor-pointer">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm line-clamp-3 leading-6">
                  {item.meta_description}
                </p>
                <Link 
                  href={`/services/${categorySlug}/${item.slug}`} 
                  className="inline-flex items-center text-xs font-black text-[#0B10A4] uppercase tracking-widest group-hover:gap-3 transition-all"
                >
                  Explore Service <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>

              {/* Image Preview */}
              <Link 
                href={`/services/${categorySlug}/${item.slug}`} 
                className="w-full md:w-[400px] aspect-[16/9] rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-100"
              >
                <img 
                  src={item.featured_image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </Link>
            </div>
          )) : (
            <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No specialized services currently listed in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}