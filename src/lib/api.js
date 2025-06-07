// Central API URL configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export function apiUrl(path) {
  // Ensure no double slashes
  if (path.startsWith('/')) path = path.slice(1);
  return `${API_BASE_URL}/${path}`;
}
