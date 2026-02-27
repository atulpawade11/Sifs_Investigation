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
    const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/service/${service}`, {
      next: { revalidate: 3600 }
    });
    const result = await res.json();

    const serviceInfo = result?.data?.service;

    if (!serviceInfo) {
      return { title: "Forensic Services | SIFS India" };
    }

    return {
      title: serviceInfo.seo_title || `${serviceInfo.title} | SIFS India`,
      description: serviceInfo.meta_description || "Expert forensic investigation and specialized lab services.",
      keywords: serviceInfo.meta_keywords || "",
      openGraph: {
        title: serviceInfo.seo_title || serviceInfo.title,
        description: serviceInfo.meta_description,
        images: [serviceInfo.featured_image || serviceInfo.main_image || "/logo/logo.png"],
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