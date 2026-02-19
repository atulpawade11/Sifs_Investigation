"use client";

import { useEffect, useState } from "react";
import PageBanner from "@/components/common/PageBanner";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import { Loader2 } from "lucide-react";
import { getContactInfo } from "@/services/contactService";

export default function ContactClient() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#0C2783]" size={40} />
      </div>
    );
  }

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We are here to help you"
        bgImage="/about/about-banner.png"
      />
      <ContactInfoSection
        locations={data?.locations || []}
        mainInfo={data?.contact_info}
      />
      <ContactFormSection />
    </>
  );
}