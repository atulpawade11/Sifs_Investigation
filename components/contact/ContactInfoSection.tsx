// components/contact/ContactInfoSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Building2, ArrowRight } from "lucide-react";

const staticLabs = [
  {
    title: "Document Lab",
    phone: "+91 730-391-3004, +91 11-470-74263",
    email: "contact@sifsindia.com"
  },
  {
    title: "Cyber Lab",
    phone: "+91 730-391-3005, +91 11-470-74263",
    email: "contact@sifsindia.com"
  },
  {
    title: "Fire Forensic",
    phone: "+91 730-391-3006, +91 11-470-74263",
    email: "contact@sifsindia.com"
  }
];

export default function ContactInfoSection({ 
  locations = [], 
  internationalLocations = [],
  mainInfo = {}
}: { 
  locations?: any[]; 
  internationalLocations?: any[];
  mainInfo?: any;
}) {
  const allOffices = [...locations, ...internationalLocations];
  const hasOffices = allOffices.length > 0;
  const [selectedOffice, setSelectedOffice] = useState(0);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto container px-4">
        
        {/* TOP ROW */}
        <div className="grid gap-10 lg:grid-cols-3">
          
          {/* Column 1 */}
          <div>
            <h2 className="mb-6 text-3xl font-semibold leading-snug md:text:[30px] text-[#000000]">
              Convinced yet?{" "}
              <span>
                Let&apos;s make something great together.
              </span>
            </h2>
            <div className="overflow-hidden rounded-xl shadow-md">
              <Image 
                src="/contact/contact-desk.png" 
                alt="Desk" 
                width={500} 
                height={350} 
                className="w-full object-cover" 
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl">
              <Image 
                src="/contact/contact-person.png" 
                alt="Support" 
                width={500} 
                height={300} 
                className="w-full object-cover" 
              />
            </div>

            <div className="rounded-2xl bg-gradient-to-b from-[#0C2783] to-[#1C274C] p-8 text-white shadow-xl">
              <h4 className="mb-3 text-2xl md:text-[26px] font-semibold">Corp Office</h4>
              <hr className="mb-6 w-12 h-1 bg-white border-none" />
              <div className="space-y-4">
                <p className="flex items-start gap-3 text-sm md:text-[16px] font-semibold text-white leading-relaxed">
                  <MapPin className="text-white shrink-0" size={24} />
                  {mainInfo?.address || "A-14, Mahendru Enclave, Model Town Metro Station, Delhi-110009, India."}
                </p>
                {/*<p className="flex items-center gap-3 text-sm">
                  <Phone className="text-[#F6BA13]" size={18} /> 
                  {mainInfo?.phone || "+91 11-470-74263"}
                </p>
                <p className="flex items-center gap-3 text-sm">
                  <Mail className="text-[#F6BA13]" size={18} /> 
                  {mainInfo?.email || "contact@sifsindia.com"}
                </p>*/}
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            {staticLabs.map((lab, idx) => {
              const isLast = idx === staticLabs.length - 1;
              
              return (
                <div 
                  key={`lab-${idx}`}
                  className={`bg-white p-5 transition-shadow ${
                    isLast ? "" : "border-b border-b-[#BCBCBC]"
                  }`}
                >
                  <h5 className="font-bold text-[#000000] mb-3 text-lg md:text-[20px]">{lab.title}</h5>
                  <div className="space-y-2 text-sm md:text-[16px] font-regular text-[#2A2A2A]">
                    <p className="flex items-center gap-2">
                      <Image 
                        src="/contact/phone.png" 
                        alt="Phone" 
                        width={26} 
                        height={26} 
                        className="shrink-0"
                      />
                      {lab.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Image 
                        src="/contact/mail.png" 
                        alt="Email" 
                        width={26} 
                        height={26} 
                        className="shrink-0"
                      />
                      {lab.email}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ROW - Office Locations */}
        {hasOffices && (
          <div className="mt-20 bg-gray-50 rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-[#04063E] mb-2">
              Our Offices Across India
            </h2>
            <p className="text-gray-500 text-sm mb-8">Click on a location to view details</p>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Left - Office List */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {allOffices.map((office, idx) => (
                  <button
                    key={`btn-${office.id || idx}`}
                    onClick={() => setSelectedOffice(idx)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      selectedOffice === idx
                        ? "bg-gradient-to-r from-[#0B10A4] to-[#04063E] text-white text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                    }`}
                  >
                    <MapPin size={18} className={selectedOffice === idx ? "text-[#ffffff]" : "text-gray-400"} />
                    <div className="min-w-0">
                      <h4 className={`font-semibold text-sm truncate ${selectedOffice === idx ? "text-white" : "text-[#1C274C]"}`}>
                        {office.title}
                      </h4>
                      {office.type === "international" && (
                        <span className={`text-xs ${selectedOffice === idx ? "text-[#F6BA13]" : "text-gray-400"}`}>
                          International
                        </span>
                      )}
                    </div>
                    {selectedOffice === idx && <ArrowRight size={16} className="ml-auto text-[#ffffff]" />}
                  </button>
                ))}
              </div>

              {/* Right - Office Details */}
              <div className="md:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 h-auto">
                {allOffices[selectedOffice] && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#0C2783] rounded-xl flex items-center justify-center">
                        <Building2 size={24} className="text-[#ffffff]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1C274C]">
                          {allOffices[selectedOffice].title}
                        </h3>
                        {allOffices[selectedOffice].type === "international" && (
                          <span className="text-xs bg-[#F6BA13]/10 text-[#F6BA13] px-3 py-1 rounded-full font-medium">
                            International Office
                          </span>
                        )}
                      </div>
                    </div>

                    {/*<div className="w-16 h-1 bg-[#F6BA13] mb-6 rounded-full"></div>*/}

                    <div 
                      className="text-gray-600 leading-relaxed text-sm space-y-3"
                      dangerouslySetInnerHTML={{ __html: allOffices[selectedOffice].details }}
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}