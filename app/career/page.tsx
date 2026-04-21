import { Metadata } from 'next';
import { API_BASE_URL } from '@/lib/config';
import CareerClient from "./CareerClient";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/career/`, {
      cache: 'no-store'
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
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    console.log('Career API response structure:', {
      hasData: !!result.data,
      hasCareers: !!result.data?.careers,
      dataKeys: result.data ? Object.keys(result.data) : []
    });
    
    // Return the data in the exact structure expected by the client
    if (result.success && result.data) {
      return {
        success: result.success,
        data: result.data.careers || result.data.data || [],
        be: result.data.be || {},
        jcats: result.data.jcats || []
      };
    }
    
    return { 
      success: false, 
      data: [], 
      be: {}, 
      jcats: [] 
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
  
  console.log('Initial data loaded:', {
    hasData: initialData.data?.length > 0,
    dataLength: initialData.data?.length,
    categoriesCount: initialData.jcats?.length
  });
  
  return <CareerClient initialData={initialData} />;
}