"use client";

import React from 'react';
import Image from "next/image";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  bgImage?: string;
  breadcrumbImage?: string;
  isGallery?: boolean; 
}

export default function PageBanner({
  title,
  subtitle,
  description,
  bgImage,
  breadcrumbImage,
  isGallery = false, 
}: PageBannerProps) {

  const bannerImage = bgImage || breadcrumbImage;

  return (
    <section className="relative overflow-hidden min-h-[185px] flex items-center justify-center">

      {bannerImage ? (
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt="Page Banner"
            fill
            priority
            className="object-contain"
          />
          {/*<div className="absolute inset-0 bg-black/10" />*/}
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#F5F6F8]" />
      )}

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-3xl md:text-[24px] font-medium text-black">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm md:text-[14px] font-regular text-black">
            {subtitle}
          </p>
        )}
        {/* FLIP LOGIC: 
            If isGallery is true, show Subtitle THEN Title. 
            Otherwise, show Title THEN Subtitle.
        */}
        {/*{isGallery ? (
          <>
            {subtitle && (
              <p className="mb-2 text-sm md:text-base font-medium uppercase tracking-wider">
                {subtitle}
              </p>
            )}
            <h1 className="text-3xl md:text-4xl font-semibold">
              {title}
            </h1>
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-semibold">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm md:text-base">
                {subtitle}
              </p>
            )}
          </>
        )}*/}

        {description && (
          <p className="mt-3 text-sm text-gray-200">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}