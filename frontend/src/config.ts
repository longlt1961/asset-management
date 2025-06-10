// Add Vite env type for linter
/// <reference types="vite/client" />

// Use Vite environment variable or fallback to default for API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export const LOGIN_ENDPOINT = `${API_BASE_URL}/login`;
export const ASSET_ENDPOINT = `${API_BASE_URL}/assets`; 
export const VERSION_ENDPOINT = `${API_BASE_URL}/versions`; 
