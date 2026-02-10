"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question:
      "How many years has your forensic lab been in existence, and how many cases have you solved till now?",
    answer:
      "SIFS India has been creating a presence around the world since 2006 in the investigation field. We have completed more than 17 years of excellence and solved more than 12,000+ cases.",
  },
  {
    question: "Does your lab work with the government or a private firm?",
    answer:
      "We work with both government agencies and private organizations across India and internationally.",
  },
  {
    question: "Is the laboratory registered by the government?",
    answer:
      "Yes, our laboratory is registered and follows all government compliance and regulatory standards.",
  },
  {
    question: "Who all can submit a case to your lab?",
    answer:
      "Government bodies, private firms, law enforcement agencies, corporates, and individuals can submit cases.",
  },
  {
    question: "Does your lab provide cross examination support?",
    answer:
      "Yes, our experts provide court testimony and cross-examination support when required.",
  },
];

export default function CareerFAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[#ebebeb] py-20">
      {/* RIGHT FULL IMAGE */}
      <div className="absolute right-0 top-0 hidden h-full w-[48%] md:block">
        <Image
          src="/career/faq-person.png" // update if needed
          alt="FAQ"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* LEFT CONTENT */}
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="max-w-xl">
          <h2 className="mb-1 text-3xl font-bold">F.A.Q</h2>
          <p className="mb-8 text-gray-500">
            Frequently Asked Questions
          </p>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  className={`rounded-lg transition-all ${
                    isActive
                      ? "bg-[#1B2A7A] text-white"
                      : "bg-[#D7D7D7] text-gray-800"
                  }`}
                >
                  <button
                    onClick={() =>
                      setActiveIndex(isActive ? null : index)
                    }
                    className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isActive && (
                    <div className="px-6 pb-5 text-sm leading-relaxed text-gray-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
