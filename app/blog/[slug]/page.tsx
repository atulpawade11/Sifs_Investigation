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

    const decodedSlug = decodeURIComponent(slug);

    const blogs = result.data.blogs.data;
    const blog = blogs.find((b: any) => 
      b.slug === decodedSlug || b.slug === slug
    );

    if (!blog) {
      console.error("No blog found for decoded slug:", decodedSlug);
      return null;
    }

    // Find previous and next posts
    const currentIndex = blogs.findIndex((b: any) => 
      b.slug === decodedSlug || b.slug === slug
    );
    
    const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
    const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

    return {
      blog: blog,
      bcats: result.data.bcats,
      recent_blogs: blogs.slice(0, 5),
      be: result.data.be,
      prevPost: prevBlog ? { slug: prevBlog.slug, title: prevBlog.title } : null,
      nextPost: nextBlog ? { slug: nextBlog.slug, title: nextBlog.title } : null
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

  const { blog, bcats, recent_blogs, be, prevPost, nextPost } = data;

  return (
    <div className="min-h-screen bg-white">
      <BlogDetailClient 
        title={blog.title} 
        slug={slug}
        metaTitle={be?.blogs_meta_title}
        metaDescription={be?.blogs_meta_description}
        prevPost={prevPost}
        nextPost={nextPost}
      >
        <div className="relative">
          {/* Back Button - Positioned after banner, before content */}
          <div className="absolute -top-12 right-0 z-10">
            <BackButton />
          </div>
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 mt-12">
            <article className="lg:col-span-2">
              <div className="relative mb-8 h-[450px] overflow-hidden rounded-xl">
                <img
                  src={blog.main_image?.replace("http://", "https://")}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed blog-content-area"
                dangerouslySetInnerHTML={{ __html: blog.content }} 
              />
            </article>

            <aside className="lg:col-span-1 ">
              <BlogSidebar 
                categories={bcats || []} 
                recentPosts={recent_blogs || []}
                selectedCategory={String(blog.bcategory_id)}
              />
            </aside>
          </div>
        </div>
      </BlogDetailClient>
    </div>
  );
}