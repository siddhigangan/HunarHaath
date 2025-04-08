import { useState, useEffect } from "react";
import { Product } from "@/data/sellers";
import { getAllProducts, addProduct, deleteProduct } from "@/data/sharedProducts";
import { useNavigate } from "react-router-dom";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: [] as string[],
    materials: "",
    artisan: "",
    images: [] as string[],
    mobile: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categoryOptions = ["Pottery", "Clothing", "Accessories", "Food", "Jewellery", "Home Decor"];

  useEffect(() => {
    const sellerId = localStorage.getItem("sellerId");
    const isSeller = localStorage.getItem("isSeller");

    if (!sellerId || !isSeller) {
      navigate("/seller-login");
      return;
    }

    loadProducts();
  }, [navigate]);

  const loadProducts = () => {
    try {
      const allProducts = getAllProducts();
      const sellerProducts = allProducts.filter((product) => product.sellerId !== "static");
      setProducts(sellerProducts);
    } catch (err) {
      setError("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setNewProduct((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewProduct((prev) => ({
          ...prev,
          images: [reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage) {
      setError("Please select an image");
      return;
    }

    if (!newProduct.mobile.match(/^\d{10}$/)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }

    if (newProduct.category.length === 0) {
      setError("Please select at least one category");
      return;
    }

    try {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) {
        setError("Seller ID not found. Please log in again.");
        return;
      }

      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        materials: newProduct.materials.split(",").map((m) => m.trim()),
        sellerId: sellerId,
        category: newProduct.category,
        mobile: newProduct.mobile,
        isTrending: false,
        inStock: true,
      };

      console.log("🟢 Adding product:", productData);
      addProduct(productData);
      loadProducts();

      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: [],
        materials: "",
        artisan: "",
        images: [],
        mobile: "",
      });
      setSelectedImage(null);
      setImagePreview(null);
      setError(null);
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Error adding product");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        deleteProduct(id);
        loadProducts();
      } catch (err) {
        setError("Error deleting product");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sellerId");
    localStorage.removeItem("isSeller");
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-craft-forest">Seller Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-craft-terracotta text-white px-4 py-2 rounded hover:bg-craft-clay"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-serif text-craft-forest mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Artisan Name</label>
            <input
              type="text"
              value={newProduct.artisan}
              onChange={(e) => setNewProduct({ ...newProduct, artisan: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <div className="flex flex-wrap gap-4">
              {categoryOptions.map((category) => (
                <label key={category} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={newProduct.category.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Materials</label>
            <input
              type="text"
              value={newProduct.materials}
              onChange={(e) => setNewProduct({ ...newProduct, materials: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
              placeholder="Enter materials separated by commas"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              type="text"
              value={newProduct.mobile}
              onChange={(e) => setNewProduct({ ...newProduct, mobile: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-32 rounded border border-gray-200 object-cover"
              />
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-craft-terracotta text-white py-2 px-4 rounded hover:bg-craft-clay"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}