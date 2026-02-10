"use client";

import PageBanner from "../../components/common/PageBanner";
import ContactInfoSection from "../../components/contact/ContactInfoSection";
import ContactFormSection from "../../components/contact/ContactFormSection";

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We are here to help you"
        bgImage="/about/about-banner.png"
        />
      <ContactInfoSection />
      <ContactFormSection />
    </>
  );
}
