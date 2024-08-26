import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'http://localhost:5000/api/auth';

export const login = async (username, password) => {
  try{
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    const token = response.data.token;
    localStorage.setItem('token', token);
    
    const decodedToken = jwtDecode(token);
    return { token, decodedToken };
  }
  return response.data; // Return error or message if login fails
  } catch (err) {
    console.error('Login error:', err);
    throw err; // Re-throw error so it can be handled in the client
  }
};

export const registerAdmin = async (username, password) => {
  const response = await axios.post(`${API_URL}/register-admin`, { username, password });
  return response.data;
};

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => !!getToken();

export const checkAdmin = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.isAdmin;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
};
