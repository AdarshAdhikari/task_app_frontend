import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/projects");
    } catch (err) {
      alert(err.response?.data || "Login failed");
      console.error(err.response?.data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p
          onClick={() => navigate("/forget-password")}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Forgot Password?
        </p>

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
