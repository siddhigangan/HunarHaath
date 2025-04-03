export interface Seller {
  id: string;
  name: string;
  contact: string;
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
  sellerId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  materials: string;
  artisan: string;
  createdAt: string;
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
    products: []
  };

  sellers.push(newSeller);
  localStorage.setItem('sellers', JSON.stringify(sellers));
  return newSeller;
};

// Add a product to a seller's profile
export const addProductToSeller = (sellerId: string, productData: Omit<Product, 'id' | 'sellerId' | 'createdAt'>): Product => {
  const sellers = getSellers();
  const sellerIndex = sellers.findIndex(s => s.id === sellerId);

  if (sellerIndex === -1) {
    throw new Error('Seller not found');
  }

  const newProduct: Product = {
    ...productData,
    id: generateId(),
    sellerId,
    createdAt: new Date().toISOString()
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