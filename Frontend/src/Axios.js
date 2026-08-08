import axios from "axios";

const api = axios.create({
    baseURL: "https://rawform.onrender.com",
    withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "https://rawform.onrender.com/refresh",
          {},
          { withCredentials: true }
        );

        return api(originalRequest);
        window.location.hash = "/";
      } catch (e) {
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;