import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { User, Order } from "../types";
import { useRouter } from "next/router";

const AdminDashboardPage = () => {
  const [allUsersOrders, setAllUsersOrders] = useState<{ user: User; order: Order }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<{ user: User; order: Order }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser.email !== "admin@mail.com") {
      router.push("/login"); 
    } else {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const orders: { user: User; order: Order }[] = [];

      users.forEach((user) => {
        user.orders.forEach((order) => {
          orders.push({ user, order });
        });
      });

      setAllUsersOrders(orders);
      setFilteredOrders(orders);
    }
  }, [router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const term = e.target.value.toLowerCase();
    const filtered = allUsersOrders.filter(({ order }) => {
      return order.items.some(item =>
        typeof item.title === "string" &&
        item.title.toLowerCase().includes(term)
      );
    });
    setFilteredOrders(filtered);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    if (filter === "All") {
      setFilteredOrders(allUsersOrders);
    } else {
      const filtered = allUsersOrders.filter(({ order }) => order.status === filter);
      setFilteredOrders(filtered);
    }
  };

  if (filteredOrders.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-2xl mb-6">Admin Dashboard</h1>
          <p>No orders found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-slate-900 dark:text-white">
        <h1 className="text-2xl mb-6">Admin Dashboard</h1>
        <input
          type="text"
          placeholder="Search orders"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <select
          onChange={handleFilterChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <table className="min-w-full bg-white dark:bg-slate-900 dark:text-white">
          <thead>
            <tr>
              <th className="py-2">Order Name</th>
              <th className="py-2">Customer Name</th>
              <th className="py-2">Date</th>
              <th className="py-2">Total Price</th>
              <th className="py-2">Items Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(({ user, order }, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {order.items.map((item) => item.title).join(", ")}
                </td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">
                  {new Date(order.timestamp).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  ${order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </td>
                <td className="border px-4 py-2">
                  {order.items.reduce((total, item) => total + item.quantity, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
