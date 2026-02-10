"use client";

import BlogList from "../BlogList/index";
import BlogSidebar from "../BlogSidebar/index";

export default function BlogLayout() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <BlogList />
      </div>
      <div className="lg:col-span-1">
        <BlogSidebar />
      </div>
    </div>
  );
}
