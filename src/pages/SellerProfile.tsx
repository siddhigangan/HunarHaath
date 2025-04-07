import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSellerById, getProductsBySeller } from "@/data/sellers";
import { Product } from "@/data/sellers";
import { Link } from "react-router-dom";

export default function SellerProfile() {
  const { id } = useParams<{ id: string }>();
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSellerData = () => {
      try {
        if (!id) {
          setError("Seller ID not provided");
          return;
        }

        const sellerData = getSellerById(id);
        if (!sellerData) {
          setError("Seller not found");
          return;
        }

        setSeller(sellerData);
        const sellerProducts = getProductsBySeller(id);
        setProducts(sellerProducts);
      } catch (err) {
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
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error || "Seller not found"}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Seller Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {seller.photo && (
              <img
                src={seller.photo}
                alt={seller.name}
                className="w-32 h-32 rounded-full object-cover"
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-serif text-craft-forest mb-2">{seller.name}</h1>
              <p className="text-gray-600 mb-2">{seller.email}</p>
              <p className="text-gray-600 mb-2">{seller.contact}</p>
              <p className="text-gray-600 mb-2">{seller.address}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {seller.categories.map((category: string) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-craft-terracotta/10 text-craft-terracotta rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Seller's Products */}
        <h2 className="text-2xl font-serif text-craft-forest mb-6">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-craft-forest mb-2">
                  {product.name}
                </h3>
                <p className="text-craft-terracotta font-medium">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 