import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

let axiosInstance = null;

let token = localStorage.getItem('auth');

const _initAxios = () => {
  token = localStorage.getItem('auth');
  axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/`,
    headers: {
      Authorization: token
    }
  });
};

const _hasTokenChanged = () => {
  return token !== localStorage.getItem('auth');
};

const getRequestInstance = () => {
  if (_hasTokenChanged() || !token || !axiosInstance) _initAxios();
  return axiosInstance;
};

export default getRequestInstance;
