import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = "Server error. Please try again.";
    if (error.response) {
      if (error.response.status === 400) {
        message = error.response.data.detail || "Bad Request";
      } else if (error.response.status === 422) {
        message = "Validation error: " + (error.response.data.detail[0]?.msg || JSON.stringify(error.response.data.detail));
      } else if (error.response.status === 500) {
        message = "Server error. Please try again.";
      }
    } else if (error.request) {
      message = "Network error. Make sure the backend server is running.";
    }
    return Promise.reject(new Error(message));
  }
);

export const api = {
  uploadDataset: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/upload-dataset', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  trainModel: async () => {
    return apiClient.post('/train-model');
  },

  predict: async (formData) => {
    return apiClient.post('/predict', formData);
  },

  getModelStatus: async () => {
    return apiClient.get('/model-status');
  }
};
