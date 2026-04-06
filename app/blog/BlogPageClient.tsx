"use client";

import React from 'react';
import PageBanner from "@/components/common/PageBanner";
import BlogLayout from "@/components/blog/BlogLayout/index";
import { useBoot } from "@/context/BootContext";

export default function BlogPageClient() {
  const { breadcrumbImage } = useBoot();

  return (
    <div className="bg-white min-h-screen">
      <PageBanner
        title="Latest News & Blog"
        subtitle="Forensic Discoveries: From Lab to Field"
        isGallery={true} 
        breadcrumbImage={breadcrumbImage}
      />
      
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4">
          <BlogLayout />
        </div>
      </section>
    </div>
  );
}