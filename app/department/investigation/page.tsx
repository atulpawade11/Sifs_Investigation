"use client";

import React from 'react';
// Assuming you save the components in a components/department folder
import HeroSection from "../../../components/department/HeroSection";
import CoreServices from "../../../components/department/CoreServices";
import WhyChooseUs from "../../../components/department/WhyChooseUs";
import ContactBanner from "../../../components/department/ContactBanner";
import PageBanner from "../../../components/common/PageBanner";

export default function ForensicInvestigationPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. Reuse your existing PageBanner for the top */}
      <PageBanner
        title="Forensic Investigation"
        subtitle="SIFS India Department"
        bgImage="/about/about-banner.png"
      />

      {/* 2. Hero & Intro Section (Screenshot 1) */}
      <HeroSection />

      {/* 3. Core Services Blue Section (Screenshot 3) */}
      <CoreServices />

      {/* 4. Why Choose Us Section (Screenshot 2 Top) */}
      <WhyChooseUs />

      {/* 5. Contact CTA Banner (Screenshot 2 Bottom) */}
      <ContactBanner />
    </main>
  );
}