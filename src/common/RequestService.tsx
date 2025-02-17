import axios from 'axios';
import {
  BOOK_SERVICE_URL,
  ACCOUNT_SERVICE_URL,
  REPORT_SERVICE_URL,
} from '../../config.json';
import TokenService from './TokenService';

const getBaseUrl = (service: 'book' | 'account' | 'report') => {
  switch (service) {
    case 'book':
      return BOOK_SERVICE_URL;
    case 'account':
      return ACCOUNT_SERVICE_URL;
    case 'report':
      return REPORT_SERVICE_URL;
    default:
      throw new Error(`Unknown service: ${service}`);
  }
};

const instance = axios.create();

instance.interceptors.request.use(
  async (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      console.log('token:', token);
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('originalRequest:', originalRequest);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await TokenService.refreshToken();
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${TokenService.getAccessToken()}`;
        return instance(originalRequest);
      } catch (refreshError) {
        TokenService.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

const RequestService = {
  get: (service: 'book' | 'account' | 'report', url: string, params = {}) => {
    return instance.get(`${getBaseUrl(service)}${url}`, { params });
  },
  post: (service: 'book' | 'account' | 'report', url: string, data = {}) => {
    console.log(`${getBaseUrl(service)}${url}`);
    return instance.post(`${getBaseUrl(service)}${url}`, data);
  },
  put: (service: 'book' | 'account' | 'report', url: string, data = {}) => {
    return instance.put(`${getBaseUrl(service)}${url}`, data);
  },
  delete: (service: 'book' | 'account' | 'report', url: string) => {
    return instance.delete(`${getBaseUrl(service)}${url}`);
  },
};

export default RequestService;
