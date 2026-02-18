// services/webService.ts

const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;
const BASE_PATH = "/InvestigationServices/Website/front";

const fetchWithTimeout = async (url: string, options: any = {}, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        return response;
    } finally {
        clearTimeout(id);
    }
};

/**
 * GET: Fetches website boot data (socials, favicon, contact, etc.)
 * Endpoint: {{BaseUrl}}/InvestigationServices/Website/front/boot
 */
export const getBootData = async () => {
    try {
        const res = await fetchWithTimeout(`${backendUrl}${BASE_PATH}/boot`);
        if (!res.ok) throw new Error(`GET Error: ${res.status}`);
        return res.json();
    } catch (err: any) {
        if (err.name === 'AbortError') throw new Error('Request timed out after 10 seconds');
        throw err;
    }
};
