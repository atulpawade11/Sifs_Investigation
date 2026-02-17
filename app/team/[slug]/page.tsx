"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation"; // Import the router
import PageBanner from "@/components/common/PageBanner";
import { getTeamMembers, getTeamMemberById } from "@/services/teamService";
import { Facebook, Twitter, Instagram, Linkedin, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

export default function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter(); // Initialize router
  const resolvedParams = use(params);
  const idFromUrl = resolvedParams.slug;

  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await getTeamMemberById(idFromUrl);

        if (res && !res.fallback && res.data?.member) {
          setMember(res.data.member);
        } else {
          const listRes = await getTeamMembers();
          const found = listRes.data?.members?.find((m: any) => m.id.toString() === idFromUrl.toString());
          if (found) {
            setMember(found);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [idFromUrl]);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-900" size={40} /></div>;
  if (error || !member) return <div className="h-screen flex flex-col items-center justify-center"><AlertCircle className="text-red-500 mb-2" /><p>Expert Not Found (ID: {idFromUrl})</p></div>;

  return (
    <main className="bg-white min-h-screen pb-20">
      <PageBanner title={member.name} subtitle={member.rank} bgImage="/about/about-banner.png" />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* --- BACK BUTTON --- */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Team</span>
        </button>

        <div className="bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 shadow-xl">
          <div className="lg:w-1/3 bg-gray-50 p-8 text-center border-r border-gray-100">
            <img 
              src={`http://forensicinstitute.in/uploads/Investigation-Services-Admin-Member/${member.image}`} 
              alt={member.name}
              className="w-64 h-64 object-cover rounded-2xl shadow-lg border-4 border-white mx-auto mb-6 bg-white"
            />
            <h2 className="text-2xl font-bold">{member.name}</h2>
            <p className="text-blue-900 font-bold text-xs uppercase mt-2">{member.rank}</p>
            <p className="text-gray-500 text-sm mt-2">{member.education}</p>
            <div className="flex justify-center gap-4 mt-6">
               {member.facebook && <a href={member.facebook} target="_blank" className="text-gray-400 hover:text-blue-600"><Facebook size={20}/></a>}
               {member.linkedin && <a href={member.linkedin} target="_blank" className="text-gray-400 hover:text-blue-700"><Linkedin size={20}/></a>}
               {member.instagram && <a href={member.instagram} target="_blank" className="text-gray-400 hover:text-pink-600"><Instagram size={20}/></a>}
            </div>
          </div>

          <div className="lg:w-2/3 p-8 lg:p-16">
            <h3 className="text-xl font-bold mb-6 border-b pb-2">Professional Biography</h3>
            <div 
              className="prose prose-slate max-w-none text-gray-700 text-justify"
              dangerouslySetInnerHTML={{ __html: member.about }} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}