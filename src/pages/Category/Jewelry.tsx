import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByCategory } from "@/data/sharedProducts";
import { Product as SellerProduct } from "@/data/sellers";

export default function JewelryCategory() {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      const jewelryProducts = getProductsByCategory("Jewelry");
      setProducts(jewelryProducts);
      setIsLoading(false);
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
          <li><span className="font-medium">Jewelry</span></li>
        </ul>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-craft-forest mb-2">Handcrafted Jewelry</h1>
        <p className="text-craft-forest/80 max-w-3xl">
          Discover unique jewelry pieces crafted by talented artisans. Each piece tells a story of tradition and craftsmanship.
        </p>
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
          <p className="text-gray-600">No jewelry products available at the moment.</p>
        </div>
      )}
    </div>
  );
}
