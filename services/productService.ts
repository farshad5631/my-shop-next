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
