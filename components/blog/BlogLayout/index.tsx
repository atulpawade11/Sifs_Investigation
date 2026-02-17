"use client";

import { useState, useEffect, useMemo } from "react";
import BlogList from "../BlogList/index";
import BlogSidebar from "../BlogSidebar/index";
import { Loader2 } from "lucide-react";

export default function BlogLayout() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filtering States - Initialized to strings to prevent 'undefined' errors
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 1. Reset page to 1 when filters change 
  // We use string conversion to ensure the dependency array size is stable
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // 2. Single Source of Truth for Fetching
  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/InvestigationServices/Website/front/blogs?page=${currentPage}`
        );
        const result = await response.json();

        if (result.success) {
          setBlogs(result.data.blogs.data || []);
          setTotalPages(result.data.blogs.last_page || 1);
          // MAKE SURE THIS LINE IS CORRECT
          setCategories(result.data.bcats || []); 
        }
      } catch (error) {
        console.error("Blog Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [currentPage]); // Only trigger fetch when the page number changes

  // 3. Client-side Filtering Logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog: any) => {
      // Ensure title and description exist before calling toLowerCase()
      const title = blog.title?.toLowerCase() || "";
      const description = blog.meta_description?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      const matchesSearch = title.includes(search) || description.includes(search);
      
      const matchesCategory = 
        selectedCategory === "All" || 
        String(blog.bcategory_id) === String(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchTerm, selectedCategory]);

  // 4. Loading State View
  if (loading && blogs.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="animate-spin text-[#04063E]" size={48} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {/* Pass filtered data and pagination controls to BlogList */}
        <BlogList 
          blogs={filteredBlogs} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          paginationProps={{
            currentPage,
            totalPages,
            onPageChange: (page: number) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
      </div>

      <div className="lg:col-span-1">
        <BlogSidebar 
          categories={categories} 
          recentPosts={blogs.slice(0, 5)} 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
}