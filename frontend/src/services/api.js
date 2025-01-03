import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions/api'
  : 'http://localhost:8888/.netlify/functions/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const yahooAuth = {
  getAuthUrl: () => api.get('/yahoo/auth'),
  authenticate: (code) => api.post('/yahoo/callback', { code }),
  getTeam: (teamKey) => api.get(`/yahoo/team/${teamKey}`),
};

export default api; 