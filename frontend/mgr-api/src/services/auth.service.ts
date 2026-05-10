import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || 'abc_client';
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET || 'abc_secret';

const authService = {
  login: async (username, password) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    // Try both /oauth/token and /api/token if one fails, or use what was mapped
    // Mapping in backend: .pathMapping("/oauth/token", "/api/token")
    // If context path is /api, then the final path is /api/api/token OR /api/oauth/token
    try {
      const response = await axios.post(`${API_URL}/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
        }
      });
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  register: async (userData) => {
    const response = await axios.post(`${API_URL}/v1/landing/register`, userData);
    return response.data;
  },

  requestForgotPassword: async (email) => {
    const response = await axios.post(`${API_URL}/v1/landing/request-forget-password`, { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await axios.post(`${API_URL}/v1/landing/forget-password`, { token, newPassword });
    return response.data;
  },

  refreshToken: async (refreshToken) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    const response = await axios.post(`${API_URL}/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
      }
    });
    return response.data;
  }
};

export default authService;
