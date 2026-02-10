"use client";

import { useState } from "react";
import Image from "next/image";

/* ---------------------------
   FILTER TABS
---------------------------- */
const filters = [
  "All",
  "Courts",
  "Govt Department",
  "State Police",
  "Insurance Sector",
  "Indian Bank",
  "Corporates",
  "Law Firms",
  "Detectives",
  "Others",
];

/* ---------------------------
   LOGO DATA
---------------------------- */
const clientLogos = [
  { id: 1, src: "/about/cadila.png", category: "Corporates" },
  { id: 2, src: "/about/court.png", category: "Courts" },
  { id: 3, src: "/about/police.png", category: "State Police" },
  { id: 4, src: "/about/bank.png", category: "Indian Bank" },
  { id: 5, src: "/about/insurance.png", category: "Insurance Sector" },
  { id: 6, src: "/about/lawfirm.png", category: "Law Firms" },
  { id: 7, src: "/about/detective.png", category: "Detectives" },
  { id: 8, src: "/about/cadila.png", category: "Govt Department" },
  { id: 9, src: "/about/bank.png", category: "Others" },
];

/* ---------------------------
   COMPONENT
---------------------------- */
export default function ClientelePortfolio() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredLogos =
    activeTab === "All"
      ? clientLogos
      : clientLogos.filter((logo) => logo.category === activeTab);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* LEFT FILTER PANEL */}
        <div className="rounded-2xl bg-white p-4 shadow-md">
          <ul className="space-y-1 text-sm">
            {filters.map((item) => (
              <li key={item}>
                <button
                  onClick={() => setActiveTab(item)}
                  className={`relative flex w-full items-center rounded-lg px-4 py-2 transition
                    ${
                      activeTab === item
                        ? "bg-[#EFEFEF] font-medium text-[#04063E]"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  {activeTab === item && (
                    <span className="absolute left-0 top-0 h-9 w-[5px] rounded-r bg-[#1C274C]" />
                  )}
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT LOGO GRID */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {filteredLogos.map((logo) => (
              <div
                key={logo.id}
                className="flex h-[90px] items-center justify-center rounded-xl bg-[#EFEFEF] transition hover:shadow-sm"
              >
                <Image
                  src={logo.src}
                  alt="Client Logo"
                  width={120}
                  height={50}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* CENTER OVERLAY */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[240px] w-[240px] 
            -translate-x-1/2 -translate-y-1/2 
            items-center justify-center rounded-full 
            border-2 border-dashed border-gray-300 
            bg-white/30 backdrop-blur-xs 
            text-center lg:flex shadow-lg">
            
            <div>
              <p className="mb-1 text-sm font-semibold text-black">Our Clientele</p>
              <h4 className="text-2xl font-extrabold text-black">
                Satisfied Clients’
                <br />
                Portfolio
              </h4>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
