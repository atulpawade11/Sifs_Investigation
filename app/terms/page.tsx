"use client";

import { useState, useEffect } from "react";
import PageBanner from "../../components/common/PageBanner";
import { Loader2, AlertCircle } from "lucide-react";
import { getPageBySlug } from "../../services/legalService";

export default function TermsAndConditionsPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getPageBySlug("terms-and-conditions"); 
        if (res.success) setPageData(res.data.page);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title={pageData?.title || "Terms & Conditions"}
        subtitle="SIFS India"
        bgImage="/about/about-banner.png"
      />

      <div className="relative z-10 -mt-12 pb-20 px-4">
        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[400px]">
          <div className="p-8 md:p-16">
            
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#0B10A4]" size={40} />
                <p className="mt-4 text-gray-500 font-medium">Retrieving legal documents...</p>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <h2 className="text-xl font-bold text-gray-900">Failed to load content</h2>
                <p className="text-gray-500 mt-2">Please check your internet connection or try again later.</p>
              </div>
            )}

            {/* Content Display */}
            {!loading && !error && pageData && (
              <div 
                className="api-content text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: pageData.body }} 
              />
            )}

          </div>
        </section>
      </div>
    </div>
  );
}