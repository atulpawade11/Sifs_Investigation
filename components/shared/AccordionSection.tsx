"use client";

import { useState } from "react";

type AccordionItem = {
  title: string;
  content: string;
};

type Props = {
  items: AccordionItem[];
};

export default function AccordionSection({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-6 space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border border-[#CFCFCF] rounded">
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="w-full flex justify-between px-4 py-3 text-sm font-medium"
          >
            {item.title}
            <span>{open === index ? "−" : "+"}</span>
          </button>

          {open === index && (
            <div className="px-4 pb-4 text-sm text-gray-600">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
