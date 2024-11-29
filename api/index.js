// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = 4000;
// app.use(bodyParser.json());
// app.use(cors());

// const SECRET_KEY = "your_secret_key";
// let users = []; // This is a simple in-memory storage for demonstration purposes

// app.post("/register", (req, res) => {
//   const { email, password, name, family, address, postalCode, phone, orders } =
//     req.body;
//   users.push({
//     email,
//     password,
//     name,
//     family,
//     address,
//     postalCode,
//     phone,
//     orders,
//   });
//   res.status(201).json({ message: "User registered successfully!" });
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find((u) => u.email === email && u.password === password);

//   if (user) {
//     const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: "15m" });
//     const refreshToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: "7d" });
//     res.json({ accessToken, refreshToken });
//   } else {
//     res.status(401).send("Invalid credentials");
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


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