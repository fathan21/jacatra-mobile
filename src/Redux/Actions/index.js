import axios from "axios";
import {App} from '../const';

const baseUrl = App.api;
// axios.defaults.headers.common['X-CSRF-TOKEN'] = App.csrf;


export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
  },
  error => Promise.reject(error)
);
