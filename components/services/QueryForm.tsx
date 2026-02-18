"use client";

import React, { useState } from 'react';
import { ChevronRight, Send } from 'lucide-react';

interface QueryFormProps {
  serviceTitle?: string;
}

export default function QueryForm({ serviceTitle }: QueryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    query: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In the future, you can POST this to `${API_BASE_URL}/Inquiry/store`
    console.log("Form Submitted:", { ...formData, service: serviceTitle });
    alert("Thank you! Your query regarding " + (serviceTitle || "our services") + " has been sent.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
      <div className="flex items-center gap-2 mb-6 border-b pb-2">
        <Send size={18} className="text-[#044782]" />
        <h3 className="text-lg font-bold text-gray-800">Ask Your Query</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hidden field for service title if needed for API */}
        <input type="hidden" value={serviceTitle || ''} />

        <div>
          <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Name</label>
          <input 
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#044782] focus:border-[#044782]" 
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Mobile</label>
          <input 
            type="tel" 
            name="mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+91 00000 00000"
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#044782] focus:border-[#044782]" 
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">E-mail</label>
          <input 
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#044782] focus:border-[#044782]" 
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Query</label>
          <textarea 
            name="query"
            required
            value={formData.query}
            onChange={handleChange}
            placeholder={serviceTitle ? `Interested in ${serviceTitle}...` : "How can we help you?"}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm h-28 focus:outline-none focus:ring-1 focus:ring-[#044782] focus:border-[#044782] resize-none" 
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-[#044782] text-white py-3 rounded-lg text-sm font-bold flex justify-center items-center gap-2 hover:bg-[#F68A07] transition-all shadow-md active:scale-95"
        >
          Submit Query <ChevronRight size={16} />
        </button>
      </form>
    </div>
  );
}