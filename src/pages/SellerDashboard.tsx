import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSellerById, addProductToSeller, Product } from "@/data/sellers";

export default function SellerDashboard() {
  const [seller, setSeller] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    materials: "",
    images: [] as File[],
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sellerId = localStorage.getItem('currentSellerId');
    if (!sellerId) {
      navigate('/login');
      return;
    }

    const sellerData = getSellerById(sellerId);
    if (!sellerData) {
      navigate('/login');
      return;
    }

    setSeller(sellerData);
  }, [navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewProduct(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Convert images to base64
      const imageUrls = await Promise.all(
        newProduct.images.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        })
      );

      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        images: imageUrls,
        artisan: seller.name,
      };

      addProductToSeller(seller.id, productData);
      
      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        materials: "",
        images: [],
      });

      // Refresh seller data
      const updatedSeller = getSellerById(seller.id);
      if (updatedSeller) {
        setSeller(updatedSeller);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add product");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentSellerId');
    navigate('/');
  };

  if (!seller) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-8">Seller Dashboard</h1>
        
        {/* Seller Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            {seller.photo && (
              <img
                src={seller.photo}
                alt={seller.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="text-xl font-medium">{seller.name}</h2>
              <p className="text-gray-600">{seller.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Contact</h3>
              <p className="text-gray-600">{seller.contact}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Shop Address</h3>
              <p className="text-gray-600">{seller.shopAddress}</p>
            </div>
          </div>
        </div>

        {/* Add New Product Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Add New Product</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border rounded"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a category</option>
                {seller.categories.map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Materials Used</label>
              <input
                type="text"
                value={newProduct.materials}
                onChange={(e) => setNewProduct(prev => ({ ...prev, materials: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Product Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-craft-terracotta hover:bg-craft-clay">
              Add Product
            </Button>
          </form>
          
          {/* Logout Button */}
          <div className="mt-6 pt-6 border-t">
            <Button 
              onClick={handleLogout}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Your Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seller.products.map((product: Product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <p className="text-craft-terracotta font-medium">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
