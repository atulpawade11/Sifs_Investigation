"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Loader2, Linkedin, Facebook, Twitter, Instagram } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";

export default function TeamDetails({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the slug from the dynamic route params
  const { slug } = use(params);
  
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/team/${slug}`);
        const result = await res.json();
        
        // Mapping based on your provided JSON structure
        if (result.success && result.data?.member) {
          setMember(result.data.member);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  // Loading State
  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-[#05083D]" size={40} />
    </div>
  );

  // Error State
  if (!member) return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <p className="text-gray-500 font-bold">Expert Profile Not Found</p>
      <Link href="/about" className="text-blue-600 underline">Return to About</Link>
    </div>
  );

  return (
    <main className="bg-white min-h-screen">
      {/* NAVIGATION */}
      <nav className="border-b border-gray-100 py-6">
        <div className="mx-auto max-w-7xl px-4">
          <Link href="/about" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#05083D] font-bold text-sm transition-colors">
            <ChevronLeft size={18} /> Back to About
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* LEFT SIDE: Sidebar (30% approx) */}
          <aside className="w-full md:w-[32%]">
            <div className="sticky top-10">
              {/* Image Guard: Prevents "" src error */}
              <div className="relative aspect-[4/5] w-full rounded-[24px] overflow-hidden bg-[#FFD707] mb-6 shadow-lg">
                {member.image ? (
                  <Image 
                    src={member.image} 
                    alt={member.name || "Team Member"} 
                    fill 
                    className="object-cover" 
                    unoptimized 
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
                    No Image Available
                  </div>
                )}
              </div>
              
              <div className="bg-[#05083D] text-white rounded-[24px] p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-1 leading-tight">{member.name}</h2>
                <p className="text-[#FFD707] font-semibold text-xs uppercase tracking-widest mb-6">
                  {member.rank}
                </p>

                {member.education && (
                  <div className="mb-8">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Education</h5>
                    <p className="text-sm text-white/90 leading-relaxed font-medium">
                      {member.education}
                    </p>
                  </div>
                )}
                
                {/* SOCIAL LINKS */}
                <div className="flex gap-3">
                  {member.facebook && (
                    <Link href={member.facebook} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-[#FFD707] hover:text-[#05083D] transition-all">
                      <Facebook size={18} />
                    </Link>
                  )}
                  {member.linkedin && (
                    <Link href={member.linkedin} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-[#FFD707] hover:text-[#05083D] transition-all">
                      <Linkedin size={18} />
                    </Link>
                  )}
                  {member.twitter && (
                    <Link href={member.twitter} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-[#FFD707] hover:text-[#05083D] transition-all">
                      <Twitter size={18} />
                    </Link>
                  )}
                  {member.instagram && (
                    <Link href={member.instagram} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-[#FFD707] hover:text-[#05083D] transition-all">
                      <Instagram size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: Content (70% approx) */}
          <div className="w-full md:w-[68%]">
            <h1 className="text-5xl font-black text-[#05083D] mb-4 tracking-tight">
              {member.name}
            </h1>
            <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-sm mb-12">
              {member.rank}
            </p>
            
            <div className="prose prose-slate max-w-none prose-lg">
              {/* Biography rendering with custom styling */}
              <div 
                className="text-slate-700 leading-relaxed text-justify biography-render"
                dangerouslySetInnerHTML={{ __html: member.about }} 
              />
            </div>
          </div>

        </div>
      </section>

      {/* GLOBAL CSS: Ensures API content is visible and well-spaced */}
      <style jsx global>{`
        .biography-render p {
          margin-bottom: 1.5rem;
          color: #334155 !important;
        }
        .biography-render b, .biography-render strong {
          color: #05083D !important;
          font-weight: 800;
        }
        .biography-render div {
          text-align: justify;
        }
      `}</style>
    </main>
  );
}