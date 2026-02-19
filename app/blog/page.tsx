import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/config';
import PageBanner from "@/components/common/PageBanner";
import BlogLayout from "@/components/blog/BlogLayout/index";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, {
      next: { revalidate: 3600 }
    });
    const result = await response.json();

    if (result.success && result.data?.be) {
      const seo = result.data.be;
      return {
        title: seo.blogs_meta_title,
        description: seo.blogs_meta_description,
        keywords: seo.blogs_meta_keywords,
        openGraph: {
          title: seo.blogs_meta_title,
          description: seo.blogs_meta_description,
          images: ["/logo/logo.png"],
        }
      };
    }
  } catch (error) {
    console.error("Metadata fetch error for Blogs:", error);
  }

  return { title: "Forensic Blogs | SIFS India" };
}

export default function BlogPage() {
  return (
    <>
      <PageBanner
        title="Latest News & Blog"
        subtitle="Forensic Discoveries: From Lab to Field"
        bgImage="/about/about-banner.png"
      />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <BlogLayout />
        </div>
      </section>
    </>
  );
}