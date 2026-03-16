import React, { useEffect, useState } from "react";
import "./Orders.css";

export default function Order() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders">
      <h2>Orders List</h2>

      <div className="orders-container">

        {orders.map((order, index) => (
          <div className="order-card" key={index}>

            <div className="order-left">
              <p className="order-items">
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i !== order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>

              <p className="order-address">
                {order.address.street}, {order.address.city}
              </p>

              <p className="order-phone">
                Phone: {order.address.phone}
              </p>
            </div>

            <div className="order-right">
              <p className="order-price">₹ {order.amount}</p>

              <select className="order-status">
                <option>Food Processing</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
              </select>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}