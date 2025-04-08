export interface Seller {
  id: string;
  name: string;
  contact: string;
  mobile: string;
  email: string;
  categories: string[];
  photo: string | null;
  address: string;
  shopAddress: string;
  password: string;
  createdAt: string;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  images?: string[];
  artisan: string;
  category: string | string[];
  description: string;
  materials: string[];
  inStock: boolean;
  mobile: string;
  sellerId?: string;
  createdAt?: string;
  isTrending?: boolean;
  isNewArrival?: boolean;
}

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Get all sellers
export const getSellers = (): Seller[] => {
  const sellersData = localStorage.getItem('sellers');
  return sellersData ? JSON.parse(sellersData) : [];
};

// Get a single seller by ID
export const getSellerById = (id: string): Seller | undefined => {
  const sellers = getSellers();
  return sellers.find(seller => seller.id === id);
};

// Get a seller by email
export const getSellerByEmail = (email: string): Seller | undefined => {
  const sellers = getSellers();
  return sellers.find(seller => seller.email === email);
};

// Create a new seller
export const createSeller = (sellerData: Omit<Seller, 'id' | 'createdAt' | 'products'>): Seller => {
  const sellers = getSellers();
  
  // Check if email already exists
  if (getSellerByEmail(sellerData.email)) {
    throw new Error('Email already registered');
  }

  const newSeller: Seller = {
    ...sellerData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    products: [],
    mobile: sellerData.mobile || sellerData.contact
  };

  sellers.push(newSeller);
  localStorage.setItem('sellers', JSON.stringify(sellers));
  return newSeller;
};

// Add a product to a seller's profile
export const addProductToSeller = (sellerId: string, productData: Omit<Product, 'id'>): Product => {
  const sellers = getSellers();
  const sellerIndex = sellers.findIndex(s => s.id === sellerId);

  if (sellerIndex === -1) {
    throw new Error('Seller not found');
  }

  const newProduct: Product = {
    ...productData,
    id: generateId(),
    inStock: true
  };

  sellers[sellerIndex].products.push(newProduct);
  localStorage.setItem('sellers', JSON.stringify(sellers));
  return newProduct;
};

// Get all products
export const getAllProducts = (): Product[] => {
  const sellers = getSellers();
  return sellers.flatMap(seller => seller.products);
};

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  const allProducts = getAllProducts();
  return allProducts.filter(product => product.category === category);
};

// Get products by seller ID
export const getProductsBySeller = (sellerId: string): Product[] => {
  const seller = getSellerById(sellerId);
  return seller ? seller.products : [];
};

// Initialize sample sellers if none exist
export const initializeSampleSellers = () => {
  console.log("initializeSampleSellers called");
  const existingSellers = getSellers();
  console.log("Existing sellers:", existingSellers);
  
  // Define all sample sellers
  const sampleSellers = [
    {
      name: "Pravin Kalbande",
      contact: "9763638104",
      mobile: "9763638104",
      email: "pravin@example.com",
      categories: ["Pottery", "Home Decor"],
      photo: "/praveen.jpg",
      address: "123 Pottery Lane, Mumbai, Maharashtra",
      shopAddress: "456 Craft Market, Mumbai, Maharashtra",
      password: "password123"
    },
    {
      name: "Veena Soni",
      contact: "9423700979",
      mobile: "9423700979",
      email: "veena@example.com",
      categories: ["Clothing", "Accessories"],
      photo: "/veena.jpg",
      address: "789 Textile Street, Ahmedabad, Gujarat",
      shopAddress: "321 Fashion District, Ahmedabad, Gujarat",
      password: "password123"
    },
    {
      name: "Lalita Nahar",
      contact: "8623498491",
      mobile: "8623498491",
      email: "lalita@example.com",
      categories: ["Home Decor", "Accessories"],
      photo: "/lalita.jpg",
      address: "555 Weaving Road, Jaipur, Rajasthan",
      shopAddress: "777 Craft Bazaar, Jaipur, Rajasthan",
      password: "password123"
    },
    {
      name: "Maya Patel",
      contact: "9876543215",
      mobile: "9876543215",
      email: "maya@example.com",
      categories: ["Home Decor", "Furniture"],
      photo: "/Artisian.jpg",
      address: "888 Artisan Colony, Bangalore, Karnataka",
      shopAddress: "999 Design Hub, Bangalore, Karnataka",
      password: "password123"
    },
    {
      name: "Dinesh Rawat",
      contact: "9876543216",
      mobile: "9876543216",
      email: "dinesh@example.com",
      categories: ["Pottery", "Home Decor"],
      photo: "/deepak.jpg",
      address: "444 Clay Street, Delhi, Delhi",
      shopAddress: "222 Craft Corner, Delhi, Delhi",
      password: "password123"
    },
    {
      name: "Madhvi Bhide",
      contact: "9876543217",
      mobile: "9876543217",
      email: "madhvi@example.com",
      categories: ["Food", "Spices"],
      photo: "/Artisian.jpg",
      address: "333 Spice Lane, Pune, Maharashtra",
      shopAddress: "111 Food Market, Pune, Maharashtra",
      password: "password123"
    },
    {
      name: "Shubhangi Dhok",
      contact: "9876543225",
      mobile: "9876543225",
      email: "shubhangi@example.com",
      categories: ["Food", "Spices"],
      photo: "/shubhangi.jpg",
      address: "777 Papad Street, Nagpur, Maharashtra",
      shopAddress: "888 Food Market, Nagpur, Maharashtra",
      password: "password123"
    },
    {
      name: "Sandip Lad",
      contact: "9876543227",
      mobile: "9876543227",
      email: "sandip@example.com",
      categories: ["Home Decor", "Art"],
      photo: null,
      address: "999 Art Street, Kolhapur, Maharashtra",
      shopAddress: "555 Art Gallery, Kolhapur, Maharashtra",
      password: "password123"
    }
  ];

  // Check each sample seller and create if not exists
  sampleSellers.forEach(sellerData => {
    const existingSeller = existingSellers.find(s => s.email === sellerData.email);
    if (!existingSeller) {
      console.log(`Creating seller: ${sellerData.name}`);
      createSeller(sellerData);
    }
  });

  // Initialize products for all sellers
  initializeSampleProducts();
  
  console.log("Sample sellers initialization completed!");
};

// Initialize sample products for sellers
const initializeSampleProducts = () => {
  const sellers = getSellers();
  
  // Find sellers by name
  const pravin = sellers.find(s => s.name === "Pravin Kalbande");
  const veena = sellers.find(s => s.name === "Veena Soni");
  const lalita = sellers.find(s => s.name === "Lalita Nahar");
  const maya = sellers.find(s => s.name === "Maya Patel");
  const dinesh = sellers.find(s => s.name === "Dinesh Rawat");
  const madhvi = sellers.find(s => s.name === "Madhvi Bhide");
  const shubhangi = sellers.find(s => s.name === "Shubhangi Dhok");
  const sandip = sellers.find(s => s.name === "Sandip Lad");
  
  // Add products for Pravin
  if (pravin) {
    addProductToSeller(pravin.id, {
      name: "Handmade Pot",
      description: "Handcrafted red clay pot with a glossy finish and golden Swastik symbol. Perfect for festive decor or traditional rituals.",
      price: 150,
      category: "Pottery",
      image: "/pot1.jpeg",
      materials: ["Clay", "Natural Paint"],
      artisan: "Pravin Kalbande",
      mobile: pravin.mobile,
      inStock: true
    });
    
    addProductToSeller(pravin.id, {
      name: "Piggy bank",
      description: "Handmade terracotta piggy bank with a glossy red finish and golden top. A traditional and elegant way to save coins.",
      price: 120,
      category: "Pottery",
      image: "/pot2.jpeg",
      materials: ["Clay", "Natural glaze", "Handpainted gold"],
      artisan: "Pravin Kalbande",
      mobile: pravin.mobile,
      inStock: true
    });
  }
  
  // Add products for Veena
  if (veena) {
    addProductToSeller(veena.id, {
      name: "God's cloth Ghagra",
      description: "This vibrant handcrafted traditional dress features intricate mirror work and a rich magenta base, accented with blue and gold borders. Perfect for festive occasions or cultural celebrations.",
      price: 250,
      category: "Clothing",
      image: "/cloth1.jpg",
      materials: ["Cotton Blend", "Mirror Embellishments", "Decorative Threadwork"],
      artisan: "Veena Soni",
      mobile: veena.mobile,
      inStock: true
    });
  }
  
  // Add products for Lalita
  if (lalita) {
    addProductToSeller(lalita.id, {
      name: "Door mat",
      description: "Vibrant handwoven mat made from multi-colored yarn scraps. A playful touch for stools, tables, or home décor.",
      price: 200,
      category: "Home Decor",
      image: "/doormat1.jpeg",
      materials: ["Recycled yarn", "cotton"],
      artisan: "Lalita Nahar",
      mobile: lalita.mobile,
      inStock: true
    });
    
    addProductToSeller(lalita.id, {
      name: "Handkerchief",
      description: "Soft pink handkerchief with delicate crochet lace and a hand-embroidered floral motif. A charming touch of tradition and care.",
      price: 79,
      category: "Accessories",
      image: "/hand1.jpeg",
      materials: ["Cotton Fabric", "crochet lace"],
      artisan: "Lalita Nahar",
      mobile: lalita.mobile,
      inStock: true
    });
  }
  
  // Add products for Maya
  if (maya) {
    addProductToSeller(maya.id, {
      name: "Paint Brush Stand",
      description: "This handcrafted bamboo brush stand offers a stylish and durable way to organize and display brushes, perfect for artists and calligraphers.",
      price: 125,
      category: "Home Decor",
      image: "/brush_stand.jpg",
      materials: ["Eco-friendly Bamboo", "Smooth Lacquer Coating"],
      artisan: "Maya Patel",
      mobile: maya.mobile,
      inStock: true
    });
  }
  
  // Add products for Dinesh
  if (dinesh) {
    addProductToSeller(dinesh.id, {
      name: "Clay Bottle",
      description: "Handcrafted from natural clay and finished with a smooth glaze for durability and elegance.",
      price: 120,
      category: "Pottery",
      image: "/clay_bottle.jpg",
      materials: ["Pure Natural Clay", "Lead-free Coating"],
      artisan: "Dinesh Rawat",
      mobile: dinesh.mobile,
      inStock: true
    });
  }
  
  // Add products for Madhvi
  if (madhvi) {
    addProductToSeller(madhvi.id, {
      name: "Homemade Pickle",
      description: "Homemade with fresh ingredients, this flavorful pickle is crafted for a perfect balance of taste and tradition.",
      price: 160,
      category: "Food",
      image: "/picke.jpg",
      materials: ["Natural Spices", "Fresh Organic Ingredients"],
      artisan: "Madhvi Bhide",
      mobile: madhvi.mobile,
      inStock: true
    });
    
    addProductToSeller(madhvi.id, {
      name: "Papad",
      description: "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      price: 50,
      category: "Food",
      image: "/papad.jpg",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      artisan: "Madhvi Bhide",
      mobile: madhvi.mobile,
      inStock: true
    });
    
    addProductToSeller(madhvi.id, {
      name: "Coriander powder",
      description: "Freshly ground coriander powder made from premium quality coriander seeds, perfect for enhancing the flavor of your dishes.",
      price: 50,
      category: "Food",
      image: "/Corianderpowder.jpg",
      materials: ["Coriander seeds", "Natural grinding"],
      artisan: "Madhvi Bhide",
      mobile: madhvi.mobile,
      inStock: true
    });
  }
  
  // Add products for Shubhangi
  if (shubhangi) {
    addProductToSeller(shubhangi.id, {
      name: "Jowary Papad (Nachni papad)",
      description: "Crispy and wholesome, Jowar (sorghum) and Nachni (ragi) papads are crafted using traditional recipes to deliver a delightful crunch and earthy flavor. Perfect as a light snack or a flavorful accompaniment to meals, these papads are sun-dried for a natural finish.",
      price: 120,
      category: "Food",
      image: "/papad3.jpg",
      materials: ["Nachni (ragi) flour", "Jowar flour", "Natural spices", "Sun-dried", "Salt"],
      artisan: "Shubhangi Dhok",
      mobile: shubhangi.mobile,
      inStock: true
    });
    
    addProductToSeller(shubhangi.id, {
      name: "Jowary Papad",
      description: "Crispy and flavorful, this handmade aloo sabudana papad combines the goodness of potatoes and tapioca pearls with natural spices. A perfect snack or side dish that's sun-dried to perfection!",
      price: 90,
      category: "Food",
      image: "/papad4.jpg",
      materials: ["Sabudana", "Aloo", "Natural spices", "Sun-dried"],
      artisan: "Shubhangi Dhok",
      mobile: shubhangi.mobile,
      inStock: true
    });
  }
  
  // Add products for Sandip
  if (sandip) {
    addProductToSeller(sandip.id, {
      name: "Gajanan Maharaj",
      description: "Beautiful handcrafted statue of Gajanan Maharaj, perfect for home decor and spiritual spaces.",
      price: 2500,
      category: "Home Decor",
      image: "/Gajanan_Maharaj.jpg",
      materials: ["Fibre", "Colours"],
      artisan: "Sandip Lad",
      mobile: sandip.mobile,
      inStock: true
    });
  }
  
  console.log("Sample products initialized successfully!");
};

// Call the initialization function when the module is loaded
initializeSampleSellers(); 