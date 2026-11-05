import axios from "axios";

// `VITE_API_URL` must be available at build time. Vercel only exposes it when
// it is configured in the project's Environment Variables, so fall back to the
// deployed API instead of silently sending requests to the frontend origin.
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://127.0.0.1:3000"
    : "https://e-commerce-1-mzmg.onrender.com");

const API = axios.create({
  baseURL: API_BASE_URL,
});

export default API;
