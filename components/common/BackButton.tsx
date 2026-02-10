"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0B10A4] to-[#04063E]
      text-white px-4 py-2 text-sm text-gray-700 hover:from-[#1217c0] hover:to-[#0a0f6b]
      transition-all group"
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
}
