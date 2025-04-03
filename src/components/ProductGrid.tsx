import { Product } from "@/data/sellers";
import { Link } from "react-router-dom";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
        >
          <div className="aspect-square relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-lg mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-craft-terracotta font-medium">₹{product.price}</p>
              <p className="text-sm text-gray-500">By {product.artisan}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 