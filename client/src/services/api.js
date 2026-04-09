import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

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

export const imagesAPI = {
  GenImage: (data) => {
    return API.post("ai/generate-image", data);
  },
};


export const backgroundAPI = {
  RemoveBackground: (data) => {
    return API.post("ai/remove-background-image", data);
  },
};


export const objectAPI = {
  RemoveObject: (data) => {
    return API.post("ai/remove-image-object", data);
  },
};

export const resumeAPI = {
  ReviewResume: (data) => {
    return API.post("ai/review-resume", data);
  },
};