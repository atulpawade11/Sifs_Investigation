"use client";

import { useBoot } from "@/context/BootContext";
import PageBanner from "@/components/common/PageBanner";
import CoreServices from "@/components/department/CoreServices";
import WhyChooseUs from "@/components/department/WhyChooseUs";
import ContactBanner from "@/components/department/ContactBanner";

export default function DepartmentLayout({ page }: { page: any }) {
  const { breadcrumbImage } = useBoot();

  return (
    <main className="bg-white min-h-screen">
      {/* Dynamic Banner */}
      <PageBanner
        title={page?.title}
        subtitle={page?.subtitle || page?.name}
        breadcrumbImage={breadcrumbImage}
      />

      {/* API Content Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">

          <div
            className="
              api-content
              prose
              prose-lg
              max-w-none

              prose-headings:font-bold
              prose-headings:text-[#04063E]
              prose-headings:tracking-tight

              prose-h2:text-3xl
              prose-h3:text-2xl
              prose-h4:text-2xl

              prose-h2:mt-12
              prose-h3:mt-10
              prose-h4:mt-8

              prose-p:text-gray-600
              prose-p:leading-relaxed

              prose-ul:my-6
              prose-ul:list-disc
              prose-ul:pl-6

              prose-li:my-2
              prose-li:text-gray-700

              prose-strong:text-[#04063E]

              prose-a:text-[#0B4F8A]
              prose-a:font-medium
              prose-a:no-underline
              hover:prose-a:underline
            "
            dangerouslySetInnerHTML={{ __html: page?.body }}
          />

        </div>
      </section>

      <CoreServices />
      <WhyChooseUs />
      <ContactBanner />
    </main>
  );
}