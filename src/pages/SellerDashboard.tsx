import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Product } from "@/data/sellers";
import { getAllProducts, addProduct, deleteProduct } from "@/data/sharedProducts";

export default function SellerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    materials: "",
    artisan: "",
    images: [] as string[]
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    try {
      const allProducts = getAllProducts();
      // Filter only seller-added products (those with sellerId not "static")
      const sellerProducts = allProducts.filter(product => product.sellerId !== "static");
      setProducts(sellerProducts);
    } catch (err) {
      setError("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewProduct(prev => ({
          ...prev,
          images: [reader.result as string]
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

    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        materials: newProduct.materials.split(",").map(m => m.trim()),
        sellerId: "seller_" + Date.now(), // Generate a unique seller ID
        category: newProduct.category,
        artisan: newProduct.artisan
      };

      addProduct(productData);
      loadProducts(); // Reload products after adding
      
      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        materials: "",
        artisan: "",
        images: []
      });
      setSelectedImage(null);
      setImagePreview(null);
      setError(null);
    } catch (err) {
      setError("Error adding product");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        deleteProduct(id);
        loadProducts(); // Reload products after deleting
      } catch (err) {
        setError("Error deleting product");
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-craft-forest"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-craft-forest">Seller Dashboard</h1>
          <button
            onClick={() => window.location.href = "/"}
            className="bg-craft-forest text-white px-4 py-2 rounded hover:bg-craft-forest/90"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-serif text-craft-forest mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-craft-forest"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-craft-forest"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-craft-forest"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-craft-forest"
                required
              >
                <option value="">Select a category</option>
                <option value="Pottery">Pottery</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Food">Food</option>
                <option value="Home Decor">Home Decor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Materials (comma-separated)
              </label>
              <input
                type="text"
                value={newProduct.materials}
                onChange={(e) => setNewProduct(prev => ({ ...prev, materials: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-craft-forest"
                placeholder="e.g., Cotton, Wood, Metal"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Artisan Name
              </label>
              <input
                type="text"
                value={newProduct.artisan}
                onChange={(e) => setNewProduct(prev => ({ ...prev, artisan: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-craft-forest"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-craft-forest"
                required
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-craft-forest text-white py-2 px-4 rounded hover:bg-craft-forest/90"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Products List */}
        <div>
          <h2 className="text-xl font-serif text-craft-forest mb-4">Your Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
              >
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="font-medium text-craft-forest mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <p className="text-craft-terracotta font-medium mb-4">₹{product.price}</p>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
