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

export const products: Product[] = [
  {
    id: "1",
    name: "Hand-thrown Ceramic Vase",
    price: 89.99,
    image: "/Bottle.jpg", // Chose the stashed change, adjust if needed
    artisan: "Maria Gonzalez",
    category: "Pottery",
    description: "This elegant hand-thrown ceramic vase features a beautiful matte glaze in earthy tones. Each piece is completely unique with subtle variations in color and texture. Perfect as a standalone decorative piece or for displaying fresh flowers.",
    materials: ["Clay", "Mineral Glaze"],
    inStock: true
  },
  {
    id: "2",
    name: "Bamboo Leaf Earrings",
    price: 45.00,
    image: "/earrings.jpg",
    artisan: "Savitri Deshpande",
    category: "Jewelry",
    description: "These delicate bamboo leaf earrings are hand-forged and feature a brushed finish. The organic leaf shapes catch the light beautifully and move gently with the wearer.",
    materials: ["Bamboo", "Hypoallergenic Hooks"],
    inStock: true
  },
  {
    id: "3",
    name: "Vegetable basket",
    price: 320.00,
    image: "/vegetablebasket.jpg",
    artisan: "Rekha Pande",
    category: "Home",
    description: "This original abstract landscape painting captures the essence of rolling hills at sunset. Painted with acrylics on canvas, the vibrant colors and textures create depth and movement across the canvas.",
    materials: ["Acrylic Paint", "Canvas"],
    inStock: true
  },
  {
    id: "4",
    name: "Wood Basket",
    price: 78.50,
    image: "/woodbasket.jpg",
    artisan: "Kisanlalji sharma",
    category: "Home Decor",
    description: "This intricate macramé wall hanging is handcrafted using 100% cotton rope. The bohemian-inspired design features a variety of knots and natural wooden beads, creating a beautiful focal point for any room.",
    materials: ["Cotton Rope", "Wooden Dowel", "Wooden Beads"],
    inStock: true
  },
  {
    id: "5",
    name: "Bamboo purse",
    price: 65.00,
    image: "/purse-real.jpg",
    artisan: "Rajesh Patil",
    category: "Clothing",
    description: "This luxurious hand-woven wool scarf is crafted on a traditional loom using locally sourced, naturally dyed wool. The earthy color palette and subtle pattern make it a versatile accessory for any season.",
    materials: ["Organic Wool", "Natural Dyes"],
    inStock: true
  },
  {
    id: "6",
    name: "Brush Stand",
    price: 38.00,
    image: "/brush_stand.jpg",
    artisan: "Maya Patel",
    category: "Home Decor",
    description: "This handcrafted bamboo brush stand offers a stylish and durable way to organize and display brushes, perfect for artists and calligraphers.",
    materials: ["Natural wood finish", "Smooth lacquer coating", "Eco-friendly or sustainable bamboo"],
    inStock: true
  },
  {
    id: "7",
    name: "Clay Bottle",
    price: 175.00,
    image: "/clay_bottle.jpg",
    artisan: "Dinesh Rawat",
    category: "Pottery",
    description: "Handcrafted from natural clay and finished with a smooth glaze for durability and elegance.",
    materials: ["Pure natural Clay", "Mineral-based glaze","Lead-free coating"],
    inStock: true
  },
  {
    id: "8",
    name: "Pickle",
    price: 95.00,
    image: "/picke.jpg",
    artisan: "Madhvi Bhide",
    category: "Food",
    description: "Homemade with fresh ingredients, this flavorful pickle is crafted for a perfect balance of taste and tradition.",
    materials: ["Natural spices", "Fresh"],
    inStock: true
  }
];

export const trendingProducts = products.slice(0, 4);
export const newArrivals = [products[4], products[5], products[6], products[7]];