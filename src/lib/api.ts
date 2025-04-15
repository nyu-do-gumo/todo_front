import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: 'http://localhost.nyudogumo.work/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// リクエストインターセプターでトークンを自動的に付与
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;