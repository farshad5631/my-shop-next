// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { User, Order } from '../types';
// import Layout from '../components/Layout';

// const AdminDashboardPage = () => {
//   const [allUsersOrders, setAllUsersOrders] = useState<{ user: User; order: Order }[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//     if (currentUser.email !== 'admin@admin') {
//       router.push('/login'); // Redirect if not admin
//     } else {
//       const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
//       const orders: { user: User; order: Order }[] = [];

//       users.forEach(user => {
//         user.orders.forEach(order => {
//           orders.push({ user, order });
//         });
//       });

//       setAllUsersOrders(orders);
//     }
//   }, [router]);

//   if (allUsersOrders.length === 0) {
//     return (
//       <Layout>
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//           <h1 className="text-2xl mb-6">Admin Dashboard</h1>
//           <p>No orders found.</p>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="flex flex-col items-center justify-center min-h-screen py-2">
//         <h1 className="text-2xl mb-6">Admin Dashboard</h1>
//         <h2 className="text-xl mb-4">All Users' Order Histories</h2>
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="py-2">Customer Name</th>
//               <th className="py-2">Order Date</th>
//               <th className="py-2">Total Price</th>
//               <th className="py-2">Items</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allUsersOrders.map((entry, index) => (
//               <tr key={index}>
//                 <td className="border px-4 py-2">{`${entry.user.name} ${entry.user.family}`}</td>
//                 <td className="border px-4 py-2">{new Date(entry.order.timestamp).toLocaleDateString()}</td>
//                 <td className="border px-4 py-2">${entry.order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</td>
//                 <td className="border px-4 py-2">
//                   <ul>
//                     {entry.order.items.map((item, itemIndex) => (
//                       <li key={itemIndex}>{`${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`}</li>
//                     ))}
//                   </ul>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboardPage;

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { User, Order, CartItem } from "../types";
import { useRouter } from "next/router";

const AdminDashboardPage = () => {
  const [allUsersOrders, setAllUsersOrders] = useState<
    { user: User; order: Order }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<
    { user: User; order: Order }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser.email !== "admin@mail.com") {
      router.push("/login"); // Redirect if not admin
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
    const filtered = allUsersOrders.filter(({ user, order }) => {
      const userName =
        typeof user.name === "string" ? user.name.toLowerCase() : "";
      
      const orderItems = order.items.some(
        (item) =>
          typeof item.title === "string" &&
          item.title.toLowerCase().includes(term)
      );
      return userName.includes(term) || orderItems;
    });
    setFilteredOrders(filtered);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    if (filter === "All") {
      setFilteredOrders(allUsersOrders);
    } else {
      const filtered = allUsersOrders.filter(({ order }) => {
        // Assuming order has a status property; adjust according to your actual data structure
        return order.status === filter;
      });
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
      <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-blue-900 dark:text-white">
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
        <table className="min-w-full bg-white">
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
                <td className="border px-4 py-2">{`${user.name} `}</td>
                <td className="border px-4 py-2">
                  {new Date(order.timestamp).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  $
                  {order.items
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </td>
                <td className="border px-4 py-2">
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
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
