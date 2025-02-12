import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorage";
import Layout from "../../components/Layout";
import { Product, CartItem } from "../../types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../api";
import Link from "next/link";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

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

  useEffect(() => {
    if (id) {
      const productId = Array.isArray(id)
        ? parseInt(id[0], 10)
        : parseInt(id, 10);
      axiosInstance
        .get(`/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
          setMainImage(response.data.images[0]);

          const categoryId = response.data.category.id;
          return axiosInstance.get(`/categories/${categoryId}/products`);
        })
        .then((response) => {
          setRelatedProducts(
            response.data.filter((item: Product) => item.id !== productId)
          );
        })
        .catch((error) =>
          console.error("Error fetching product or related products:", error)
        );
    }
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-2xl mb-6">Loading...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ToastContainer />
      <div className="flex flex-row gap-10 p-4 dark:bg-slate-800 dark:text-white">
        <div className="relative w-1/3 h-auto m-8">
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="flex flex-col w-2/5 p-8">
          <div className="flex flex-col p-10 space-y-10 justify-center">
            <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
            <p>Description</p>
            <p>{product.description}</p>
            <p className="mt-2 justify-center">${product.price}</p>
          </div>
          <div className="flex flex-row justify-center space-x-10">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex mt-2 bg-blue-500 text-white p-2 rounded w-2/6 justify-center"
            >
              Add to Cart
            </button>
            <button
              onClick={() => router.push("/cart")}
              className="flex mt-2 bg-gray-600 text-white p-2 rounded w-2/6 justify-center"
            >
              Check out Now
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 ">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.title}
              className="w-32 h-auto rounded-md cursor-pointer transform hover:scale-110 transition-transform duration-300"
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>

      <div className="p-8 dark:bg-slate-900 dark:text-white">
        <h2 className="text-2xl mb-4">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="border rounded-2xl">
              <Link href={`/products/${relatedProduct.id}`}>
                <img
                  src={relatedProduct.images[0]}
                  alt={relatedProduct.title}
                  className="w-full h-auto cursor-pointer rounded-t-2xl"
                />
                <h2 className="flex text-xl mt-4 cursor-pointer justify-center">
                  {relatedProduct.title}
                </h2>
              </Link>
              <div className="p-4">
                <p className="mt-2 line-through text-red-500">
                  Price: ${relatedProduct.price * 1.5}{" "}
                </p>
                <p className="mt-2">Price: ${relatedProduct.price} </p>
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
      </div>
    </Layout>
  );
};

export default ProductPage;
