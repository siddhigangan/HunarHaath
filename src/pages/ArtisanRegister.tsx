import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSeller, getSellerByEmail } from "@/data/sellers";

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
  const navigate = useNavigate();

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

    if (artisan.categories.length === 0) {
      setError("Please select at least one category");
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

      // Create seller profile
      const sellerData = {
        ...artisan,
        photo: photoUrl,
      };

      createSeller(sellerData);
      
      // Store seller ID in session for authentication
      const seller = getSellerByEmail(artisan.email);
      if (seller) {
        localStorage.setItem('currentSellerId', seller.id);
      }

      alert("Registration successful! You can now log in as a seller.");
      navigate("/seller-dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Artisan Registration</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" type="text" required onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="contact">Contact Number</Label>
          <Input id="contact" name="contact" type="tel" required onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required onChange={handleChange} />
        </div>
        
        {/* Categories Section */}
        <div>
          <Label className="block mb-2">Product Categories</Label>
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={category.toLowerCase()}
                  checked={artisan.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 rounded border-gray-300 text-craft-terracotta focus:ring-craft-terracotta"
                />
                <Label htmlFor={category.toLowerCase()} className="text-sm font-medium">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="photo">Upload Photo</Label>
          <Input id="photo" name="photo" type="file" accept="image/*" required onChange={handleFileChange} />
        </div>
        <div>
          <Label htmlFor="address">Your Address</Label>
          <Input id="address" name="address" type="text" required onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="shopAddress">Shop Address</Label>
          <Input id="shopAddress" name="shopAddress" type="text" required onChange={handleChange} />
        </div>
        <Button type="submit" className="w-full bg-craft-terracotta hover:bg-craft-clay">
          Register
        </Button>
      </form>
    </div>
  );
}
