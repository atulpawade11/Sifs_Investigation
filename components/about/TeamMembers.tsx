"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Facebook, Twitter, Instagram, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";

const IMAGE_BASE_URL = "http://forensicinstitute.in/uploads/Investigation-Services-Admin-Member/";

export default function TeamMembers() {
  const [members, setMembers] = useState<any[]>([]);
  const [header, setHeader] = useState({ title: "Our Experts", subtitle: "Meet our Team Members" });
  const [loading, setLoading] = useState(true);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_VISIBLE_COUNT = 4; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, teamRes] = await Promise.all([
          fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`).then(res => res.json()),
          fetch(`${API_BASE_URL}/InvestigationServices/Website/front/team`).then(res => res.json())
        ]);

        if (homeRes.success && homeRes.data?.bs) {
          setHeader({
            title: homeRes.data.bs.team_title || "Our Experts",
            subtitle: homeRes.data.bs.team_subtitle || "Meet our Team Members"
          });
        }
        if (teamRes.success) setMembers(teamRes.data.members || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-blue-900" size={40} /></div>;

  const visibleMembers = isExpanded ? members : members.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 text-center">
      <div className="mb-4 inline-flex rounded-full border px-4 py-1 text-xs font-medium text-gray-600">
        {header.title}
      </div>

      <h2 className="mb-12 text-2xl font-semibold text-black">
        {header.subtitle}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleMembers.map((member) => (
          <div key={member.id} className="flex flex-col">
            {/* CARD */}
            <Link
              href={`/team/${member.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-[#FFD707] block h-[320px]" 
            >
              <div className="relative h-full w-full">
                <Image
                  src={member.image.startsWith('http') ? member.image : `${IMAGE_BASE_URL}${member.image}`}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05083D] via-[#05083D]/70 to-transparent" />
              </div>

              {/* REVEAL ZONE */}
              <div className="absolute bottom-0 w-full overflow-hidden h-[96px]">
                <div className="translate-y-[15px] transition-transform duration-300 ease-out group-hover:translate-y-[-20px]">
                  <div className="p-4 text-left text-white">
                    <h4 className="text-[20px] font-semibold leading-tight">{member.name}</h4>
                    <p className="text-[14px] font-regular text-white/80">{member.rank}</p>
                  </div>

                  <div className="flex gap-3 px-4 pb-4">
                    {member.linkedin && (
                      <div onClick={(e) => { e.preventDefault(); window.open(member.linkedin, '_blank'); }} className="rounded bg-white/80 p-1 text-[#05083D] hover:bg-white cursor-pointer">
                        <Linkedin size={14} />
                      </div>
                    )}
                    {member.facebook && (
                      <div onClick={(e) => { e.preventDefault(); window.open(member.facebook, '_blank'); }} className="rounded bg-white/80 p-1 text-[#05083D] hover:bg-white cursor-pointer">
                        <Facebook size={14} />
                      </div>
                    )}
                    {member.twitter && (
                      <div onClick={(e) => { e.preventDefault(); window.open(member.twitter, '_blank'); }} className="rounded bg-white/80 p-1 text-[#05083D] hover:bg-white cursor-pointer">
                        <Twitter size={14} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>

            {/* VIEW DETAILS TEXT LINK */}
            <Link 
              href={`/team/${member.slug}`}
              className="mt-3 text-left text-[13px] font-bold text-[#05083D] hover:text-blue-600 transition-colors inline-flex items-center gap-1 group/link"
            >
              View Details 
              <span className="transition-transform group-hover/link:translate-x-1">→</span>
            </Link>
          </div>
        ))}
      </div>

      {/* SHOW MORE / LESS BUTTON */}
      {members.length > INITIAL_VISIBLE_COUNT && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-10 py-3 bg-[#05083D] text-white rounded-full font-bold text-sm hover:bg-[#FFD707] hover:text-[#05083D] transition-all duration-300 shadow-md"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={18} /></>
            ) : (
              <>Show More <ChevronDown size={18} /></>
            )}
          </button>
        </div>
      )}
    </section>
  );
}