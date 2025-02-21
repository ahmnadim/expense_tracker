import axios from "axios";
import { STORAGE_KEY } from "../constants/utils";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 403) {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);

      if (refreshToken) {
        try {
          const { data } = await axios.post(API_URL + "/auth/refresh-token", {
            refreshToken,
          });

          // Update localStorage with the new tokens
          localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
          localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);

          // Update the authorization header and retry the original request
          originalRequest.headers["Authorization"] =
            "Bearer " + data.accessToken;
          return axios.request(originalRequest);
        } catch (refreshError) {
          // If token refresh fails, clear storage and redirect to login
          localStorage.removeItem(STORAGE_KEY.USER);
          localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
          localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    if (error.response && error.response.status === 401) {
      localStorage.removeItem(STORAGE_KEY.USER);
      localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    }
    return Promise.reject(error);
  }
);

export default api;
