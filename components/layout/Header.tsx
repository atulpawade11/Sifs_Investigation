"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import { Mail, Phone, Facebook, Linkedin, Twitter, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex flex-col">
      {/* ... (Top Bar code remains the same) ... */}
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
      <div className="bg-white sticky top-0 z-50 px-4 md:px-10 py-3 flex justify-between items-center">
        
        {/* LOGO - Image Version */}
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

        {/* ... (Desktop Menu and Action Buttons remain the same) ... */}
        <div className="hidden lg:flex items-center gap-8 font-semibold text-gray-700">
          <Link href="/" className="hover:text-[#F68A07]">Home</Link>
            {/* About Dropdown */}
            <div className="group relative">
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07]">
                About <ChevronDown size={16} />
              </div>

              {/* Dropdown Box */}
              <div
                className="
                  absolute left-0 top-full mt-4
                  w-[220px]
                  bg-white
                  rounded-md
                  shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                  border
                  border-[#ececec]
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-200
                  z-50
                "
              >
                <ul className="py-2">
                  {aboutMenu.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="
                          block px-5 py-3 text-sm text-gray-700
                          hover:bg-[#F5F7FF]
                          hover:text-[#0B10A4]
                          transition
                        "
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          
            <div className="group relative">
  <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07]">
    Services <ChevronDown size={16} />
  </div>

  {/* Dropdown Box */}
  <div
    className="
      absolute left-0 top-full mt-4
      w-[260px]
      bg-white
      rounded-md
      shadow-[0_10px_30px_rgba(0,0,0,0.15)]
      border
      border-[#ececec]
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-200
      z-50
    "
  >
    <ul className="py-2">
      {servicesMenu.map((item, index) => (
        <li key={index}>
          <Link
            href={`/services/${item.slug}`}
            className="
              block px-5 py-3 text-sm text-gray-700
              hover:bg-[#F5F7FF]
              hover:text-[#0B10A4]
              transition
            "
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>

          <div className="group relative">
  <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07]">
    Department <ChevronDown size={16} />
  </div>

  {/* Dropdown Box */}
  <div
    className="
      absolute left-0 top-full mt-4
      w-[240px]
      bg-white
      rounded-md
      shadow-[0_10px_30px_rgba(0,0,0,0.15)]
      border
      border-[#ececec]
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-200
      z-50
    "
  >
    <ul className="py-2">
      {departmentMenu.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            target={item.isExternal ? "_blank" : "_self"}
            rel={item.isExternal ? "noopener noreferrer" : ""}
            className="
              block px-5 py-3 text-sm text-gray-700
              hover:bg-[#F5F7FF]
              hover:text-[#0B10A4]
              transition
            "
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>

          <div className="group relative">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07]">
              Laboratory <ChevronDown size={16} />
            </div>

            <div
              className="
                absolute left-0 top-full mt-4
                w-[260px]
                bg-white
                rounded-md
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                border
                border-[#ececec]
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200
                z-50
              "
            >
              <ul className="py-2">
                {laboratoryMenu.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/laboratory/${item.slug}`}
                      className="
                        block px-5 py-3 text-sm text-gray-700
                        hover:bg-[#F5F7FF]
                        hover:text-[#0B10A4]
                        transition
                      "
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/product" className="hover:text-[#F68A07]">Product</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden md:flex bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                        text-white px-8 py-3 rounded-full font-bold
                        flex items-center gap-4
                        hover:from-[#1217c0] hover:to-[#0a0f6b]
                        transition-all group">
            Contact Us <ArrowRight size={18} />
          </Link>
          
          <button className="lg:hidden p-2 bg-gray-100 rounded-md" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b p-4 space-y-4 font-semibold text-gray-700">
          <Link href="/" className="block">Home</Link>
          {/* Inside your MOBILE MENU section */}
          {isOpen && (
            <div className="lg:hidden bg-white border-b p-4 space-y-4 font-semibold text-gray-700">
              <Link href="/" className="block">Home</Link>
              
              {/* Simple Mobile Expandable (Example) */}
              <div className="space-y-2">
                <p className="text-[#F68A07] text-xs uppercase tracking-widest">About</p>
                {aboutMenu.map((item) => (
                  <Link key={item.label} href={item.href} className="block pl-4 py-1 text-sm">
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* Rest of your mobile links... */}
              <div className="space-y-2">
  <p className="text-[#F68A07] text-xs uppercase tracking-widest font-bold">Services</p>
  {servicesMenu.map((item) => (
    <Link 
      key={item.label} 
      href={`/services/${item.slug}`} 
      className="block pl-4 py-1 text-sm text-gray-600 active:text-[#0B10A4]"
      onClick={() => setIsOpen(false)} // Closes menu on click
    >
      {item.label}
    </Link>
  ))}
</div>
              <Link href="/contact" className="block text-[#F68A07]">Contact Us</Link>
            </div>
          )}
          <Link href="/services" className="block">Services</Link>
          <Link href="/department" className="block">Department</Link>
          <div className="group relative">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07]">
              Laboratory <ChevronDown size={16} />
            </div>

            <div
              className="
                absolute left-0 top-full mt-4
                w-[260px]
                bg-white
                rounded-md
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                border
                border-[#ececec]
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200
                z-50
              "
            >
              <ul className="py-2">
                {laboratoryMenu.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/laboratory/${item.slug}`}
                      className="
                        block px-5 py-3 text-sm text-gray-700
                        hover:bg-[#F5F7FF]
                        hover:text-[#0B10A4]
                        transition
                      "
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/product" className="block">Product</Link>
          <Link href="/contact" className="block text-[#F68A07]">Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;