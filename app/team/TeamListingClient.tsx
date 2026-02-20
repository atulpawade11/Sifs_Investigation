"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageBanner from "@/components/common/PageBanner";
import { getTeamMembers } from "@/services/teamService";
import { Skeleton } from "@/components/shared/Skeleton";

export default function TeamListingClient() {
  const [members, setMembers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCatId, setActiveCatId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getTeamMembers();
        if (res.success) {
          setMembers(res.data.members);
          setCategories(res.data.team_categories);
        }
      } catch (err) {
        console.error("Team load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredMembers = activeCatId 
    ? members.filter((m: any) => m.team_category_id === activeCatId)
    : members;

  // --- TEAM SKELETON ---
  const TeamSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Skeleton */}
      <aside className="w-full md:w-64">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
          <Skeleton className="h-6 w-1/2 mb-4" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </div>
      </aside>

      {/* Grid Skeleton */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            <Skeleton className="aspect-[4/5] w-full" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-5 w-3/4 mx-auto" />
              <Skeleton className="h-3 w-1/2 mx-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="bg-gray-50 min-h-screen">
      <PageBanner title="Our Experts" subtitle="SIFS India Team" bgImage="/about/about-banner.png" />

      {loading ? (
        <TeamSkeleton />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold mb-4 border-b pb-2 text-[#04063E]">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setActiveCatId(null)} 
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${!activeCatId ? 'bg-[#0B10A4] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    All Members
                  </button>
                </li>
                {categories.map((cat: any) => (
                  <li key={cat.id}>
                    <button onClick={() => setActiveCatId(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${activeCatId === cat.id ? 'bg-[#0B10A4] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member: any) => (
              <Link href={`/team/${member.id}`} key={member.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                    <img 
                      src={`https://forensicinstitute.in/uploads/Investigation-Services-Admin-Member/${member.image}`} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="font-bold text-gray-900 group-hover:text-[#0B10A4] transition-colors">{member.name}</h4>
                    <p className="text-[#96C11F] text-[10px] font-black uppercase tracking-widest mt-1">{member.rank}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}