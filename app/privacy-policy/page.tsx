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
        // We use "page" as the second argument because your URL is .../front/page/privacy-policy
        const res = await getPageBySlug("privacy-policy", "page");
        
        if (res.success && res.data) {
          // --- DYNAMIC DATA SELECTION ---
          // This looks for 'be' (Privacy/Career style) or 'page' (Terms style)
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
                <p className="mt-4 text-gray-500 font-medium">Loading content...</p>
              </div>
            )}

            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <h2 className="text-xl font-bold text-gray-900">Content Unavailable</h2>
                <p className="text-gray-500 mt-2">The API returned successfully, but no content was found.</p>
              </div>
            )}

            {!loading && !error && pageData && (
              <div 
                className="api-content prose prose-slate max-w-none text-gray-700"
                /** * FIELD FALLBACK:
                 * Privacy Policy API uses 'description'
                 * Terms and Conditions API uses 'body'
                 */
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