"use client";

import { useEffect, useState } from "react";
import PageBanner from "@/components/common/PageBanner";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import { getContactInfo } from "@/services/contactService";
import { Skeleton } from "@/components/shared/Skeleton";
import { useBoot } from "@/context/BootContext";

export default function ContactClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { breadcrumbImage } = useBoot();

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const res = await getContactInfo();
        if (isMounted) {
          if (res && res.success) {
            setData(res.data);
          } else {
            setData({ locations: [], contact_info: {} });
          }
        }
      } catch (err) {
        console.error("Failed to load contact data:", err);
        if (isMounted) {
          setData({ locations: [], contact_info: {} });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  // --- CONTACT PAGE SKELETON ---
  const ContactSkeleton = () => (
    <div className="bg-white">
      {/* Banner Placeholder */}
      <div className="w-full h-[300px] bg-gray-100 flex flex-col items-center justify-center space-y-4">
        <Skeleton className="h-10 w-64 bg-gray-200" />
        <Skeleton className="h-4 w-48 bg-gray-200" />
      </div>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          {/* Info Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-8 border border-gray-100 rounded-3xl flex flex-col items-center space-y-4">
                <Skeleton className="h-14 w-14 rounded-2xl bg-gray-100" />
                <Skeleton className="h-6 w-3/4 rounded bg-gray-100" />
                <Skeleton className="h-4 w-1/2 rounded bg-gray-50" />
              </div>
            ))}
          </div>

          {/* Form Section Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Skeleton className="h-32 w-full rounded-2xl" />
                <Skeleton className="h-32 w-full rounded-2xl" />
              </div>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl space-y-4">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-14 w-full rounded-xl bg-[#0C2783]/10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  if (loading) return <ContactSkeleton />;

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We are here to help you"
        breadcrumbImage={breadcrumbImage}
      />
      <ContactInfoSection
        locations={data?.locations || []}
        mainInfo={data?.contact_info}
      />
      <ContactFormSection />
    </>
  );
}