
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Heart, ShoppingCart, MessageSquare } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product with the matching ID
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-serif">Product not found</h1>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} (Qty: ${quantity}) has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleContactArtisan = () => {
    toast({
      title: "Message Sent",
      description: `Your message to ${product.artisan} has been sent.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="animate-fade-up">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="mb-6">
              <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
              <p className="text-xl font-medium text-craft-terracotta mb-4">${product.price.toFixed(2)}</p>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-craft-cream text-craft-forest">
                  {product.category}
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                By <span className="text-craft-forest">{product.artisan}</span>
              </p>
              <p className="mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Materials:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material) => (
                    <span
                      key={material}
                      className="px-3 py-1 text-sm bg-craft-sage/20 text-craft-forest rounded-full"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <p className="mr-4 font-medium">Quantity:</p>
              <div className="flex items-center border border-craft-earth/30 rounded-md">
                <button
                  className="px-3 py-1 text-lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-craft-earth/30">
                  {quantity}
                </span>
                <button
                  className="px-3 py-1 text-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                className="w-full bg-craft-terracotta hover:bg-craft-clay text-white flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="border-craft-forest text-craft-forest flex items-center justify-center gap-2"
                  onClick={handleAddToWishlist}
                >
                  <Heart size={18} />
                  Save to Wishlist
                </Button>
                <Button 
                  variant="outline" 
                  className="border-craft-forest text-craft-forest flex items-center justify-center gap-2"
                  onClick={handleContactArtisan}
                >
                  <MessageSquare size={18} />
                  Contact Artisan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
