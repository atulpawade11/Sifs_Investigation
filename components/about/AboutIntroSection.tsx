"use client";

import Image from "next/image";
import { Zap } from "lucide-react";

interface AboutIntroSectionProps {
  badgeText?: string;
  title: string;
  paragraphs: string[];
  imageSrc: string;
}

const AboutIntroSection: React.FC<AboutIntroSectionProps> = ({
  badgeText = "About Us",
  title,
  paragraphs,
  imageSrc,
}) => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#04063E] ps-1 pe-3 py-1 text-[18px] font-bold text-black">
                <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[#0B10A4]">
                    <Image
                        src="/about/zap.png"
                        alt="Badge Icon"
                        width={28}
                        height={28}
                        className="object-cover"
                    />
                </span>

                {badgeText}
                </div>


            {/* Heading */}
            <h2 className="text-[35px] font-semibold leading-snug text-black md:text-4xl">
              {title}
            </h2>

            {/* Paragraphs */}
            <div className="mt-4 space-y-4">
              {paragraphs.map((text, index) => (
                <p
                  key={index}
                  className="text-[14px] leading-relaxed font-regular text-[#777777]"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="relative h-[360px] w-full overflow-hidden rounded-l-[140px] md:h-[420px]">
              <Image
                src={imageSrc}
                alt="About SIFS India"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutIntroSection;
