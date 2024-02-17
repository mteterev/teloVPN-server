import 'dotenv/config';
import { AxiosInstance } from 'axios';
import axiosPlugin from 'axios';
import { onErrorResponse, onRequest, onResponse } from './axios.interceptors';

export const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);

  return instance;
};

export const axiosVPNInstance = axiosPlugin.create();

export const axiosServerInstance = axiosPlugin.create({
  baseURL: process.env.SERVER_BASE_URL ?? 'http://localhost:8080/api',
});

setupInterceptors(axiosVPNInstance);
