"use client"; // Required for useState

import { useState } from "react";
import PageBanner from "../../components/common/PageBanner";
import { faqData } from "../../data/faq";
import { ChevronDown, ChevronUp } from "lucide-react"; // Optional: for icons

export default function FAQPage() {
  const [showAll, setShowAll] = useState(false);
  
  // Set the number of FAQs to show initially
  const INITIAL_LIMIT = 5;
  const displayedFaqs = showAll ? faqData : faqData.slice(0, INITIAL_LIMIT);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="SIFS India Support"
        bgImage="/about/about-banner.png"
      />

      <div className="relative z-10 -mt-12 pb-20 px-4">
        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-16 space-y-8">
            
            <div className="border-b border-gray-100 pb-6">
              <p className="text-base text-gray-600">
                Find answers to common questions about our forensic services, lab procedures, and legal support.
              </p>
            </div>

            {/* FAQ List */}
            <div className="space-y-6">
              {displayedFaqs.map((item, index) => (
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
            {faqData.length > INITIAL_LIMIT && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                  text-white px-8 py-3 rounded-full font-bold
                  flex items-center gap-4
                  hover:from-[#1217c0] hover:to-[#0a0f6b]
                  transition-all group"
                >
                  {showAll ? (
                    <>Read Less <ChevronUp size={20} /></>
                  ) : (
                    <>Read More <ChevronDown size={20} /></>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}