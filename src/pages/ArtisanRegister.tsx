import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ArtisanRegister() {
  const [artisan, setArtisan] = useState({
    name: "",
    contact: "",
    email: "",
    category: "",
    photo: null,
    address: "",
    shopAddress: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtisan({ ...artisan, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtisan({ ...artisan, photo: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("artisanData", JSON.stringify(artisan));
    alert("Registration successful! You can now log in as a seller.");
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Artisan Registration</h2>
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
        <div>
          <Label htmlFor="category">Product Category</Label>
          <Input id="category" name="category" type="text" required onChange={handleChange} />
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
