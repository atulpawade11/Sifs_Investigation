"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const recentBlogs = [
  {
    title: "Common Myths About Forensic Handwriting",
    description: "Forensic handwriting analysis is one of the most misunderstood areas of forensic science.",
    image: "/blog2.png",
    date: "3rd December, 2025",
    author: "SIFS India"
  },
  {
    title: "Forensic Science Jobs | Forensic Careers",
    description: "Forensic science is one of the most exciting and impactful career paths, combining science, law, and...",
    image: "/blog3.png",
    date: "3rd December, 2025",
    author: "SIFS India"
  },
  {
    title: "Significance of Crime Scene Videography",
    description: "The use of videography in the field of modern forensics is a necessity.",
    image: "/blog4.png",
    date: "3rd December, 2025",
    author: "SIFS India"
  }
];

const BlogsCaseStudies = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
          <div>
            <p className="text-[#1A234E] text-sm font-bold italic mb-2">Forensic Insights</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#04063E]">Blogs and Case Studies</h2>
          </div>
          <button
            className="bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                        text-white px-8 py-3 rounded-full font-bold
                        flex items-center gap-4
                        hover:from-[#1217c0] hover:to-[#0a0f6b]
                        transition-all group"
            >
            View All
            <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
            />
            </button>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: Featured Large Blog */}
          <div className="lg:col-span-7 group cursor-pointer">
            <div className="border border-[#D8D8D8]/60 rounded-[32px] p-2 h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="relative mb-6">
  {/* IMAGE CONTAINER */}
  <div className="relative h-[300px] w-full overflow-hidden rounded-[24px] md:h-[450px]">
    <Image
      src="/blog1.png"
      alt="Featured Blog"
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>

  {/* META BADGE – OUTSIDE OVERFLOW */}
  <div className="absolute bottom-[-16px] left-4 z-20 flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-4 py-2 shadow-sm">
    <span className="text-[10px] font-medium text-black">
      By {recentBlogs[0].author}
    </span>
    <div className="h-1 w-1 rounded-full bg-black" />
    <span className="text-[10px] font-medium text-black">
      {recentBlogs[0].date}
    </span>
  </div>
</div>


              
              <div className="px-2 pb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                  Why Online Signature Analysis Is Growing
                </h3>
                <p className="text-[#868686] font-regular text-[16px]">
                  The world of forensic services is moving fast, and signature analysis is no exception.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: List of Small Blogs */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {recentBlogs.map((blog, index) => (
              <div 
                key={index}
                className="flex flex-col sm:flex-row gap-6 p-2 border border-[#D8D8D8]/60 rounded-lg hover:shadow-md transition-shadow group cursor-pointer"
              >
                {/* Small Thumbnail */}
                <div className="relative w-full sm:w-48 h-32 flex-shrink-0 rounded-tl-lg rounded-bl-lg overflow-hidden">
                  <Image 
                    src={blog.image} 
                    alt={blog.title}
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-tl-lg rounded-bl-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <h4 className="text-[18px] font-bold text-black mb-2 leading-tight group-hover:text-[#0B10A4] transition-colors">
                    {blog.title}
                  </h4>
                  <p className="text-[#525252] text-xs line-clamp-2 mb-3">
                    {blog.description}
                  </p>
                  
                  <div className="bg-gwhite self-start rounded-full px-4 py-1.5 flex items-center gap-2 border border-[#D9D9D9]">
                    <span className="text-[10px] font-medium text-black">By {blog.author}</span>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <span className="text-[10px] font-medium text-black">{blog.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogsCaseStudies;