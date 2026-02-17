import { notFound } from "next/navigation";
import BackButton from "../../../components/common/BackButton";
import BlogSidebar from "../../../components/blog/BlogSidebar";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getBlogData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;
  // We use the main blogs endpoint because the single-blog one is 404ing
  const url = `${baseUrl}/InvestigationServices/Website/front/blogs`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;

    const result = await res.json();
    if (!result.success || !result.data) return null;

    // We find the specific blog that matches the slug from the main list
    const blog = result.data.blogs.data.find((b: any) => b.slug === slug);

    if (!blog) return null;

    return {
      blog: blog,
      bcats: result.data.bcats,
      recent_blogs: result.data.blogs.data.slice(0, 5) // Taking top 5 as recent
    };
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data || !data.blog) {
    notFound();
  }

  const { blog, bcats, recent_blogs } = data;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-12 text-center">
        <p className="text-sm uppercase tracking-wide text-gray-500">News & Blog</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-800">
          {blog.title}
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 relative">
        <div className="absolute right-6 top-0">
          <BackButton />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <article className="lg:col-span-2">
            <div className="relative mb-8 h-[450px] overflow-hidden rounded-xl">
              <img
                src={blog.main_image?.replace("http://", "https://")}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content from API */}
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
          <BlogSidebar 
  categories={bcats || []} 
  recentPosts={recent_blogs || []}
  selectedCategory={String(blog.bcategory_id)}
/>
          </aside>
        </div>
      </section>
    </div>
  );
}