"use client";
import defaultAxios from "axios";

// axios interceptor
const axios = defaultAxios.create({
  baseURL: process.env.NEXT_PUBLIC_OMDB_BASE_URL!,
  params: {
    apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY!,
  },
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axios;
