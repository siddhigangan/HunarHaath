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
    name: "Abstract Landscape Painting",
    price: 320.00,
    image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    artisan: "James Wilson",
    category: "Paintings",
    description: "This original abstract landscape painting captures the essence of rolling hills at sunset. Painted with acrylics on canvas, the vibrant colors and textures create depth and movement across the canvas.",
    materials: ["Acrylic Paint", "Canvas"],
    inStock: true
  },
  {
    id: "4",
    name: "Macramé Wall Hanging",
    price: 78.50,
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    artisan: "Sofia Mendez",
    category: "Home Decor",
    description: "This intricate macramé wall hanging is handcrafted using 100% cotton rope. The bohemian-inspired design features a variety of knots and natural wooden beads, creating a beautiful focal point for any room.",
    materials: ["Cotton Rope", "Wooden Dowel", "Wooden Beads"],
    inStock: true
  },
  {
    id: "5",
    name: "Hand-woven Wool Scarf",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1449505937837-e288997464de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    artisan: "Thomas Brown",
    category: "Clothing",
    description: "This luxurious hand-woven wool scarf is crafted on a traditional loom using locally sourced, naturally dyed wool. The earthy color palette and subtle pattern make it a versatile accessory for any season.",
    materials: ["Organic Wool", "Natural Dyes"],
    inStock: true
  },
  {
    id: "6",
    name: "Leather Journal with Handmade Paper",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1518893494737-0050606664cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    artisan: "Maya Patel",
    category: "Accessories",
    description: "This beautiful journal features a hand-stitched leather cover and 100 pages of handmade cotton rag paper. Each page has a unique deckled edge and slight texture, perfect for sketching, writing, or pressing flowers.",
    materials: ["Vegetable-tanned Leather", "Cotton Rag Paper", "Waxed Linen Thread"],
    inStock: true
  },
  {
    id: "7",
    name: "Stoneware Dinner Set",
    price: 175.00,
    image: "https://images.unsplash.com/photo-1572666341285-c1cb6b59ace4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    artisan: "David Chen",
    category: "Pottery",
    description: "This four-piece stoneware dinner set includes dinner plates, salad plates, bowls, and mugs. Each piece is wheel-thrown and glazed in a beautiful speckled white finish that highlights the natural texture of the clay.",
    materials: ["Stoneware Clay", "Lead-free Glaze"],
    inStock: true
  },
  {
    id: "8",
    name: "Copper Wire Tree Sculpture",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    artisan: "Robert Johnson",
    category: "Home Decor",
    description: "This one-of-a-kind copper wire tree sculpture is meticulously crafted by hand, with hundreds of tiny twisted wires forming the branches and roots. Mounted on a natural stone base, it makes a stunning centerpiece or shelf decoration.",
    materials: ["Recycled Copper Wire", "Natural Stone"],
    inStock: true
  }
];

export const trendingProducts = products.slice(0, 4);
export const newArrivals = [products[4], products[5], products[6], products[7]];