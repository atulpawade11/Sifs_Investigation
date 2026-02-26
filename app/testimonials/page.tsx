import PageBanner from "@/components/common/PageBanner";
import AllTestimonials from "@/components/testimonial/AllTestimonials";
import { API_BASE_URL } from '@/lib/config';

export default async function TestimonialsPage() {
  // 1. Fetch data directly (Next.js server-side fetch)
  let homeBs = null;
  
  try {
    const res = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/`, {
      cache: 'no-store' // Ensures it stays dynamic like your home page
    });
    const result = await res.json();
    if (result?.success) {
      homeBs = result.data.bs;
    }
  } catch (e) {
    console.error("SEO Fetch Error:", e);
  }

  // 2. Exact same logic as your home page
  const testimonialTitle = homeBs?.testimonial_title || "Success Stories";
  const testimonialSubtitle = homeBs?.testimonial_subtitle || "Hear What Our Clients Say";

  return (
    <main className="bg-[#F3F1F2] min-h-screen">
      <PageBanner 
        title={testimonialTitle} 
        subtitle={testimonialSubtitle} 
        bgImage="/about/about-banner.png" 
      />
      
      <section className="py-20 max-w-7xl mx-auto px-4">
        <AllTestimonials />
      </section>
    </main>
  );
}