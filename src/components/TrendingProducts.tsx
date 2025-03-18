
import { ProductCard } from "./ProductCard";
import { trendingProducts } from "@/data/products";

export function TrendingProducts() {
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
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              artisan={product.artisan}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
