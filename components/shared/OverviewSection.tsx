// components/shared/OverviewSection.tsx
"use client";

import { useState } from "react";

type Props = {
  heading: string;
  description: string;
  image: string;
};

interface ServiceSection {
  title: string;
  content: string;
}

export default function OverviewSection({ heading, description, image }: Props) {
  // Parse HTML to extract different sections
  const parseContent = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    let introText = '';
    let serviceHeading = '';
    let serviceSections: ServiceSection[] = [];
    let closingText = '';
    let contactText = '';
    
    let currentSection = 'intro'; // intro, services, closing
    let currentService: ServiceSection | null = null;

    Array.from(doc.body.children).forEach(element => {
      const text = element.textContent || '';
      const isServiceHeading = element.tagName === 'H4';
      const isBoldService = element.querySelector('b') && 
        (text.includes('Handwriting') || 
         text.includes('Document') ||
         text.includes('Ink') ||
         text.includes('Expert') ||
         text.includes('Advanced'));
      
      // Check if we're transitioning to services section
      if (isServiceHeading) {
        serviceHeading = text.replace(':', '').trim();
        currentSection = 'services';
        return;
      }
      
      // Check if this is a service item
      if (currentSection === 'intro' && isBoldService) {
        currentSection = 'services';
      }
      
      // Check if we're at the closing text
      if (text.includes('Our Document and Handwriting Examination Laboratory is committed') || 
          text.includes('often considered silent witnesses')) {
        currentSection = 'closing';
      }
      
      // Handle different sections
      if (currentSection === 'intro') {
        introText += element.outerHTML;
      } else if (currentSection === 'services') {
        if (isBoldService || element.querySelector('b')) {
          // Save previous service if exists
          if (currentService) {
            serviceSections.push(currentService);
          }
          
          const boldEl = element.querySelector('b');
          currentService = {
            title: boldEl ? boldEl.textContent.replace(':', '').trim() : '',
            content: boldEl ? element.innerHTML.replace(boldEl.outerHTML, '').trim() : element.innerHTML
          };
        } else if (currentService && (text.includes('Contact us') || text.includes('committed to delivering'))) {
          // Save current service and move to closing
          serviceSections.push(currentService);
          currentService = null;
          currentSection = 'closing';
          closingText += element.outerHTML;
        } else if (currentService) {
          currentService.content += element.outerHTML;
        }
      } else if (currentSection === 'closing') {
        if (text.includes('Contact us')) {
          contactText = element.outerHTML;
        } else {
          closingText += element.outerHTML;
        }
      }
    });
    
    // Don't forget the last service if exists
    if (currentService) {
      serviceSections.push(currentService);
    }
    
    return { 
      introText, 
      serviceHeading, 
      serviceSections, 
      closingText, 
      contactText 
    };
  };

  const { introText, serviceHeading, serviceSections, closingText, contactText } = parseContent(description);
  const [activeService, setActiveService] = useState(0);
  
  const hasImage = image && image.trim() !== '';

  return (
    <div className="space-y-8">
      {/* 1. Image and Text Inline - Full width if no image */}
      <div className={`${hasImage ? 'grid md:grid-cols-2 gap-10' : ''} items-start`}>
        {/* Image - Only show if image exists */}
        {hasImage && (
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <img 
              src={image} 
              alt={heading} 
              className="w-full h-full object-cover min-h-[350px]" 
            />
          </div>
        )}

        {/* Text Content - Full width if no image */}
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-[30px] font-semibold text-black mb-6 ">
            Overview of Laboratory
          </h2>
          
          {introText && (
            <div 
              className="text-[#525252] text-[16px] font-regular leading-relaxed prose prose-slate max-w-none
                [&>p]:mb-4 [&>p]:text-justify [&>p]:text-md
                [&>br]:hidden"
              dangerouslySetInnerHTML={{ __html: introText }}
            />
          )}
        </div>
      </div>

      {/* 2. Floating Label/Pill for Key Services */}
      {serviceSections.length > 0 && (
        <div className="flex items-center my-12 relative">
          <div className="absolute w-full h-px bg-[#8c8c8c] opacity-60 z-0 top-6 border border-[#D9D9D9] z-0"></div>
          <span className=" mx-auto mx-6 px-8 py-2 bg-[#FFFFFF] text-black text-[18px] border border-[#D9D9D9] font-medium rounded-full relative z-1">
            {serviceHeading || "Key Services Offered"}
          </span>
        </div>
      )}

      {/* 3. Key Feature Points - Vertical Pills on Left, Content on Right */}
      {serviceSections.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Side - Vertical Pills */}
          <div className="flex flex-col gap-3">
            {serviceSections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`w-full text-left px-5 py-4 text-[16px] font-semibold transition-all duration-300 
                  ${
                    activeService === index
                      ? "bg-[#00467A] text-white"
                      : "bg-[#EAEAEA] text-[#717171] border-transparent hover:bg-gray-100"
                  }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Right Side - Content Display */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg md:text-[24px] font-bold text-[#000000] mb-4">
              {serviceSections[activeService]?.title}
            </h3>
            <div 
              className="text-[#525252] leading-relaxed prose prose-slate max-w-none text-[16px]
                [&>p]:mb-4 [&>p]:text-justify
                [&>b]:text-gray-900 [&>b]:font-bold"
              dangerouslySetInnerHTML={{ __html: serviceSections[activeService]?.content || '' }}
            />
          </div>
        </div>
      )}

      {/* 4. Closing Text */}
      {(closingText || contactText) && (
        <div className="mt-8 space-y-4">
          {closingText && (
            <div 
              className="text-gray-600 leading-relaxed prose prose-slate max-w-none text-sm
                [&>p]:mb-4 [&>p]:text-justify"
              dangerouslySetInnerHTML={{ __html: closingText }}
            />
          )}
          
          {/* Contact Link */}
          {contactText && (
            <div 
              className="text-sm [&>a]:text-[#F68A07] [&>a]:font-semibold [&>a]:underline [&>a]:hover:text-[#d97706]"
              dangerouslySetInnerHTML={{ __html: contactText }}
            />
          )}
        </div>
      )}
    </div>
  );
}