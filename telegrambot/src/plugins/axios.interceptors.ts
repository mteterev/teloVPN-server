import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { AuthServiceInstance } from '../services/auth.services';

// Request Interceptor
export const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { method, url } = config;
  const baseUrl = `http://${url?.split('/')[2]}`;

  if (AuthServiceInstance.cookies.size > 0) {
    config.headers['Cookie'] = AuthServiceInstance.cookies.get(baseUrl);
  }

  return config;
};

export const onResponse = (response: any) => {
  const { method, url } = response.config;
  const { status } = response;

  return response.data;
};

export const onErrorResponse = (
  error: AxiosError | Error
): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { statusText, status } = error.response ?? {};

    switch (status) {
      case 401: {
        // "Login required"
        break;
      }
      case 403: {
        // "Permission denied"
        break;
      }
      case 404: {
        // "Invalid request"
        break;
      }
      case 500: {
        // "Server error"
        break;
      }
      default: {
        // "Unknown error occurred"
        break;
      }
    }

    if (status === 401) {
      // Delete Token & Go To Login Page if you required.
    }
  } else {
  }

  return Promise.reject(error);
};
