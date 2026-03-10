// app/services/[category]/ServiceListingClient.tsx

"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/shared/Skeleton';
import PageBanner from '@/components/common/PageBanner';

interface Props {
  categorySlug: string;
}

const INITIAL_VISIBLE_COUNT = 3; // Show first 3 services initially

export default function ServiceListingClient({ categorySlug }: Props) {
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [subServices, setSubServices] = useState<any[]>([]);
  const [breadcrumbImage, setBreadcrumbImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // Function to fetch all pages of services
  const fetchAllServices = async () => {
    let allServices: any[] = [];
    let currentPage = 1;
    let totalPages = 1;
    
    try {
      // First, fetch page 1 to get total pages
      const firstRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?page=1`);
      const firstData = await firstRes.json();
      
      if (firstData.success && firstData.data) {
        // Add services from page 1
        allServices = [...(firstData.data.data || [])];
        
        // Get total pages
        totalPages = firstData.data.pagination?.total_pages || 1;
        
        // Fetch remaining pages
        for (let page = 2; page <= totalPages; page++) {
          const pageRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?page=${page}`);
          const pageData = await pageRes.json();
          
          if (pageData.success && pageData.data) {
            allServices = [...allServices, ...(pageData.data.data || [])];
          }
        }
      }
      
      return { services: allServices, categories: firstData.data?.categories || [] };
    } catch (error) {
      console.error("Error fetching all pages:", error);
      return { services: [], categories: [] };
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch ALL services from all pages
        const { services: allServices, categories } = await fetchAllServices();
        
        // Decode the URL slug (it might be ID or name)
        const rawSlug = decodeURIComponent(categorySlug);
        
        // Try to find category by ID first (if slug is a number)
        let foundCat = null;
        
        if (!isNaN(Number(rawSlug))) {
          foundCat = categories?.find((c: any) => String(c.id) === rawSlug);
        }
        
        // If not found by ID, try by name
        if (!foundCat) {
          const cleanSlug = rawSlug.toLowerCase().replace(/[^a-z0-9]/g, '');
          
          foundCat = categories?.find((c: any) => {
            const catNameClean = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            return catNameClean.includes(cleanSlug) || cleanSlug.includes(catNameClean);
          });
        }

        if (foundCat) {
          setCategoryInfo(foundCat);

          // Filter ALL services that belong to this category using scategory_id
          const filtered = allServices?.filter(
            (item: any) => String(item.scategory_id) === String(foundCat.id)
          ) || [];
          
          // Sort by serial_number if available
          const sortedServices = filtered.sort((a: any, b: any) => 
            (a.serial_number || 999) - (b.serial_number || 999)
          );
          
          console.log(`Found ${sortedServices.length} services for category ${foundCat.name}`); // Debug log
          setSubServices(sortedServices);
        }

        // Fetch breadcrumb image from boot settings
        const bootRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);
        const bootResult = await bootRes.json();
        if (bootResult?.success) {
          setBreadcrumbImage(bootResult.data.bs?.breadcrumb || undefined);
        }

      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (categorySlug) fetchData();
  }, [categorySlug]);

  const handleShowMore = () => {
    setVisibleCount(subServices.length);
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // --- YOUR EXACT SKELETON COMPONENT (unchanged) ---
  const ListingSkeleton = () => (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 py-10 text-center border-b border-gray-100">
        <Skeleton className="h-8 w-64 mx-auto mb-2" />
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {[1,2,3].map((i) => (
          <div key={i} className="flex flex-col md:flex-row items-center gap-12 border-b border-gray-100 pb-16">
            <Skeleton className="h-16 w-20 rounded-lg hidden md:block" />
            <div className="flex-1 space-y-4 w-full">
              <Skeleton className="h-8 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-32 rounded-full" />
            </div>
            <Skeleton className="w-full md:w-[400px] aspect-[16/9] rounded-3xl" />
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) return <ListingSkeleton />;

  if (!categoryInfo) return (
    <div className="py-20 text-center text-gray-500">
      Category "{decodeURIComponent(categorySlug)}" not found.
    </div>
  );

  const visibleServices = subServices.slice(0, visibleCount);
  const hasMoreServices = subServices.length > INITIAL_VISIBLE_COUNT;
  const showingAll = visibleCount === subServices.length;

  // Debug: Log the count
  console.log(`Rendering ${subServices.length} services for ${categoryInfo.name}`);

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic Page Banner */}
      <PageBanner
        title={categoryInfo.name}
        subtitle={`SIFS India Services`}
        breadcrumbImage={breadcrumbImage || "/about/about-banner.png"}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16">
          <p className="text-2xl font-bold text-gray-600 leading-tight border-l-4 border-[#0a11a1] pl-6 py-2">
            {categoryInfo.short_text || 
              "Specialized forensic investigation services tailored to legal and corporate requirements."
            }
          </p>
          
          {/* Service count badge - Now shows correct count from ALL pages */}
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 text-[#0a11a1] rounded-full text-sm font-semibold">
            <span>{subServices.length} Services Available</span>
          </div>
        </div>

        {/* Services List Rendering */}
        <div id="services-list" className="space-y-16">
          {visibleServices.length > 0 ? visibleServices.map((item, index) => (
            <div key={item.id} className="group border-b border-gray-100 pb-16 last:border-0 flex flex-col md:flex-row items-center gap-12">
              
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
                  {item.meta_description || item.content?.replace(/<[^>]*>/g, '').substring(0, 200)}
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
                  src={item.featured_image || item.main_image} 
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

        {/* Show More / Show Less Button */}
        {hasMoreServices && (
          <div className="mt-12 text-center">
            {!showingAll ? (
              <button
                onClick={handleShowMore}
                className="inline-flex items-center gap-2 bg-[#0a11a1] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#04063E] transition-all transform hover:-translate-y-1 shadow-lg group"
              >
                Show All {subServices.length} Services
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={handleShowLess}
                className="inline-flex items-center gap-2 bg-gray-100 text-[#0a11a1] px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all transform hover:-translate-y-1 shadow-lg group"
              >
                Show Less
                <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" />
              </button>
            )}
          </div>
        )}

        {/* Show count of hidden services */}
        {!showingAll && subServices.length > INITIAL_VISIBLE_COUNT && (
          <p className="text-center text-gray-400 text-sm mt-4">
            Showing {INITIAL_VISIBLE_COUNT} of {subServices.length} services
          </p>
        )}
      </div>
    </div>
  );
}