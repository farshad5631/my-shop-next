import { useEffect, useState } from "react";
import { User, Order } from "../types";
import Layout from "../components/Layout";
import withAuth from '../components/withAuth';

const DashboardPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser && currentUser.email) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const loggedInUser = users.find(
        (user: User) => user.email === currentUser.email
      );
      if (loggedInUser) {
        setOrders(loggedInUser.orders);
        setUser(loggedInUser);
        localStorage.setItem("currentUser", JSON.stringify(loggedInUser)); // Ensure current user is updated
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  if (!user) return null;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-slate-800 dark:text-white">
        <h1 className="text-2xl mb-6">
          Welcome, {user.name} 
        </h1>
        <h2 className="text-xl mb-4">Your Order History</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="w-full">
            {orders.map((order, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <h3 className="text-lg mb-2">
                  Order Date: {new Date(order.timestamp).toLocaleDateString()}
                </h3>
                <table className="min-w-full bg-white  dark:bg-slate-800 dark:text-white">
                  <thead>
                    <tr>
                      <th className="py-2">Item Name</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Quantity</th>
                      <th className="py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td className="border px-4 py-2">{item.title}</td>
                        <td className="border px-4 py-2">${item.price}</td>
                        <td className="border px-4 py-2">{item.quantity}</td>
                        <td className="border px-4 py-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(DashboardPage);
