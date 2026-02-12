import { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/register", form);
    login(data);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg w-96 space-y-3"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {["name","username","email","password","age","city","state"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700"
          />
        ))}

        <button className="w-full bg-green-600 p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
