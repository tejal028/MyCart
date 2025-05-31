import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const filteredCart = cartItems.filter(item => item.id !== id);
    setCartItems(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };

  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div>
      <h1>🛒 Your Cart</h1>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => navigate("/book")}>⬅️ Back to Books</button>
        <button onClick={logout} style={{ float: "right" }}>
          Logout
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Book Title</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Total (₹)</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                  />
                </td>
                <td>{item.price * item.quantity}</td>
                <td>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Total Amount: ₹ {getTotal()}</h3>
    </div>
  );
}
