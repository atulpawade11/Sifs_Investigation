"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronRight, Plus, Minus, Search } from 'lucide-react';
import Link from 'next/link';

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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (currentCategorySlug) setOpenCategory(currentCategorySlug);
  }, [currentCategorySlug]);

  const toggleCategory = (slug: string) => {
    setOpenCategory(openCategory === slug ? null : slug);
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">

        {/* ================= Categories ================= */}
        <div className="max-h-[55vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 transition-all">
          {categoriesFromApi.map((cat: any) => {
            const catSlug = slugify(cat.name);
            const isExpanded = openCategory === catSlug;
            const hasSubItems = cat.service_count > 0;
            const isActiveCategory = currentCategorySlug === catSlug;

            return (
              <div key={cat.id} className="border-b last:border-0 border-gray-50">
                <button
                  type="button"
                  onClick={() => toggleCategory(catSlug)}
                  className="w-full flex justify-between items-center p-4 text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className={isActiveCategory ? "text-[#044782]" : ""}>
                    {cat.name}
                  </span>
                  {hasSubItems && (
                    isExpanded
                      ? <Minus size={14} className="text-[#F68A07]" />
                      : <Plus size={14} className="text-gray-400" />
                  )}
                </button>

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
                            <ChevronRight size={14} className={isActive ? "text-white" : "text-gray-300"} />
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

      {/* ================= Search + CTA Section ================= */}
      <div className="bg-white p-5 space-y-5 mt-8 rounded-xl shadow-sm border border-gray-100">

        {/* Search Input */}
        <div className="flex rounded-md overflow-hidden border border-gray-200">
          <input
            type="text"
            placeholder="Search Services"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 text-sm outline-none bg-white"
          />
          <button className="bg-gray-900 text-white px-4 flex items-center justify-center hover:bg-black transition-colors">
            <Search size={18} />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            href="/submit-case"
            className="text-sm bg-gradient-to-r from-[#0B10A4] to-[#04063E] text-white px-3 py-2 rounded-md font-bold flex items-center gap-4 hover:from-[#1217c0] hover:to-[#0a0f6b]"
          >
            Submit Case
          </Link>

          <Link
            href="/sample-report"
            className="flex-1 text-center bg-gray-900 text-white font-semibold text-sm py-3 rounded-md hover:bg-black transition-all"
          >
            Sample Report
          </Link>
        </div>
      </div>
    </div>
  );
}