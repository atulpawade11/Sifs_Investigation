// app/services/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Microscope,
  Fingerprint,
  Search,
  Shield,
  FlaskConical,
  Car,
  Users,
  Headphones
} from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/shared/Skeleton';
import PageBanner from '@/components/common/PageBanner';
import ServiceSidebar from '@/components/services/ServiceSidebar';
import QueryForm from '@/components/services/QueryForm';
import { useBoot } from "@/context/BootContext";

export default function ServicesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [sidebarData, setSidebarData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { breadcrumbImage } = useBoot();

  // Toggle category expansion
  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Expand all categories
  const expandAll = () => {
    const allIds = new Set(categories.map(cat => cat.id));
    setExpandedCategories(allIds);
  };

  // Collapse all categories
  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch all services with pagination to get all data
        let allServices: any[] = [];
        let currentPage = 1;
        let totalPages = 1;
        
        const firstRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?page=1&per_page=100`);
        const firstData = await firstRes.json();
        
        if (firstData.success && firstData.data) {
          allServices = [...(firstData.data.data || [])];
          totalPages = firstData.data.pagination?.total_pages || 1;
          
          for (let page = 2; page <= totalPages; page++) {
            const pageRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?page=${page}&per_page=100`);
            const pageData = await pageRes.json();
            if (pageData.success && pageData.data) {
              allServices = [...allServices, ...(pageData.data.data || [])];
            }
          }
        }
        
        const allCategories = firstData.data?.categories || [];
        
        // Filter active categories and add their services
        const activeCategories = allCategories
          .filter((cat: any) => cat.status === 1)
          .sort((a: any, b: any) => a.serial_number - b.serial_number)
          .map((cat: any) => ({
            ...cat,
            services: allServices
              .filter((s: any) => s.scategory_id === cat.id)
              .sort((a: any, b: any) => (a.serial_number || 999) - (b.serial_number || 999))
          }));
        
        setCategories(activeCategories);
        
        // Set sidebar data
        setSidebarData({ categories: allCategories, data: allServices });
        
        // Auto-expand first category by default
        if (activeCategories.length > 0) {
          setExpandedCategories(new Set([activeCategories[0].id]));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Get icon based on category name
  const getCategoryIcon = (name: string, index: number) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Document Examination': <FileText size={24} className="text-[#0B10A4]" />,
      'Fingerprint Analysis': <Fingerprint size={24} className="text-[#0B10A4]" />,
      'Cyber Forensics Investigation': <Search size={24} className="text-[#0B10A4]" />,
      'Insurance Investigation': <Shield size={24} className="text-[#0B10A4]" />,
      'Forensic Biology': <FlaskConical size={24} className="text-[#0B10A4]" />,
      'Key & Accident Reconstruction': <Car size={24} className="text-[#0B10A4]" />,
      'Forensic Facial Imaging': <Users size={24} className="text-[#0B10A4]" />,
      'Forensic Support': <Headphones size={24} className="text-[#0B10A4]" />
    };
  
    if (iconMap[name]) return iconMap[name];
    return <Microscope size={24} className="text-[#0B10A4]" />;
  };

  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, '').substring(0, 120);
  };

  // Loading Skeleton
  const ServicesSkeleton = () => (
    <div className="bg-[#F8F9FA] min-h-screen">
      <div className="w-full h-[300px] bg-gray-200 animate-pulse flex flex-col items-center justify-center">
        <Skeleton className="h-6 w-40 bg-gray-300" />
        <Skeleton className="h-10 w-80 bg-gray-300 mt-2" />
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-28 space-y-8">
              <Skeleton className="h-[400px] w-full rounded-2xl" />
              <Skeleton className="h-[300px] w-full rounded-2xl" />
            </div>
          </aside>
          <main className="lg:w-2/3 xl:w-3/4">
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <Skeleton className="h-16 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );

  if (loading) return <ServicesSkeleton />;

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <PageBanner
        title="Our Forensic Services"
        subtitle="Comprehensive forensic investigation solutions"
        breadcrumbImage={breadcrumbImage || "/about/about-banner.png"}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDEBAR */}
          <aside className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-28 space-y-8">
              <ServiceSidebar apiData={sidebarData} />
              <QueryForm />
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT - Categories with Sub-Services */}
          <main className="lg:w-2/3 xl:w-3/4">
            {/* Header with Expand/Collapse buttons */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <div className="mt-4 inline-flex items-center px-3 py-1 bg-blue-50 text-[#0B10A4] rounded-full text-sm font-semibold">
                  <span>{categories.length} Service Categories</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={expandAll}
                  className="text-xs text-[#0B10A4] hover:text-[#F68A07] transition-colors px-4 py-1 rounded-full border border-gray-200 hover:border-[#0B10A4]"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="text-xs text-[#0B10A4] hover:text-[#F68A07] transition-colors px-4 py-1 rounded-full border border-gray-200 hover:border-[#0B10A4]"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Categories with Sub-Services */}
            <div id="services-list" className="space-y-4">
              {categories.length > 0 ? (
                categories.map((category, catIndex) => (
                  <div 
                    key={category.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300"
                  >
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                          {getCategoryIcon(category.name, catIndex)}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-[#04063E]">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {category.services.length} Services Available
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-400">
                        {expandedCategories.has(category.id) ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </button>

                    {/* Category Description (always visible) */}
                    {category.short_text && (
                      <div className="px-5 pb-3 text-sm text-gray-500 border-b border-gray-100">
                        {category.short_text}
                      </div>
                    )}

                    {/* Sub-Services List - Expanded */}
                    {expandedCategories.has(category.id) && (
                      <div className="p-5 pt-3 bg-gray-50/50 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {category.services.map((service: any) => (
                            <Link
                              key={service.id}
                              href={`/services/${category.id}/${service.slug}`}
                              className="group flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#F5F7FF] transition-all duration-200 border border-gray-100 hover:border-[#0B10A4]/20 hover:shadow-sm"
                            >
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 group-hover:text-[#0B10A4] transition-colors text-sm">
                                  {service.title}
                                </h4>
                                {service.meta_description && (
                                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                                    {stripHtml(service.meta_description)}
                                  </p>
                                )}
                              </div>
                              <ArrowRight size={16} className="text-gray-400 group-hover:text-[#0B10A4] group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          ))}
                        </div>
                        
                        {/* View All Link */}
                        <div className="mt-4 pt-3 text-right">
                          <Link
                            href={`/services/${category.id}`}
                            className="text-sm font-semibold text-[#0B10A4] hover:text-[#F68A07] transition-colors inline-flex items-center gap-1 group"
                          >
                            View All {category.services.length} Services
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium">No service categories available at the moment.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}