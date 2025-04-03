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
    price: 400,
    image: "/Bottle.jpg",
    artisan: "Shweta Gawande",
    category: "Pottery",
    description:
      "This elegant hand-thrown ceramic vase features a beautiful matte glaze in earthy tones. Each piece is unique, with subtle variations in color and texture. Perfect as a standalone decorative piece or for displaying fresh flowers.",
    materials: ["Clay", "Mineral Glaze"],
    inStock: true,
  },
  {
    id: "2",
    name: "Bamboo Leaf Earrings",
    price: 250,
    image: "/earrings.jpg",
    artisan: "Savitri Deshpande",
    category: "Jewelry",
    description:
      "These delicate bamboo leaf earrings are hand-forged with a brushed finish. The organic leaf shapes catch the light beautifully and move gently with the wearer.",
    materials: ["Bamboo", "Hypoallergenic Hooks"],
    inStock: true,
  },
  {
    id: "3",
    name: "Vegetable Basket",
    price: 320,
    image: "/vegetablebasket.jpg",
    artisan: "Rekha Pande",
    category: "home-decor", 
    description:
      "Handwoven from natural fibers, this durable vegetable basket is perfect for organizing your fresh produce while adding a rustic charm to your kitchen.",
    materials: ["Handwoven Cane", "Eco-friendly Fibers"],
    inStock: true,
  },
  {
    id: "4",
    name: "Wood Basket",
    price: 150,
    image: "/woodbasket.jpg",
    artisan: "Kisanlalji Sharma",
    category: "home-decor", 
    description:
      "A sturdy handcrafted wooden basket, ideal for storing household items, firewood, or as a rustic decorative piece.",
    materials: ["Solid Wood", "Natural Finish"],
    inStock: true,
  },
  {
    id: "5",
    name: "Bamboo Purse",
    price: 499,
    image: "/purse-real.jpg",
    artisan: "Rajesh Patil",
    category: "Fashion Accessories",
    description:
      "This elegant handwoven bamboo purse combines traditional craftsmanship with modern design, offering a lightweight and eco-friendly style statement.",
    materials: ["Organic Bamboo", "Handwoven Fabric"],
    inStock: true,
  },
  {
    id: "6",
    name: "Paint Brush Stand",
    price: 125,
    image: "/brush_stand.jpg",
    artisan: "Maya Patel",
    category: "home-decor", 
    description:
      "This handcrafted bamboo brush stand offers a stylish and durable way to organize and display brushes, perfect for artists and calligraphers.",
    materials: ["Eco-friendly Bamboo", "Smooth Lacquer Coating"],
    inStock: true,
  },
  {
    id: "7",
    name: "Clay Bottle",
    price: 120,
    image: "/clay_bottle.jpg",
    artisan: "Dinesh Rawat",
    category: "Pottery",
    description:
      "Handcrafted from natural clay and finished with a smooth glaze for durability and elegance.",
    materials: ["Pure Natural Clay", "Lead-free Coating"],
    inStock: true,
  },
  {
    id: "8",
    name: "Homemade Pickle",
    price: 160,
    image: "/picke.jpg",
    artisan: "Madhvi Bhide",
    category: "Food",
    description:
      "Homemade with fresh ingredients, this flavorful pickle is crafted for a perfect balance of taste and tradition.",
    materials: ["Natural Spices", "Fresh Organic Ingredients"],
    inStock: true,
  },
    {
      id: "9",
      name: "Papad",
      price: 50,
      image: "/papad.jpg",
      artisan: "Madhvi Bhide",
      category: "Food",
      description:
        "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      inStock: true,
    },
    {
      id: "10",
      name: "Papad",
      price: 50,
      image: "/papad2.jpg",
      artisan: "",
      category: "Food",
      description:
        "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      inStock: true,
    },
    {
      id: "11",
      name: "Coriander powder",
      price: 50,
      image: "/Corianderpowder.jpg",
      artisan: "MadhviBhide",
      category: "Food",
      description:
        "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      inStock: true,
    },
    {
      id: " 12",
      name: "Murabba",
      price:100,
      image: "/lemonachar.jpg",
      artisan: "",
      category: "Food",
      description:
        "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      inStock: true,
    },
    {
      id: " 13",
      name: "Kurdi",
      price:100,
      image: "/kurdi1.jpg",
      artisan: "",
      category: "Food",
      description:
        "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      inStock: true,
    },
    {
      id: " 14",
      name: "Mirchi",
      price:100,
      image: "/mirchi.jpg",
      artisan: "",
      category: "Food",
      description:
        "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      inStock: true,
    },
    {
      id: " 15",
      name: "Mung Badi",
      price:100,
      image: "/mundbadi1.jpg",
      artisan: "",
      category: "Food",
      description:
        "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      inStock: true,
    },
    {
      id: " 16",
      name: "Papad",
      price:100,
      image: "/papad3.jpg",
      artisan: "",
      category: "Food",
      description:
        "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      inStock: true,
    },
    {
      id: " 17",
      name: "Papad",
      price:100,
      image: "/papad4.jpg",
      artisan: "",
      category: "Food",
      description:
        "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      inStock: true,
    },
];

export const trendingProducts = products.slice(0, 4);
export const newArrivals = [products[4], products[5], products[6], products[7]];
