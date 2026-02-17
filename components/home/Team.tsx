"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '@/lib/config';

interface TeamMember {
  id: number;
  name: string;
  rank: string;
  image: string;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
  slug: string;
}

const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [content, setContent] = useState({
    title: "Team Members",
    subtitle: "Meet Forensic Experts"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`);
        const result = await response.json();

        if (result.success && result.data) {
          const bs = result.data.bs;
          
          setContent({
            title: bs.team_section_title || "Team Members",
            subtitle: bs.team_section_subtitle || "Meet Forensic Experts"
          });

          if (result.data.members) {
            setMembers(result.data.members.slice(0, 5));
          }
        }
      } catch (err) {
        console.error('Error fetching Team data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading || members.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-[#FF8C00] font-medium italic mb-2">
              {content.title}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#04063E]">
              {content.subtitle}
            </h2>
          </div>
          <Link 
            href="/team"
            className="bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                        text-white px-8 py-3 rounded-full font-bold
                        flex items-center gap-4
                        hover:from-[#1217c0] hover:to-[#0a0f6b]
                        transition-all group"
          >
            View All Teams 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Team Grid adjusted for 5 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col">
              
              {/* Image Container */}
              <div className="relative w-full aspect-square rounded-[32px] overflow-hidden mb-6 group">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* Identity & Socials */}
              <div className="space-y-1 mb-4">
                <h3 className="text-xl font-bold text-black line-clamp-1">{member.name}</h3>
                <p className="text-[#525252] text-[10px] font-medium uppercase tracking-wider line-clamp-2 min-h-[32px]">
                  {member.rank}
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {member.facebook && (
                  <a href={member.facebook} target="_blank" className="p-2 border border-gray-200 rounded-full text-black hover:text-[#FF8C00] hover:border-[#FF8C00] transition-all">
                    <Facebook size={14} />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" className="p-2 border border-gray-200 rounded-full text-black hover:text-[#FF8C00] hover:border-[#FF8C00] transition-all">
                    <Twitter size={14} />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" className="p-2 border border-gray-200 rounded-full text-black hover:text-[#FF8C00] hover:border-[#FF8C00] transition-all">
                    <Linkedin size={14} />
                  </a>
                )}
                {member.instagram && (
                  <a href={member.instagram} target="_blank" className="p-2 border border-gray-200 rounded-full text-black hover:text-[#FF8C00] hover:border-[#FF8C00] transition-all">
                    <Instagram size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;