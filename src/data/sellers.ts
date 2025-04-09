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
export const addProductToSeller = (sellerId: string, product: Omit<Product, "id">) => {
  const sellers = getSellers();
  const seller = sellers.find(s => s.id === sellerId);
  
  if (!seller) {
    throw new Error("Seller not found");
  }

  // Check if product with same name already exists
  const existingProduct = seller.products.find(p => p.name === product.name);
  if (existingProduct) {
    console.log(`Product "${product.name}" already exists for seller ${seller.name}`);
    return existingProduct;
  }

  const newProduct: Product = {
    ...product,
    id: generateId(),
  };

  // Add to seller's products
  seller.products.push(newProduct);
  localStorage.setItem("sellers", JSON.stringify(sellers));
  
  // Update sellerProducts in localStorage
  const sellerProducts = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
  // Check if product already exists in sellerProducts
  const existingInSellerProducts = sellerProducts.find((p: Product) => p.name === product.name && p.artisan === product.artisan);
  if (!existingInSellerProducts) {
    sellerProducts.push(newProduct);
    localStorage.setItem("sellerProducts", JSON.stringify(sellerProducts));
  }

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
      email: "pravink11@gmail.com",
      categories: ["Pottery", "Home Decor"],
      photo: "/praveen.jpg",
      address: "Arni, Maharashtra",
      shopAddress: "Kothari Market, Arni, Maharashtra",
      password: "password123"
    },
    {
      name: "Veena Soni",
      contact: "9423700979",
      mobile: "9423700979",
      email: "veenasoni@gmail.com",
      categories: ["Clothing", "Accessories"],
      photo: "/veena.jpg",
      address: "Amravati, Maharashtra",
      shopAddress: "Mahesh nagar, Amravati, Maharashtra",
      password: "password123"
    },
    {
      name: "Lalita Nahar",
      contact: "8623498491",
      mobile: "8623498491",
      email: "lalitanahar05@gmail.com",
      categories: ["Home Decor", "Accessories"],
      photo: "/lalita.jpg",
      address: "Hinganghat, Maharashtra",
      shopAddress: "Mahavir Chowk, Hinganghat, Maharashtra",
      password: "password123"
    },
    {
      name: "Salmaan Sheikh",
      contact: "8080665475",
      mobile: "8080665475",
      email: "sheikhsalmaan@gmail.com",
      categories: ["Home Decor", "Furniture"],
      photo: "/salmaan.jpg",
      address: "Arni, Maharashtra",
      shopAddress: "Nandanvan Colony, Arni, Maharashtra",
      password: "password123"
    },
    {
      name: "Deepak Singh",
      contact: "8057104379",
      mobile: "8057104379",
      email: "deepaksingh@gmail.com",
      categories: ["Pottery", "Home Decor"],
      photo: "/deepak.jpg",
      address: "Amravati, Maharashtra",
      shopAddress: "Nawathe Nagar, Amravati, Maharashtra",
      password: "password123"
    },
    {
      name: "Sunita Pitliya",
      contact: "9822215764",
      mobile: "9822215764",
      email: "sunita_07@gmail.com",
      categories: ["Food", "Spices"],
      photo: "/Artisian.jpg",
      address: "Hinganghat, Maharashtra",
      shopAddress: "Karanja chowk, Hinganghat, Maharashtra",
      password: "password123"
    },
    {
      name: "Shubhangi Dhok",
      contact: "9876543225",
      mobile: "9876543225",
      email: "shubhadhok@gmail.com",
      categories: ["Food", "Spices"],
      photo: "/shubhangi.jpg",
      address: "Amravati, Maharashtra",
      shopAddress: "Akoli road, Amravati, Maharashtra",
      password: "password123"
    },
    {
      name: "Sandip Lad",
      contact: "9876543227",
      mobile: "9876543227",
      email: "sandipLad@gmail.com",
      categories: ["Home Decor", "Art"],
      photo: "/sandip.jpg",
      address: "Arni, Maharashtra",
      shopAddress: "New Bypass Road, Arni, Maharashtra",
      password: "password123"
    },
    {
      name: "Shraddha Pande",
      contact: "9876543228",
      mobile: "9876543228",
      email: "shraddhapande@gmail.com",
      categories: ["Jewelry", "Accessories"],
      photo: "/shraddha.jpg",
      address: "Amravati, Maharashtra",
      shopAddress: "Rajapeth, Amravati, Maharashtra",
      password: "password123"
    }
  ];

  // Clear existing sellers and add only the specified ones
  localStorage.setItem('sellers', JSON.stringify([]));
  
  // Add each sample seller
  sampleSellers.forEach(sellerData => {
    console.log(`Creating seller: ${sellerData.name}`);
    createSeller(sellerData);
  });

  // Initialize products for all sellers
  initializeSampleProducts();
  
  console.log("Sample sellers initialization completed!");
};

// Initialize sample products for sellers
const initializeSampleProducts = () => {
  // Clear existing products first
  localStorage.setItem("sellerProducts", JSON.stringify([]));
  
  const sellers = getSellers();
  
  // Find sellers by name
  const pravin = sellers.find(s => s.name === "Pravin Kalbande");
  const veena = sellers.find(s => s.name === "Veena Soni");
  const lalita = sellers.find(s => s.name === "Lalita Nahar");
  const salmaan = sellers.find(s => s.name === "Salmaan Sheikh");
  const deepak = sellers.find(s => s.name === "Deepak Singh");
  const sunita = sellers.find(s => s.name === "Sunita Pitliya");
  const shubhangi = sellers.find(s => s.name === "Shubhangi Dhok");
  const sandip = sellers.find(s => s.name === "Sandip Lad");
  const shraddha = sellers.find(s => s.name === "Shraddha Pande");
  
  // Helper function to check if a product already exists
  const productExists = (seller: any, productName: string) => {
    return seller.products.some((p: any) => p.name === productName);
  };
  
  // Add products for Pravin
  if (pravin && !productExists(pravin, "Handmade Pot")) {
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
  }
  
  if (pravin && !productExists(pravin, "Piggy bank")) {
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
  if (veena && !productExists(veena, "God's cloth Ghagra")) {
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
  if (lalita && !productExists(lalita, "Door mat")) {
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
  }
  
  if (lalita && !productExists(lalita, "Handkerchief")) {
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
  
  // Add products for Salmaan
  if (salmaan && !productExists(salmaan, "Paint Brush Stand")) {
    addProductToSeller(salmaan.id, {
      name: "Paint Brush Stand",
      description: "This handcrafted bamboo brush stand offers a stylish and durable way to organize and display brushes, perfect for artists and calligraphers.",
      price: 125,
      category: "Home Decor",
      image: "/brush_stand.jpg",
      materials: ["Eco-friendly Bamboo", "Smooth Lacquer Coating"],
      artisan: "Salmaan Sheikh",
      mobile: salmaan.mobile,
      inStock: true
    });
  }
  
  // Add products for Deepak
  if (deepak && !productExists(deepak, "Clay Bottle")) {
    addProductToSeller(deepak.id, {
      name: "Clay Bottle",
      description: "Handcrafted from natural clay and finished with a smooth glaze for durability and elegance.",
      price: 120,
      category: "Pottery",
      image: "/clay_bottle.jpg",
      materials: ["Pure Natural Clay", "Lead-free Coating"],
      artisan: "Deepak Singh",
      mobile: deepak.mobile,
      inStock: true
    });
  }
  
  // Add products for Sunita
  if (sunita && !productExists(sunita, "Homemade Pickle")) {
    addProductToSeller(sunita.id, {
      name: "Homemade Pickle",
      description: "Homemade with fresh ingredients, this flavorful pickle is crafted for a perfect balance of taste and tradition.",
      price: 160,
      category: "Food",
      image: "/picke.jpg",
      materials: ["Natural Spices", "Fresh Organic Ingredients"],
      artisan: "Sunita Pitliya",
      mobile: sunita.mobile,
      inStock: true
    });
  }
  
  if (sunita && !productExists(sunita, "Papad")) {
    addProductToSeller(sunita.id, {
      name: "Papad",
      description: "Crispy and flavorful, this handmade papad is crafted using traditional recipes with the finest natural ingredients. Perfect as a crunchy side dish or a light snack.",
      price: 50,
      category: "Food",
      image: "/papad.jpg",
      materials: ["Lentil flour", "Natural spices", "Sun-dried"],
      artisan: "Sunita Pitliya",
      mobile: sunita.mobile,
      inStock: true
    });
  }
  
  if (sunita && !productExists(sunita, "Coriander powder")) {
    addProductToSeller(sunita.id, {
      name: "Coriander powder",
      description: "Freshly ground coriander powder made from premium quality coriander seeds, perfect for enhancing the flavor of your dishes.",
      price: 50,
      category: "Food",
      image: "/Corianderpowder.jpg",
      materials: ["Coriander seeds", "Natural grinding"],
      artisan: "Sunita Pitliya",
      mobile: sunita.mobile,
      inStock: true
    });
  }
  
  // Add products for Shraddha
  if (shraddha && !productExists(shraddha, "Handmade Jewelry Set")) {
    addProductToSeller(shraddha.id, {
      name: "Handmade Jewelry Set",
      description: "Elegant handmade jewelry set featuring traditional designs with modern aesthetics. Perfect for special occasions.",
      price: 299,
      category: "Jewelry",
      image: "/jewelry1.jpg",
      materials: ["Silver", "Semi-precious stones", "Traditional beads"],
      artisan: "Shraddha Pande",
      mobile: shraddha.mobile,
      inStock: true
    });
  }
  
  console.log("Sample products initialized successfully!");
};

// Call the initialization function when the module is loaded
initializeSampleSellers(); 