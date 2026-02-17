"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Facebook, Linkedin, Twitter, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

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
  { label: "Forensic Education", href: "https://example-education-link.com", isExternal: true },
  { label: "Forensic Training", href: "https://example-training-link.com", isExternal: true },
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

  return (
    <nav className="w-full flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#04063E] text-white py-2 px-4 md:px-10 hidden md:flex justify-between items-center text-sm font-medium">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <a href="mailto:contact@sifsindia.com">contact@sifsindia.com</a>
          </div>
          <div className="flex items-center gap-2 border-l border-white pl-8">
            <Phone size={16} />
            <a href="tel:+911147074263">+91 114-707 4263</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Facebook size={18} className="cursor-pointer hover:text-blue-100" />
          <Linkedin size={18} className="cursor-pointer hover:text-blue-100" />
          <Twitter size={18} className="cursor-pointer hover:text-blue-100" />
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
              Department <ChevronDown size={16} />
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
          <div className="group relative">
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
          </div>

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