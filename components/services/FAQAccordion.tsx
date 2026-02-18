"use client";

import React, { useState } from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';

// Static fallbacks for when API data is missing
const defaultFaqs = [
  { 
    question: "How long does a standard forensic signature verification take?", 
    answer: "Typically, a preliminary analysis takes 3-5 business days. Complex cases involving multiple documents or historical comparisons may take longer to ensure absolute accuracy for legal standards." 
  },
  { 
    question: "Are your forensic reports admissible in a court of law?", 
    answer: "Yes, our reports are prepared by certified forensic experts following standard operating procedures (SOPs) that comply with legal evidentiary requirements." 
  }
];

interface FAQAccordionProps {
  apiFaqs?: any[]; // This will receive data from the API if available
}

export default function FAQAccordion({ apiFaqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Logic: Use API data if it exists and has length, otherwise use static defaults
  const dataToRender = (apiFaqs && apiFaqs.length > 0) ? apiFaqs : defaultFaqs;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8 border-l-4 border-[#F68A07] pl-4">
        <HelpCircle size={24} className="text-[#101880]" />
        <div>
          <h3 className="text-xl font-bold text-[#04063E]">Expert Q&A</h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Forensic Consultation</p>
        </div>
      </div>

      <div className="space-y-4">
        {dataToRender.map((faq, i) => {
          const isOpen = openIndex === i;
          
          return (
            <div 
              key={i} 
              className={`group rounded-2xl border transition-all duration-500 ${
                isOpen 
                  ? "border-[#101880] shadow-xl shadow-blue-900/5 bg-white" 
                  : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200"
              }`}
            >
              {/* Question Trigger */}
              <button 
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full p-5 flex justify-between items-center text-left"
              >
                <span className={`text-[13px] font-bold transition-colors duration-300 ${
                  isOpen ? "text-[#101880]" : "text-gray-700"
                }`}>
                  {faq.question || faq.title}
                </span>
                <div className={`p-1.5 rounded-lg transition-all duration-500 ${
                  isOpen ? "bg-[#101880] text-white rotate-90" : "bg-white text-gray-300 shadow-sm"
                }`}>
                  <ChevronRight size={16} />
                </div>
              </button>

              {/* Collapsible Answer */}
              <div 
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-2">
                    <div className="h-[1px] w-full bg-gradient-to-r from-gray-100 to-transparent mb-4" />
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      {faq.answer || faq.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}