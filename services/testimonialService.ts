import { API_BASE_URL } from '@/lib/config';

export const getTestimonials = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/InvestigationServices/Website/front/testimonials`, {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Service Error:", error);
    return null;
  }
};