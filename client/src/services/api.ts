import axios from 'axios';
import { SystemProfile, CompatibilityResult } from '../types';

// Берем URL из переменной окружения или используем localhost для разработки
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

console.log('📡 API URL:', API_BASE_URL);
console.log('🌍 Режим:', process.env.NODE_ENV);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Увеличим таймаут для удаленного сервера
});

// Добавляем перехватчик для логирования
api.interceptors.request.use(request => {
  console.log('➡️ Запрос:', request.method, request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('✅ Ответ:', response.status);
    return response;
  },
  error => {
    console.error('❌ Ошибка:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('🚫 Сервер недоступен по адресу:', API_BASE_URL);
    }
    return Promise.reject(error);
  }
);

export const checkCompatibility = async (
  systemProfile: SystemProfile,
  softwareId: string
): Promise<CompatibilityResult> => {
  const response = await api.post('/compatibility/check', {
    systemProfile,
    softwareId,
  });
  return response.data;
};

export const getSoftwareList = async () => {
  const response = await api.get('/compatibility/software');
  return response.data;
};

export default api;
