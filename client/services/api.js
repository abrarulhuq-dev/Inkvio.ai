import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const API = {
  get: (endpoint) => api.get(`/${endpoint}`).then(res => res.data),
  post: (endpoint, data) => api.post(`/${endpoint}`, data).then(res => res.data),
  put: (endpoint, data) => api.put(`/${endpoint}`, data).then(res => res.data),
  delete: (endpoint) => api.delete(`/${endpoint}`).then(res => res.data),
};


export const articlesAPI = {
  GenArticle: (data) => {
    return API.post("ai/generate-article", data);
  },
};


export const blogsAPI = {
  GenBlog: (data) => {
    return API.post("ai/generate-blog", data);
  },
};