"use client";

import CategoriesList from "./CategoriesList";
import RecentPosts from "./RecentPosts";

interface BlogSidebarProps {
  categories: any[];
  recentPosts: any[];
  selectedCategory: string;
  setSelectedCategory?: (id: string) => void; // Added "?"
}

export default function BlogSidebar({ 
  categories, 
  recentPosts, 
  selectedCategory, 
  setSelectedCategory 
}: BlogSidebarProps) {
  
  const handleCategoryClick = (id: string) => {
    // Only call the function if it exists
    if (setSelectedCategory) {
      setSelectedCategory(id);
    } else {
      // On the details page, maybe redirect back to the main blog list with this category?
      window.location.href = `/blog?category=${id}`;
    }
  };

  return (
    <div className="space-y-6">
      <CategoriesList 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory} 
      />
      <RecentPosts posts={recentPosts} />
    </div>
  );
}