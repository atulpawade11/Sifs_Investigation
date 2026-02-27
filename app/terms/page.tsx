"use client";

import { useState, useEffect } from "react";
import PageBanner from "../../components/common/PageBanner";
import { AlertCircle } from "lucide-react";
import { getPageBySlug } from "../../services/legalService";
import { API_BASE_URL } from "@/lib/config";
import { Skeleton } from "@/components/shared/Skeleton";

export default function TermsAndConditionsPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [breadcrumbImage, setBreadcrumbImage] = useState<string | undefined>(undefined); // ✅ string | undefined
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        // 1️⃣ Fetch legal page content
        const res = await getPageBySlug("terms-and-conditions");
        if (res.success && res.data?.page) setPageData(res.data.page);

        // 2️⃣ Fetch breadcrumb image from boot settings
        const bootRes = await fetch(
          `${API_BASE_URL}/InvestigationServices/Website/front/`
        );
        const bootResult = await bootRes.json();

        if (bootResult?.success) {
          setBreadcrumbImage(bootResult.data.bs?.breadcrumb || undefined);
        }

      } catch (err) {
        setError(true);
        console.error("Terms & Conditions load error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // --- DOCUMENT SKELETON ---
  const LegalSkeleton = () => (
    <div className="space-y-10 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-8 w-1/4 rounded-lg bg-gray-100" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded bg-gray-50" />
            <Skeleton className="h-4 w-full rounded bg-gray-50" />
            <Skeleton className="h-4 w-3/4 rounded bg-gray-50" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Banner */}
      <PageBanner
        title={pageData?.title || "Terms & Conditions"}
        subtitle="SIFS India"
        breadcrumbImage={breadcrumbImage} // ✅ matches string | undefined
      />

      <div className="relative z-10 -mt-12 pb-20 px-4">
        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">
          <div className="p-8 md:p-16">

            {/* Skeleton Loader */}
            {loading && <LegalSkeleton />}

            {/* Error State */}
            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <h2 className="text-xl font-bold text-gray-900">
                  Failed to load content
                </h2>
                <p className="text-gray-500 mt-2">
                  Please check your internet connection or try again later.
                </p>
              </div>
            )}

            {/* Actual Page Content */}
            {!loading && !error && pageData && (
              <div
                className="api-content text-sm md:text-base prose prose-slate max-w-none 
                           prose-headings:text-[#04063E] prose-p:text-gray-600 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: pageData.body }}
              />
            )}

          </div>
        </section>
      </div>
    </div>
  );
}