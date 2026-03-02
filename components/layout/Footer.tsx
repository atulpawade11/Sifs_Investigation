"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { API_BASE_URL } from '@/lib/config';

export default function Footer() {
  const [footerData, setFooterData] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  
  // Subscription States
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

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

  // Handle Newsletter Subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage(result.message || "Successfully subscribed!");
        setEmail(""); // Clear input
        // Reset to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(result.message || "Subscription failed");
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || "Something went wrong.");
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <footer className="bg-[#232827] text-white">
      {/* TOP CTA / NEWSLETTER */}
      <div className="mx-auto max-w-7xl px-4 pt-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
            {footerData?.newsletter_text || "Let’s contact"} <ArrowRight size={22} />
          </h2>

          <form onSubmit={handleSubscribe} className="relative flex w-full max-w-md items-center rounded-full bg-[#2E3333] px-4 py-2 border border-transparent focus-within:border-blue-500 transition-all">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
            />
            <button 
              disabled={status === 'loading' || status === 'success'}
              className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0B10A4] hover:bg-[#04063E] transition disabled:bg-gray-600"
            >
              {status === 'loading' ? (
                <Loader2 size={16} className="text-white animate-spin" />
              ) : status === 'success' ? (
                <CheckCircle2 size={16} className="text-white" />
              ) : (
                <ArrowRight size={16} className="text-white" />
              )}
            </button>
            
            {/* Feedback Message */}
            {status !== 'idle' && (
              <span className={`absolute -bottom-7 left-4 text-[11px] font-medium tracking-wide ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </span>
            )}
          </form>
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
              {/*<li><Link href="/services" className="hover:text-white transition-colors">› Services</Link></li>*/}
              <li><Link href="/team" className="hover:text-white transition-colors">› Our Experts</Link></li>
              <li><Link href="/clientele" className="hover:text-white transition-colors">› Our Clients</Link></li>
              <li><Link href="/career" className="hover:text-white transition-colors">› Career</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">› Blog</Link></li>
            </ul>
          </div>

          {/* SERVICES SECTION IN FOOTER */}
<div className="lg:px-6 lg:border-r lg:border-[#343D3B]">
  <h4 className="mb-4 text-sm font-semibold text-white pt-10">Services</h4>
  <ul className="space-y-3 text-sm text-gray-400">
    {services.length > 0 ? (
      services.map((service) => {
        // Convert the name to a slug if 'slug' property isn't available in API
        const serviceSlug = service.slug || service.name.toLowerCase().replace(/\s+/g, '-');
        
        return (
          <li key={service.id}>
            {/* Match the Header routing exactly: /services/slug */}
            <Link 
              href={`/services/${serviceSlug}`} 
              className="hover:text-white transition-colors line-clamp-1 flex items-center gap-1"
            >
              <span className="text-gray-400 hover:text-white">›</span> {service.name}
            </Link>
          </li>
        );
      })
    ) : (
      <>
        <li><Link href="/services/document-examination" className="hover:text-white">› Document Examination</Link></li>
        <li><Link href="/services/fingerprint-analysis" className="hover:text-white">› Fingerprint Analysis</Link></li>
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

      {/* BOTTOM BAR */}
      <div className="bg-[#1F2423] py-4 text-xs text-gray-400 border-t border-[#343D3B]">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-center gap-2">
          <div 
            className="inline-flex items-center gap-1 footer-copyright-inline [&_p]:inline [&_p]:m-0"
            dangerouslySetInnerHTML={{ __html: footerData?.copyright_text || "© 2026 SIFS India." }} 
          />
          
          <span className="hidden md:block mx-1">|</span>
          
          <div className="flex gap-3">
            <Link href="/" className="hover:text-white">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white">Privacy Policy</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white">Site map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}