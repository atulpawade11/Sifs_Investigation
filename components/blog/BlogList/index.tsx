"use client";

import { useState, useMemo } from "react";
import BlogSearch from "./BlogSearch";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";

// Define the interface for props
interface BlogListProps {
  blogs: any[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  paginationProps: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export default function BlogList({ 
  blogs, 
  searchTerm, 
  setSearchTerm, 
  paginationProps 
}: BlogListProps) {
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[30px] font-semibold text-[#04063E]">All News</h2>
        <BlogSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="mt-8 space-y-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <div className="py-20 text-center border-2 border-dashed rounded-xl bg-gray-50">
            <p className="text-gray-400">No news articles found.</p>
          </div>
        )}
      </div>

      {/* RENDER THE PAGINATION HERE */}
      <div className="mt-10">
      <Pagination 
        currentPage={paginationProps.currentPage}
        totalPages={paginationProps.totalPages}
        onPageChange={paginationProps.onPageChange}
      />
    </div>
    </div>
  );
}