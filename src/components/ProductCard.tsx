
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
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
    <div className="card-craft group animate-fade-up pottery-shadow">
      <div className="relative overflow-hidden rounded-t-lg">
        <Link to={`/product/${id}`}>
          <AspectRatio ratio={4/3}>
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8 btn-pressed"
        >
          <Heart className="h-4 w-4 text-craft-terracotta" />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${id}`} className="brushstroke-hover">
            <h3 className="font-serif font-medium text-lg line-clamp-1">{name}</h3>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-craft-terracotta">${price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              By <Link to={`/artisan/${artisan.toLowerCase().replace(' ', '-')}`} className="brushstroke-hover text-craft-forest">{artisan}</Link>
            </p>
          </div>
          <Link to={`/category/${category.toLowerCase()}`}>
            <span className="text-xs px-2 py-1 bg-craft-cream rounded-full text-craft-forest border border-craft-earth/10">
              {category}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
