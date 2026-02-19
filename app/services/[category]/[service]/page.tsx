import { Metadata } from 'next';
import ServiceDetailClient from './ServiceDetailClient';
import { API_BASE_URL } from '@/lib/config';

type Props = {
  params: Promise<{ category: string; service: string }>;
};

// SEO for individual forensic services
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  
  try {
    // We fetch the service list to find the matching slug for the title/meta
    const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/services`, {
        next: { revalidate: 3600 }
    });
    const result = await res.json();
    
    const decodedSlug = decodeURIComponent(service).toLowerCase();
    const serviceInfo = result?.data?.data?.find((s: any) => s.slug.toLowerCase() === decodedSlug);

    return {
      title: serviceInfo ? `${serviceInfo.title} | SIFS India` : "Forensic Service Detail",
      description: serviceInfo?.meta_description || "Expert forensic investigation and specialized lab services.",
      openGraph: {
        images: [serviceInfo?.featured_image || "/logo/logo.png"],
      }
    };
  } catch (err) {
    return { title: "Forensic Services | SIFS India" };
  }
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  
  return (
    <ServiceDetailClient 
      categorySlug={resolvedParams.category} 
      serviceSlug={resolvedParams.service} 
    />
  );
}