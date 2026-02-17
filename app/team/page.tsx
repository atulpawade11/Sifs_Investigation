"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageBanner from "@/components/common/PageBanner";
import { getTeamMembers } from "@/services/teamService";

export default function TeamListingPage() {
  const [members, setMembers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCatId, setActiveCatId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getTeamMembers();
      if (res.success) {
        setMembers(res.data.members);
        setCategories(res.data.team_categories);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Filter logic using team_category_id from your JSON
  const filteredMembers = activeCatId 
    ? members.filter((m: any) => m.team_category_id === activeCatId)
    : members;

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="bg-gray-50 min-h-screen">
      <PageBanner title="Our Experts" subtitle="SIFS India Team" bgImage="/about/about-banner.png" />

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Dynamic Sidebar Categories */}
        <aside className="w-full md:w-64">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 sticky top-24">
            <h3 className="font-bold mb-4 border-b pb-2">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveCatId(null)} 
                  className={`w-full text-left px-3 py-2 rounded ${!activeCatId ? 'bg-blue-900 text-white' : 'hover:bg-gray-100'}`}>
                  All Members
                </button>
              </li>
              {categories.map((cat: any) => (
                <li key={cat.id}>
                  <button onClick={() => setActiveCatId(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded ${activeCatId === cat.id ? 'bg-blue-900 text-white' : 'hover:bg-gray-100'}`}>
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Members Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member: any) => (
            <Link href={`/team/${member.id}`} key={member.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                  <img 
                    src={`http://forensicinstitute.in/uploads/Investigation-Services-Admin-Member/${member.image}`} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-bold text-gray-900">{member.name}</h4>
                  <p className="text-blue-700 text-xs font-bold uppercase">{member.rank}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}