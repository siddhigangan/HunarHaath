import { ProductCard } from "./ProductCard";
import { getTrendingProducts } from "@/data/sharedProducts";
import { useEffect, useState } from "react";
import { Product as SellerProduct } from "@/data/sellers";

export function TrendingProducts() {
  const [products, setProducts] = useState<SellerProduct[]>([]);

  useEffect(() => {
    const trendingProducts = getTrendingProducts();
    setProducts(trendingProducts);
  }, []);

  return (
    <section className="py-12 bg-craft-cream/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif">Trending Now</h2>
          <a href="/category/all" className="text-craft-terracotta hover:text-craft-clay transition-colors">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images?.[0] || ""}
              artisan={product.artisan}
              category={Array.isArray(product.category) ? product.category[0] : product.category}
              description={product.description}
              materials={product.materials}
              inStock={product.inStock}
              sellerId={product.sellerId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
