"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, ChevronDown, Menu, X, ArrowRight, Globe } from 'lucide-react';

import { getBootData } from '@/services/webService';


// Menu Data
const laboratoryMenu = [
  { label: "Document Examination", slug: "document-examination" },
  { label: "Fingerprint Examination", slug: "fingerprint-examination" },
  { label: "Cyber Forensics", slug: "cyber-forensics" },
  { label: "Fire Forensics", slug: "fire-forensics" },
  { label: "Forensic Biology", slug: "forensic-biology" },
  { label: "Key Forensics", slug: "key-forensics" },
  { label: "Accident Reconstruction", slug: "accident-reconstruction" },
  { label: "Forensic Facial Imaging", slug: "forensic-facial-imaging" },
];

const aboutMenu = [
  { label: "About Us", href: "/about" },
  { label: "Image Gallery", href: "/gallery/images" },
  { label: "Video Gallery", href: "/gallery/videos" },
  { label: "FAQ", href: "/faq" },
];

const departmentMenu = [
  //{ label: "Forensic Education", href: "https://example-education-link.com", isExternal: true },
  //{ label: "Forensic Training", href: "https://example-training-link.com", isExternal: true },
  { label: "Forensic Investigation", href: "/department/investigation", isExternal: false },
];

const servicesMenu = [
  { label: "Document Examination", slug: "document-examination" },
  { label: "Fingerprint Analysis", slug: "fingerprint-analysis" },
  { label: "Cyber Forensics", slug: "cyber-forensics" },
  { label: "Insurance Investigation", slug: "insurance-investigation" },
  { label: "Forensic Biology", slug: "forensic-biology" },
  { label: "Key & Accident Reconstruction", slug: "accident-reconstruction" },
  { label: "Forensic Facial Imaging", slug: "forensic-facial-imaging" },
  { label: "Forensic Support", slug: "forensic-support" },
];

const productMenu = [
  {
    label: "SketchCop® Software",
    slug: "sketchcop-facial-composite-software"
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [selectedLang, setSelectedLang] = useState<any>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);


  useEffect(() => {
    async function loadBootData() {
      try {
        const res = await getBootData();
        if (res && res.success) {
          setData(res.data);
          // Set default language
          const defaultLang = res.data.langs?.find((l: any) => l.is_default === 1) || res.data.langs?.[0];
          setSelectedLang(defaultLang);
        }
      } catch (err) {
        console.error("Failed to load header data:", err);
      }
    }
    loadBootData();
  }, []);


  useEffect(() => {
    if (selectedLang) {
      document.documentElement.dir = selectedLang.rtl === 1 ? 'rtl' : 'ltr';
      document.documentElement.lang = selectedLang.code || 'en';
    }
  }, [selectedLang]);

  return (

    <nav className="w-full flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#04063E] text-white py-2 px-4 md:px-10 hidden md:flex justify-between items-center text-sm font-medium">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <a href={`mailto:${data?.bs?.support_email || 'contact@sifsindia.com'}`}>
              {data?.bs?.support_email || 'contact@sifsindia.com'}
            </a>
          </div>
          <div className="flex items-center gap-2 border-l border-white pl-8">
            <Phone size={16} />
            <a href={`tel:${data?.bs?.support_phone?.replace(/\s+/g, '') || '+911147074263'}`}>
              {data?.bs?.support_phone || '+91 114-707 4263'}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          {data?.langs && data.langs.length > 0 && (
            <div className="relative border-r border-white/20 pr-6">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 hover:text-[#F68A07] transition-all uppercase tracking-wide"
              >
                <Globe size={14} className="text-white/70" />
                <span>{selectedLang?.name || 'Select Language'}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-3 w-40 bg-white text-gray-800 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-1">
                    {data.langs.map((lang: any) => (
                      <button
                        key={lang.id}
                        onClick={() => {
                          setSelectedLang(lang);
                          setIsLangOpen(false);
                        }}
                        className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition-colors ${selectedLang?.id === lang.id ? 'bg-blue-50 text-[#0B10A4]' : ''}`}
                      >
                        {lang.name}
                        {selectedLang?.id === lang.id && <div className="w-1.5 h-1.5 rounded-full bg-[#0B10A4]"></div>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}


          <div className="flex items-center gap-4">
            {data?.socials?.map((social: any) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-blue-100 transition-colors"
              >
                <i className={`${social.icon}`}></i>
              </a>
            ))}
            {!data?.socials && (
              <>
                <i className="fab fa-facebook-f cursor-pointer hover:text-blue-100"></i>
                <i className="fab fa-linkedin-in cursor-pointer hover:text-blue-100"></i>
                <i className="fab fa-twitter cursor-pointer hover:text-blue-100"></i>
              </>
            )}
          </div>
        </div>

      </div>


      {/* MAIN Header */}
      <div className="bg-white sticky top-0 z-50 px-4 md:px-10 py-3 flex justify-between items-center shadow-sm">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/logo.png"
            alt="SIFS India Logo"
            width={180}
            height={50}
            priority
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-semibold text-gray-700">
          <Link href="/" className="hover:text-[#F68A07]">Home</Link>

          {/* About Dropdown */}
          <div className="group relative">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07] py-2">
              About <ChevronDown size={16} />
            </div>
            <div className="absolute left-0 top-full w-[220px] bg-white rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[#ececec] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                {aboutMenu.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services Dropdown */}
          <div className="group relative">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07] py-2">
              Services <ChevronDown size={16} />
            </div>
            <div className="absolute left-0 top-full w-[260px] bg-white rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[#ececec] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                {servicesMenu.map((item, index) => (
                  <li key={index}>
                    <Link href={`/services/${item.slug}`} className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Department Dropdown */}
          <div className="group relative">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07] py-2">
              Department & Laboratory <ChevronDown size={16} />
            </div>
            <div className="absolute left-0 top-full w-[240px] bg-white rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[#ececec] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                {departmentMenu.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} target={item.isExternal ? "_blank" : "_self"} rel={item.isExternal ? "noopener noreferrer" : ""} className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Laboratory Dropdown */}
          {/* <div className="group relative">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07] py-2">
              Laboratory <ChevronDown size={16} />
            </div>
            <div className="absolute left-0 top-full w-[260px] bg-white rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[#ececec] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                {laboratoryMenu.map((item, index) => (
                  <li key={index}>
                    <Link href={`/laboratory/${item.slug}`} className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* Product Dropdown (New) */}
          <div className="group relative">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07] py-2">
              <Link href="/product">Product</Link> <ChevronDown size={16} />
            </div>
            <div className="absolute left-0 top-full w-[240px] bg-white rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[#ececec] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                {productMenu.map((item, index) => (
                  <li key={index}>
                    <Link href={`/product/${item.slug}`} className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden md:flex bg-gradient-to-r from-[#0B10A4] to-[#04063E] text-white px-8 py-3 rounded-full font-bold flex items-center gap-4 hover:from-[#1217c0] hover:to-[#0a0f6b] transition-all group">
            Contact Us <ArrowRight size={18} />
          </Link>

          <button className="lg:hidden p-2 bg-gray-100 rounded-md" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b p-6 space-y-6 font-semibold text-gray-700 overflow-y-auto max-h-[80vh]">
          <Link href="/" className="block text-lg" onClick={() => setIsOpen(false)}>Home</Link>

          {/* Language Mobile */}
          {data?.langs && data.langs.length > 0 && (
            <div className="space-y-4">
              <p className="text-[#F68A07] text-xs uppercase tracking-widest font-bold">Language</p>
              <div className="grid grid-cols-2 gap-2">
                {data.langs.map((lang: any) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsOpen(false);
                    }}
                    className={`px-4 py-2 text-sm rounded-md border transition-all ${selectedLang?.id === lang.id ? 'bg-[#0B10A4] text-white border-[#0B10A4]' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}


          {/* About Mobile */}
          <div className="space-y-2">
            <p className="text-[#F68A07] text-xs uppercase tracking-widest font-bold">About</p>
            {aboutMenu.map((item) => (
              <Link key={item.label} href={item.href} className="block pl-4 py-1 text-sm text-gray-600" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Services Mobile */}
          <div className="space-y-2">
            <p className="text-[#F68A07] text-xs uppercase tracking-widest font-bold">Services</p>
            {servicesMenu.map((item) => (
              <Link key={item.label} href={`/services/${item.slug}`} className="block pl-4 py-1 text-sm text-gray-600" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Laboratory Mobile */}
          <div className="space-y-2">
            <p className="text-[#F68A07] text-xs uppercase tracking-widest font-bold">Laboratory</p>
            {laboratoryMenu.map((item) => (
              <Link key={item.label} href={`/laboratory/${item.slug}`} className="block pl-4 py-1 text-sm text-gray-600" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Product Mobile (New) */}
          <div className="space-y-2">
            <p className="text-[#F68A07] text-xs uppercase tracking-widest font-bold">Product</p>
            <Link href="/product" className="block pl-4 py-1 text-sm text-gray-800 font-bold" onClick={() => setIsOpen(false)}>
              All Products
            </Link>
            {productMenu.map((item) => (
              <Link key={item.label} href={`/product/${item.slug}`} className="block pl-8 py-1 text-sm text-gray-600" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="/contact" className="block text-[#F68A07] text-lg" onClick={() => setIsOpen(false)}>Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;