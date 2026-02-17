// services/legalService.ts
const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;
const BASE_PATH = "/InvestigationServices/Website/front";

export const getPageBySlug = async (slug: string) => {
    const cleanBaseUrl = backendUrl?.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
    
    // CHANGE: Added '/pages' before the slug. 
    // Most CMS backends group static pages under a 'pages' or 'page' directory.
    const url = `${cleanBaseUrl}${BASE_PATH}/pages/${slug}`;
  
    console.log("🚀 Requesting Legal URL:", url); 
  
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            console.error(`❌ Server Error: ${res.status} for ${url}`);
            throw new Error(`Server responded with ${res.status}`);
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("API Fetch Error:", error);
        throw error;
    }
};