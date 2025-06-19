import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  "Pottery",
  "Food",
  "Clothing",
  "Home Decor",
  "Jewelry",
  "Accessories"
];

export default function ArtisanRegister() {
  const [artisan, setArtisan] = useState({
    name: "",
    contact: "",
    email: "",
    categories: [] as string[],
    photo: null as File | null,
    address: "",
    shopAddress: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtisan({ ...artisan, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtisan({ ...artisan, photo: e.target.files?.[0] || null });
    setError(null);
  };

  const handleCategoryChange = (category: string) => {
    setArtisan(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (artisan.categories.length === 0) {
      setError("Please select at least one category");
      setIsLoading(false);
      return;
    }

    try {
      // Convert photo to base64 if exists
      let photoUrl = null;
      if (artisan.photo) {
        const reader = new FileReader();
        photoUrl = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(artisan.photo!);
        });
      }

      console.log('Attempting to connect to backend...');
      
      // Send registration request
      const response = await fetch('http://localhost:5000/api/seller/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: artisan.name,
          contact: artisan.contact,
          email: artisan.email,
          categories: JSON.stringify(artisan.categories),
          address: artisan.address,
          shopAddress: artisan.shopAddress,
          password: artisan.password,
          photo: photoUrl,
        }),
      }).catch(error => {
        console.error('Network error:', error);
        throw new Error('Unable to connect to the server. Please make sure the server is running.');
      });

      if (!response) {
        throw new Error('No response from server');
      }

      const data = await response.json();
      console.log('Server response:', { ...data, data: { ...data.data, password: '[REDACTED]' } });

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store seller authentication data
      localStorage.setItem('sellerId', data.data._id);
      localStorage.setItem('isSeller', 'true');

      toast({
        title: "Registration Successful",
        description: "Welcome to CraftConnect! You can now start selling your products.",
      });

      navigate("/seller-dashboard");
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
      toast({
        title: "Registration Failed",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif text-craft-forest mb-8 text-center">
          Register as an Artisan
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={artisan.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              value={artisan.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={artisan.email}
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
              value={artisan.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={artisan.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="shopAddress">Shop Address</Label>
            <Input
              id="shopAddress"
              name="shopAddress"
              value={artisan.shopAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Categories</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={artisan.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox text-craft-terracotta"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="photo">Profile Photo</Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-craft-terracotta text-white py-2 px-4 rounded hover:bg-craft-terracotta/90"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register as Artisan"}
          </Button>
        </form>
      </div>
    </div>
  );
}
