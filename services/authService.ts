import { RegisterUser } from "../types";
import {axiosInstance } from "../api/index"

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