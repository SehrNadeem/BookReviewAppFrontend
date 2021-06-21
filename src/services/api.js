import axios from 'axios';
import { getLocalStorage } from './local-storage-service';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`
});

instance.interceptors.request.use(
  function(config) {
    const token = getLocalStorage("token"); 
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    // return Promise.reject(error);
    throw error;
  }
);

export default instance;