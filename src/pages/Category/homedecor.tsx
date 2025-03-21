import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomeDecorCategory() {
  const [filteredProducts, setFilteredProducts] = useState(
    products.filter((product) => product.category.toLowerCase() === "home-decor")
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm breadcrumbs mb-6">
          <ul className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-craft-forest hover:text-craft-terracotta">
                Home
              </Link>
            </li>
            <li><span className="mx-2">/</span></li>
            <li><span className="font-medium">Home Decor</span></li>
          </ul>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-craft-forest mb-2">Artistic Home Decor</h1>
          <p className="text-craft-forest/80 max-w-3xl">
            Elevate your living spaces with our handcrafted home decor collection.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className={`w-full md:w-64 md:block ${isFilterOpen ? "block" : "hidden"}`}>
            <div className="bg-white p-4 rounded-lg border border-craft-earth/10 shadow-sm">
              <h2 className="font-medium text-lg mb-4">Filters</h2>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Material</h3>
                <div className="space-y-2">
                  {["Wood", "Metal", "Glass"].map((material) => (
                    <div key={material} className="flex items-center">
                      <input type="checkbox" id={material.toLowerCase()} className="mr-2 h-4 w-4" />
                      <label htmlFor={material.toLowerCase()}>{material}</label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { id: "price1", label: "Under ₹50" },
                    { id: "price2", label: "₹50 - $₹00" },
                    { id: "price3", label: "₹100 - ₹200" },
                  ].map(({ id, label }) => (
                    <div key={id} className="flex items-center">
                      <input type="checkbox" id={id} className="mr-2 h-4 w-4" />
                      <label htmlFor={id}>{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-6 bg-craft-terracotta hover:bg-craft-clay">Apply Filters</Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="md:hidden mb-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-craft-earth/20"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} />
                <span>{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
              </Button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-craft-forest">Showing {filteredProducts.length} items</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <SlidersHorizontal className="mx-auto h-12 w-12 text-craft-forest/30 mb-4" />
                <h3 className="text-lg font-medium mb-2">No items match your filters</h3>
                <p className="text-craft-forest/70 mb-6">Try adjusting your filters or browse other categories</p>
                <Button
                  onClick={() => setFilteredProducts(products.filter((product) => product.category.toLowerCase() === "home-decor"))}
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
