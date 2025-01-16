import { API_BASE_URL } from '@/constants/api.constants';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export { apiClient };
