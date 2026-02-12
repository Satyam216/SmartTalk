import { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/login", {
      email,
      password,
    });
    login(data);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">SmartTalk Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 p-2 rounded">
          Login
        </button>
        <p className="text-sm text-center">
          New user? <Link to="/register" className="text-blue-400">Register</Link>
        </p>
      </form>
    </div>
  );
}
