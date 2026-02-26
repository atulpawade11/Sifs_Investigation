import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/config';
import CareerClient from "./CareerClient";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/career/`, {
      cache: 'no-store' // Changed from next.revalidate to no-store
    });
    const result = await response.json();

    if (result.success && result.data?.be) {
      const seo = result.data.be;
      return {
        title: seo.career_meta_title || "Forensic Science Jobs | SIFS India",
        description: seo.career_meta_description || "Explore career opportunities in forensic science",
        keywords: seo.career_meta_keywords || "forensic jobs, career in forensic science",
        openGraph: {
          title: seo.career_meta_title || "Forensic Science Jobs | SIFS India",
          description: seo.career_meta_description || "Explore career opportunities in forensic science",
          images: ["/logo/logo.png"],
        }
      };
    }
  } catch (error) {
    console.error("Metadata fetch error for Careers:", error);
  }
  
  return { 
    title: "Forensic Science Jobs | SIFS India",
    description: "Explore career opportunities in forensic science"
  };
}

async function getCareerData() {
  try {
    const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/career/`, {
      cache: 'no-store' // Disable caching for large response
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Log data size for debugging
    console.log('Career API response size:', JSON.stringify(result).length, 'bytes');
    
    return {
      success: result.success || false,
      data: result.data?.careers || result.data || [],
      be: result.data?.be || {},
      jcats: result.data?.jcats || []
    };
    
  } catch (error) {
    console.error("Error fetching career data:", error);
    return { 
      success: false, 
      data: [], 
      be: {}, 
      jcats: [] 
    };
  }
}

export default async function CareerPage() {
  const initialData = await getCareerData();
  
  return <CareerClient initialData={initialData} />;
}