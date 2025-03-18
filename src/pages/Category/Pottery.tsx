
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { products } from '@/data/products';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PotteryCategory() {
  const [filteredProducts, setFilteredProducts] = useState(products.filter(product => product.category === "Pottery"));
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <div className="text-sm breadcrumbs mb-6">
          <ul className="flex items-center space-x-2">
            <li><Link to="/" className="text-craft-forest hover:text-craft-terracotta">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><span className="font-medium">Pottery</span></li>
          </ul>
        </div>

        {/* Category header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-craft-forest mb-2">Handcrafted Pottery</h1>
          <p className="text-craft-forest/80 max-w-3xl">
            Discover unique, handcrafted pottery pieces made by skilled artisans. 
            Each piece tells a story and adds a special touch to your home.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters (hidden on mobile) */}
          <div className={`w-full md:w-64 md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-4 rounded-lg border border-craft-earth/10 shadow-sm">
              <h2 className="font-medium text-lg mb-4">Filters</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Materials</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="clay" className="mr-2 h-4 w-4" />
                    <label htmlFor="clay">Clay</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="stoneware" className="mr-2 h-4 w-4" />
                    <label htmlFor="stoneware">Stoneware</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="porcelain" className="mr-2 h-4 w-4" />
                    <label htmlFor="porcelain">Porcelain</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="terracotta" className="mr-2 h-4 w-4" />
                    <label htmlFor="terracotta">Terracotta</label>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="price1" className="mr-2 h-4 w-4" />
                    <label htmlFor="price1">Under $50</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price2" className="mr-2 h-4 w-4" />
                    <label htmlFor="price2">$50 - $100</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price3" className="mr-2 h-4 w-4" />
                    <label htmlFor="price3">$100 - $200</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price4" className="mr-2 h-4 w-4" />
                    <label htmlFor="price4">$200+</label>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div>
                <h3 className="font-medium mb-2">Artisan Rating</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="rating4" className="mr-2 h-4 w-4" />
                    <label htmlFor="rating4">4+ Stars</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="rating3" className="mr-2 h-4 w-4" />
                    <label htmlFor="rating3">3+ Stars</label>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 bg-craft-terracotta hover:bg-craft-clay">
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Product listing */}
          <div className="flex-1">
            {/* Mobile filter toggle */}
            <div className="md:hidden mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border-craft-earth/20"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} />
                <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
              </Button>
            </div>

            {/* Sort options */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-craft-forest">
                Showing {filteredProducts.length} items
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm hidden sm:inline">Sort by:</span>
                <select className="border border-craft-earth/20 rounded-md px-2 py-1 text-sm bg-white">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Popular</option>
                </select>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <SlidersHorizontal className="mx-auto h-12 w-12 text-craft-forest/30 mb-4" />
                <h3 className="text-lg font-medium mb-2">No items match your filters</h3>
                <p className="text-craft-forest/70 mb-6">Try adjusting your filters or browse our other categories</p>
                <Button 
                  onClick={() => setFilteredProducts(products.filter(product => product.category === "Pottery"))}
                  className="bg-craft-terracotta hover:bg-craft-clay"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
