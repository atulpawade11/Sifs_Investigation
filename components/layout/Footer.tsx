"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { API_BASE_URL } from '@/lib/config';

export default function Footer() {
  const [footerData, setFooterData] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);
        const result = await response.json();
        if (result.success) {
          setFooterData(result.data.bs);
          setServices(result.data.serviceCategories?.slice(0, 6) || []);
        }
      } catch (err) {
        console.error('Error fetching footer:', err);
      }
    };
    fetchFooterData();
  }, []);

  return (
    <footer className="bg-[#232827] text-white">
      {/* TOP CTA */}
      <div className="mx-auto max-w-7xl px-4 pt-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
            {footerData?.newsletter_text || "Let’s contact"} <ArrowRight size={22} />
          </h2>

          <div className="flex w-full max-w-md items-center rounded-full bg-[#2E3333] px-4 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
            />
            <button className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0B10A4] hover:bg-[#04063E] transition">
              <ArrowRight size={16} className="text-white" />
            </button>
          </div>
        </div>
        <div className="mt-10 mb-0 h-px bg-[#3A3F3F]" />
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* ABOUT */}
          <div className="lg:pr-6 lg:border-r lg:border-[#343D3B] pt-10">
            <div className="mb-4 flex gap-2">
              <Image 
                src={footerData?.footer_logo || "/logo/sifs-footer.png"} 
                alt="SIFS" 
                width={122} 
                height={122} 
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              {footerData?.footer_text || "Leading private Forensic Science Laboratory in India."}
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:px-6 lg:border-r lg:border-[#343D3B]">
            <h4 className="mb-4 text-sm font-semibold text-white pt-10">Quick Link</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">› About SIFS</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">› Services</Link></li>
              <li><Link href="/experts" className="hover:text-white transition-colors">› Our Experts</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">› Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">› Contact Us</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="lg:px-6 lg:border-r lg:border-[#343D3B]">
            <h4 className="mb-4 text-sm font-semibold text-white pt-10">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id}>
                    <Link href={`/services/${service.id}`} className="hover:text-white transition-colors line-clamp-1">
                      › {service.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link href="#" className="hover:text-white">› Document Examination</Link></li>
                  <li><Link href="#" className="hover:text-white">› Fingerprint Analysis</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="lg:pl-6">
            <h4 className="mb-4 text-sm font-semibold text-white pt-10">Contact Information</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-white" />
                {footerData?.contact_mail || "contact@sifsindia.com"}
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-white" />
                {footerData?.support_phone || "+91 114-707-4263"}
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-white" />
                <span>
                  <strong className="text-white">Delhi Office</strong><br />
                  A-14, Mahendra Enclave, Model Town Metro, Delhi-110009
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR - FIXED INLINE */}
      <div className="bg-[#1F2423] py-4 text-xs text-gray-400 border-t border-[#343D3B]">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-center gap-2">
          {/* This wrapper forces any <p> tags from API to stay inline */}
          <div 
            className="inline-flex items-center gap-1 footer-copyright-inline [&_p]:inline [&_p]:m-0"
            dangerouslySetInnerHTML={{ __html: footerData?.copyright_text || "© 2026 SIFS India." }} 
          />
          
          <span className="hidden md:block mx-1">|</span>
          
          <div className="flex gap-3">
            <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <span>|</span>
            <Link href="#" className="hover:text-white">Site map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}