import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSellerById, getSellers } from "@/data/sellers";
import { Product } from "@/data/sellers";
import { getAllProducts } from "@/data/sharedProducts";

export default function SellerProfile() {
  const { id } = useParams<{ id: string }>();
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSellerData = () => {
      try {
        console.log("Loading seller data for ID:", id);
        
        if (!id) {
          console.error("Seller ID not provided");
          setError("Seller ID not provided");
          return;
        }

        // Debug: Check all sellers
        const allSellers = getSellers();
        console.log("All sellers:", allSellers);
        
        const sellerData = getSellerById(id);
        console.log("Seller data found:", sellerData);
        
        if (!sellerData) {
          console.error("Seller not found for ID:", id);
          setError("Seller not found");
          return;
        }

        setSeller(sellerData);
        
        // Get products from sellerProducts localStorage
        const allProducts = getAllProducts();
        
        // Filter products by seller ID or artisan name, but prioritize sellerId match
        const sellerProducts = allProducts.filter(product => {
          // First check if the product belongs to this seller by ID
          if (product.sellerId === id) {
            return true;
          }
          // If no sellerId match, check if the artisan name matches
          if (product.artisan === sellerData.name) {
            // Only include if the product doesn't already have a sellerId
            return !product.sellerId;
          }
          return false;
        });
        
        console.log("Filtered products for seller:", sellerProducts);
        
        // Remove duplicates by ID
        const uniqueProducts = Array.from(
          new Map(sellerProducts.map(product => [product.id, product])).values()
        );
        
        console.log("Unique products:", uniqueProducts);
        setProducts(uniqueProducts);
      } catch (err) {
        console.error("Error loading seller data:", err);
        setError("Error loading seller data");
      } finally {
        setLoading(false);
      }
    };

    loadSellerData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-craft-forest"></div>
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-craft-forest mb-4">{error || "Seller not found"}</h2>
          <Link to="/" className="text-craft-forest hover:text-craft-forest/80">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-craft-forest">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">Seller Profile</li>
          </ol>
        </nav>

        {/* Seller Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {seller.photo ? (
                <img
                  src={seller.photo.startsWith('/') ? seller.photo : `/${seller.photo}`}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Error loading image: ${seller.photo}`);
                    e.currentTarget.src = '/Artisian.jpg'; // Fallback image
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-4xl">👤</span>
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-serif text-craft-forest mb-4">{seller.name}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="text-gray-600">{seller.contact}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-600">{seller.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="text-gray-600">{seller.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Shop Address</h3>
                  <p className="text-gray-600">{seller.shopAddress}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {seller.categories.map((category: string) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-craft-forest/10 text-craft-forest rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seller's Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-craft-forest mb-6">Products by {seller.name}</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square">
                    {(product.images?.[0] || product.image) ? (
                      <img
                        src={product.images?.[0] || product.image}
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
                    <h3 className="text-lg font-medium text-craft-forest mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-craft-forest font-medium">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No products found for this seller.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 