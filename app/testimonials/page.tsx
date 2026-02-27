import PageBanner from "@/components/common/PageBanner";
import AllTestimonials from "@/components/testimonial/AllTestimonials";
import { API_BASE_URL } from '@/lib/config';

export default async function TestimonialsPage() {

  let homeBs = null;

  try {
    const res = await fetch(
      `${API_BASE_URL}/InvestigationServices/Website/front/`,
      { cache: 'no-store' }
    );

    const result = await res.json();

    if (result?.success) {
      homeBs = result.data.bs;
    }

  } catch (e) {
    console.error("SEO Fetch Error:", e);
  }

  const testimonialTitle =
    homeBs?.testimonial_title || "Success Stories";

  const testimonialSubtitle =
    homeBs?.testimonial_subtitle || "Hear What Our Clients Say";

  const breadcrumbImage =
    homeBs?.breadcrumb || null;   // ✅ ADD THIS

  return (
    <main className="bg-[#F3F1F2] min-h-screen">
      <PageBanner
        title={testimonialTitle}
        subtitle={testimonialSubtitle}
        breadcrumbImage={breadcrumbImage}   // ✅ PASS HERE
      />

      <section className="py-20 max-w-7xl mx-auto px-4">
        <AllTestimonials />
      </section>
    </main>
  );
}