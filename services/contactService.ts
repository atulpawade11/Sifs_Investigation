// services/contactService.ts

// Accessing the public variable from your .env file
const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;
const BASE_PATH = "/InvestigationServices/Website/front";

/**
 * GET: Fetches contact information (Addresses, Phones, etc.)
 */
export const getContactInfo = async () => {
  const res = await fetch(`${backendUrl}${BASE_PATH}/contact`); 
  if (!res.ok) throw new Error(`GET Error: ${res.status}`);
  return res.json();
};

/**
 * POST: Submits the contact form data
 */
 export const submitContactForm = async (formData: any) => {
  // We are adding '-save' to the end. This is a common pattern when 
  // the standard '/contact' route only handles GET requests.
  const url = `${backendUrl}${BASE_PATH}/contact-save`;

  const res = await fetch(url, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      contact_number: formData.contact_number,
      address: formData.address || "",
      details: formData.details
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("Submission failed at:", url, "Data:", data);
    throw new Error(data.message || `POST Error: ${res.status}`);
  }
  
  return data;
};