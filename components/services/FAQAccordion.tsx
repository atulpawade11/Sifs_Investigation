"use client";

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const faqData = [
  { 
    question: "I need an expert opinion on a forged signature that was done by a single person on two different documents. How should I proceed with this? - Radha Raman Tripathy", 
    answer: "For expert opinion on a forged signature on two different documents, please send us the documents. We will provide guidance on the analysis process." 
  },
  { 
    question: "I need Urdu signature verification on the appointment letter. Kindly confirm if you can do this. - Suresh Pratap Singh", 
    answer: "Yes, we have experts specialized in various scripts including Urdu for signature and document verification." 
  },
  { 
    question: "Can you verify the signatures on the photocopied documents? Please advise. - Anil Jain", 
    answer: "While original documents are preferred for the most accurate forensic analysis, we can perform preliminary examinations on high-quality photocopies." 
  },
  { 
    question: "I need a signature verification service. Please share all available details. - Kapil", 
    answer: "Our signature verification includes individual characteristic analysis, stroke direction, pressure points, and rhythm analysis." 
  },
  { 
    question: "I need legal advice on the signature verification process. What are your charges? - Aziz Khan", 
    answer: "Charges vary based on the complexity of the case and the number of documents. Please contact our department for a formal quote." 
  }
];

export default function FAQAccordion() {
  // Set the first item (index 0) as open by default to match your screenshot
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqData.map((faq, i) => {
        const isOpen = openIndex === i;
        
        return (
          <div 
            key={i} 
            className={`rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 ${
              isOpen ? "shadow-md" : ""
            }`}
          >
            {/* Header / Question */}
            <button 
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={`w-full p-4 flex justify-between items-center transition-colors ${
                isOpen ? "bg-[#101880] text-white" : "bg-[#E5E7EB] text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span className="text-[12px] font-semibold text-left leading-tight">
                {faq.question}
              </span>
              <ChevronRight 
                size={18} 
                className={`transition-transform duration-300 flex-shrink-0 ml-4 ${
                  isOpen ? "rotate-90" : ""
                }`} 
              />
            </button>

            {/* Answer Content */}
            {isOpen && (
              <div className="bg-white p-6 border-t border-gray-100">
                <p className="text-[12px] text-gray-500 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}