"use client";

import { useRouter } from "next/navigation";

interface CategoriesListProps {
  categories: any[];
  selectedCategory: string;
  // 1. Make the function optional with "?"
  setSelectedCategory?: (id: string) => void; 
}

export default function CategoriesList({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoriesListProps) {
  const router = useRouter();

  // 2. Create a handler that checks if the function exists
  const handleClick = (id: string) => {
    if (typeof setSelectedCategory === "function") {
      // We are on the List Page
      setSelectedCategory(id);
    } else {
      // We are on the Details Page (No function passed)
      // Redirect back to the blog list filtered by this category
      router.push(`/blog?category=${id}`);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h4 className="mb-3 text-[20px] text-black font-semibold">Categories</h4>
      <div className="my-4 h-px bg-gray-200" />

      <ul className="space-y-1 text-[14px] font-regular">
        <li
          onClick={() => handleClick("All")} // 3. Use handleClick instead
          className={`flex cursor-pointer items-center justify-between py-2 px-2 rounded-md transition-all ${
            selectedCategory === "All"
              ? "bg-[#0B4F8A] text-white"
              : "text-black hover:text-[#0B4F8A] hover:bg-gray-50"
          }`}
        >
          <span>All News</span>
          <span className={selectedCategory === "All" ? "text-white" : "text-gray-400"}>›</span>
        </li>

        {categories.map((cat) => {
          const catId = String(cat.id);
          const isActive = selectedCategory === catId;
          const count = cat.blogs_count ?? cat.count ?? cat.total ?? null;

          return (
            <li
              key={catId}
              onClick={() => handleClick(catId)} // 3. Use handleClick instead
              className={`flex cursor-pointer items-center justify-between py-2 px-2 rounded-md transition-all ${
                isActive
                  ? "bg-[#0B4F8A] text-white font-medium"
                  : "text-black hover:text-[#0B4F8A] hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{cat.name}</span>
                {count !== null && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </div>
              <span className={isActive ? "text-white" : "text-gray-400"}>›</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}