"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRight, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

// Use a structure that matches your URL slugs for easy lookups
const categories = [
    { 
        name: "Document examination", 
        slug: "document-examination",
        items: [
            { label: "Handwriting examination", slug: "handwriting-examination" },
            { label: "Signature verification", slug: "signature-verification" },
            { label: "Document authenticity analysis", slug: "document-authenticity-analysis" },
            { label: "Certificate verification", slug: "certificate-verification" },
            { label: "Photograph verification", slug: "photograph-verification" }
        ]
    },
    { 
        name: "Fingerprint analysis", 
        slug: "fingerprint-analysis", 
        items: [
            { label: "Fingerprint Development", slug: "fingerprint-development" },
            { label: "Fingerprint Matching", slug: "fingerprint-matching" },
            { label: "Fingerprint Software Analysis", slug: "fingerprint-software-analysis" },
            { label: "Fingerprint in DVI", slug: "fingerprint-in-dvi" },
            { label: "Fingerprint in PCC", slug: "fingerprint-in-PCC" }
        ] 
    },
    { 
        name: "Cyber forensics investigation", 
        slug: "cyber-forensics", 
        items: [
            { label: "Audio & Video Verification", slug: "audio-video-verification" },
            { label: "Speaker Identification & Transcript", slug: "speaker-identification-and-transcript" },
            { label: "CCTV Forensics", slug: "cctv-forensics" },
            { label: "Mobile Forensics", slug: "mobile-forensics" },
            { label: "Deleted Data Recovery", slug: "delete-data-recovery" }
        ] 
    },
    { 
        name: "Insurance Investigation", 
        slug: "insurance-investigation", 
        items: [
            { label: "Vehicle Fire Examination", slug: "vehicle-fire-examination" },
            { label: "Property Fire Examination", slug: "property-fire-examination" },
            { label: "Fire Origin & Root Cause", slug: "fire-origin-root-cause" },
            { label: "Fire Debris Analysis", slug: "fire-debris-analysis" },
            { label: "Electrical Fire Investigation", slug: "electrical-fire-investigation" }
        ] 
    },
    { 
        name: "Forensic biology", 
        slug: "forensic-biology", 
        items: [
            { label: "Blood Group Examination", slug: "blood-group-examination" },
            { label: "Semen Examination", slug: "semen-examination" },
            { label: "Hair Examination", slug: "hair-examination" },
            { label: "Species Origin Examination", slug: "species-origin-examination" },
            { label: "Forensic DNA Test", slug: "forensic-dna-test" }
        ] 
    },
    { 
        name: "Key & accident reconstruction", 
        slug: "accident-reconstruction", 
        items: [
            { label: "Toolmark Analysis", slug: "toolmark-analysis" },
            { label: "Vehicle Key Forensics", slug: "vehicle-key-forensics" },
            { label: "Vehicle Identification Number", slug: "vehicle-identification-number" },
            { label: "Accident Reconstruction", slug: "accident-reconstruction" },
            { label: "Crime Scene Investigation", slug: "crime-scene-investigation" }
        ] 
    },
    { 
        name: "Forensic facial imaging", 
        slug: "forensic-facial-imaging", 
        items: [
            { label: "Digital Facial Composites", slug: "digital-facial-composites" },
            { label: "Post Morterm Facial Imaging", slug: "post-morterm-facial-imaging" },
            { label: "Age Progression Regression", slug: "age-progression-regression" },
            { label: "1 to 1 Face Comparison & Analysis", slug: "face-comparison-Analysis" },
            { label: "Facial Image Editing", slug: "facial-image-editing" }
        ] 
    },
    { 
        name: "Forensic support", 
        slug: "forensic-support", 
        items: [
            { label: "Data Theft Analysis", slug: "data-theft-analysis" },
            { label: "Property Investigation", slug: "property-investigation" },
            { label: "Employee Verification", slug: "employee-verification" },
            { label: "Counselling, Recruitment Services", slug: "counselling-recruitment-services" },
            { label: "Cross Examination", slug: "cross-examination" }
        ] 
    },
];

interface SidebarProps {
  activeCategory?: string;
  activeService?: string;
}

export default function ServiceSidebar({ activeCategory, activeService }: SidebarProps) {
  const params = useParams();
  const router = useRouter();
  
  const currentCategory = params.category as string;
  const currentService = params.service as string;

  // State to track which accordion is open
  const [openCategory, setOpenCategory] = useState<string | null>(currentCategory);

  // Sync open accordion if user navigates via other means (e.g., Header)
  useEffect(() => {
    if (currentCategory) setOpenCategory(currentCategory);
  }, [currentCategory]);

  const toggleCategory = (slug: string) => {
    setOpenCategory(openCategory === slug ? null : slug);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
      {categories.map((cat) => {
        const isExpanded = openCategory === cat.slug;
        const hasSubItems = cat.items.length > 0;

        return (
          <div key={cat.slug} className="border-b last:border-0 border-gray-50">
            {/* Parent Category Header */}
            <button 
              onClick={() => hasSubItems ? toggleCategory(cat.slug) : router.push(`/services/${cat.slug}`)}
              className="w-full flex justify-between items-center p-4 text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className={currentCategory === cat.slug ? "text-[#044782]" : ""}>
                {cat.name}
              </span>
              {hasSubItems ? (
                isExpanded ? <Minus size={14} className="text-[#F68A07]" /> : <Plus size={14} />
              ) : (
                <ChevronRight size={14} className="text-gray-300" />
              )}
            </button>
            
            {/* Sub-items List (Accordion Content) */}
            {isExpanded && hasSubItems && (
              <div className="px-3 pb-4 space-y-1 bg-gray-50/30">
                {cat.items.map((item) => {
                  const isActive = currentService === item.slug;
                  
                  return (
                    <Link
                      key={item.slug}
                      href={`/services/${cat.slug}/${item.slug}`}
                      className={`flex justify-between items-center px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all
                        ${isActive 
                          ? "bg-[#044782] text-white shadow-md" 
                          : "text-gray-500 hover:bg-white hover:text-[#044782] border border-transparent hover:border-gray-100"
                        }`}
                    >
                      {item.label}
                      <ChevronRight 
                        size={14} 
                        className={isActive ? "text-white" : "text-gray-300"} 
                      />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}