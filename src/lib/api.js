import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api', // Using relative path for proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log('API Response:', {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Log error responses for debugging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Add a request interceptor to include vendor ID in requests
api.interceptors.request.use((config) => {
  const selectedVendor = localStorage.getItem('selectedVendor');
  
  // Only add vendor filter if a specific vendor is selected (not 'all')
  if (selectedVendor && selectedVendor !== 'all') {
    // For GET requests, add vendor as a query parameter
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        vendorId: selectedVendor,
      };
    }
    // For POST/PUT requests, add vendor to the request body
    else if (['post', 'put'].includes(config.method)) {
      config.data = {
        ...config.data,
        vendorId: selectedVendor,
      };
    }
  }
  
  return config;
});

export { api };
export default api;
