"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Facebook, Twitter } from "lucide-react";

interface SocialLinks {
  linkedin: string;
  facebook: string;
  twitter: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  social: SocialLinks;
}

const team: TeamMember[] = [
  {
    name: "Dr. Ranjeet Kr Singh",
    role: "Managing Director",
    image: "/about/expert1.png",
    social: { linkedin: "#", facebook: "#", twitter: "#" },
  },
  {
    name: "Niharika Mishra",
    role: "Managing Director",
    image: "/about/expert2.png",
    social: { linkedin: "#", facebook: "#", twitter: "#" },
  },
  {
    name: "Michael W Streed",
    role: "Forensic Artist",
    image: "/about/expert3.png",
    social: { linkedin: "#", facebook: "#", twitter: "#" },
  },
  {
    name: "Afreen Tarannum",
    role: "Senior Scientific Officer",
    image: "/about/expert4.png",
    social: { linkedin: "#", facebook: "#", twitter: "#" },
  },
];

export default function TeamMembers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 text-center">
      <div className="mb-4 inline-flex rounded-full border px-4 py-1 text-xs font-medium text-gray-600">
        Our Experts
      </div>

      <h2 className="mb-12 text-2xl font-semibold text-black">
        Meet our Team Members
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="group relative overflow-hidden rounded-2xl"
          >
            {/* IMAGE */}
            <div className="relative h-[320px] w-full">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05083D] via-[#05083D]/70 to-transparent" />
            </div>

            {/* REVEAL ZONE */}
            <div className="absolute bottom-0 w-full overflow-hidden h-[96px]">
              <div
                className="
                  translate-y-[15px]
                  transition-transform
                  duration-300
                  ease-out
                  group-hover:translate-y-[-20px]
                "
              >
                {/* TEXT */}
                <div className="p-4 text-left text-white">
                  <h4 className="text-[20px] font-semibold">{member.name}</h4>
                  <p className="text-[14px] font-regular text-white/80">{member.role}</p>
                </div>

                {/* ICONS (HIDDEN BELOW INITIALLY) */}
                <div className="flex gap-3 px-4 pb-4">
                  <Link href={member.social.linkedin} className="rounded bg-white/80 p-1">
                    <Linkedin size={14} />
                  </Link>
                  <Link href={member.social.facebook} className="rounded bg-white/80 p-1">
                    <Facebook size={14} />
                  </Link>
                  <Link href={member.social.twitter} className="rounded bg-white/80 p-1">
                    <Twitter size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
