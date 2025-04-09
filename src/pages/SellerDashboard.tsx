import { useState, useEffect } from "react";
import { Product } from "@/data/sellers";
import { getAllProducts, addProduct, deleteProduct } from "@/data/sharedProducts";
import { useNavigate } from "react-router-dom";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [customizedProducts, setCustomizedProducts] = useState<any[]>([]);
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
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
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
    loadCustomizedProducts();
  }, [navigate]);

  // Add a new useEffect to reload customized products when the component mounts
  useEffect(() => {
    // Force a reload of customized products when the component mounts
    loadCustomizedProducts();
  }, []);

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

  const loadCustomizedProducts = () => {
    try {
      // Direct approach - just get the data from localStorage
      const customizedProductsJson = localStorage.getItem("customizedProducts");
      console.log("Raw customized products from localStorage:", customizedProductsJson);
      
      if (customizedProductsJson) {
        const allCustomizedProducts = JSON.parse(customizedProductsJson);
        console.log("Parsed customized products:", allCustomizedProducts);
        
        // Simply set all customized products to state
        setCustomizedProducts(allCustomizedProducts);
      } else {
        console.log("No customized products found in localStorage");
        setCustomizedProducts([]);
      }
    } catch (err) {
      console.error("Error loading customized products:", err);
      setCustomizedProducts([]);
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
      setSelectedImageFile(file);
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

  const updateCustomizedProductStatus = (id: string, newStatus: string) => {
    try {
      console.log("Updating status for product:", id, "to:", newStatus);
      const customizedProductsJson = localStorage.getItem("customizedProducts");
      if (customizedProductsJson) {
        const allCustomizedProducts = JSON.parse(customizedProductsJson);
        console.log("Current customized products:", allCustomizedProducts);
        
        const updatedProducts = allCustomizedProducts.map((product: any) => {
          if (product.id === id) {
            console.log("Found product to update:", product);
            return { ...product, status: newStatus };
          }
          return product;
        });
        
        console.log("Updated products:", updatedProducts);
        localStorage.setItem("customizedProducts", JSON.stringify(updatedProducts));
        setCustomizedProducts(updatedProducts);
        console.log("State updated with:", updatedProducts);
      }
    } catch (err) {
      console.error("Error updating customized product status:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-craft-forest">Seller Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={loadCustomizedProducts}
            className="bg-craft-forest text-white px-4 py-2 rounded hover:bg-craft-terracotta"
          >
            Reload Customizations
          </button>
          <button
            onClick={handleLogout}
            className="bg-craft-terracotta text-white px-4 py-2 rounded hover:bg-craft-clay"
          >
        Logout
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="bg-white p-4 rounded-lg max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Inspiration Image</h3>
            </div>
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-10"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Inspiration"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Customized Products Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-serif text-craft-forest mb-4">Customization Requests</h2>
        
        {customizedProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customizedProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.customerName}</div>
                      <div className="text-sm text-gray-500">{product.customerEmail}</div>
                      <div className="text-sm text-gray-500">{product.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{product.name || "Unnamed Product"}</div>
                      <div className="text-sm text-gray-500 line-clamp-2">{product.description}</div>
                      {product.inspirationImage && (
                        <button
                          onClick={() => {
                            setSelectedImage(product.inspirationImage);
                            setShowImageModal(true);
                          }}
                          className="mt-2 text-sm text-craft-forest hover:text-craft-terracotta flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Inspiration Image
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {(Array.isArray(product.category) ? product.category : [product.category]).map((cat: string) => (
                          <span key={cat} className="px-2 py-1 text-xs bg-craft-forest/10 text-craft-forest rounded-full">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        product.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {product.status === "pending" ? "Pending" :
                         product.status === "in-progress" ? "In Progress" :
                         "Completed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {product.status === "pending" && (
                          <button
                            onClick={() => updateCustomizedProductStatus(product.id, "in-progress")}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Start
                          </button>
                        )}
                        {product.status === "in-progress" && (
                          <button
                            onClick={() => updateCustomizedProductStatus(product.id, "completed")}
                            className="text-green-600 hover:text-green-900"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => {
                            // View details logic
                            alert(`Product: ${product.name || "Unnamed Product"}\nDescription: ${product.description}\nInspiration: ${product.inspirationDescription}`);
                          }}
                          className="text-craft-forest hover:text-craft-terracotta"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No customization requests yet.</p>
          </div>
        )}
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

      {/* Your Products Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-serif text-craft-forest mb-4">Your Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden">
                <div className="aspect-square">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      <span className="text-4xl">🖼️</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-craft-forest mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-craft-forest font-medium mb-2">₹{product.price.toLocaleString()}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(Array.isArray(product.category) ? product.category : [product.category]).map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-1 text-xs bg-craft-forest/10 text-craft-forest rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't added any products yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}