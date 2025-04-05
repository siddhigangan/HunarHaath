import { Product } from "./sellers";

export const staticProducts: Product[] = [
  {
    id: "1",
    sellerId: "static",
    name: "Handcrafted Terracotta Vase",
    description: "A beautiful handcrafted vase made from natural terracotta clay. Each piece is unique with its own texture and character.",
    price: 2499,
    category: "Pottery",
    images: ["/images/products/vase1.jpg"],
    materials: ["Terracotta clay", "Natural glaze"],
    artisan: "Sarah Johnson",
    createdAt: "2024-03-15T10:00:00Z",
    isTrending: true,
    isNewArrival: true
  },
  {
    id: "2",
    sellerId: "static",
    name: "Silver Necklace with Stones",
    description: "Elegant handcrafted silver necklace featuring natural stones. Perfect for any occasion.",
    price: 3999,
    category: "Jewelry",
    images: ["/images/products/necklace1.jpg"],
    materials: ["Sterling silver", "Natural stones"],
    artisan: "Michael Chen",
    createdAt: "2024-03-14T15:30:00Z",\
    
    isTrending: true,
    isNewArrival: true
  },
  {
    id: "3",
    sellerId: "static",
    name: "Homemade Pickles",
    description: "Traditional homemade pickles made with fresh vegetables and secret family recipe.",
    price: 649,
    category: "Food",
    images: ["/images/products/pickles1.jpg"],
    materials: ["Fresh vegetables", "Spices", "Vinegar"],
    artisan: "Grandma's Kitchen",
    createdAt: "2024-03-13T09:15:00Z",
    isTrending: true,
    isNewArrival: true
  },
  {
    id: "4",
    sellerId: "static",
    name: "Handwoven Wall Hanging",
    description: "Beautiful handwoven wall hanging with intricate patterns and natural colors.",
    price: 4499,
    category: "Home Decor",
    images: ["/images/products/wallhanging1.jpg"],
    materials: ["Natural fibers", "Cotton", "Wool"],
    artisan: "Maria Rodriguez",
    createdAt: "2024-03-12T14:20:00Z",
    isTrending: true,
    isNewArrival: true
  },
  {
    id: "5",
    sellerId: "static",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic coffee mugs with unique glazing patterns.",
    price: 1999,
    category: "Pottery",
    images: ["/images/products/mugs1.jpg"],
    materials: ["Stoneware clay", "Ceramic glaze"],
    artisan: "David Kim",
    createdAt: "2024-03-11T11:45:00Z",
    isTrending: false,
    isNewArrival: false
  },
  {
    id: "6",
    sellerId: "static",
    name: "Gold-Plated Earrings",
    description: "Delicate gold-plated earrings with crystal accents.",
    price: 2299,
    category: "Jewelry",
    images: ["/images/products/earrings1.jpg"],
    materials: ["Gold-plated metal", "Crystal stones"],
    artisan: "Lisa Wong",
    createdAt: "2024-03-10T16:30:00Z",
    isTrending: false,
    isNewArrival: false
  },
  {
    id: "7",
    sellerId: "static",
    name: "Artisanal Bread",
    description: "Freshly baked artisanal bread made with organic ingredients.",
    price: 449,
    category: "Food",
    images: ["/images/products/bread1.jpg"],
    materials: ["Organic flour", "Yeast", "Water", "Salt"],
    artisan: "Bread & Butter Bakery",
    createdAt: "2024-03-09T08:00:00Z",
    isTrending: false,
    isNewArrival: false
  },
  {
    id: "8",
    sellerId: "static",
    name: "Macramé Plant Hanger",
    description: "Handcrafted macramé plant hanger with wooden beads.",
    price: 1749,
    category: "Home Decor",
    images: ["/images/products/macrame1.jpg"],
    materials: ["Cotton rope", "Wooden beads"],
    artisan: "Emma Thompson",
    createdAt: "2024-03-08T13:15:00Z",
    isTrending: false,
    isNewArrival: false
  }
];

// Helper functions to get specific product sets
export const getNewArrivals = (): Product[] => {
  return staticProducts.filter(product => product.isNewArrival);
};

export const getTrendingProducts = (): Product[] => {
  return staticProducts.filter(product => product.isTrending);
};

export const getProductById = (id: string): Product | undefined => {
  return staticProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return staticProducts.filter(product => product.category === category);
}; 