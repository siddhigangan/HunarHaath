export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  artisan: string;
  category: string;
  description: string;
  materials: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
} 