import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create an axios instance with defaults
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 30_000,
});

// Request interceptor to attach auth token if present
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {

  }
  return config;
});

axiosClient.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => {
  
    return Promise.reject(error);
  }
);

export default axiosClient;
