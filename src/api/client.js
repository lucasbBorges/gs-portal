import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://api.grupostudio.local',
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('grupoStudioToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
