"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronDown, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";
import { Skeleton } from "@/components/shared/Skeleton";

// --- PROFESSIONAL CATEGORY MAPPING ---
const SECTOR_NAME_MAP: Record<string, string> = {
  "1": "Courts",
  "2": "Govt Dept",
  "3": "State Police",
  "4": "Insurance Sector",
  "5": "Indian Bank",
  "6": "Corporates",
  "7": "Law Firms",
  "8": "Detectives",
  "9": "Others"
};

export default function ClientelePortfolio() {
  const [activeTab, setActiveTab] = useState("All");
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [header, setHeader] = useState({ title: "OUR CLIENTELE", subtitle: "Satisfied Clients’ Portfolio" });

  useEffect(() => {
    const initFetch = async () => {
      try {
        const [mainRes, portRes] = await Promise.all([
          fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`).then(res => res.json()),
          fetch(`${API_BASE_URL}/InvestigationServices/Website/front/portfolios`).then(res => res.json())
        ]);

        if (mainRes.success && mainRes.data?.bs) {
          setHeader({
            title: mainRes.data.bs.portfolio_title || "OUR CLIENTELE",
            subtitle: mainRes.data.bs.portfolio_subtitle || "Satisfied Clients’ Portfolio"
          });
        }

        if (portRes.success && portRes.data) {
          const portData = portRes.data.data || [];
          setPortfolios(portData);
          setNextPageUrl(portRes.data.next_page_url || null);

          const uniqueIds = Array.from(new Set(portData.map((p: any) => p.client_category_id)));
          const mappedCats = uniqueIds.map(id => ({
            id: String(id),
            name: SECTOR_NAME_MAP[String(id)] || `Sector ${id}`
          }));

          const preferredOrder = ["Courts", "Govt Dept", "State Police", "Insurance Sector", "Indian Bank", "Corporates", "Law Firms", "Detectives", "Others"];
          mappedCats.sort((a, b) => preferredOrder.indexOf(a.name) - preferredOrder.indexOf(b.name));
          setCategories(mappedCats);
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    initFetch();
  }, []);

  const PortfolioSkeleton = () => (
    <section className="mx-auto max-w-7xl px-4 py-20 bg-white">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 h-fit">
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        </aside>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 relative z-10">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className="h-[130px] w-full rounded-3xl" />
          ))}
        </div>
      </div>
    </section>
  );

  const handleLoadMore = async () => {
    if (!nextPageUrl || loadMoreLoading) return;
    setLoadMoreLoading(true);
    try {
      const res = await fetch(nextPageUrl).then(r => r.json());
      if (res.success && res.data?.data) {
        setPortfolios(prev => [...prev, ...res.data.data]);
        setNextPageUrl(res.data.next_page_url || null);
      }
    } catch (err) { console.error(err); } finally { setLoadMoreLoading(false); }
  };

  const filteredLogos = portfolios.filter((p) => {
    if (activeTab === "All") return true;
    const currentCat = categories.find(c => c.name === activeTab);
    return currentCat ? String(p.client_category_id) === String(currentCat.id) : false;
  });

  if (loading) return <PortfolioSkeleton />;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:py-12 bg-white min-h-screen">
      <div className="text-center mb-6">
        <p className="text-[#04063E] font-medium mb-2">{header.title}</p>
        {/* <p className="mb-4 inline-flex rounded-full border px-4 py-1 text-xs font-medium text-gray-600">{header.title}</p> */}
        <h4 className="mb-12 text-2xl font-semibold text-black">{header.subtitle}</h4>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
        
        {/* SIDEBAR - Filter Navigation */}
        <aside className="lg:sticky lg:top-24 z-30">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <h5 className="px-4 mb-4 font-bold uppercase tracking-widest text-sm text-black">Filters</h5>
            <ul className="space-y-1 text-sm">
              <li>
                <button 
                  onClick={() => setActiveTab("All")} 
                  className={`relative flex w-full items-center rounded-lg px-4 py-3 transition text-[15px] ${activeTab === "All" ? "bg-gray-100 font-bold text-[#04063E]" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  {activeTab === "All" && <span className="absolute left-0 top-2 h-8 w-[4px] rounded-r bg-[#1C274C]" />}
                  All Portfolios
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => setActiveTab(cat.name)} 
                    className={`relative flex w-full items-center rounded-lg text-[15px] px-4 py-3 transition ${activeTab === cat.name ? "bg-gray-100 font-bold text-[#04063E]" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    {activeTab === cat.name && <span className="absolute left-0 top-2 h-8 w-[4px] rounded-r bg-[#1C274C]" />}
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* LOGO GRID AREA */}
        <div className="relative min-h-[400px]">
          
          
          {/* BACKGROUND DECORATIVE BADGE - Sent to back 
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 lg:opacity-0">
             <div className="h-[280px] w-[280px] md:h-[350px] md:w-[350px] rounded-full border border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-8 bg-white/10 backdrop-blur-[2px]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-800 mb-2">{header.title}</p>
                <h4 className="text-xl md:text-2xl font-black text-black leading-tight">{header.subtitle}</h4>
              </div>
          </div>*/}

          {/* GRID OF LOGOS - Foreground */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 w-full relative z-10">
            {filteredLogos.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)} 
                className="group flex h-[140px] cursor-pointer items-center justify-center rounded-3xl bg-white/90 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 backdrop-blur-md"
              >
                <div className="relative h-16 w-32 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105">
                  <Image src={item.featured_image} alt={item.title} fill className="object-contain p-2" unoptimized />
                </div>
              </div>
            ))}
          </div>

          {/* VIEW MORE BUTTON */}
          {nextPageUrl && (
            <div className="mt-16 flex justify-center relative z-20">
              <button 
                onClick={handleLoadMore} 
                disabled={loadMoreLoading} 
                className="group flex items-center gap-3 px-10 py-4 bg-[#04063E] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#0B10A4] transition-all shadow-xl disabled:opacity-50"
              >
                {loadMoreLoading ? <Loader2 className="animate-spin" /> : <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />}
                {loadMoreLoading ? "Loading..." : "View More Clients"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DETAIL MODAL (30:70 Split) */}
      {selectedItem && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-fit max-h-[90vh] animate-in zoom-in-95 duration-300">
            {/* Sidebar (30%) */}
            <div className="w-full md:w-[32%] bg-gray-50 p-8 md:p-12 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-100">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-3xl shadow-lg p-6 mb-6 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image src={selectedItem.featured_image} alt="Client Logo" fill className="object-contain" unoptimized />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-black text-[#020433] uppercase">{selectedItem.title}</h3>
            </div>
            {/* Content (70%) */}
            <div className="w-full md:w-[68%] p-8 md:p-16 overflow-y-auto bg-white relative">
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-6 right-6 md:top-10 md:right-10 p-2 hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={24} className="text-gray-400" />
              </button>
              <div className="prose prose-slate max-w-none prose-img:rounded-xl">
                <div className="text-gray-600 text-base md:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedItem(null)} />
        </div>
      )}
    </section>
  );
}