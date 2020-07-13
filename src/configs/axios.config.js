import axios from 'axios';
import { history } from '../App';

axios.interceptors.request.use(
  (config) => {
    const storageKey = 'jwtToken';
    const jwtToken = localStorage.getItem(storageKey);
    config.headers.common['authorization'] = `Bearer ${jwtToken}`;
    return config;
  },
  (err) => {
    return err;
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      const storageKey = 'jwtToken';
      history.push('/auth/login');
      localStorage.removeItem(storageKey);
    }
    throw err;
  }
);
