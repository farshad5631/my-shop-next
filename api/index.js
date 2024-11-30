import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the access token to request headers
axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axiosInstance.post(`/auth/refresh-token`, {
    refreshToken,
  });
  console.log(response.data)
  localStorage.setItem("accessToken", response.data);
  return response.data;
};

// Axios interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      originalRequest.headers["Authorization"] =
        "Bearer " + localStorage.getItem("accessToken");
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);