"use client";

import Image from "next/image";
import { Job } from "../../data/jobs";

type Props = {
  job: Job;
};

export default function JobCard({ job }: Props) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-[#D9D9D9] bg-[#FAFAFA] px-5 py-4">
      
      {/* LEFT */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-full bg-[#0B10A4]">
          <Image
            src={job.icon}
            alt={job.title}
            width={26}
            height={26}
          />
        </div>

        {/* Content */}
        <div>
          <h4 className="text-[20px] font-semibold text-black">
            {job.title}
          </h4>

          <p className="mt-1 text-[12px] font-light text-black">
            <span className="font-semibold block">
              Educational Experience:
            </span>
            {job.education}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <span className="inline-block rounded border border-dashed border-[#898989] px-2 py-0.5 text-[14px] font-semibold text-black">
          Exp: {job.experience}
        </span>

        <p className="mt-2 text-[12px] text-black">
          Deadline: {job.deadline}
        </p>
      </div>
    </div>
  );
}
