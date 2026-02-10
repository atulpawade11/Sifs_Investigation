import CategoriesList from "./CategoriesList";
import RecentPosts from "./RecentPosts";

export default function BlogSidebar() {
  return (
    <div className="space-y-6">
      <CategoriesList />
      <RecentPosts />
    </div>
  );
}
