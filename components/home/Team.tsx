"use client";

import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';

const experts = [
  {
    name: "Dr. Ranjeet Kr Singh",
    role: "Managing Director",
    image: "/expert1.png", // Use transparent PNGs
  },
  {
    name: "Preeti Shah",
    role: "Director Digital Marketing | Sr. Graphologist",
    image: "/expert2.png",
  },
  {
    name: "Niharika Mishra",
    role: "Managing Director",
    image: "/expert3.png",
  },
  {
    name: "Michael W Streed",
    role: "Forensic Artist",
    image: "/expert4.png",
  }
];

const Team = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-10">
        
        {/* Header with "View All" Button */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-[#FF8C00] font-medium italic mb-2">Team Members</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#04063E]">Meet Forensic Experts</h2>
          </div>
          <button className="bg-gradient-to-r from-[#0B10A4] to-[#04063E]
                        text-white px-8 py-3 rounded-full font-bold
                        flex items-center gap-4
                        hover:from-[#1217c0] hover:to-[#0a0f6b]
                        transition-all group">
            View All Teams <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((member, index) => (
            <div key={index} className="flex flex-col">
              
              {/* Image Container with Orange Background */}
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
                <h3 className="text-xl font-bold text-black">{member.name}</h3>
                <p className="text-[#525252] text-xs font-medium uppercase tracking-wider">{member.role}</p>
              </div>

              <div className="flex items-center gap-3">
                <a href="#" className="p-2 border border-gray-200 rounded-full text-black hover:text-[#FF8C00] hover:border-[#FF8C00] transition-all">
                  <Facebook size={16} />
                </a>
                <a href="#" className="p-2 border border-gray-200 rounded-full text-black hover:text-[#FF8C00] hover:border-[#FF8C00] transition-all">
                  <Twitter size={16} />
                </a>
                <a href="#" className="p-2 border border-gray-200 rounded-full text-black hover:text-[#FF8C00] hover:border-[#FF8C00] transition-all">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;