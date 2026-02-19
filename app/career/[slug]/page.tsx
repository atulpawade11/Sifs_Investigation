import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/config';
import CareerDetailsClient from "./CareerDetailsClient";

type Props = {
  params: Promise<{ slug: string }>; 
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Unwrapping params using await
  const { slug } = await params; 
  
  try {
    const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/career-details/${slug}`, {
      next: { revalidate: 3600 } 
    });
    const json = await response.json();

    if (json.success && json.data?.job) {
      const job = json.data.job;
      return {
        title: `${job.title} | Forensic Career | SIFS India`,
        description: job.meta_description || `Apply for the ${job.title} position at SIFS India.`,
        openGraph: {
          title: job.title,
          description: job.meta_description,
          images: ["/logo/logo.png"],
        }
      };
    }
  } catch (error) {
    console.error("Metadata fetch error for Career Detail:", error);
  }

  return { title: "Job Opportunity | SIFS India" };
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params; 
  
  return <CareerDetailsClient slug={slug} />;
}