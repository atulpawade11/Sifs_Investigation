"use client";

import { useState } from "react";
import { TabItem } from "../../types/page";

type Props = {
  tabs: TabItem[];
};

export default function TabbedContentSection({ tabs }: Props) {
  const [active, setActive] = useState(0);

  const current = tabs[active];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Tabs */}
      <div className="space-y-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`w-full text-left px-4 py-3 text-sm rounded
              ${
                active === index
                  ? "bg-[#0B4F8A] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="md:col-span-2">
        <h3 className="font-semibold mb-3">{current.title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {current.description}
        </p>

        <img
          src={current.image}
          alt={current.title}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
