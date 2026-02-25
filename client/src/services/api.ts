import axios from 'axios';
import { SystemProfile, CompatibilityResult } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
