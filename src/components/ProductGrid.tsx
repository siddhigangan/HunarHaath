import { Product as SellerProduct } from "@/data/sellers";
import { Product as StaticProduct } from "@/data/products";
import { Link } from "react-router-dom";

type Product = SellerProduct | StaticProduct;

interface ProductGridProps {
  products: Product[];
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
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="aspect-square overflow-hidden">
            {('images' in product ? product.images[0] : product.image) ? (
              <img
                src={'images' in product ? product.images[0] : product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-craft-forest group-hover:text-craft-terracotta transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{product.category}</p>
            <p className="text-craft-terracotta font-medium mt-2">₹{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
} 