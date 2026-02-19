"use client";

import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";

export default function BlogDetailClient({ children, title }: { children: React.ReactNode, title: string }) {
  const [copied, setCopied] = useState(false);

  const share = (platform: string) => {
    const url = window.location.href;
    const shareLinks: Record<string, string> = {
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      tw: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      li: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="hidden lg:flex flex-col gap-4 sticky top-24 h-fit pr-4 border-r border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Share</p>
        <button onClick={() => share('fb')} className="p-3 rounded-full bg-gray-50 text-gray-500 hover:bg-[#1877F2] hover:text-white transition-all"><Facebook size={18}/></button>
        <button onClick={() => share('tw')} className="p-3 rounded-full bg-gray-50 text-gray-500 hover:bg-black hover:text-white transition-all"><Twitter size={18}/></button>
        <button onClick={() => share('li')} className="p-3 rounded-full bg-gray-50 text-gray-500 hover:bg-[#0A66C2] hover:text-white transition-all"><Linkedin size={18}/></button>
        <button onClick={copyToClipboard} className={`p-3 rounded-full transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-800 hover:text-white'}`}>
          {copied ? <Check size={18}/> : <Link2 size={18}/>}
        </button>
      </div>

      <div className="flex-1 min-w-0">
        {children}
      </div>

      {/* Moved Style block here - This is now safe! */}
      <style jsx global>{`
        .blog-content-area img {
          border-radius: 12px;
          margin: 24px 0;
          height: auto;
          width: 100%;
        }
        .blog-content-area p {
          margin-bottom: 1.2rem;
        }
        .blog-content-area h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 2rem;
          color: #1a202c;
        }
      `}</style>
    </div>
  );
}