import React from 'react';
import { getAllProducts } from '@/data/sharedProducts';
import { ProductCard } from '@/components/ProductCard';

const AllProducts: React.FC = () => {
  const products = getAllProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.images[0]}
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
};

export default AllProducts; 