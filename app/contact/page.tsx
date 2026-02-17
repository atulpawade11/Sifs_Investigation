"use client";

import { useEffect, useState } from "react";
import PageBanner from "../../components/common/PageBanner";
import ContactInfoSection from "../../components/contact/ContactInfoSection";
import ContactFormSection from "../../components/contact/ContactFormSection";
import { Loader2 } from "lucide-react";
import { getContactInfo } from "../../services/contactService";

export default function ContactPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true); // 1. Start loading
      try {
        const res = await getContactInfo();
        if (res && res.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error("All API attempts failed:", err);
        // 2. Provide empty data so the page components don't crash
        setData({ locations: [], contact_info: {} }); 
      } finally {
        // 3. This ALWAYS runs, even if there is an error. 
        // This is what stops your spin loader.
        setLoading(false); 
      }
    }
    loadData();
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