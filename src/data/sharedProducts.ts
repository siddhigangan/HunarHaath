import { Product as SellerProduct } from "./sellers";
import { Product as StaticProduct, products } from "./products";

// Convert static product to seller product format
const convertStaticProduct = (product: StaticProduct): SellerProduct => ({
  id: product.id,
  sellerId: "static",
  name: product.name,
  description: product.description,
  price: product.price,
  category: product.category,
  images: [product.image],
  materials: product.materials,
  artisan: product.artisan,
  createdAt: new Date().toISOString(),
  isTrending: true,
  isNewArrival: true
});

// Get all products (both static and seller-added)
export const getAllProducts = (): SellerProduct[] => {
  // Get seller products from localStorage
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];
  
  // Convert static products to the correct format and combine with seller products
  const convertedStaticProducts = products.map(convertStaticProduct);
  return [...convertedStaticProducts, ...sellerProducts];
};

// Get products by category
export const getProductsByCategory = (category: string): SellerProduct[] => {
  return getAllProducts().filter(product => product.category === category);
};

// Get a specific product by ID
export const getProductById = (id: string): SellerProduct | undefined => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === id);
};

// Get new arrivals (both static and seller-added)
export const getNewArrivals = (): SellerProduct[] => {
  const allProducts = getAllProducts();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  return allProducts.filter(product => 
    new Date(product.createdAt) >= sevenDaysAgo
  );
};

// Get trending products (both static and seller-added)
export const getTrendingProducts = (): SellerProduct[] => {
  const allProducts = getAllProducts();
  return allProducts.filter(product => product.isTrending);
};

// Function to add a new product (for sellers)
export const addProduct = (product: Omit<SellerProduct, "id" | "createdAt">): SellerProduct => {
  const newProduct: SellerProduct = {
    ...product,
    id: Date.now().toString(), // Generate a unique ID
    createdAt: new Date().toISOString(),
  };

  // Get existing seller products
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];
  
  // Add new product
  sellerProducts.push(newProduct);
  
  // Save back to localStorage
  localStorage.setItem("sellerProducts", JSON.stringify(sellerProducts));

  return newProduct;
};

// Function to update a product
export const updateProduct = (id: string, updatedProduct: Partial<SellerProduct>): SellerProduct | undefined => {
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];
  
  const index = sellerProducts.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  sellerProducts[index] = { ...sellerProducts[index], ...updatedProduct };
  localStorage.setItem("sellerProducts", JSON.stringify(sellerProducts));

  return sellerProducts[index];
};

// Function to delete a product
export const deleteProduct = (id: string): boolean => {
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];
  
  const filteredProducts = sellerProducts.filter((p) => p.id !== id);
  localStorage.setItem("sellerProducts", JSON.stringify(filteredProducts));

  return true;
}; 