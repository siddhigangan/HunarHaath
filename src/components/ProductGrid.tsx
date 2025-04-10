import { Product as SellerProduct } from "@/data/sellers";
import { ProductCard } from "./ProductCard";
import { useState } from "react";

interface ProductGridProps {
  products: SellerProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [showDebug, setShowDebug] = useState(false);
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products available in this category.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Debug toggle button */}
      <div className="mb-4 flex justify-end">
        <button 
          onClick={() => setShowDebug(!showDebug)}
          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          {showDebug ? "Hide Debug" : "Show Debug"}
        </button>
      </div>
      
      {/* Debug information */}
      {showDebug && (
        <div className="mb-4 p-4 bg-gray-100 rounded text-sm">
          <p>Total products: {products.length}</p>
          <p>Categories: {Array.from(new Set(products.map(p => 
            Array.isArray(p.category) ? p.category.join(', ') : p.category
          ))).join(', ')}</p>
          <p>Products with images: {products.filter(p => p.images && p.images.length > 0).length}</p>
          <p>Products with sellerId: {products.filter(p => p.sellerId && p.sellerId !== "static").length}</p>
        </div>
      )}
      
      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
  );
} 