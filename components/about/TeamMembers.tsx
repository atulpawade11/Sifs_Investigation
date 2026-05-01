"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Facebook, Twitter, Instagram, MoveRight } from "lucide-react";

// Static header data
const HEADER_DATA = {
  title: "Our Experts",
  subtitle: "Meet our Team Members"
};

// Static team members data
const STATIC_TEAM_MEMBERS = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    rank: "Senior Forensic Expert",
    slug: "dr-rajesh-kumar",
    image: "/about/expert1.png",
    linkedin: "https://linkedin.com/in/rajesh-kumar",
    facebook: "https://facebook.com/rajesh.kumar",
    twitter: "https://twitter.com/rajesh_kumar",
    content: "<p>Dr. Rajesh Kumar has over 15 years of experience in forensic investigation and has worked on numerous high-profile cases.</p>"
  },
  {
    id: 2,
    name: "Priya Sharma",
    rank: "Digital Forensics Specialist",
    slug: "priya-sharma",
    image: "/about/expert3.png",
    linkedin: "https://linkedin.com/in/priya-sharma",
    facebook: "https://facebook.com/priya.sharma",
    twitter: "https://twitter.com/priya_sharma",
    content: "<p>Priya specializes in cyber crime investigation and digital evidence analysis with 10+ years of experience.</p>"
  },
  {
    id: 3,
    name: "Vikram Singh",
    rank: "Crime Scene Investigator",
    slug: "vikram-singh",
    image: "/about/expert4.png",
    linkedin: "https://linkedin.com/in/vikram-singh",
    facebook: "https://facebook.com/vikram.singh",
    twitter: "https://twitter.com/vikram_singh",
    content: "<p>Vikram has been leading crime scene investigations for over 12 years, specializing in evidence collection and analysis.</p>"
  },
  {
    id: 4,
    name: "Neha Gupta",
    rank: "Forensic Psychologist",
    slug: "neha-gupta",
    image: "/about/expert5.jpg",
    linkedin: "https://linkedin.com/in/neha-gupta",
    facebook: "https://facebook.com/neha.gupta",
    twitter: "https://twitter.com/neha_gupta",
    content: "<p>Dr. Neha Gupta brings expertise in criminal psychology and behavioral analysis to the team.</p>"
  },
  {
    id: 5,
    name: "Amit Patel",
    rank: "Fingerprint Expert",
    slug: "amit-patel",
    image: "/about/expert2.png",
    linkedin: "https://linkedin.com/in/amit-patel",
    facebook: "https://facebook.com/amit.patel",
    twitter: "https://twitter.com/amit_patel",
    content: "<p>Amit has 8 years of specialized experience in fingerprint analysis and identification.</p>"
  },
];

const DEFAULT_IMAGE = "/team/placeholder.jpg";

export default function TeamMembers() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const members = STATIC_TEAM_MEMBERS;
  const header = HEADER_DATA;
  const INITIAL_VISIBLE_COUNT = 4;

  const visibleMembers = isExpanded ? members : members.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <section className="mx-auto container px-4 py-12 text-center">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        {/* Header with line decoration */}
        <div className="mb-4 relative">
          <div className="absolute w-full h-px bg-[#8c8c8c] opacity-60 z-0 top-3 border border-[#D9D9D9]"></div>
          <span className="text-black text-[14px] font-regular mb-2 border border-[#D9D9D9] rounded-full px-5 py-2 z-1 relative bg-white">
            {header.title}
          </span>
        </div>

        <h2 className="mb-12 text-[30px] font-semibold text-black">
          {header.subtitle}
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleMembers.map((member) => (
          <div key={member.id} className="flex flex-col">
            {/* CARD */}
            <Link
              href={`/team`}
              className="group relative overflow-hidden rounded-2xl bg-[#FFD707] block h-[320px]" 
            >
              <div className="relative h-full w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = DEFAULT_IMAGE;
                  }}
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
                      <div 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          window.open(member.linkedin, '_blank'); 
                        }} 
                        className="rounded bg-white/80 p-1 text-[#05083D] hover:bg-white cursor-pointer transition-all"
                      >
                        <Linkedin size={14} />
                      </div>
                    )}
                    {member.facebook && (
                      <div 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          window.open(member.facebook, '_blank'); 
                        }} 
                        className="rounded bg-white/80 p-1 text-[#05083D] hover:bg-white cursor-pointer transition-all"
                      >
                        <Facebook size={14} />
                      </div>
                    )}
                    {member.twitter && (
                      <div 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          window.open(member.twitter, '_blank'); 
                        }} 
                        className="rounded bg-white/80 p-1 text-[#05083D] hover:bg-white cursor-pointer transition-all"
                      >
                        <Twitter size={14} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* SHOW MORE / LESS BUTTON */}
      {members.length > INITIAL_VISIBLE_COUNT && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gradient-to-r from-[#0B10A4] to-[#04063E] text-white px-10 py-3 text-[18px] rounded-full font-bold flex items-center gap-4 cursor-pointer border-none no-underline transition-all hover:opacity-90"
          >
            {isExpanded ? (
              <>Show Less <MoveRight size={18} /></>
            ) : (
              <>View all Teams <MoveRight size={18} /></>
            )}
          </button>
        </div>
      )}
    </section>
  );
}