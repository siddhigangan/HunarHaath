
import { Link } from 'react-router-dom';
import { Heart, Leaf, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  artisan: string;
  category: string;
}

export function ProductCard({ id, name, price, image, artisan, category }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to favorites",
      description: `${name} has been added to your favorites.`,
    });
  };

  return (
    <div 
      className="group animate-fade-up relative overflow-hidden border border-nature-sage/30 bg-white rounded-lg shadow-nature hover:shadow-lg transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <Link to={`/product/${id}`}>
          <AspectRatio ratio={1/1}>
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </AspectRatio>
          
          {/* Natural gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-nature-moss/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        
        {/* Category label */}
        <div className="absolute top-3 left-3">
          <Link to={`/category/${category.toLowerCase()}`}>
            <span className="text-xs px-3 py-1 bg-nature-linen/80 backdrop-blur-sm rounded-full text-nature-moss font-medium border border-nature-sage/30 hover:bg-nature-linen transition-colors shadow-sm">
              {category}
            </span>
          </Link>
        </div>
        
        {/* Quick actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/90 hover:bg-white rounded-full h-9 w-9 shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
            onClick={handleFavorite}
          >
            <Heart className="h-4 w-4 text-nature-bamboo" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-nature-moss/90 hover:bg-nature-moss text-white rounded-full h-9 w-9 shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 delay-75"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Leaf accents */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-80 transition-opacity duration-500 delay-100">
          <Leaf className="text-nature-linen/90 h-5 w-5 rotate-45 transform-gpu" />
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Link to={`/product/${id}`} className="nature-hover">
            <h3 className="font-serif font-medium text-lg text-nature-moss line-clamp-2 leading-tight hover:text-nature-bamboo transition-colors">{name}</h3>
          </Link>
        </div>
        
        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-lg font-semibold text-nature-bamboo">${price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              By <Link to={`/artisan/${artisan.toLowerCase().replace(' ', '-')}`} className="nature-hover text-nature-olive hover:text-nature-moss transition-colors">{artisan}</Link>
            </p>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-nature-linen hover:bg-nature-sage/20 text-nature-bark font-medium rounded-md px-3 h-8 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-3 -right-3 opacity-0 group-hover:opacity-30 transition-all duration-500 delay-100 pointer-events-none">
        <Leaf className="text-nature-bamboo h-10 w-10 rotate-145" />
      </div>
    </div>
  );
}
