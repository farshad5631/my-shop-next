import { useEffect, useState } from "react";
import { Order } from "../types";

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    const currentUser = users[0];
    if (currentUser && currentUser.orders) {
      setOrders(currentUser.orders);
    }
  }, []);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Customer Name</th>
          <th className="py-2">Date</th>
          <th className="py-2">Price</th>
          <th className="py-2">Item Name</th>
          <th className="py-2">Total Items</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{`${order.name} ${order.family}`}</td>
            <td className="border px-4 py-2">
              {new Date(order.timestamp).toLocaleDateString()}
            </td>
            <td className="border px-4 py-2">
              ${order.price * order.quantity}
            </td>
            <td className="border px-4 py-2">{order.name}</td>
            <td className="border px-4 py-2">{order.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderHistory;
