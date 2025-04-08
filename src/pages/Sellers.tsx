import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSellers } from "@/data/sellers";
import { Seller } from "@/data/sellers";

export default function Sellers() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSellers = () => {
      try {
        console.log("Loading all sellers");
        const sellersData = getSellers();
        console.log("Sellers data:", sellersData);
        setSellers(sellersData);
      } catch (error) {
        console.error("Error loading sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSellers();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-craft-forest"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif text-craft-forest mb-8">All Sellers</h1>
      
      {sellers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No sellers found.</p>
          <p className="text-gray-600 mt-2">Please check if sellers are being initialized correctly.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((seller) => (
            <div key={seller.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-serif text-craft-forest mb-2">{seller.name}</h2>
              <p className="text-gray-600 mb-2">ID: {seller.id}</p>
              <p className="text-gray-600 mb-2">{seller.email}</p>
              <p className="text-gray-600 mb-4">{seller.contact}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {seller.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-craft-forest/10 text-craft-forest rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <Link
                to={`/seller/${seller.id}`}
                className="block w-full text-center bg-craft-forest text-white py-2 px-4 rounded-lg hover:bg-craft-forest/90 transition-colors"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 