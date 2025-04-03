import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByCategory, Product } from "@/data/sellers";

export default function FoodCategory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      const foodProducts = getProductsByCategory("Food");
      setProducts(foodProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm breadcrumbs mb-6">
          <ul className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-craft-forest hover:text-craft-terracotta">Home</a>
            </li>
            <li><span className="mx-2">/</span></li>
            <li><span className="font-medium">Food</span></li>
          </ul>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-craft-forest mb-2">Handcrafted Food</h1>
          <p className="text-craft-forest/80 max-w-3xl">
            Discover authentic handcrafted food items made with traditional recipes and techniques.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-craft-terracotta mx-auto"></div>
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No food products available at the moment.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
