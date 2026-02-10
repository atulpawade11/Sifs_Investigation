"use client";

import Image from "next/image";
import Link from "next/link";

// 1. Update the type definition to include slug
type Props = {
  blog: {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    slug: string; // Add this line
  };
};

export default function BlogCard({ blog }: Props) {
  return (
    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white overflow-hidden">
      {/* Image */}
      <div className="relative h-[200px] w-[300px] flex-shrink-0 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-center">
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="cursor-pointer text-[16.66px] font-semibold text-black hover:text-[#1f6feb] transition">
            {blog.title}
          </h3>
        </Link>

        <p className="mt-1 flex items-center gap-2 text-[13.33px] text-[#555555]">
          <Image
            src="/blog/date.png"
            alt="date"
            width={12}
            height={12}
          />
          {blog.date}
        </p>

        <p className="mt-2 text-[15px] text-[#777777] font-regular line-clamp-3">
          {blog.excerpt}
        </p>
      </div>
    </div>
  );
}