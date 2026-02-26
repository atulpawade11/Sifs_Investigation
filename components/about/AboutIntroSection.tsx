"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/config";

const AboutIntroSection = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);
        const result = await response.json();
        if (result.success) setData(result.data.bs);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchData();
  }, []);

  const getCleanIntro = (html: string) => {
    if (!html) return "";
    // Splits before the Mission header to get "The Journey" section
    const parts = html.split(/<h5.*?>.*?Mission.*?<\/h5>/i);
    return parts[0]; 
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#04063E] ps-1 pe-3 py-1 text-[18px] font-bold text-black">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B10A4]">
                    <Image src="/about/zap.png" alt="Icon" width={20} height={20} />
                </span>
                {data?.about_seo_keyword || "About Us"}
            </div>

            <h2 className="text-[32px] font-bold leading-tight text-black md:text-4xl mb-6">
              {data?.intro_section_text || "Leading Forensic Excellence Since 2006"}
            </h2>

            <div
              className="text-[14px] leading-relaxed text-[#777777] 
                         [&_p]:mb-4 
                         [&_ul]:grid [&_ul]:grid-cols-1 md:[&_ul]:grid-cols-2 [&_ul]:gap-2 [&_ul]:mt-6
                         [&_li]:flex [&_li]:items-center [&_li]:before:content-['›'] [&_li]:before:mr-2 [&_li]:before:text-[#0B10A4] [&_li]:before:font-bold"
              dangerouslySetInnerHTML={{ __html: getCleanIntro(data?.about_us) }}
            />
          </div>

          <div className="relative">
            <div className="relative h-[400px] w-full overflow-hidden rounded-l-[100px] md:h-[500px]">
              <Image
                src={data?.about_feature_image || "/about/about-us.png"}
                alt="SIFS India"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntroSection;