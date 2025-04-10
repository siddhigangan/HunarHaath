import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Product } from "@/types";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  artisan: string;
  category: string;
  description: string;
  materials: string[];
  inStock: boolean;
  sellerId?: string;
}

export function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  artisan, 
  category, 
  description, 
  materials, 
  inStock,
  sellerId 
}: ProductCardProps) {
  const product: Product = {
    id,
    name,
    price,
    image,
    artisan,
    category,
    description,
    materials,
    inStock
  };

  return (
    <div className="card-craft group animate-fade-up h-full flex flex-col">
      <div className="relative">
        <Link to={`/product/${id}`}>
          <AspectRatio ratio={4/3}>
            <div className="w-full h-full bg-craft-cream/50 flex items-center justify-center border border-dashed border-craft-forest/30">
              <img
                src={`${image}`}
                alt={name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </AspectRatio>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
        >
          <Heart className="h-4 w-4 text-craft-terracotta" />
        </Button>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <Link to={`/product/${id}`} className="hover:underline">
          <h3 className="font-medium text-lg line-clamp-1 mb-1">{name}</h3>
        </Link>
        
        <div className="mt-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-lg font-semibold text-craft-terracotta">₹{price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                By {sellerId && sellerId !== "static" ? (
                  <Link to={`/seller/${sellerId}`} className="hover:underline text-craft-forest">
                    {artisan}
                  </Link>
                ) : (
                  <span className="text-craft-forest">{artisan}</span>
                )}
              </p>
            </div>
            <Link to={`/category/${category.toLowerCase()}`}>
              <span className="text-xs px-2 py-1 bg-craft-cream rounded-full text-craft-forest whitespace-nowrap">
                {category}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}