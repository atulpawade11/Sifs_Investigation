"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRight, Plus, Minus, Search } from 'lucide-react';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/config';

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

interface SidebarProps {
  apiData?: any; // Make it optional
}

export default function ServiceSidebar({ apiData }: SidebarProps) {
  const router = useRouter();
  const params = useParams();
  
  const [categories, setCategories] = useState<any[]>([]);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const currentCategorySlug = params.category as string;
  const currentServiceSlug = params.service as string;

  const [openCategory, setOpenCategory] = useState<string | null>(currentCategorySlug);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Fetch ALL data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (currentCategorySlug) setOpenCategory(currentCategorySlug);
  }, [currentCategorySlug]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      console.log("Fetching all services data...");
      
      // Fetch first page to get categories and total pages
      const firstRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?page=1`);
      const firstData = await firstRes.json();
      
      if (firstData.success && firstData.data) {
        // Set categories
        setCategories(firstData.data.categories || []);
        
        // Get all services from all pages
        let allServicesList = [...(firstData.data.data || [])];
        
        // Get total pages
        const totalPages = firstData.data.pagination?.total_pages || 1;
        console.log(`Total pages: ${totalPages}`);
        
        // Fetch remaining pages
        for (let page = 2; page <= totalPages; page++) {
          const pageRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services?page=${page}`);
          const pageData = await pageRes.json();
          
          if (pageData.success && pageData.data) {
            allServicesList = [...allServicesList, ...(pageData.data.data || [])];
          }
        }
        
        setAllServices(allServicesList);
        console.log(`Total services fetched: ${allServicesList.length}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (slug: string) => {
    setOpenCategory(openCategory === slug ? null : slug);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  // Search function
  const performSearch = () => {
    if (!searchQuery.trim()) return;

    const serviceCategoryMap: any[] = [];
    
    categories.forEach((cat: any) => {
      const catSlug = slugify(cat.name);
      
      const categoryServices = allServices.filter(
        (s: any) => String(s.scategory_id) === String(cat.id)
      );
      
      categoryServices.forEach((service: any) => {
        serviceCategoryMap.push({
          serviceId: service.id,
          serviceTitle: service.title,
          serviceSlug: service.slug,
          categoryId: cat.id,
          categoryName: cat.name,
          categorySlug: catSlug,
        });
      });
    });

    const query = searchQuery.toLowerCase().trim();
    const results = serviceCategoryMap.filter(item => 
      item.serviceTitle.toLowerCase().includes(query)
    );

    const uniqueCategories = results.reduce((acc: any[], current) => {
      const exists = acc.find(item => item.categoryId === current.categoryId);
      if (!exists) {
        acc.push({
          categoryId: current.categoryId,
          categoryName: current.categoryName,
          categorySlug: current.categorySlug,
          matchingServices: results.filter(r => r.categoryId === current.categoryId).length
        });
      }
      return acc;
    }, []);

    setSearchResults(uniqueCategories);
    setShowSearchResults(true);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handleSearchClick = () => {
    performSearch();
  };

  const navigateToCategory = (categorySlug: string) => {
    router.push(`/services/${categorySlug}`);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">

        {/* Search Results */}
        {showSearchResults && (
          <div className="border-b border-gray-100">
            <div className="p-4 bg-blue-50/50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm text-[#044782]">
                  Matching Categories ({searchResults.length})
                </h3>
                <button 
                  onClick={() => {
                    setShowSearchResults(false);
                    setSearchQuery("");
                  }}
                  className="text-xs text-gray-500 hover:text-[#044782]"
                >
                  Clear
                </button>
              </div>
              
              {searchResults.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto space-y-2">
                  {searchResults.map((category) => (
                    <button
                      key={category.categoryId}
                      onClick={() => navigateToCategory(category.categorySlug)}
                      className="w-full text-left p-3 bg-white rounded-lg hover:shadow-md transition-all border border-gray-100 hover:border-[#044782]/20 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm text-gray-800 group-hover:text-[#044782]">
                          {category.categoryName}
                        </div>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-[#044782]" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          {category.matchingServices} matching {category.matchingServices === 1 ? 'service' : 'services'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-white rounded-lg">
                  <p className="text-gray-400 text-sm">No services found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="max-h-[55vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {categories.map((cat: any) => {
            const catSlug = slugify(cat.name);
            const isExpanded = openCategory === catSlug;
            const isActiveCategory = currentCategorySlug === catSlug;

            // Get services for this category
            const categoryServices = allServices.filter(
              (service: any) => String(service.scategory_id) === String(cat.id)
            );

            return (
              <div key={cat.id} className="border-b last:border-0 border-gray-50">
                <button
                  onClick={() => toggleCategory(catSlug)}
                  className="w-full flex justify-between items-center p-4 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className={isActiveCategory ? "text-[#044782]" : ""}>
                    {cat.name} {categoryServices.length > 0 && `(${categoryServices.length})`}
                  </span>     
                  {categoryServices.length > 0 && (
                    isExpanded
                      ? <Minus size={14} className="text-[#F68A07]" />
                      : <Plus size={14} className="text-gray-400" />
                  )}
                </button>

                {isExpanded && categoryServices.length > 0 && (
                  <div className="px-3 pb-4 space-y-1 bg-gray-50/30">
                    {categoryServices.map((service: any) => {
                      const isActive = currentServiceSlug === service.slug && currentCategorySlug === catSlug;
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
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Search + CTA */}
      <div className="bg-white p-5 space-y-5 mt-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex rounded-md overflow-hidden border border-gray-200">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            className="flex-1 px-4 py-3 text-sm outline-none bg-white"
          />
          <button 
            onClick={handleSearchClick}
            className="bg-gray-900 text-white px-4 flex items-center justify-center hover:bg-black transition-colors"
          >
            <Search size={18} />
          </button>
        </div>

        <div className="flex gap-3">
          <Link
            href="/submit-case"
            className="text-sm bg-gradient-to-r from-[#0B10A4] to-[#04063E] text-white px-3 py-2 rounded-md font-bold hover:from-[#1217c0] hover:to-[#0a0f6b]"
          >
            Submit Case
          </Link>
          <Link
            href="/sample-report"
            className="flex-1 text-center bg-gray-900 text-white font-semibold text-sm py-3 rounded-md hover:bg-black"
          >
            Sample Report
          </Link>
        </div>
      </div>
    </div>
  );
}