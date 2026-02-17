"use client";

import Link from "next/link";

// 1. Updated Props to match the API data structure
type Props = {
  blog: {
    id: number;
    title: string;
    meta_description: string; // Used as the excerpt
    main_image: string;       // API field for image
    created_at: string;       // API field for date
    slug: string;
  };
};

export default function BlogCard({ blog }: Props) {
  // Fix for the insecure HTTP images from the API and fallback if empty
  const imageUrl = blog.main_image?.replace("http://", "https://") || "/blog/placeholder.png";

  // Format the date to a readable string
  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative h-[200px] w-[300px] flex-shrink-0 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-center flex-1">
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="cursor-pointer text-[18px] md:text-[20px] font-semibold text-[#04063E] hover:text-[#0B4F8A] transition leading-tight">
            {blog.title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2 text-[13.33px] text-[#555555]">
          <img
            src="/blog/date.png"
            alt="date"
            width={12}
            height={12}
            className="opacity-70"
          />
          {formattedDate}
        </div>

        <p className="mt-3 text-[15px] text-[#666666] font-normal line-clamp-3 leading-relaxed">
          {blog.meta_description}
        </p>
        
        <Link 
          href={`/blog/${blog.slug}`}
          className="mt-3 text-[14px] font-bold text-[#F68A07] hover:underline flex items-center gap-1"
        >
          READ MORE →
        </Link>
      </div>
    </div>
  );
}