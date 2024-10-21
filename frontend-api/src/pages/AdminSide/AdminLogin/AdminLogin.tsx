import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { login } from "../../../services/authService"; // Import the service

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    try {
      const data = await login(email, password); 
      localStorage.setItem("accessToken", data.access_token.access_token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="min-w-[400px] flex-col border bg-white px-10 py-16 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Admin Login
        </h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="mb-8 flex justify-center">
            <img
              className="w-32"
              src="https://foggymountain.in/sitepad-data/uploads/2024/01/20240110_101452_0000.jpg"
              alt="Foggy Mountain Admin Side"
            />
          </div>
          <div className="flex flex-col text-base rounded-md">
            <input
              className="mb-5 rounded-lg border p-4 hover:outline-none focus:outline-none hover:border-yellow-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Username or Email"
            />
            <input
              className="border rounded-lg p-4 hover:outline-none focus:outline-none hover:border-yellow-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            className="mt-5 w-full border p-3 bg-gradient-to-r from-gray-800 bg-gray-600 text-white rounded-lg hover:bg-gray-500 scale-105 duration-300"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
