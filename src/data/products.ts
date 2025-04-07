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
    image: "/cloth1.jpg",
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
    category: "Home Decor", 
    description:
      "Handwoven from natural fibers, this durable vegetable basket is perfect for organizing your fresh produce while adding a rustic charm to your kitchen.",
    materials: ["Handwoven Cane", "Eco-friendly Fibers"],
    inStock: true,
  },
  // {
  //   id: "4",
  //   name: "Wood Basket",
  //   price: 150,
  //   image: "/woodbasket.jpg",
  //   artisan: "Kisanlalji Sharma",
  //   category: "home-decor", 
  //   description:
  //     "A sturdy handcrafted wooden basket, ideal for storing household items, firewood, or as a rustic decorative piece.",
  //   materials: ["Solid Wood", "Natural Finish"],
  //   inStock: true,
  // },
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
    price: 200,
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
    price: 220,
    image: "/papad2.jpg",
    artisan: "Madhvi Bhide",
    category: "Food",
    description:
      "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
    materials: ["Lentil flour", "Natural spices", "Sun-dried"],
    inStock: true,
  },
  {
    id: "11",
    name: "Coriander powder",
    price: 220,
    image: "/Corianderpowder.jpg",
    artisan: "Sunita Pitliya",
    category: "Food",
    description:
      "Freshly ground coriander powder made from premium quality coriander seeds, perfect for enhancing the flavor of your dishes.",
    materials: ["Coriander seeds", "Natural grinding"],
    inStock: true,
  },
  {
    id: "12",
    name: "Murabba",
    price: 100,
    image: "/lemonachar.jpg",
    artisan: "Sunita Pitliya",
    category: "Food",
    description:
      "Sweet and tangy lemon murabba made with fresh lemons and natural sweeteners, a traditional Indian preserve that's perfect as a dessert or digestive aid.",
    materials: ["Fresh lemons", "Natural sweeteners", "Spices"],
    inStock: true,
  },
  {
    id: "13",
    name: "Kurdi",
    price: 100,
    image: "/kurdi1.jpg",
    artisan: "Sunita Pitliya",
    category: "Food",
    description:
      "Traditional Indian kurdi made with fresh ingredients and authentic spices, perfect for adding flavor to your meals.",
    materials: ["Fresh ingredients", "Authentic spices"],
    inStock: true,
  },
  {
    id: "14",
    name: "Mirchi",
    price: 95,
    image: "/mirchi.jpg",
    artisan: "Sunita Pitliya",
    category: "Food",
    description:
   " Fiery and vibrant, red chili powder adds a bold punch of heat and color to any dish. Made from the finest dried chilies, this versatile spice is a must-have for enhancing flavors in both traditional and modern cuisines",
      materials: ["Fresh red chilies"],
    inStock: true,
  },
  {
    id: "15",
    name: "Mung Badi",
    price: 85,
    image: "/mundbadi1.jpg",
    artisan: "Sunita Pitliya",
    category: "Food",
    description:
      "Traditional Indian mung badi made from mung dal, perfect for adding protein and texture to your curries and dals.",
    materials: ["Mung dal", "Spices", "Sun-dried"],
    inStock: true,
  },
  {
    id: "16",
    name: "Jowary Papad(Nachni papad)",
    price: 120,
    image: "/papad3.jpg",
    artisan: "Shubhangi Dhok",
    category: "Food",
    description:
      "Crispy and wholesome, Jowar (sorghum) and Nachni (ragi) papads are crafted using traditional recipes to deliver a delightful crunch and earthy flavor. Perfect as a light snack or a flavorful accompaniment to meals, these papads are sun-dried for a natural finish",
    materials: ["Nachni(ragi) flour","Jowar Flour", "Natural spices", "Sun-dried","Salt"],
    inStock: true,
  },
  {
    id: "17",
    name: "Jowary Papad",
    price: 90,
    image: "/papad4.jpg",
    artisan: "Shubhangi Dhok",
    category: "Food",
    description:
      "Crispy and flavorful, this handmade aloo sabudana papad combines the goodness of potatoes and tapioca pearls with natural spices. A perfect snack or side dish that's sun-dried to perfection!",    
    materials:["Sabudana","Aloo", "Natural spices", "Sun-dried"],
    inStock: true,
  },
  {
    id: "18",
    name: "Gajanan Maharaj",
    price: 2500,
    image: "/Gajanan_Maharaj.jpg",
    artisan: "Sandip Lad",
    category: "Home Decor",
    description:
      "...",    
    materials:["Fibre","Colours"],
    inStock: true,
  },
  {
    id: "19",
    name: "Ramji Idol",
    price: 1500,
    image: "/Ram1.jpg",
    artisan: "Sandip Lad",
    category: "Home Decor",
    description:
      "...",    
    materials:["Fibre"],
    inStock: true,
  },
  {
    id: "20",
    name: "Burger",
    price: 1500,
    image: "/Burger.jpg",
    artisan: "Sandip Lad",
    category: "Home Decor",
    description:
      "...",    
    materials:["Fibre"],
    inStock: true,
  },
  {
    id: "21",
    name: "Temple",
    price: 7000,
    image: "/Mandir.jpg",
    artisan: "Sandip Lad",
    category: "Home Decor",
    description:
      "...",    
    materials:["Fibre"],
    inStock: true,
  },
  {
    id: "22",
    name: "Ganeshji Idol",
    price: 2100,
    image: "/Ganesh.jpg",
    artisan: "Sandip Lad",
    category: "Home Decor",
    description:
      "...",    
    materials:["Fibre"],
    inStock: true,
  },
  {
    id: "23",
    name: "Vitthal Rukmai",
    price: 3100,
    image: "/Vitthal.jpg",
    artisan: "Sandip Lad",
    category: "Home Decor",
    description:
      "...",    
    materials:["Fibre"],
    inStock: true,
  },
  {
    id: "24",
    name: "Shivji",
    price: 2100,
    image: "/Shivji.jpg",
    artisan: "Sandip Lad",
    category: "Home Decor",
    description:
      "...",    
    materials:["Fibre"],
    inStock: true,
  },
];

export const trendingProducts = products.slice(0, 4);
export const newArrivals = [products[24], products[5], products[6], products[7]];