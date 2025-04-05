import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { staticProducts, getNewArrivals, getTrendingProducts } from "@/data/staticProducts";

export default function Home() {
  const newArrivals = getNewArrivals();
  const trendingProducts = getTrendingProducts();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-craft-forest mb-4">
            Discover Handcrafted Treasures
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of unique handcrafted items made by talented artisans.
          </p>
        </div>

        {/* New Arrivals */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-craft-forest mb-6">New Arrivals</h2>
          {newArrivals.length > 0 ? (
            <ProductGrid products={newArrivals} />
          ) : (
            <p className="text-center text-gray-600">No new products added recently.</p>
          )}
        </section>

        {/* Trending Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-craft-forest mb-6">Trending Products</h2>
          <ProductGrid products={trendingProducts} />
        </section>

        {/* All Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-craft-forest mb-6">All Products</h2>
          <ProductGrid products={staticProducts} />
        </section>
      </div>
    </Layout>
  );
} 