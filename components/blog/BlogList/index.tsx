import BlogSearch from "./BlogSearch";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import { BLOGS } from "../../../data/blog";

export default function BlogList() {
  return (
    <div>
      <div className="flex cursor-pointer items-center justify-between">
        <h2 className="mb-4 text-[30px] font-semibold">All News</h2>

        <BlogSearch />
      </div>

      <div className="mt-6 space-y-4">
        {BLOGS.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}
