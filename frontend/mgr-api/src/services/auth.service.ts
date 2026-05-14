import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || 'abc_client';
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET || 'abc123';

const authService = {
  login: async (username: string, password: string) => {
    console.log(`Attempting login at: ${API_URL}/token`);
    console.log(`Using Client ID: ${CLIENT_ID}`);

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    try {
      const response = await axios.post(`${API_URL}/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
        }
      });
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error: any) {
      const errorData = error.response?.data;
      console.error('Login error details:', {
        status: error.response?.status,
        data: errorData,
        message: error.message,
        url: `${API_URL}/token`
      });
      throw error;
    }
  },

  register: async (userData: any) => {
    const response = await axios.post(`${API_URL}/v1/landing/register`, userData);
    return response.data;
  },

  requestForgotPassword: async (email: string) => {
    const response = await axios.post(`${API_URL}/v1/landing/request-forget-password`, { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await axios.post(`${API_URL}/v1/landing/forget-password`, { token, newPassword });
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
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
