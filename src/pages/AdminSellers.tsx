import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Seller {
  _id: string;
  name: string;
  email: string;
  contact: string;
  categories: string[];
  address: string;
  shopAddress: string;
  photo: string | null;
  createdAt: string;
}

export default function AdminSellers() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sellers');
      const data = await response.json();
      
      if (data.success) {
        setSellers(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch sellers",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading sellers...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif text-craft-forest mb-8">All Sellers</h1>
      
      {sellers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No sellers found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sellers.map((seller) => (
                <tr key={seller._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{seller.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{seller.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{seller.contact}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {seller.categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 text-xs bg-craft-forest/10 text-craft-forest rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">{seller.address}</td>
                  <td className="px-6 py-4">{seller.shopAddress}</td>
                  <td className="px-6 py-4">
                    {seller.photo ? (
                      <img
                        src={seller.photo}
                        alt={seller.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No photo</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 