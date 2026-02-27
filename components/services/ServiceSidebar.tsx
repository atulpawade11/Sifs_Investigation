"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronRight, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

// Helper to turn Admin Names into URL slugs
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

interface SidebarProps {
  apiData: any; 
}

export default function ServiceSidebar({ apiData }: SidebarProps) {
  const params = useParams();
  
  const currentCategorySlug = params.category as string;
  const currentServiceSlug = params.service as string;

  const categoriesFromApi = apiData?.categories || [];
  const activeServicesList = apiData?.data || [];

  const [openCategory, setOpenCategory] = useState<string | null>(currentCategorySlug);

  useEffect(() => {
    if (currentCategorySlug) setOpenCategory(currentCategorySlug);
  }, [currentCategorySlug]);

  const toggleCategory = (slug: string) => {
    setOpenCategory(openCategory === slug ? null : slug);
  };

  return (
    <div
      className="
        bg-white 
        rounded-xl 
        shadow-sm 
        border 
        border-gray-100 
        overflow-hidden
        w-full
      "
    >
      {/* Scrollable Container */}
      <div
        className="
          max-h-[60vh] 
          overflow-y-auto 
          scrollbar-thin 
          scrollbar-thumb-gray-300 
          scrollbar-track-transparent
          hover:scrollbar-thumb-gray-400
          transition-all
        "
      >
        {categoriesFromApi.map((cat: any) => {
          const catSlug = slugify(cat.name);
          const isExpanded = openCategory === catSlug;
          const hasSubItems = cat.service_count > 0;
          const isActiveCategory = currentCategorySlug === catSlug;

          return (
            <div key={cat.id} className="border-b last:border-0 border-gray-50">
              
              {/* Parent Category Header */}
              <button 
                type="button"
                onClick={() => toggleCategory(catSlug)}
                className="w-full flex justify-between items-center p-4 text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <span className={isActiveCategory ? "text-[#044782]" : ""}>
                  {cat.name}
                </span>
                {hasSubItems && (
                  isExpanded ? (
                    <Minus size={14} className="text-[#F68A07]" />
                  ) : (
                    <Plus size={14} className="text-gray-400" />
                  )
                )}
              </button>
              
              {/* Accordion Content */}
              {isExpanded && hasSubItems && (
                <div className="px-3 pb-4 space-y-1 bg-gray-50/30">
                  {isActiveCategory ? (
                    activeServicesList.map((service: any) => {
                      const isActive = currentServiceSlug === service.slug;
                      return (
                        <Link
                          key={service.id}
                          href={`/services/${catSlug}/${service.slug}`}
                          className={`flex justify-between items-center px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all
                            ${isActive 
                              ? "bg-[#044782] text-white shadow-md" 
                              : "text-gray-500 hover:bg-white hover:text-[#044782] border border-transparent hover:border-gray-100"
                            }`}
                        >
                          {service.title}
                          <ChevronRight 
                            size={14} 
                            className={isActive ? "text-white" : "text-gray-300"} 
                          />
                        </Link>
                      );
                    })
                  ) : (
                    <Link
                      href={`/services/${catSlug}`}
                      className="flex justify-between items-center px-4 py-2.5 rounded-lg text-[13px] font-medium text-gray-400 hover:bg-white hover:text-[#044782] border border-dashed border-gray-200"
                    >
                      View {cat.name} Services
                      <ChevronRight size={14} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}