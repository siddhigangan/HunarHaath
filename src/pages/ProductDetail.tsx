import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { getProductById } from "@/data/sharedProducts";
import { useEffect, useState } from "react";
import { Product as SellerProduct } from "@/data/sellers";
import { Product } from "@/types";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<SellerProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct || null);
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-craft-terracotta mx-auto"></div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="bg-craft-terracotta hover:bg-craft-clay">Return to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    // Convert SellerProduct to Product
    const cartProduct: Product = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      artisan: product.artisan,
      category: product.category,
      description: product.description,
      materials: product.materials,
      inStock: true
    };
    addToCart(cartProduct);
    toast.success("Product added to cart!");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-6">
          <ul className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-craft-forest hover:text-craft-terracotta">Home</Link>
            </li>
            <li><span className="mx-2">/</span></li>
            <li>
              <Link to={`/category/${product.category.toLowerCase()}`} className="text-craft-forest hover:text-craft-terracotta">
                {product.category}
              </Link>
            </li>
            <li><span className="mx-2">/</span></li>
            <li><span className="font-medium">{product.name}</span></li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-serif text-craft-forest mb-4">{product.name}</h1>
            <p className="text-2xl font-medium text-craft-terracotta mb-6">₹{product.price}</p>
            
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Artisan</h3>
                <p className="text-gray-700">{product.artisan}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <p className="text-gray-700">{product.category}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Materials</h3>
                <p className="text-gray-700">{product.materials}</p>
              </div>
            </div>

            <div className="mt-8">
              <Button 
                className="w-full bg-craft-terracotta hover:bg-craft-clay text-lg py-6"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}