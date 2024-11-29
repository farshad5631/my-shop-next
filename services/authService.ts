// import axios from 'axios';
// import { RegisterUser } from '../types'; // Use the new type

// const API_URL = 'http://localhost:3000'; // Ensure this matches your backend server URL

// export const login = async (email: string, password: string) => {
//   console.log(`Sending login request for email: ${email}`); // Log the email
//   const response = await axios.post(`${API_URL}/login`, { email, password });
//   return response.data;
// };

// export const register = async (user: RegisterUser) => {
//   console.log(`Sending registration request for email: ${user.email}`); // Log the email
//   const response = await axios.post(`${API_URL}/register`, user);
//   return response.data;
// };

// export const refreshToken = async () => {
//   const refreshToken = localStorage.getItem("refreshToken");
//   const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
//   localStorage.setItem("accessToken", response.data.accessToken);
//   return response.data;
// };

// // Axios interceptor to handle token refresh
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       await refreshToken();
//       originalRequest.headers['Authorization'] = 'Bearer ' + localStorage.getItem("accessToken");
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// import axios from 'axios';
// import { RegisterUser } from '../types';

// const API_URL = 'http://localhost:3000'; // Ensure this matches your backend server URL

// export const login = async (email: string, password: string) => {
//   console.log(`Sending login request for email: ${email}`); // Log the email
//   const response = await axios.post(`${API_URL}/login`, { email, password });
//   return response.data;
// };

// export const register = async (user: RegisterUser) => {
//   console.log(`Sending registration request for email: ${user.email}`); // Log the email
//   const response = await axios.post(`${API_URL}/register`, user);
//   return response.data;
// };

// export const refreshToken = async () => {
//   const refreshToken = localStorage.getItem("refreshToken");
//   const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
//   localStorage.setItem("accessToken", response.data.accessToken);
//   return response.data;
// };

// // Axios interceptor to handle token refresh
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       await refreshToken();
//       originalRequest.headers['Authorization'] = 'Bearer ' + localStorage.getItem("accessToken");
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

import axios from "axios";
import { RegisterUser } from "../types";
import {axiosInstance } from "../api/index"

// Ensure this matches your backend server URL

// export const login = async (email: string, password: string) => {
//   const response = await axios.post(`${API_URL}/login`, { email, password });
//   return response.data;
// };

// export const register = async (user: RegisterUser) => {
//   const response = await axios.post(`${API_URL}/register`, user);
//   return response.data;
// };
export const register = async (user: RegisterUser) => {
  try {
    const response = await axiosInstance.post( `/users/`,user);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Registration failed");
    }
  }
};
export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error("Invalid email or password");
    } else {
      throw new Error("Login failed");
    }
  }
};



// import axios from "axios";
// import { RegisterUser } from "../types"; // Use the new type

// const API_URL = "http://localhost:3000"; // Ensure this matches your backend server URL

// export const login = async (email:any, password:any) => {
//   console.log(`Sending login request for email: ${email}`); // Log the email
//   const response = await axios.post(`${API_URL}/login`, { email, password });
//   return response.data;
// };

// export const register = async (user: RegisterUser) => {
//   console.log(`Sending registration request for email: ${user.email}`); // Log the email
//   const response = await axios.post(`${API_URL}/register`, user);
//   return response.data;
// };

// export const refreshToken = async () => {
//   const refreshToken = localStorage.getItem("refreshToken");
//   const response = await axios.post(`${API_URL}/token`, {
//     token: refreshToken,
//   });
//   localStorage.setItem("accessToken", response.data.accessToken);
//   return response.data;
// };

// // Axios interceptor to handle token refresh
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       await refreshToken();
//       originalRequest.headers["Authorization"] =
//         "Bearer " + localStorage.getItem("accessToken");
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );
