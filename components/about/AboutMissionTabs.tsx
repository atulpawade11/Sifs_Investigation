"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { parseAboutContent } from "@/lib/parseAboutContent";

export default function AboutMissionTabs() {
  const [activeTab, setActiveTab] = useState("mission");
  const [data, setData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false); // New state for toggle
  const [parsedContent, setParsedContent] = useState({
    mission: "",
    vision: "",
    purpose: "",
  });

  // Reset expansion when switching tabs
  useEffect(() => {
    setIsExpanded(false);
  }, [activeTab]);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data.bs.about_us) {
          const html = result.data.bs.about_us;
          const parsed = parseAboutContent(html);
          setData(result.data.bs);
          setParsedContent({
            mission: parsed.mission,
            vision: parsed.vision,
            purpose: parsed.purpose,
          });
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const contentStyle = `
    text-[14px] leading-relaxed text-gray-600 
    [&_ul]:list-disc 
    [&_ul]:ms-6 
    [&_ul]:my-4 
    [&_ul]:grid 
    [&_ul]:grid-cols-1 
    md:[&_ul]:grid-cols-2 
    [&_ul]:gap-x-8 
    [&_ul]:gap-y-2
    [&_li]:list-item 
    [&_li]:mb-2 
    [&_li]:ps-1
    [&_p]:mb-4
  `;

  return (
    <section className="mx-auto container px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-[380px_1fr_420px]">
        
        {/* LEFT COLUMN */}
        <div className="space-y-4 border-r border-[#D9D9D9]">
          <div className="overflow-hidden rounded-2xl me-4 h-[260px]">
            <Image
              src="/about/mission-left.png"
              alt="Mission"
              width={380}
              height={260}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-4 border-t border-[#D9D9D9] pt-4">
            <span className="text-[90px] font-extrabold text-black leading-none">20</span>
            <div className="text-[18px] font-semibold text-black leading-tight">
              +<br />Year of <br /> Experience
            </div>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div>
          <div className="mb-8 flex gap-8 text-sm">
            {["mission", "purpose"].map((id, idx) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative pb-3 font-semibold uppercase tracking-widest transition-all text-[20px] ${
                  activeTab === id ? "text-black," : "text-[#777777]"
                }`}
              >
                {idx + 1}. {id === "mission" ? "Mission & Vision" : "Purpose"}
                {activeTab === id && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#0B10A4]" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
            {!data ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-20 bg-gray-100 rounded"></div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                {activeTab === "mission" ? (
                  <>
                    <h4 className="mb-2 text-sm font-bold uppercase text-black">Mission</h4>
                    <div className={contentStyle} dangerouslySetInnerHTML={{ __html: parsedContent.mission }} />
                    <h4 className="mb-2 mt-6 text-sm font-bold uppercase text-black">Vision</h4>
                    <div className={contentStyle} dangerouslySetInnerHTML={{ __html: parsedContent.vision }} />
                  </>
                ) : (
                  <>
                    <h4 className="mb-2 text-sm font-bold uppercase text-black">Our Purpose</h4>
                    <div className="relative">
                      <div
                        className={`${contentStyle} transition-all duration-500 overflow-hidden ${
                          !isExpanded ? "max-h-[250px] mask-gradient" : "max-h-[2000px]"
                        }`}
                        dangerouslySetInnerHTML={{ __html: parsedContent.purpose }}
                      />
                      
                      {/* Styled Toggle Button */}
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 text-[12px] font-bold uppercase tracking-wider text-[#0B10A4] hover:underline flex items-center gap-2"
                      >
                        {isExpanded ? "Read Less ↑" : "Read More ↓"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative">
          <div className="overflow-hidden rounded-[28px] h-[520px]">
            <Image
              src="/about/mission-right.png"
              alt="Forensics"
              width={420}
              height={520}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -left-10 top-80 max-w-[300px] rounded-2xl bg-gradient-to-br from-[#0B10A4] to-[#04063E] p-8 text-white shadow-2xl">
            <p className="mb-2 text-[12px] font-semibold opacity-70">Expertise</p>
            <h4 className="mb-6 text-[23px] font-semibold leading-snug">
              {data?.newsletter_text || "Scientifically Revealing the Truth"}
            </h4>
            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-white/40 px-6 py-2 text-[12px] font-regular uppercase hover:bg-white hover:text-[#04063E] transition-all"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* Global CSS for the fade effect */}
      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
        }
      `}</style>
    </section>
  );
}