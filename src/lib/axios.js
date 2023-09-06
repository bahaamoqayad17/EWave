"use client";
import axios from "axios";
const instance = axios.create({
  baseURL: "https://ewave-i4ql.onrender.com/api/v1/",
  "Content-Type": "multipart/form-data",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
