"use client";

type Props = {
  heading: string;
  description: string; // Changed from string[] to string to accept API HTML
  image: string;
};

export default function OverviewSection({ heading, description, image }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-10 mt-10 items-start">
      {/* Image Container */}
      <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
        <img 
          src={image} 
          alt={heading} 
          className="w-full h-full object-cover min-h-[300px]" 
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-[#0B4F8A] mb-4">
          {heading}
        </h2>

        {/* Renders the raw HTML from the API safely.
          The 'prose' class handles standard HTML styling (line heights, margins).
        */}
        <div 
          className="text-gray-600 text-sm leading-relaxed prose prose-slate max-w-none 
          [&>p]:mb-4 [&>p:last-child]:mb-0 [&>h4]:text-[#0B4F8A] [&>h4]:font-bold [&>h4]:mt-6 [&>h4]:mb-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}