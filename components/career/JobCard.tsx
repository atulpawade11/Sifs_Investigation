"use client";

import Image from "next/image";
import Link from "next/link";

export default function JobCard({ job }: { job: any }) {
  return (
    <Link href={`/career/${job.slug}`} className="block transition-all hover:translate-y-[-2px]">
      <div className="flex items-center justify-between gap-2 rounded-xl border border-[#D9D9D9] bg-[#FAFAFA] px-5 py-4">
        
        {/* LEFT */}
        <div className="flex items-start gap-4">
          <div className="flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-full bg-[#0B10A4]">
            <Image
              src={job.image || "/hero-banner.png"}
              alt={job.title}
              width={26}
              height={26}
              className="object-contain"
            />
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