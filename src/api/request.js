import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

const token = localStorage.getItem('auth');
console.log('token', token);

export default axios.create({
  baseURL: `${API_BASE_URL}/`,
  headers: { Authorization: token }
});
