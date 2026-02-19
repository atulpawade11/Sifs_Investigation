import { Metadata } from 'next';
import ClientelePortfolio from "@/components/common/ClientelePortfolio";
import PageBanner from "@/components/common/PageBanner";
import { API_BASE_URL } from "@/lib/config";

// --- SEO Metadata Generation ---
export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, {
      next: { revalidate: 3600 }
    });
    const result = await response.json();

    if (result.success && result.data?.be) {
      const seo = result.data.be;
      return {
        title: seo.portfolios_meta_title,
        description: seo.portfolios_meta_description,
        keywords: seo.portfolios_meta_keywords,
        openGraph: {
          title: seo.portfolios_meta_title,
          description: seo.portfolios_meta_description,
          images: ["/logo/logo.png"],
        }
      };
    }
  } catch (error) {
    console.error("Metadata fetch error for Clientele:", error);
  }

  return { title: "SIFS India Clientele | Success Stories" };
}

// --- Data Fetching for UI Settings ---
async function getPortfolioSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, {
      next: { revalidate: 3600 }
    });
    const result = await res.json();
    
    if (result.success && result.data?.bs) {
      return {
        title: result.data.bs.portfolio_title || "Our Clientele",
        subtitle: result.data.bs.portfolio_subtitle || "Satisfied Clients’ Portfolio",
        // Fallback to your standard banner if API image is missing
        bgImage: result.data.bs.portfolio_banner || "/about/about-banner.png"
      };
    }
  } catch (error) {
    console.error("Failed to fetch portfolio settings:", error);
  }

  return {
    title: "Our Clientele",
    subtitle: "Satisfied Clients’ Portfolio",
    bgImage: "/about/about-banner.png"
  };
}

export default async function ClientelePage() {
  const settings = await getPortfolioSettings();

  return (
    <main>
      <PageBanner 
        title={settings.title} 
        subtitle={settings.subtitle} 
        bgImage={settings.bgImage} 
      />
      
      <ClientelePortfolio />
    </main>
  );
}