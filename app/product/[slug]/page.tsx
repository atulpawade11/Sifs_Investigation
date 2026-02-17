"use client";

import React, { useEffect, useState, use } from 'react';
import PageBanner from "../../../components/common/PageBanner";
import { Loader2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function SketchCopProductPage({ params }: Props) {
  const resolvedParams = use(params);
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // State to track which accordion is open. 
  // '0' means the first one (yellow) is open by default.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://forensicinstitute.in/api/InvestigationServices/Website/front/product/${resolvedParams.slug}`
        );
        const json = await response.json();

        if (json.success && json.data?.page) {
          setProductData(json.data.page);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [resolvedParams.slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#0B10A4]" /></div>;
  if (error || !productData) return <div className="p-20 text-center font-bold">Product Not Found.</div>;

  const embedUrl = `https://www.youtube.com/embed/${productData.video_id}`;

  // Prepare the data array for mapping
  const sections = [
    { id: 0, title: productData.name, content: productData.body_1, isMain: true },
    { id: 1, title: productData.heading_2, content: productData.body_2, isMain: false },
    { id: 2, title: productData.heading_3, content: productData.body_3, isMain: false },
    { id: 3, title: productData.heading_4, content: productData.body_4, isMain: false },
    { id: 4, title: productData.heading_5, content: productData.body_5, isMain: false },
  ];

  const handleToggle = (index: number) => {
    // If the clicked one is already open, close it (set to null), otherwise open the clicked index
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <PageBanner 
        title={productData.title} 
        subtitle={productData.subtitle} 
        bgImage="/images/banners/product-default.jpg" 
      />

      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-2">
        {sections.map((section) => {
          if (!section.title) return null;
          const isOpen = openIndex === section.id;

          return (
            <details 
              key={section.id} 
              open={isOpen} 
              className="group border border-gray-200 rounded-sm overflow-hidden shadow-sm"
            >
              <summary 
                className={`flex justify-between items-center p-4 cursor-pointer list-none font-bold transition-colors ${
                  section.isMain 
                    ? "bg-[#F6BA13] text-white" 
                    : "bg-[#EEEEEE] text-gray-800 hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  e.preventDefault(); 
                  handleToggle(section.id);
                }}
              >
                <span className="text-lg">{section.title}</span>
                <span className="text-2xl">{isOpen ? "−" : "+"}</span>
              </summary>
              
              <div className="p-8 bg-white space-y-8 border-t border-gray-100">
                <div 
                  className="html-render-zone text-gray-800"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />

                {/* Show Video only in the first (Main) accordion */}
                {section.isMain && (
                  <div className="max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg bg-black">
                    <iframe 
                      src={embedUrl} 
                      className="w-full h-full border-0" 
                      allowFullScreen 
                    />
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}