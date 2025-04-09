import { ProductCard } from "./ProductCard";
import { getNewArrivals } from "@/data/sharedProducts";
import { useEffect, useState } from "react";
import { Product as SellerProduct } from "@/data/sellers";

export function NewArrivals() {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [debug, setDebug] = useState<string>("");

  useEffect(() => {
    try {
      console.log("NewArrivals component mounted");
      const newArrivalsProducts = getNewArrivals();
      console.log("Fetched new arrivals:", newArrivalsProducts);
      const limitedProducts = newArrivalsProducts.slice(0, 8);
      setProducts(limitedProducts);
      setDebug(`Found ${newArrivalsProducts.length} new arrivals, displaying ${limitedProducts.length}`);
    } catch (error) {
      console.error("Error loading new arrivals:", error);
      setDebug(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif">New Arrivals</h2>
          <a href="/category/all" className="text-craft-terracotta hover:text-craft-clay transition-colors">
            View all →
          </a>
        </div>
        <div className="mb-4 text-sm text-gray-500">
          {debug}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No new arrivals found
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
