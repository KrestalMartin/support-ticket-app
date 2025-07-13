import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// Request logging
api.interceptors.request.use(request => {
  console.log('[API REQUEST]', request.method?.toUpperCase(), request.url, request.data || '');
  return request;
});

// Response logging
api.interceptors.response.use(
  response => {
    console.log('[API RESPONSE]', response.status, response.config.url, response.data);
    return response;
  },
  error => {
    if (error.response) {
      console.log('[API ERROR]', error.response.status, error.response.config.url, error.response.data);
    } else {
      console.log('[API ERROR]', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
