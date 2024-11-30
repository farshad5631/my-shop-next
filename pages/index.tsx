import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import Layout from "../components/Layout";
import Link from "next/link";
import { Product, CartItem } from "../types";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
import Sidebar from "../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const limit = 12;

  const loadProducts = async (page: number = 1, categoryId: number = 0) => {
    const offset = (page - 1) * limit;
    const { products, total } = await fetchProducts(categoryId, offset, limit);
    setProducts(products);
    setFilteredProducts(products);
    setTotalProducts(total);
    setCurrentPage(page);
    setCurrentCategory(categoryId);
  };

  useEffect(() => {
    loadProducts(); // Fetch products for the first page initially
  }, []);

  const handleAddToCart = (product: Product) => {
    let cart: CartItem[] = getLocalStorageItem("cart");

    if (!cart) {
      cart = [];
    }

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: CartItem = {
        ...product,
        quantity: 1,
        timestamp: new Date().getTime(),
      };
      cart.push(newItem);
    }

    setLocalStorageItem("cart", cart);
    toast.success(`${product.title} added to your cart successfully!`);
  };

  const handleFilter = async (filters: any) => {
    await loadProducts(1, filters.categoryId);

    let filtered = await fetchProducts(filters.categoryId, 0, limit);

    if (filters.price) {
      filtered.products = filtered.products.filter(
        (product) =>
          product.price >= filters.price[0] && product.price <= filters.price[1]
      );
    }

    setFilteredProducts(filtered.products);
    setTotalProducts(filtered.total);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    const trimmedSearchTerm = term.trim();
    setSearchTerm(trimmedSearchTerm);
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handlePageChange = (page: number) => {
    loadProducts(page, currentCategory);
  };

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <Layout>
      <div className="flex flex-col items-center p-4 dark:bg-slate-800 dark:text-white">
        <ToastContainer />
        <div className="flex w-full">
          <Sidebar onFilter={handleFilter} />
          <div className="flex-grow p-4 w-4/5">
            <div className="flex flex-row justify-center space-x-40">
              <h1 className="text-2xl mb-6">Products</h1>
              <div className="w-full max-w-lg mb-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-2 border border-gray-400 rounded"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border rounded-2xl">
                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-auto cursor-pointer rounded-t-2xl"
                    />
                    <h2 className="flex text-xl mt-4 cursor-pointer justify-center">
                      {product.title}
                    </h2>
                  </Link>
                  <div className="p-4">
                    <p className="mt-2 line-through text-red-500">
                      Price: ${product.price * 1.5}{" "}
                    </p>
                    <p className="mt-2">Price: ${product.price} </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-2 bg-blue-500 text-white p-2 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
