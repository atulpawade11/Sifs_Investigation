"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';

export default function CareerFAQSection() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [meta, setMeta] = useState({ title: "F.A.Q", subtitle: "Frequently Asked Questions" });
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch FAQ List
        const faqRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/faq/`);
        const faqJson = await faqRes.json();
        
        // 2. Fetch Home/Meta Data for Titles
        const homeRes = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);
        const homeJson = await homeRes.json();

        // Update FAQ list
        if (faqJson.success && faqJson.data?.faqs) {
          setFaqs(faqJson.data.faqs);
        }

        // Update Dynamic Titles from Home API (be object)
        if (homeJson.success && homeJson.data?.be) {
          setMeta({
            title: homeJson.data.bs.faq_title || "F.A.Q",
            subtitle: homeJson.data.bs.faq_subtitle || "Frequently Asked Questions"
          });
        }
      } catch (err) {
        console.error("Data Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="bg-[#ebebeb] py-20 text-center text-gray-400 font-bold uppercase tracking-widest">Loading...</div>;
  if (faqs.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#ebebeb] py-20">
      {/* Side Image preserved exactly */}
      <div className="absolute right-0 top-0 hidden h-full w-[48%] md:block">
        <Image 
          src="/career/faq-person.png" 
          alt="FAQ Section" 
          fill 
          className="object-cover" 
          priority 
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-10">
        <div className="max-w-xl">
          {/* DYNAMIC TITLES FROM HOME API */}
          <h2 className="mb-1 text-3xl font-bold text-black uppercase tracking-tight">
            {meta.title}
          </h2>
          <p className="mb-8 text-sm font-medium text-gray-500 uppercase tracking-widest">
            {meta.subtitle}
          </p>

          <div className="space-y-4">
            {faqs.slice(0, 10).map((faq: any, index: number) => (
              <div 
                key={faq.id || index} 
                className={`rounded-lg transition-all duration-300 ${
                  activeIndex === index ? "bg-[#1B2A7A] text-white shadow-lg" : "bg-[#D7D7D7] text-gray-800"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold outline-none"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`} />
                </button>
                
                {activeIndex === index && (
                  <div className="px-6 pb-5 text-sm leading-relaxed border-t border-white/10 pt-4">
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}