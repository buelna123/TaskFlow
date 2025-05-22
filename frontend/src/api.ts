import axios from 'axios';
import { useAuthStore } from './stores/authStore';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor mejorado:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Simplificado
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor de respuesta mejorado:
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw error;
        
        const { data } = await api.post('/auth/refresh-token', { refreshToken });
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        useAuthStore.getState().login({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName
        }, data.token, data.refreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        window.location.href = '/login?sessionExpired=true';
        return Promise.reject(err);
      }
    }
    
    // Manejo de otros errores
    if (error.response?.status === 403) {
      window.location.href = '/login?forbidden=true';
    }
    
    return Promise.reject(error);
  }
);

export default api;