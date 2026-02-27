import { Metadata } from 'next';
import { Suspense } from 'react';
import ClientelePortfolio from "@/components/common/ClientelePortfolio";
import PageBanner from "@/components/common/PageBanner";
import { API_BASE_URL } from "@/lib/config";
import { Skeleton } from "@/components/shared/Skeleton";
import { useBoot } from "@/context/BootContext";

// SEO Logic
export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, { next: { revalidate: 3600 } });
    const result = await response.json();
    if (result.success && result.data?.be) {
      return {
        title: result.data.be.portfolios_meta_title,
        description: result.data.be.portfolios_meta_description,
      };
    }
  } catch (e) { console.error(e); }
  return { title: "SIFS India Clientele" };
}

async function getPortfolioSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, { next: { revalidate: 3600 } });
    const result = await res.json();
    if (result.success && result.data?.bs) {
      return {
        title: result.data.bs.portfolio_title || "Our Clientele",
        subtitle: result.data.bs.portfolio_subtitle || "Satisfied Clients",
        bgImage: result.data.bs.portfolio_banner || "/about/about-banner.png",
        breadcrumbImage: result.data.bs.breadcrumb || null,
      };
    }
  } catch (e) { console.error(e); }
  return { title: "Our Clientele", subtitle: "Portfolio", bgImage: "/about/about-banner.png", breadcrumbImage: null, };
}

// Internal Skeleton for this page
function LocalSkeletonGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center p-8 bg-white rounded-3xl border border-gray-100 space-y-4">
            <Skeleton className="w-24 h-24 rounded-2xl bg-gray-100" />
            <Skeleton className="h-4 w-3/4 rounded-md bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ClientelePage() {
  const settings = await getPortfolioSettings();
  

  return (
    <main className="bg-white min-h-screen">
      <PageBanner 
        title={settings.title} 
        subtitle={settings.subtitle} 
        breadcrumbImage={settings.breadcrumbImage}
      />
      
      {/* If ClientelePortfolio is a Client Component with a useEffect, 
          it needs to handle the loading state internally.
      */}
      <Suspense fallback={<LocalSkeletonGrid />}>
        <ClientelePortfolio />
      </Suspense>
    </main>
  );
}