// services/contactService.ts
const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;

// GET Request: To fetch contact details
export const getContactInfo = async () => {
  // Pattern: .../front/contact
  const res = await fetch(`${backendUrl}/InvestigationServices/Website/front/contact`); 
  if (!res.ok) throw new Error(`GET Error: ${res.status}`);
  return res.json();
};

// POST Request: To submit the form
export const submitContactForm = async (formData: any) => {
  // Based on your previous success message, it is likely 'contact-form' 
  // or just 'contact' matching the GET route.
  const res = await fetch(`${backendUrl}/InvestigationServices/Website/front/contact-form`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("Form submission failed:", data);
    throw new Error(data.message || `POST Error: ${res.status}`);
  }
  
  return data;
};