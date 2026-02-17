"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageBanner from "@/components/common/PageBanner";
import CareerFAQSection from "@/components/career/CareerFAQSection";
import { API_BASE_URL } from '@/lib/config';
import { Calendar, MapPin, Briefcase, Users, Mail, GraduationCap, CheckCircle2, List } from 'lucide-react';

export default function CareerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchJobDetails = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(false);
      // Endpoint confirmed for single job details
      const url = `${API_BASE_URL}/InvestigationServices/Website/front/career-details/${slug}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.success && json.data?.job) {
        setData(json.data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  // Logic to change data according to the category selected
  const handleCategorySwitch = async (categoryId: number) => {
    try {
      setLoading(true);
      // Fetch all careers to find the first job slug in this category
      const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/career/`);
      const json = await res.json();

      if (json.success && json.data?.data) {
        const nextJob = json.data.data.find((j: any) => j.jcategory_id === categoryId);
        
        if (nextJob) {
          // Navigate to the new slug within the details page
          router.push(`/career/${nextJob.slug}`);
        } else {
          // If no job found in that category, redirect to main list with filter
          router.push(`/career?category=${categoryId}`);
        }
      }
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white text-[#1B2A7A] font-bold">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B2A7A]"></div>
        <p className="uppercase tracking-widest text-xs">Updating Content...</p>
      </div>
    </div>
  );

  if (error || !data?.job) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white gap-4">
      <h2 className="text-xl font-semibold text-gray-800">Position Not Found</h2>
      <button onClick={() => router.push('/career')} className="bg-[#1B2A7A] text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest">
        Back to All Jobs
      </button>
    </div>
  );

  const { job, jcats } = data;

  return (
    <main className="bg-white">
      <PageBanner 
        title={job.title} 
        subtitle={`Career Opportunity in ${job.job_location}`} 
        bgImage="/about/about-banner.png" 
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: DETAILED INFO */}
            <div className="lg:col-span-8 space-y-12">
              <DetailSection title="Job Responsibilities" icon={<Briefcase size={24}/>} html={job.job_responsibilities} />
              
              <div className="grid md:grid-cols-2 gap-8">
                <DetailSection title="Education" icon={<GraduationCap size={24}/>} html={job.educational_requirements} />
                <DetailSection title="Experience" icon={<CheckCircle2 size={24}/>} html={job.experience_requirements} />
              </div>

              <DetailSection title="Additional Skills" icon={<List size={24}/>} html={job.additional_requirements} />
              <DetailSection title="Company Benefits" icon={<Users size={24}/>} html={job.benefits} />

              {/* Notice Box */}
              <div className="rounded-2xl bg-blue-50/50 p-8 border border-blue-100 mt-10">
                <h4 className="font-bold text-[#1B2A7A] mb-3 uppercase text-[10px] tracking-[0.2em]">Application Notice</h4>
                <p className="text-gray-600 leading-relaxed text-sm italic mb-4">{job.read_before_apply}</p>
                <div className="flex items-center gap-2 text-[#1B2A7A] font-bold text-sm">
                  <Mail size={16} />
                  <span>Send Resume: {job.email}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SIDEBAR */}
            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-28 space-y-8">
                
                {/* Summary Card */}
                <div className="bg-[#1B2A7A] text-white rounded-3xl p-8 shadow-xl shadow-blue-900/20">
                  <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Job Summary</h3>
                  <div className="space-y-6">
                    <SidebarItem label="Location" value={job.job_location} icon={<MapPin size={20} />} />
                    <SidebarItem label="Deadline" value={job.deadline} icon={<Calendar size={20} />} />
                    <SidebarItem label="Experience" value={job.experience} icon={<Briefcase size={20} />} />
                    <SidebarItem label="Vacancy" value={`${job.vacancy} Positions`} icon={<Users size={20} />} />
                    <SidebarItem label="Salary" value="Negotiable" icon={<Mail size={20} />} isHtml html={job.salary} />
                  </div>
                  <button className="w-full mt-10 bg-white text-[#1B2A7A] py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform">
                    Apply For Position
                  </button>
                </div>

                {/* CATEGORY SWITCHER: This is what you requested */}
                {jcats && (
                  <div className="bg-[#FAFAFA] border border-gray-200 rounded-3xl p-8">
                    <h3 className="text-lg font-bold text-black mb-5 flex items-center gap-2">
                        <List size={20} className="text-[#1B2A7A]" /> Job Categories
                    </h3>
                    <div className="flex flex-col gap-2">
                      {jcats.map((cat: any) => (
                        <button 
                          key={cat.id} 
                          onClick={() => handleCategorySwitch(cat.id)}
                          className={`group flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
                            job.jcategory_id === cat.id 
                            ? "bg-[#1B2A7A] border-[#1B2A7A] text-white shadow-md" 
                            : "bg-white border-gray-200 text-gray-600 hover:border-[#1B2A7A] hover:text-[#1B2A7A]"
                          }`}
                        >
                          <span className="text-[11px] font-bold uppercase truncate max-w-[200px]">
                            {cat.name}
                          </span>
                          <span className={`text-[10px] ${job.jcategory_id === cat.id ? "text-white/70" : "text-gray-300 group-hover:text-[#1B2A7A]"}`}>→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CareerFAQSection />
    </main>
  );
}

// --- Internal Helper Components ---

function DetailSection({ title, icon, html }: { title: string; icon: React.ReactNode; html: string }) {
  if (!html || html === "null" || html === "undefined") return null;
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="text-xl font-bold text-black mb-5 flex items-center gap-3">
        <span className="bg-[#1B2A7A]/5 p-2 rounded-lg text-[#1B2A7A]">{icon}</span> {title}
      </h3>
      <div 
        className="text-gray-600 leading-relaxed job-rich-text"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
      <style jsx global>{`
        .job-rich-text ul { list-style-type: none; padding-left: 0; margin-top: 10px; }
        .job-rich-text li { position: relative; padding-left: 25px; margin-bottom: 10px; font-size: 0.95rem; }
        .job-rich-text li::before { content: ""; position: absolute; left: 0; top: 10px; width: 6px; height: 6px; background: #1B2A7A; border-radius: 50%; }
        .job-rich-text font { font-family: inherit !important; }
        .job-rich-text div { text-align: left !important; }
      `}</style>
    </div>
  );
}

function SidebarItem({ label, value, icon, isHtml, html }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-tight mb-1">{label}</p>
        {isHtml ? (
          <div className="text-sm font-bold text-white truncate" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <p className="text-sm font-bold text-white truncate">{value}</p>
        )}
      </div>
    </div>
  );
}