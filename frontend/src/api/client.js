import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = error.response?.data || {
      timestamp: new Date().toISOString(),
      status: error.response?.status || 500,
      error: 'Network Error',
      message: error.message || 'An unexpected error occurred',
      path: error.config?.url || '',
    };
    return Promise.reject(apiError);
  }
);

// References API
export const referencesApi = {
  getAll: async (industry) => {
    const params = industry ? { industry } : {};
    const response = await apiClient.get('/api/references', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/api/references/${id}`);
    return response.data;
  },
};

// Gallery API
export const galleryApi = {
  getAll: async (category) => {
    const params = category ? { category } : {};
    const response = await apiClient.get('/api/gallery', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/api/gallery/${id}`);
    return response.data;
  },
};

// Contact API
export const contactApi = {
  submit: async (data, attachment) => {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    if (attachment) {
      formData.append('attachment', attachment);
    }

    const response = await apiClient.post('/api/contact', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Helper to get full URL for images
export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path}`;
};

export default apiClient;
