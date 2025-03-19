
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
      className="group relative overflow-hidden rounded-lg transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Natural border with organic shape */}
      <div className="absolute inset-0 border-2 border-nature-sage/30 rounded-lg organic-border transform rotate-1 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      
      <div className="relative bg-white border border-nature-sage/20 rounded-lg overflow-hidden shadow-sm hover:shadow-nature transition-all duration-500">
        <div className="relative overflow-hidden">
          <Link to={`/product/${id}`}>
            <AspectRatio ratio={1/1}>
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </AspectRatio>
            
            {/* Natural gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-nature-moss/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          {/* Category label */}
          <div className="absolute top-3 left-3">
            <Link to={`/category/${category.toLowerCase()}`}>
              <span className="text-xs px-2.5 py-1 bg-nature-linen/90 backdrop-blur-sm rounded-full text-nature-moss font-medium border border-nature-sage/30 hover:bg-nature-linen transition-colors shadow-sm">
                {category}
              </span>
            </Link>
          </div>
          
          {/* Quick actions */}
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/90 hover:bg-white rounded-full h-8 w-8 shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
              onClick={handleFavorite}
            >
              <Heart className="h-4 w-4 text-nature-bark" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-nature-moss/90 hover:bg-nature-moss text-white rounded-full h-8 w-8 shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 delay-75"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Leaf accents */}
          <div className="absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-80 transition-opacity duration-500 delay-100">
            <Leaf className="text-nature-leaf/60 h-6 w-6 rotate-45 transform-gpu" />
          </div>
        </div>
        
        <div className="p-3.5 bg-white">
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <Link to={`/product/${id}`} className="nature-hover">
              <h3 className="font-serif text-base text-nature-bark font-medium line-clamp-2 leading-tight hover:text-nature-moss transition-colors">{name}</h3>
            </Link>
          </div>
          
          <div className="flex justify-between items-end mt-2">
            <div>
              <p className="text-lg font-semibold text-nature-moss">${price.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                By <Link to={`/artisan/${artisan.toLowerCase().replace(' ', '-')}`} className="nature-hover text-nature-olive hover:text-nature-moss transition-colors">{artisan}</Link>
              </p>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-nature-linen hover:bg-nature-sage/20 text-nature-bark text-xs font-medium rounded-md px-2.5 h-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
        
        {/* Natural corner decoration */}
        <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-30 transition-all duration-500 delay-100 pointer-events-none z-10">
          <Leaf className="text-nature-bamboo h-8 w-8 rotate-[225deg]" />
        </div>
      </div>
    </div>
  );
}
