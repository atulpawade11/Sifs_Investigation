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
        setEmail(""); 
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
            {footerData?.newsletter_text || "Let’s contact"} <ArrowRight size={22} className="text-white" />
          </h2>

          <form onSubmit={handleSubscribe} className="relative flex w-full max-w-md items-center rounded-full bg-[#fff] px-4 py-2 border border-transparent focus-within:border-blue-500 transition-all">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-transparent text-sm text-black bg-white placeholder:text-gray-400 focus:outline-none"
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
        <div className="grid gap-2 lg:grid-cols-12">
          
          {/* ABOUT - 3 cols */}
          <div className="lg:col-span-3 lg:pr-4 lg:border-r lg:border-[#343D3B] pt-10">
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

          {/* QUICK LINKS - 2 cols */}
          <div className="lg:col-span-2 lg:px-4 lg:border-r lg:border-[#343D3B] pt-10">
            <h4 className="mb-4 text-sm font-semibold text-white">Quick Link</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="text-white transition-colors flex items-center gap-2"><span className="text-white font-bold text-[18px]">›</span> About SIFS</Link></li>
              {/*<li><Link href="/services" className="text-white transition-colors">› Services</Link></li>*/}
              <li><Link href="/team" className="text-white transition-colors flex items-center gap-2"><span className="text-white font-bold text-[18px]">›</span> Our Experts</Link></li>
              <li><Link href="/clientele" className="text-white transition-colors flex items-center gap-2"><span className="text-white font-bold text-[18px]">›</span> Our Clients</Link></li>
              <li><Link href="/career" className="text-white transition-colors flex items-center gap-2"><span className="text-white font-bold text-[18px]">›</span> Career</Link></li>
              <li><Link href="/blog" className="text-white transition-colors flex items-center gap-2"><span className="text-white font-bold text-[18px]">›</span> Blog</Link></li>
            </ul>
          </div>

          {/* SERVICES - 2 cols */}
          <div className="lg:col-span-2 lg:px-4 lg:border-r lg:border-[#343D3B] pt-10">
            <h4 className="mb-4 text-sm font-semibold text-white">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {services.length > 0 ? (
                services.map((service) => {
                  const serviceSlug = service.slug || service.name.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <li key={service.id}>
                      <Link href={`/services/${serviceSlug}`} className="text-white transition-colors line-clamp-1 flex items-center gap-2">
                        <span className="text-white font-bold text-[18px]">›</span> {service.name}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <>
                  <li><Link href="/services/document-examination" className="text-white font-bold text-[18px]">› Document Examination</Link></li>
                  <li><Link href="/services/fingerprint-analysis" className="text-white font-bold text-[18px]">› Fingerprint Analysis</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* CONTACT & MAP FLEX SECTION - 5 cols */}
          <div className="lg:col-span-5 lg:px-4 pt-10">
            <h4 className="mb-4 text-sm font-semibold text-white">Contact & Location</h4>
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              
              {/* Map - Flex Child 1 */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-xl border border-[#343D3B] shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.0436402094246!2d77.18956467611414!3d28.71825127561875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d021c3384218d%3A0xf62e088d8b48227d!2sMahendru%20Enclave%2C%20Gujranwala%20Town%2C%20Delhi%2C%20110009!5e0!3m2!1sen!2sin!4v1714480000000!5m2!1sen!2sin" 
                  className="w-full h-32 grayscale hover:grayscale-0 transition-all duration-500"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                ></iframe>
              </div>

              {/* Text Info - Flex Child 2 */}
              <div className="w-full md:w-1/2">
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-2 group transition-colors hover:text-white">
                    <Mail size={14} className="text-white shrink-0" />
                    {footerData?.contact_mail || "contact@sifsindia.com"}
                  </li>
                  <li className="flex items-center gap-2 group transition-colors hover:text-white">
                    <Phone size={14} className="text-white shrink-0" />
                    {footerData?.support_phone || "+91 114-707-4263"}
                  </li>
                  <li className="flex items-start gap-2 group transition-colors hover:text-white">
                    <MapPin size={14} className="text-white shrink-0 mt-1" />
                    <span className="leading-tight">
                      A-14, Mahendru Enclave, Model Town Metro, Delhi-110009, India
                    </span>
                  </li>
                </ul>
              </div>
            </div>
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
          
          {/*<span className="hidden md:block mx-1">|</span>
          
          <div className="flex gap-3">
            <Link href="/" className="hover:text-white">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white">Privacy Policy</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white">Site map</Link>
          </div>*/}
        </div>
      </div>
    </footer>
  );
}