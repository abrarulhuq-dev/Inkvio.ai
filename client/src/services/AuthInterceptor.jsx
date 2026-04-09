// AuthInterceptor.jsx
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { api } from "../services/api";

const AuthInterceptor = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => api.interceptors.request.eject(interceptor);
  }, [getToken]);

  return null;
};

export default AuthInterceptor;
