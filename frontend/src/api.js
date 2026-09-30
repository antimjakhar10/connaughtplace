// Determine API_URL dynamically based on environment
// 1. If VITE_API_URL is explicitly set in .env, use it (removing trailing slash).
// 2. In local development (Vite dev server), fallback to "http://localhost:5003".
// 3. In production live environment (e.g. cphisar.com), fallback to "" for relative API requests (/api/...).
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl !== undefined && envUrl !== null && envUrl.trim() !== "") {
    const trimmed = envUrl.trim();
    return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
  }
  if (import.meta.env.DEV) {
    return "http://localhost:5003";
  }
  return "";
};

const API_URL = getApiUrl();

export default API_URL;