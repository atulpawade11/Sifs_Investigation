"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, ChevronDown, Menu, X, ArrowRight, Globe } from 'lucide-react';

// Import your services
import { getBootData, getProducts, getDepartments, getServices } from '@/services/webService';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [selectedLang, setSelectedLang] = useState<any>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  // State for dynamic services
  const [serviceCategories, setServiceCategories] = useState<any[]>([]);
  // Mobile Menus
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  useEffect(() => {
    async function loadBootData() {
      try {
        const res = await getBootData();
        if (res && res.success) {
          setData(res.data);
          const defaultLang = res.data.langs?.find((l: any) => l.is_default === 1) || res.data.langs?.[0];
          setSelectedLang(defaultLang);
        }
      } catch (err) {
        console.error("Failed to load header data:", err);
      }
    }
    loadBootData();

    async function loadProducts() {
      try {
        const res = await getProducts();
        if (res && res.success) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    loadProducts();

    async function loadDepartments() {
      try {
        const res = await getDepartments();
        if (res && res.success) {
          setDepartments(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load departments:", err);
      }
    }
    loadDepartments();

    // Fetch Services dynamically using the API response structure
    async function loadServices() {
      try {
        const res = await getServices();
        if (res && res.success) {
          // Extract categories from the response
          setServiceCategories(res.data.categories || []);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      }
    }
    loadServices();
  }, []);

  useEffect(() => {
    if (selectedLang) {
      document.documentElement.dir = selectedLang.rtl === 1 ? 'rtl' : 'ltr';
      document.documentElement.lang = selectedLang.code || 'en';
    }
  }, [selectedLang]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Filter active services (status = 1) and sort by serial_number
  const activeServices = serviceCategories
    .filter((service: any) => service.status === 1)
    .sort((a: any, b: any) => a.serial_number - b.serial_number);

  return (
    <>
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
                <li>
                  <Link href="/about" className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                    Experts & Associates
                  </Link>
                </li>
                <li>
                  <Link href="/clientele" className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                    Our Clientele
                  </Link>
                </li>
                <li>
                  <Link href="/gallery/images" className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                    Image Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/gallery/videos" className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                    Video Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/career" className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                    Career
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                    FAQ
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>

          {/* Services Dropdown - NOW DYNAMIC from API */}
          <div className="group relative">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07] py-2">
              Services <ChevronDown size={16} />
            </div>
            <div className="absolute left-0 top-full w-[280px] bg-white rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[#ececec] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-[400px] overflow-y-auto">
              <ul className="py-2">
                {activeServices.length > 0 ? (
                  activeServices.map((service: any) => (
                    <li key={service.id}>
                      <Link 
                        href={`/services/${service.id}`} 
                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition border-b border-gray-50 last:border-0"
                      >
                        <div className="font-medium">{service.name}</div>
                        {/*{service.short_text && (
                          <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {service.short_text}
                          </div>
                        )}*/}
                        {service.service_count > 0 && (
                          <div className="text-[10px] text-[#F68A07] mt-1">
                            {service.service_count} sub-services
                          </div>
                        )}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-5 py-3 text-sm text-gray-400 italic">Loading services...</li>
                )}
              </ul>
            </div>
          </div>

          {/* Department Dropdown (Dynamic) */}
          <div className="group relative">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07] py-2">
              {data?.bs?.parent_link_name || 'Department & Laboratory'} <ChevronDown size={16} />
            </div>
            <div className="absolute left-0 top-full w-[260px] bg-white rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[#ececec] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-[400px] overflow-y-auto">
              <ul className="py-2">
                {departments.length > 0 ? (
                  departments.map((item) => (
                    <li key={item.id}>
                      <Link href={`/department/${item.slug}`} className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                        {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-5 py-3 text-sm text-gray-400 italic">No departments available</li>
                )}
              </ul>
            </div>
          </div>

          {/* Product Dropdown (Dynamic) */}
          <div className="group relative">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#F68A07] py-2">
              <Link href="/product">{data?.bs?.parent_product_name || 'Product'}</Link> <ChevronDown size={16} />
            </div>
            <div className="absolute left-0 top-full w-[240px] bg-white rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[#ececec] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-[400px] overflow-y-auto">
              <ul className="py-2">
                {products.length > 0 ? (
                  products.map((item) => (
                    <li key={item.id}>
                      <Link href={`/product/${item.slug}`} className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#F5F7FF] hover:text-[#0B10A4] transition">
                        {item.name || item.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-5 py-3 text-sm text-gray-400 italic">No products available</li>
                )}
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

      {/* MOBILE MENU - Updated with dynamic services */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] z-[100] bg-white flex flex-col">
          {/* top-[64px] should match your header height. Adjust if your header is taller/shorter */}
          
          <div className="flex-1 overflow-y-auto p-6 pb-20 space-y-6 font-semibold text-gray-700">
            <Link href="/" className="block text-lg border-b border-gray-50 pb-2" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            

            {/* About Mobile */}
            <div className="border-b border-gray-50 pb-2">
              <button
                onClick={() => toggleMenu("about")}
                className="flex justify-between w-full text-left text-lg"
              >
                About <ChevronDown size={18} className={`transition-transform ${openMenu === "about" ? "rotate-180" : ""}`} />
              </button>

              {openMenu === "about" && (
                <div className="pl-4 mt-2 space-y-3 bg-gray-50 rounded-lg p-3">
                  <Link href="/about" className="block text-sm text-gray-600" onClick={() => setIsOpen(false)}>About Us</Link>
                  <Link href="/team" className="block text-sm text-gray-600" onClick={() => setIsOpen(false)}>Experts & Associates</Link>
                  <Link href="/clientele" className="block text-sm text-gray-600" onClick={() => setIsOpen(false)}>Our Clientele</Link>
                  <Link href="/gallery/images" className="block text-sm text-gray-600" onClick={() => setIsOpen(false)}>Image Gallery</Link>
                  <Link href="/gallery/videos" className="block text-sm text-gray-600" onClick={() => setIsOpen(false)}>Video Gallery</Link>
                  <Link href="/career" className="block text-sm text-gray-600" onClick={() => setIsOpen(false)}>Career</Link>
                  <Link href="/blog" className="block text-sm text-gray-600" onClick={() => setIsOpen(false)}>Blog</Link>
                  <Link href="/faq" className="block text-sm text-gray-600" onClick={() => setIsOpen(false)}>FAQ</Link>
                </div>
              )}
            </div>

            {/* Services Mobile */}
            <div className="border-b border-gray-50 pb-2">
              <button
                onClick={() => toggleMenu("services")}
                className="flex justify-between w-full text-left text-lg"
              >
                Services <ChevronDown size={18} className={`transition-transform ${openMenu === "services" ? "rotate-180" : ""}`} />
              </button>

              {openMenu === "services" && (
                <div className="pl-4 mt-2 space-y-3 bg-gray-50 rounded-lg p-3">
                  {activeServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      onClick={() => setIsOpen(false)}
                      className="block text-sm text-gray-600 border-b border-white last:border-0 pb-1"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Department Mobile */}
            <div className="border-b border-gray-50 pb-2">
              <button
                onClick={() => toggleMenu("departments")}
                className="flex justify-between w-full text-left text-lg"
              >
                {data?.bs?.parent_link_name || 'Departments'} 
                <ChevronDown size={18} className={`transition-transform ${openMenu === "departments" ? "rotate-180" : ""}`} />
              </button>

              {openMenu === "departments" && (
                <div className="pl-4 mt-2 space-y-3 bg-gray-50 rounded-lg p-3">
                  {departments.map((item) => (
                    <Link key={item.id} className="block text-sm text-gray-600" href={`/department/${item.slug}`} onClick={() => setIsOpen(false)}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Product Mobile */}
            <div className="border-b border-gray-50 pb-2">
              <button
                onClick={() => toggleMenu("products")}
                className="flex justify-between w-full text-left text-lg"
              >
                {data?.bs?.parent_product_name || 'Products'} 
                <ChevronDown size={18} className={`transition-transform ${openMenu === "products" ? "rotate-180" : ""}`} />
              </button>

              {openMenu === "products" && (
                <div className="pl-4 mt-2 space-y-3 bg-gray-50 rounded-lg p-3">
                  {products.map((item) => (
                    <Link key={item.id} className="block text-sm text-gray-600" href={`/product/${item.slug}`} onClick={() => setIsOpen(false)}>
                      {item.name || item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="block text-gray-600 text-lg pt-2" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;