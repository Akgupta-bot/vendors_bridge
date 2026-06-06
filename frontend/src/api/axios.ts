import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Or your friend's port/url
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT tokens into protected ERP requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});