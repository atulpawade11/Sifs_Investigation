import { Metadata } from "next"; 
import { notFound } from "next/navigation";
import BackButton from "../../../components/common/BackButton";
import BlogSidebar from "../../../components/blog/BlogSidebar";
import BlogDetailClient from "./BlogDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getBlogData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;
  const url = `${baseUrl}/InvestigationServices/Website/front/blogs`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;

    const result = await res.json();
    if (!result.success || !result.data) return null;

    // DECODE THE SLUG HERE
    const decodedSlug = decodeURIComponent(slug);

    // Use the decoded slug to find the match
    const blog = result.data.blogs.data.find((b: any) => 
      b.slug === decodedSlug || b.slug === slug
    );

    if (!blog) {
      console.error("No blog found for decoded slug:", decodedSlug);
      return null;
    }

    return {
      blog: blog,
      bcats: result.data.bcats,
      recent_blogs: result.data.blogs.data.slice(0, 5)
    };
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogData(slug);
  if (!data || !data.blog) return { title: "Blog Not Found" };
  return { title: `${data.blog.title} | Forensic Blog` };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data || !data.blog) notFound();

  const { blog, bcats, recent_blogs } = data;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gray-50 py-12 text-center">
        <p className="text-sm uppercase tracking-wide text-gray-500">News & Blog</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-800">{blog.title}</h1>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 relative">
        <div className="absolute right-6 top-0">
          <BackButton />
        </div>

        <BlogDetailClient title={blog.title}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <article className="lg:col-span-2">
              <div className="relative mb-8 h-[450px] overflow-hidden rounded-xl">
                <img
                  src={blog.main_image?.replace("http://", "https://")}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Added the class 'blog-content-area' here */}
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed blog-content-area"
                dangerouslySetInnerHTML={{ __html: blog.content }} 
              />
            </article>

            <aside className="lg:col-span-1">
              <BlogSidebar 
                categories={bcats || []} 
                recentPosts={recent_blogs || []}
                selectedCategory={String(blog.bcategory_id)}
              />
            </aside>
          </div>
        </BlogDetailClient>
      </section>
    </div>
  );
}