import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/book");
    } else {
      setErrorMessage("Invalid username or password!");
    }
  };

  return (
    <div className="login-box">
      <h1>🔐 Login to Bookstore</h1>
      <label>Username:</label>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
