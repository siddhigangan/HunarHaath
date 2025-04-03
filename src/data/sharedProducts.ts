import { Product } from "./sellers";

export type { Product };

export const sharedProducts: Product[] = [
  {
    id: "pottery1",
    sellerId: "default",
    name: "Handcrafted Terracotta Vase",
    description: "Beautiful handcrafted terracotta vase with traditional patterns. Perfect for home decoration.",
    price: 1200,
    category: "Pottery",
    images: ["/pottery1.jpg"],
    materials: "Terracotta clay",
    artisan: "Traditional Artisan",
    createdAt: new Date().toISOString()
  },
  {
    id: "jewelry1",
    sellerId: "default",
    name: "Silver Necklace with Stones",
    description: "Elegant silver necklace adorned with natural stones. Handcrafted with attention to detail.",
    price: 2500,
    category: "Jewelry",
    images: ["/jewelry1.jpg"],
    materials: "Silver, Natural Stones",
    artisan: "Traditional Artisan",
    createdAt: new Date().toISOString()
  },
  {
    id: "food1",
    sellerId: "default",
    name: "Homemade Pickles",
    description: "Traditional homemade pickles made with fresh ingredients and authentic recipes.",
    price: 300,
    category: "Food",
    images: ["/food1.jpg"],
    materials: "Fresh Vegetables, Spices",
    artisan: "Traditional Artisan",
    createdAt: new Date().toISOString()
  },
  {
    id: "homedecor1",
    sellerId: "default",
    name: "Handwoven Wall Hanging",
    description: "Beautiful handwoven wall hanging with traditional patterns and natural colors.",
    price: 1800,
    category: "Home Decor",
    images: ["/homedecor1.jpg"],
    materials: "Natural Fibers, Dyes",
    artisan: "Traditional Artisan",
    createdAt: new Date().toISOString()
  }
];

// Function to get all products
export const getAllProducts = (): Product[] => {
  return sharedProducts;
};

// Function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return sharedProducts.filter(product => product.category === category);
};

// Function to get a single product by ID
export const getProductById = (id: string): Product | undefined => {
  return sharedProducts.find(product => product.id === id);
}; 