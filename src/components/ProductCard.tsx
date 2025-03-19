
import { Link } from 'react-router-dom';
import { Heart, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  artisan: string;
  category: string;
}

export function ProductCard({ id, name, price, image, artisan, category }: ProductCardProps) {
  return (
    <div className="group animate-fade-up nature-card hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        <Link to={`/product/${id}`}>
          <AspectRatio ratio={4/3}>
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-nature-moss/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        
        {/* Leaf accents */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Leaf className="text-nature-linen/80 h-4 w-4 rotate-45" />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8 btn-pressed opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart className="h-4 w-4 text-nature-bamboo" />
        </Button>
      </div>
      
      <div className="p-4 bg-white border-t border-nature-sage/10">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${id}`} className="nature-hover">
            <h3 className="font-serif font-medium text-lg text-nature-moss line-clamp-1">{name}</h3>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-nature-bamboo">${price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              By <Link to={`/artisan/${artisan.toLowerCase().replace(' ', '-')}`} className="nature-hover text-nature-olive hover:text-nature-moss transition-colors">{artisan}</Link>
            </p>
          </div>
          <Link to={`/category/${category.toLowerCase()}`}>
            <span className="text-xs px-2 py-1 bg-nature-linen rounded-full text-nature-moss/90 border border-nature-sage/20 hover:bg-nature-linen/80 transition-colors">
              {category}
            </span>
          </Link>
        </div>
      </div>
      
      {/* Bottom leaf decoration */}
      <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
        <Leaf className="text-nature-bamboo h-8 w-8 rotate-145" />
      </div>
    </div>
  );
}
