import axios from "axios";
import { Product } from "../types";
import { axiosInstance } from "../api";

export const fetchCategories = async () => {
  const response = await axiosInstance.get(
    "/categories"
  );
  const categories = response.data;
  return categories.slice(0, 5);
};

export const fetchProductById = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const fetchProducts = async (
  categoryId: number = 0,
  offset: number = 0,
  limit: number = 12
): Promise<{ products: Product[]; total: number }> => {
  let endpoint = `/products?offset=${offset}&limit=${limit}`;
  if (categoryId > 0) {
    endpoint = `/categories/${categoryId}/products`;
  }
  const response = await axiosInstance.get(endpoint);
  const products = response.data;
  let totalProducts = products.length;
  if (categoryId === 0) {
    const totalResponse = await axiosInstance.get(
      "/products"
    );
    totalProducts = totalResponse.data.length;
  }
  return { products: products.slice(0, limit), total: totalProducts };
};



// export const fetchCategories = async () => {
//   const response = await axios.get(
//     "https://api.escuelajs.co/api/v1/categories"
//   );
//   const categories = response.data;
//   return categories.slice(0, 5);
// };

// export const fetchProductById = async (id: number) => {
//   try {
//     const response = await axios.get(
//       `https://api.escuelajs.co/api/v1/products/${id}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     throw error;
//   }
// };

// export const fetchProducts = async (
//   categoryId: number = 0,
//   offset: number = 0,
//   limit: number = 12
// ): Promise<{ products: Product[]; total: number }> => {
//   let endpoint = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;
//   if (categoryId > 0) {
//     endpoint = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`;
//   }
//   const response =  await axios.get('https://api.escuelajs.co/api/v1/categories/${categoryId}/products');
//   const products = response.data;
//   let totalProducts = products.length;
//   if (categoryId === 0) {
//     const totalResponse = await axios.get(
//       "https://api.escuelajs.co/api/v1/products"
//     );
//     totalProducts = totalResponse.data.length;
//   }
//   return { products: products.slice(0, limit), total: totalProducts };
// };

// import { Product } from "../types";
// import axios from "axios";


// export const fetchProducts = async (
//   categoryId: number = 0
// ): Promise<Product[]> => {
//   let endpoint = "https://api.escuelajs.co/api/v1/products";
//   if (categoryId > 0) {
//     endpoint = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`;
//   }
//   const response = await axios.get(endpoint);
//   const products = response.data;
//   if (categoryId === 0) {
//     return products.slice(0, 15);
//   }
//   return products;
// };

// export const fetchCategories = async () => {
//   const response = await axios.get(
//     "https://api.escuelajs.co/api/v1/categories"
//   );
//   const categories = response.data;
//   return categories.slice(0, 6);
// };


// export const fetchProducts = async (
//   offset: number = 0,
//   limit: number = 15,
//   categoryId: number = 0
// ): Promise<{ products: Product[]; total: number }> => {
//   let endpoint = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;
//   if (categoryId > 0) {
//     endpoint = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products?offset=${offset}&limit=${limit}`;
//   }
//   const response = await axios.get(endpoint);
//   const products = response.data;
//   const totalResponse = await axios.get(
//     "https://api.escuelajs.co/api/v1/products"
//   );
//   const total = totalResponse.data.length;
//   return { products, total };
// };

// export const fetchProductById = async (id: number) => {
//   try {
//     const response = await axios.get(
//       `https://api.escuelajs.co/api/v1/products/${id}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     throw error;
//   }
// };