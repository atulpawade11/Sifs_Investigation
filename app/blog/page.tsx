"use client";

import PageBanner from "../../components/common/PageBanner";
import BlogLayout from "../../components/blog/BlogLayout/index";

export default function BlogPage() {
  return (
    <>
      <PageBanner
        title="Latest News & Blog"
        subtitle="Forensic Discoveries: From Lab to Field"
        bgImage="/about/about-banner.png"
      />
      {/* PageBanner already added globally */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <BlogLayout />
        </div>
      </section>
    </>
  );
}


