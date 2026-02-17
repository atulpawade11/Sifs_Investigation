"use client";

import Image from "next/image";
import Link from "next/link";

interface RecentPostsProps {
  posts: any[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h4 className="mb-3 text-[20px] text-black font-semibold">Recent Post</h4>
      <div className="my-4 h-px bg-gray-200" />

      {posts.length > 0 ? (
        posts.map((post) => {
          // Fix insecure image URLs and handle missing images
          const imageUrl = post.main_image?.replace("http://", "https://") || "/blog/placeholder.png";
          
          // Format date from API (e.g., 2025-03-06T08:56:45.000Z) to "19 Dec, 2025"
          const formattedDate = new Date(post.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <div key={post.id} className="mb-4 flex items-center gap-3 last:mb-0 group">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded">
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div>
                <Link href={`/blog/${post.slug}`}>
                  <p className="text-[14px] font-medium text-black line-clamp-2 mb-1 hover:text-[#0B4F8A] transition-colors cursor-pointer leading-tight">
                    {post.title}
                  </p>
                </Link>
                
                <span className="text-[12px] flex items-center gap-2 font-regular text-[#777777]">
                  <img
                    src="/blog/calander.png"
                    alt="date"
                    className="w-3 h-3 opacity-60"
                  />
                  {formattedDate}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-sm text-gray-400 text-center py-4">No recent posts available.</p>
      )}
    </div>
  );
}