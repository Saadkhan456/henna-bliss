import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Fetch orders for the logged-in user
  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(
            `https://saadprojectbk.vercel.app/orders?email=${user.email}`
          );
          const data = await response.json();
          if (data.success) {
            setOrders(data.orders);
          } else {
            console.error("Failed to fetch orders:", data.message);
          }
        } catch (err) {
          console.error("Error fetching orders:", err);
        }
      };

      fetchOrders();
    }
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {user ? (
        orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col border p-4 rounded-lg mb-4"
              >
                <h2 className="text-lg font-semibold">
                  Product: {order.productName}
                </h2>
                <p className="text-gray-600">Product ID: {order.productId}</p>
                <p className="text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-gray-600">Price: ₹{order.price}</p>
                <p className="text-gray-600">Status: {order.status}</p>
                <p className="text-gray-600">Address: {order.address}</p>
                <p className="text-gray-600">Phone: {order.phone}</p>
                <p className="text-gray-600">
                  Ordered On: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no orders.</p>
        )
      ) : (
        <p>Please log in to view your orders.</p>
      )}
    </div>
  );
};

export default Orders;
