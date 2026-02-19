import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/config';
import ServiceListingClient from './ServiceListingClient';

type Props = {
  params: Promise<{ category: string }>;
};

// SEO Metadata using the keywords you provided
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  
  try {
    const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, {
      next: { revalidate: 3600 }
    });
    const result = await res.json();

    if (result.success && result.data?.be) {
      const seo = result.data.be;
      // We capitalize the category for the title
      const catTitle = category.charAt(0).toUpperCase() + category.slice(1);
      
      return {
        title: `${catTitle} - ${seo.services_meta_title}`,
        description: seo.services_meta_description,
        keywords: seo.services_meta_keywords,
        openGraph: {
          title: seo.services_meta_title,
          description: seo.services_meta_description,
          images: ["/logo/logo.png"],
        }
      };
    }
  } catch (error) {
    console.error("Service Metadata Error:", error);
  }

  return { title: "Forensic Investigation Services | SIFS India" };
}

export default async function ServiceListingPage({ params }: Props) {
  // Unwrapping params for Next.js 15
  const { category } = await params;
  return <ServiceListingClient categorySlug={category} />;
}