import { Product as SellerProduct } from "@/data/sellers";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: SellerProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products available in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  );
} 