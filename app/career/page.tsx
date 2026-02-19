import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/config';
import CareerClient from "./CareerClient";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/career/`, {
      next: { revalidate: 3600 }
    });
    const result = await response.json();

    if (result.success && result.data?.be) {
      const seo = result.data.be;
      return {
        title: seo.career_meta_title,
        description: seo.career_meta_description,
        keywords: seo.career_meta_keywords,
        openGraph: {
          title: seo.career_meta_title,
          description: seo.career_meta_description,
          images: ["/logo/logo.png"],
        }
      };
    }
  } catch (error) {
    console.error("Metadata fetch error for Careers:", error);
  }
  return { title: "Forensic Science Jobs | SIFS India" };
}

export default function CareerPage() {
  return <CareerClient />;
}