import { Metadata } from "next";
import { API_BASE_URL } from "@/lib/config";
import ForensicInvestigationClient from "./ForensicInvestigationClient";

// VERCEL OPTIMIZATION:
// This ensures the page is treated as dynamic and 
// the metadata fetch isn't skipped during the build process.
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Note: Always use absolute URLs for Vercel fetches
    const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/page/forensic-investigations`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) throw new Error('API unreachable');
    
    const result = await res.json();

    if (result.success && result.data?.page) {
      const seo = result.data.page;
      return {
        title: seo.meta_title || "Forensic Investigation Services",
        description: seo.meta_description,
        keywords: seo.meta_keywords,
        // Canonical tags help Vercel/Google identify the primary URL
        alternates: {
          canonical: `/forensic-investigation`,
        },
        openGraph: {
          title: seo.meta_title,
          description: seo.meta_description,
          url: 'https://your-domain.com/forensic-investigation',
          siteName: 'SIFS India',
          images: [
            {
              url: "/about/about-banner.png",
              width: 1200,
              height: 630,
              alt: seo.meta_title,
            },
          ],
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: seo.meta_title,
          description: seo.meta_description,
          images: ["/about/about-banner.png"],
        }
      };
    }
  } catch (error) {
    console.error("Vercel Metadata Fetch Error:", error);
  }

  return { title: "Forensic Investigation | SIFS India" };
}

export default function Page() {
  return <ForensicInvestigationClient />;
}