"use client";

import { useState, useEffect } from "react";
import PageBanner from "../../components/common/PageBanner";
import { AlertCircle } from "lucide-react";
import { getPageBySlug } from "../../services/legalService";
import { Skeleton } from "@/components/shared/Skeleton"; // Ensure this path matches your project

export default function PrivacyPolicyPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        const res = await getPageBySlug("privacy-policy");
        
        if (res.success && res.data) {
          const actualData = res.data.be || res.data.page || res.data;
          setPageData(actualData);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
        console.error("Privacy Policy Load Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  // --- LEGAL DOCUMENT SKELETON ---
  const LegalSkeleton = () => (
    <div className="space-y-12 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-4">
          {/* Header Placeholder */}
          <Skeleton className="h-8 w-1/3 rounded-lg bg-gray-100" /> 
          {/* Paragraph Lines Placeholder */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded bg-gray-50" />
            <Skeleton className="h-4 w-full rounded bg-gray-50" />
            <Skeleton className="h-4 w-5/6 rounded bg-gray-50" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title={pageData?.title || "Privacy Policy"}
        subtitle="SIFS India"
        bgImage="/about/about-banner.png"
      />

      <div className="relative z-10 -mt-12 pb-20 px-4">
        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[500px]">
          <div className="p-8 md:p-16">
            
            {/* Skeleton Loader */}
            {loading && <LegalSkeleton />}

            {/* Error State */}
            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <h2 className="text-xl font-bold text-gray-900">Content Unavailable</h2>
                <p className="text-gray-500 mt-2">We were unable to load the privacy policy. Please try again later.</p>
              </div>
            )}

            {/* Content Display */}
            {!loading && !error && pageData && (
              <div 
                className="api-content prose prose-slate max-w-none text-gray-700 
                           prose-headings:text-[#04063E] prose-headings:font-bold 
                           prose-p:leading-relaxed prose-strong:text-[#0B10A4]"
                dangerouslySetInnerHTML={{ 
                  __html: pageData.description || pageData.body || "" 
                }} 
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}