import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SellerLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log('Attempting to connect to backend...');
      
      console.log('Login fetch URL:', 'http://localhost:5000/api/seller/login');
      const response = await fetch('http://localhost:5000/api/seller/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).catch(error => {
        console.error('Network error:', error);
        throw new Error('Unable to connect to the server. Please make sure the server is running.');
      });

      if (!response) {
        throw new Error('No response from server');
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Please try again.');
      }

      const data = await response.json();
      console.log('Server response:', { ...data, data: { ...data.data, password: '[REDACTED]' } });

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store seller authentication data
      localStorage.setItem('sellerId', data.data._id);
      localStorage.setItem('isSeller', 'true');

      toast({
        title: "Login Successful",
        description: "Welcome back to CraftConnect!",
      });

      navigate("/seller-dashboard");
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
      toast({
        title: "Login Failed",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-craft-terracotta text-white py-2 px-4 rounded hover:bg-craft-terracotta/90"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login as Seller"}
          </Button>
        </form>
      </div>
    </div>
  );
} 