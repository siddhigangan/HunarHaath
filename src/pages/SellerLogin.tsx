import { useState } from "react";
import { getSellerByEmail } from "@/data/sellers";
import { useNavigate } from "react-router-dom";

export default function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // For demo purposes, check against Sandeep Lad's credentials
    if (email === "seller@gmail.com" && password === "password123") {
      // Store seller ID in localStorage
      localStorage.setItem("sellerId", "sandeep-lad-id");
      localStorage.setItem("isSeller", "true");
      // Redirect to seller dashboard
      navigate("/seller-dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-serif text-craft-forest mb-8 text-center">
          Seller Login
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-craft-terracotta text-white py-2 px-4 rounded hover:bg-craft-terracotta/90"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo Credentials:</p>
          <p>Email: seller@gmail.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
} 