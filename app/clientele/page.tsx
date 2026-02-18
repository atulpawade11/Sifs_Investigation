import ClientelePortfolio from "@/components/common/ClientelePortfolio";
import PageBanner from "@/components/common/PageBanner";
import { API_BASE_URL } from "@/lib/config";

async function getPortfolioSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, {
      next: { revalidate: 3600 } // Cache data for 1 hour
    });
    const result = await res.json();
    
    if (result.success && result.data?.bs) {
      return {
        title: result.data.bs.portfolio_title || "Our Clientele",
        subtitle: result.data.bs.portfolio_subtitle || "Satisfied Clients’ Portfolio",
        // If there's a specific background image in 'bs', use it here
        bgImage: result.data.bs.portfolio_banner || "/images/default-clientele-bg.jpg"
      };
    }
  } catch (error) {
    console.error("Failed to fetch portfolio settings:", error);
  }

  // Fallback data
  return {
    title: "Our Clientele",
    subtitle: "Satisfied Clients’ Portfolio",
    bgImage: "/images/default-clientele-bg.jpg"
  };
}

export default async function ClientelePage() {
  const settings = await getPortfolioSettings();

  return (
    <main>
      {/* Dynamic Banner using 'bs' data from Home API */}
      <PageBanner 
        title={settings.title} 
        subtitle={settings.subtitle} 
        bgImage={settings.bgImage} 
      />
      
      {/* Existing Client-Side Component */}
      <ClientelePortfolio />
    </main>
  );
}