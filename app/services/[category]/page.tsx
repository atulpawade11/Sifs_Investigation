import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/config'; 
import ServiceListingClient from './ServiceListingClient';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  
  const decodedTitle = decodeURIComponent(category).replace(/-/g, ' ');

  try {
    const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, {
      cache: 'force-cache', 
      next: { revalidate: 3600 }
    });
    const result = await res.json();

    if (result.success && result.data?.be) {
      const seo = result.data.be;
      
      return {
        title: `${decodedTitle.toUpperCase()} | ${seo.services_meta_title}`,
        description: seo.services_meta_description,
        keywords: seo.services_meta_keywords,
        openGraph: {
          title: seo.services_meta_title,
          description: seo.services_meta_description,
          images: ["/logo/logo.png"],
          type: 'website'
        },
      };
    }
  } catch (error) {
    console.error("Vercel SEO Fetch Error:", error);
  }

  return { title: `${decodedTitle} Forensic Services | SIFS India` };
}

export default async function ServiceListingPage({ params }: Props) {
  const { category } = await params;
  return <ServiceListingClient categorySlug={category} />;
}