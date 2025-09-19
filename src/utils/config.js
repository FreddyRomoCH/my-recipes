export const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1234";