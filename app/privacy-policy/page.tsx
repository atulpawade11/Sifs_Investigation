"use client";

import { useState, useEffect } from "react";
import PageBanner from "../../components/common/PageBanner";
import { Loader2, AlertCircle } from "lucide-react";
import { getPageBySlug } from "../../services/legalService";

export default function PrivacyPolicyPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        // Using the slug likely used by your backend
        const res = await getPageBySlug("privacy-policy");
        
        if (res.success && res.data?.page) {
          setPageData(res.data.page);
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title={pageData?.title || "Privacy Policy"}
        subtitle="SIFS India"
        bgImage="/about/about-banner.png"
      />

      <div className="relative z-10 -mt-12 pb-20 px-4">
        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[400px]">
          <div className="p-8 md:p-16">
            
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#0B10A4]" size={40} />
                <p className="mt-4 text-gray-500 font-medium">Loading privacy statement...</p>
              </div>
            )}

            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <h2 className="text-xl font-bold text-gray-900">Content Unavailable</h2>
                <p className="text-gray-500 mt-2">We couldn't reach the server. Showing default view.</p>
              </div>
            )}

            {!loading && !error && pageData && (
              <div 
                className="api-content prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: pageData.body }} 
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}