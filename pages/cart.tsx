import { useEffect, useState } from "react";
import { CartItem } from "../types";
import Layout from "../components/Layout";
import { toast, ToastContainer } from "react-toastify";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (parsedCart && Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        } else {
          localStorage.removeItem("cart");
        }
      } catch (error) {
        console.error("Failed to parse cart items:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart items:", error);
    }
  };

  const handleQuantityChange = (id: number, delta: number) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const handleDeleteItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const handleContinueShopping = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (currentUser && currentUser.email) {
      const userIndex = users.findIndex(
        (user: any) => user.email === currentUser.email
      );
      if (userIndex > -1) {
        if (!users[userIndex].orders) {
          users[userIndex].orders = [];
        }
        users[userIndex].orders.push({
          items: cartItems,
          timestamp: new Date().getTime(),
        });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));
      }
    }

    const adminUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (adminUser && adminUser.email === "admin@admin") {
      const allUsersOrders = JSON.parse(
        localStorage.getItem("allUsersOrders") || "[]"
      );
      allUsersOrders.push({
        email: currentUser.email,
        items: cartItems,
        timestamp: new Date().getTime(),
      });
      localStorage.setItem("allUsersOrders", JSON.stringify(allUsersOrders));
    }

    localStorage.removeItem("cart");
    toast.success(`Your order has been added to the order histories!`);

    window.location.href = "/";
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen py-2  dark:bg-slate-800 dark:text-white">
          <h1 className="text-2xl mb-6">Your Cart</h1>
          <p>Your cart is empty.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 dark:bg-slate-800 dark:text-white">
        <h1 className="text-2xl mb-6">Your Cart</h1>
        <table className="min-w-full bg-white dark:bg-slate-800 dark:text-white">
          <thead>
            <tr>
              <th className="py-2">Item Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2">${item.price}</td>
                <td className="border px-4 py-2 flex items-center justify-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="bg-green-500 text-white px-2 rounded"
                  >
                    +
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <h2 className="text-xl">Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>
        <button
          onClick={handleContinueShopping}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    </Layout>
  );
};

export default CartPage;
