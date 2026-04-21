"use client";

import Link from "next/link";
import { 
  Briefcase,
  UserPlus,
  Users,
  Search,
  Microscope,
  LucideIcon 
} from "lucide-react";

// Map categories to icons
const categoryIconMap: Record<string, LucideIcon> = {
  "Junior Forensic Expert": UserPlus,
  "Senior Forensic Expert": Users,
  "Crime Scene Investigator": Search,
  "Forensic Expert": Microscope,
};

// Default icon for any other category
const DefaultIcon = Briefcase;

// Optional: Different colors per category
const categoryColorMap: Record<string, string> = {
  "Junior Forensic Expert": "bg-blue-600",
  "Senior Forensic Expert": "bg-purple-600",
  "Crime Scene Investigator": "bg-green-600",
  "Forensic Expert": "bg-indigo-600",
};

const DefaultColor = " bg-[#0B10A4]";

export default function JobCard({ job }: { job: any }) {
  // Get the icon for this job's category
  const CategoryIcon = categoryIconMap[job.category_name] || DefaultIcon;
  const bgColor = categoryColorMap[job.category_name] || DefaultColor;

  return (
    <Link href={`/career/${job.slug}`} className="block transition-all hover:translate-y-[-2px]">
      <div className="flex items-center justify-between gap-2 rounded-xl border border-[#D9D9D9] bg-[#FAFAFA] px-5 py-4 hover:shadow-md transition-shadow">
        
        {/* LEFT */}
        <div className="flex items-start gap-4">
          {/* Icon Circle - Replaced Image with Icon */}
          <div className={`flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-full ${bgColor}`}>
            <CategoryIcon className="w-6 h-6 text-white" />
          </div>

          <div>
            <h4 className="text-[20px] font-semibold text-black leading-tight">
              {job.title}
            </h4>

            <div className="mt-1 text-[12px] font-light text-black">
              <span className="font-semibold block text-[#0B10A4] uppercase text-[10px] tracking-wider">
                {job.category_name}
              </span>
              {job.job_location} | {job.employment_status}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-right flex flex-col items-end">
          <span className="inline-block rounded border border-dashed border-[#898989] px-2 py-0.5 text-[14px] font-semibold text-black">
            Exp: {job.experience || "N/A"}
          </span>

          <p className="mt-2 text-[12px] text-black">
            Deadline: {job.deadline}
          </p>
        </div>
      </div>
    </Link>
  );
}