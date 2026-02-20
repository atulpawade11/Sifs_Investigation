import { Metadata } from "next";
import { notFound } from "next/navigation";
import SketchCopProductClient from "./SketchCopProductClient";

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Server-side Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const res = await fetch(
      `https://forensicinstitute.in/api/InvestigationServices/Website/front/product/${slug}`,
      { next: { revalidate: 3600 } } 
    );
    const json = await res.json();

    if (json.success && json.data?.page) {
      const seo = json.data.page;
      return {
        title: seo.meta_title,
        description: seo.meta_description,
        keywords: seo.meta_keywords,
        openGraph: {
          title: seo.meta_title,
          description: seo.meta_description,
          images: ["/images/banners/product-default.jpg"],
        },
      };
    }
  } catch (err) {
    console.error("Metadata fetch error:", err);
  }

  return { title: "Product Details | SIFS India" };
}

// 2. Main Server Page
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  
  // We don't fetch the full data here to avoid double-fetching; 
  // the client component will handle its own data loading for the UI.
  return <SketchCopProductClient slug={resolvedParams.slug} />;
}