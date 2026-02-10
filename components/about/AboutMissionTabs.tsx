"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  {
    id: "mission",
    label: "Mission & Vision",
    content: (
      <>
        <h4 className="mb-2 text-sm font-semibold text-black">Mission</h4>
        <p className="mb-6 text-sm leading-relaxed text-gray-600">
          At SIFS India, we ensure to uncover truth, build trust, and provide
          justice through a scientifically precise process. Our expert team is
          fully dedicated and committed to discovering facts, irrespective of
          the complexity of the case. We assist the legal system by providing
          precise and evidence-based findings to make informed decisions,
          thereby ensuring that the truth prevails.
        </p>

        <h4 className="mb-2 text-sm font-semibold text-black">Vision</h4>
        <p className="text-sm leading-relaxed text-gray-600">
          At SIFS India, we ensure to uncover truth, build trust, and provide
          justice through a scientifically precise process. Our expert team is
          fully dedicated and committed to discovering facts, irrespective of
          the complexity of the case. We assist the legal system by providing
          precise and evidence-based findings to make informed decisions,
          thereby ensuring that the truth prevails.
        </p>
      </>
    ),
  },
  {
    id: "purpose",
    label: "Purpose",
    content: (
      <p className="text-sm leading-relaxed text-gray-600">
        Our purpose is to strengthen the justice delivery system by offering
        reliable, unbiased, and scientifically validated forensic solutions.
        We aim to empower courts, law enforcement agencies, and individuals
        with facts that stand up to scrutiny and help uncover the truth.
      </p>
    ),
  },
];

export default function AboutMissionTabs() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid gap-12 lg:grid-cols-[380px_1fr_420px]">
        {/* LEFT COLUMN */}
        <div className="space-y-4 border-r border-[#D9D9D9]">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl me-4">
            <Image
              src="/about/mission-left.png"
              alt="Mission"
              width={380}
              height={260}
              className="h-[260px] w-full object-cover"
            />
          </div>

          {/* Experience */}
          <div className="flex items-center gap-4 border-t border-[#D9D9D9] pt-4">
            <span className="text-[90px] font-extrabold text-black">20</span>
            <div className="text-[18px] font-semibold text-black">
              +<br />Year of <br /> Experience
            </div>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div>
          {/* Tabs */}
          <div className="mb-8 flex gap-8 text-sm">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 font-medium transition ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {index + 1}. {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        </div>

        {/* RIGHT IMAGE (STATIC) */}
        <div className="relative">
          <div className="overflow-hidden rounded-[28px]">
            <Image
              src="/about/mission-right.png"
              alt="Forensic Presentation"
              width={420}
              height={520}
              className="h-[520px] w-full object-cover"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute -left-10 bottom-0 max-w-[280px] rounded-2xl bg-gradient-to-br from-[#0B10A4] to-[#04063E] p-6 text-white shadow-xl">
            <p className="mb-2 text-xs uppercase opacity-80">
              Forensic Services
            </p>
            <h4 className="mb-4 text-lg font-semibold leading-snug">
              Scientifically Revealing the Truth with Utmost Precision
            </h4>
            <Link
              href="#"
              className="inline-flex items-center rounded-full border border-white px-4 py-2 text-xs font-medium hover:bg-white hover:text-[#04063E] transition"
            >
              Explore Service
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
