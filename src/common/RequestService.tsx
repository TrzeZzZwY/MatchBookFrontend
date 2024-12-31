import axios from 'axios';

const BASE_URL = 'https://localhost:8100';

const RequestService = {
  get: (url: string, params = {}, headers = {}) => {
    return axios.get(`${BASE_URL}${url}`, { params, headers });
  },
  post: (url: string, data = {}, headers = {}) => {
    return axios.post(`${BASE_URL}${url}`, data, { headers });
  },
  put: (url: string, data = {}, headers = {}) => {
    return axios.put(`${BASE_URL}${url}`, data, { headers });
  },
  delete: (url: string, headers = {}) => {
    return axios.delete(`${BASE_URL}${url}`, { headers });
  },
};

export default RequestService;
