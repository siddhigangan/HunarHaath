import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomizeProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [customProduct, setCustomProduct] = useState({
    name: "",
    description: "",
    category: [] as string[],
    inspirationDescription: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categoryOptions = ["Pottery", "Clothing", "Accessories", "Food", "Jewellery", "Home Decor"];

  const handleCategoryChange = (category: string) => {
    setCustomProduct((prev) => ({
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
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!selectedImage) {
      setError("Please upload an inspiration image");
      setLoading(false);
      return;
    }

    if (customProduct.category.length === 0) {
      setError("Please select at least one category");
      setLoading(false);
      return;
    }

    try {
      // Get existing customized products or initialize empty array
      const customizedProductsJson = localStorage.getItem("customizedProducts");
      const customizedProducts = customizedProductsJson ? JSON.parse(customizedProductsJson) : [];

      // Create new customized product
      const newCustomProduct = {
        id: Date.now().toString(),
        ...customProduct,
        inspirationImage: imagePreview,
        status: "pending", // pending, in-progress, completed
        createdAt: new Date().toISOString(),
      };

      console.log("Saving new customized product:", newCustomProduct);

      // Add to localStorage
      customizedProducts.push(newCustomProduct);
      localStorage.setItem("customizedProducts", JSON.stringify(customizedProducts));

      console.log("Updated customized products in localStorage:", customizedProducts);
      console.log("localStorage after update:", localStorage.getItem("customizedProducts"));
      
      // Verify the data was stored correctly
      const verifyData = localStorage.getItem("customizedProducts");
      console.log("Verification - Data in localStorage:", verifyData);
      if (verifyData) {
        const parsedData = JSON.parse(verifyData);
        console.log("Verification - Parsed data:", parsedData);
        console.log("Verification - Number of products:", parsedData.length);
      }

      setSuccess(true);
      setCustomProduct({
        name: "",
        description: "",
        category: [],
        inspirationDescription: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
      });
      setSelectedImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error submitting customized product:", err);
      setError("Your request has been sent to our sellers. They will review it and get back to you soon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif text-craft-forest mb-6">Customize Your Product</h1>
        
        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-medium text-green-800 mb-2">Request Submitted Successfully!</h2>
            <p className="text-green-700 mb-4">
              Your request has been sent to our sellers. They will review it and get back to you soon.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <p className="text-gray-600 mb-6">
              Have a specific product in mind? Upload an inspiration image and describe what you're looking for. 
              Our artisans will review your request and get back to you with a customized solution.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={customProduct.customerName}
                  onChange={(e) => setCustomProduct({ ...customProduct, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={customProduct.customerEmail}
                  onChange={(e) => setCustomProduct({ ...customProduct, customerEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={customProduct.customerPhone}
                  onChange={(e) => setCustomProduct({ ...customProduct, customerPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name (if you have one in mind)</label>
                <input
                  type="text"
                  value={customProduct.name}
                  onChange={(e) => setCustomProduct({ ...customProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
                  placeholder="e.g., Custom Ceramic Vase"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="flex flex-wrap gap-4">
                  {categoryOptions.map((category) => (
                    <label key={category} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={customProduct.category.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                <textarea
                  value={customProduct.description}
                  onChange={(e) => setCustomProduct({ ...customProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
                  rows={3}
                  placeholder="Describe the product you're looking for in detail"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inspiration Description</label>
                <textarea
                  value={customProduct.inspirationDescription}
                  onChange={(e) => setCustomProduct({ ...customProduct, inspirationDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-craft-terracotta"
                  rows={3}
                  placeholder="Describe what you like about the inspiration image"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Inspiration Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Inspiration"
                      className="h-48 rounded border border-gray-200 object-cover"
                    />
                  </div>
                )}
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-craft-terracotta text-white py-2 px-4 rounded hover:bg-craft-clay disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Customization Request"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 