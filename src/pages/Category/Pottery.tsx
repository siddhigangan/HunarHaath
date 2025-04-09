import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByCategory, getAllProducts } from "@/data/sharedProducts";
import { Product as SellerProduct } from "@/data/sellers";

export default function PotteryCategory() {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debug, setDebug] = useState<string>("");

  useEffect(() => {
    const loadProducts = () => {
      try {
        console.log("Loading pottery products...");
        
        // Get all products first for debugging
        const allProducts = getAllProducts();
        console.log(`Total products available: ${allProducts.length}`);
        
        // Get products for this category
        const potteryProducts = getProductsByCategory("Pottery");
        console.log(`Found ${potteryProducts.length} pottery products`);
        
        // Set products and update debug info
        setProducts(potteryProducts);
        setDebug(`Loaded ${potteryProducts.length} pottery products out of ${allProducts.length} total products`);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading pottery products:", error);
        setDebug(`Error: ${error instanceof Error ? error.message : String(error)}`);
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm breadcrumbs mb-6">
        <ul className="flex items-center space-x-2">
          <li>
            <a href="/" className="text-craft-forest hover:text-craft-terracotta">Home</a>
          </li>
          <li><span className="mx-2">/</span></li>
          <li><span className="font-medium">Pottery</span></li>
        </ul>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-craft-forest mb-2">Handcrafted Pottery</h1>
        <p className="text-craft-forest/80 max-w-3xl">
          Discover unique pottery pieces crafted by talented artisans. Each piece tells a story of tradition and craftsmanship.
        </p>
      </div>

      {/* Debug info */}
      <div className="mb-4 p-4 bg-gray-100 rounded text-sm">
        {debug}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-craft-terracotta mx-auto"></div>
        </div>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No pottery products available at the moment.</p>
        </div>
      )}
    </div>
  );
}
