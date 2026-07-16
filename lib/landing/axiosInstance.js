import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;
