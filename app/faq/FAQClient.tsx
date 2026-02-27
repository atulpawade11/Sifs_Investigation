"use client";

import { useState, useEffect } from "react";
import PageBanner from "@/components/common/PageBanner";
import { ChevronDown, ChevronUp } from "lucide-react"; 
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from "@/components/shared/Skeleton";
import { useBoot } from "@/context/BootContext";

export default function FAQClient() {
  const [faqData, setFaqData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { breadcrumbImage } = useBoot();
  
  const INITIAL_LIMIT = 5;

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/faq/`);
        const json = await response.json();
        if (json.success) {
          setFaqData(json.data); 
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const faqsArray = faqData?.faqs || [];
  const displayedFaqs = showAll ? faqsArray : faqsArray.slice(0, INITIAL_LIMIT);

  // --- FAQS SKELETON COMPONENT ---
  const FAQSkeleton = () => (
    <div className="space-y-8">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="border-b border-gray-50 pb-6 space-y-4">
          {/* Question Placeholder */}
          <Skeleton className="h-7 w-3/4 rounded-md" />
          {/* Answer Lines Placeholder */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-sm" />
            <Skeleton className="h-4 w-5/6 rounded-sm" />
            <Skeleton className="h-4 w-2/3 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title={faqData?.bs?.faq_title || "Frequently Asked Questions"}
        subtitle={faqData?.bs?.faq_subtitle || "SIFS India Support"}
        breadcrumbImage={breadcrumbImage}
      />

      <div className="relative z-10 -mt-12 pb-20 px-4">
        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-16 space-y-8">
            
            {loading ? (
              <FAQSkeleton />
            ) : (
              <>
                {/* FAQ List */}
                <div className="space-y-6">
                  {displayedFaqs.map((item: any, index: number) => (
                    <div key={index} className="group border-b border-gray-50 pb-6 last:border-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0B4F8A] transition-colors">
                        {item.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Read More / Read Less Button */}
                {faqsArray.length > INITIAL_LIMIT && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="flex items-center gap-4 bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                      text-white px-8 py-3 rounded-full font-bold
                      hover:from-[#1217c0] hover:to-[#0a0f6b]
                      transition-all group shadow-lg"
                    >
                      {showAll ? (
                        <>Read Less <ChevronUp size={20} /></>
                      ) : (
                        <>Read More <ChevronDown size={20} /></>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}