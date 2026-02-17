"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';
import { Skeleton } from '@/components/shared/Skeleton';

interface Blog {
  id: number;
  title: string;
  slug: string;
  home_image: string;
  publish_date: string;
  author: string;
  meta_description: string;
  content: any; // Can be string or {type: "Buffer", data: [...]}
}

const BlogsCaseStudies = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [content, setContent] = useState({
    title: "Forensic Insights",
    subtitle: "Blogs and Case Studies"
  });
  const [loading, setLoading] = useState(true);

  // Helper to format date like "12th February, 2026"
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date.toLocaleString('en-GB', { month: 'long' });
      const year = date.getFullYear();

      const suffix = (d: number) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
        }
      };
      return `${day}${suffix(day)} ${month}, ${year}`;
    } catch {
      return dateStr;
    }
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);
        const result = await response.json();

        if (result.success && result.data) {
          const bs = result.data.bs;

          setContent({
            title: bs.blog_section_title?.replace(/[.]+$/, "") || "Forensic Insights",
            subtitle: bs.blog_section_subtitle?.replace(/[.]+$/, "") || "Blogs and Case Studies"
          });

          if (result.data.blogs) {
            setBlogs(result.data.blogs);
          }
        }
      } catch (err) {
        console.error('Error fetching Blog section:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
            <div className="space-y-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-64" />
            </div>
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <Skeleton className="h-[450px] w-full rounded-[32px]" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-5">
                  <Skeleton className="w-44 h-32 rounded-2xl flex-shrink-0" />
                  <div className="space-y-3 flex-1">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-6 w-32 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  const featuredBlog = blogs[0];
  const sideBlogs = blogs.slice(1, 4);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
          <div>
            <p className="text-[#1A234E] text-sm font-bold italic mb-2 uppercase tracking-widest">
              {content.title}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#04063E]">
              {content.subtitle}
            </h2>
          </div>
          <Link
            href="/blog"
            className="bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                        text-white px-8 py-3 rounded-full font-bold
                        flex items-center gap-4 hover:shadow-xl transition-all group"
          >
            View All
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT SIDE: Featured Large Blog */}
          <Link href={`/blog/${featuredBlog.slug}`} className="lg:col-span-7 group cursor-pointer">
            <div className="border border-[#D8D8D8]/60 rounded-[32px] p-2 h-full shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="relative mb-6">
                <div className="relative h-[300px] w-full overflow-hidden rounded-[24px] md:h-[450px]">
                  <Image
                    src={featuredBlog.home_image}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* META BADGE */}
                <div className="absolute bottom-[-16px] left-4 z-20 flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-4 py-2 shadow-sm">
                  <span className="text-[10px] font-medium text-black">By {featuredBlog.author}</span>
                  <div className="h-1 w-1 rounded-full bg-black" />
                  <span className="text-[10px] font-medium text-black">
                    {formatDate(featuredBlog.publish_date)}
                  </span>
                </div>
              </div>

              <div className="px-2 pb-4 pt-4">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-3 group-hover:text-[#0B10A4] transition-colors line-clamp-2">
                  {featuredBlog.title}
                </h3>
                <p className="text-[#868686] font-regular text-[16px] line-clamp-3 leading-relaxed">
                  {featuredBlog.meta_description}
                </p>
              </div>
            </div>
          </Link>

          {/* RIGHT SIDE: List of Small Blogs */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sideBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="flex flex-col sm:flex-row gap-5 p-2 border border-[#D8D8D8]/60 rounded-2xl hover:shadow-md transition-shadow group cursor-pointer"
              >
                {/* Small Thumbnail */}
                <div className="relative w-full sm:w-44 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={blog.home_image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center flex-1 pr-2">
                  <h4 className="text-[17px] font-bold text-black mb-2 leading-tight group-hover:text-[#0B10A4] transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-[#525252] text-xs line-clamp-2 mb-3">
                    {blog.meta_description}
                  </p>

                  <div className="bg-white self-start rounded-full px-3 py-1 flex items-center gap-2 border border-[#D9D9D9]">
                    <span className="text-[9px] font-medium text-black">By {blog.author}</span>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <span className="text-[9px] font-medium text-black">
                      {formatDate(blog.publish_date)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsCaseStudies;