"use client";

import React from 'react';
// ADD THIS LINE:
import { ChevronRight } from 'lucide-react';

export default function QueryForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Ask Your Query</h3>
      <form className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Name</label>
          <input type="text" className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Mobile</label>
          <input type="text" className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">E-mail</label>
          <input type="email" className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Query</label>
          <textarea className="w-full border border-gray-200 rounded-lg p-2 text-sm h-24 focus:outline-none focus:border-blue-400" />
        </div>
        <button className="w-full bg-[#044782] text-white py-2 rounded-lg text-sm font-bold flex justify-center items-center gap-2 hover:bg-[#033663] transition-colors">
          Submit <ChevronRight size={16} />
        </button>
      </form>
    </div>
  );
}