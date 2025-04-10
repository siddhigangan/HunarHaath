import { Product as SellerProduct, getSellers } from "./sellers";
import { Product as StaticProduct, products } from "./products";

// Convert static product to seller product format
const convertStaticProduct = (product: StaticProduct): SellerProduct => {
  // Find the seller by artisan name
  const sellers = getSellers();
  const seller = sellers.find(s => s.name === product.artisan);
  
  // Mark specific products as trending based on their IDs
  // You can modify this array to change which products are trending
  const trendingProductIds = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const isTrending = trendingProductIds.includes(product.id);
  
  // Set createdAt to a date 5 days ago for static products
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - 5);
  
  // Clean up category (remove any extra spaces)
  const cleanCategory = product.category.trim();
  
  return {
    id: product.id,
    sellerId: seller?.id || "static",
    name: product.name,
    description: product.description,
    price: product.price,
    category: cleanCategory,
    images: [product.image],
    materials: product.materials,
    artisan: product.artisan,
    createdAt: createdAt.toISOString(),
    isTrending,
    mobile: product.mobile || "",
    inStock: true,
  };
};

// Get all products (both static and seller-added)
export const getAllProducts = (): SellerProduct[] => {
  console.log("Getting all products...");
  
  // Get seller products from localStorage
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];
  console.log("Seller products from localStorage:", sellerProducts);

  // Get products directly from sellers
  const sellers = getSellers();
  const sellerProductsFromSellers: SellerProduct[] = [];
  
  sellers.forEach(seller => {
    if (seller.products && seller.products.length > 0) {
      sellerProductsFromSellers.push(...seller.products);
    }
  });
  
  console.log("Products from sellers:", sellerProductsFromSellers);

  // Convert static products
  const convertedStaticProducts = products.map(convertStaticProduct);
  console.log("Converted static products:", convertedStaticProducts);

  // Create a map to track unique products by ID
  const uniqueProductsMap = new Map<string, SellerProduct>();

  // Helper function to check if ID is numeric
  const isNumericId = (id: string) => /^\d+$/.test(id);

  // First, add all seller products from localStorage (they take precedence)
  sellerProducts.forEach(product => {
    if (isNumericId(product.id)) {
      uniqueProductsMap.set(product.id, product);
    }
  });

  // Then add products from sellers
  sellerProductsFromSellers.forEach(product => {
    if (isNumericId(product.id) && !uniqueProductsMap.has(product.id)) {
      uniqueProductsMap.set(product.id, product);
    }
  });

  // Finally add static products only if they don't exist
  convertedStaticProducts.forEach(product => {
    if (isNumericId(product.id) && !uniqueProductsMap.has(product.id)) {
      uniqueProductsMap.set(product.id, product);
    }
  });

  // Convert map back to array
  const allProducts = Array.from(uniqueProductsMap.values());
  console.log("All products after deduplication and numeric ID filtering:", allProducts);
  
  return allProducts;
};

// ✅ FIXED: Support category as array (like ["Accessories"])
export const getProductsByCategory = (category: string): SellerProduct[] => {
  console.log(`Getting products for category: ${category}`);
  
  // Get all products
  const allProducts = getAllProducts();
  console.log(`Total products available: ${allProducts.length}`);
  
  // Filter products by category
  const filteredProducts = allProducts.filter((product) => {
    // Handle case where category is an array
    if (Array.isArray(product.category)) {
      const includes = product.category.includes(category);
      console.log(`Product ${product.name} has categories ${product.category.join(', ')}, includes ${category}: ${includes}`);
      return includes;
    }
    
    // Handle case where category is a string
    const matches = product.category === category;
    console.log(`Product ${product.name} has category ${product.category}, matches ${category}: ${matches}`);
    return matches;
  });
  
  console.log(`Found ${filteredProducts.length} products for category ${category}`);
  return filteredProducts;
};

export const getProductById = (id: string): SellerProduct | undefined => {
  // First check seller products in localStorage
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];
  
  const sellerProduct = sellerProducts.find(product => product.id === id);
  if (sellerProduct) {
    return sellerProduct;
  }
  
  // If not found in seller products, check static products
  const staticProduct = products.find(product => product.id === id);
  if (staticProduct) {
    return convertStaticProduct(staticProduct);
  }
  
  return undefined;
};

export const getNewArrivals = (): SellerProduct[] => {
  console.log("Getting new arrivals...");
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  console.log("Seven days ago:", sevenDaysAgo);

  // Get all products (both static and seller-added)
  const allProducts = getAllProducts();
  console.log("All products:", allProducts);
  
  // Filter only products created in the last 7 days
  const newArrivals = allProducts.filter(
    (product) => {
      if (!product.createdAt) {
        console.log("Product missing createdAt:", product);
        return false;
      }
      const productDate = new Date(product.createdAt);
      const isNewArrival = productDate >= sevenDaysAgo;
      console.log(`Product ${product.name} created at ${productDate}, is new arrival: ${isNewArrival}`);
      return isNewArrival;
    }
  );

  console.log("Filtered new arrivals:", newArrivals);
  return newArrivals;
};

export const getTrendingProducts = (): SellerProduct[] => {
  // Get all products
  const allProducts = getAllProducts();
  
  // Sort all products by creation date (newest first)
  const sortedByDate = [...allProducts].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
  
  // Return the 4 newest products
  return sortedByDate.slice(0, 4);
};

export const addProduct = (
  product: Omit<SellerProduct, "id" | "createdAt">
): SellerProduct => {
  console.log("Adding new product:", product);
  
  const newProduct: SellerProduct = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(), // Ensure createdAt is set
    // Mark as new arrival by default
    isNewArrival: true,
    // Randomly mark some products as trending (about 20% chance)
    isTrending: Math.random() < 0.2,
  };

  console.log("Created new product with dates:", newProduct);

  // Add to sellerProducts in localStorage
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];

  // Check if product with same ID already exists
  const existingIndex = sellerProducts.findIndex(p => p.id === newProduct.id);
  if (existingIndex !== -1) {
    // Update existing product
    sellerProducts[existingIndex] = newProduct;
  } else {
    // Add new product
    sellerProducts.push(newProduct);
  }
  
  localStorage.setItem("sellerProducts", JSON.stringify(sellerProducts));
  console.log("Updated sellerProducts in localStorage:", sellerProducts);

  // Also add to the seller's products array
  if (product.sellerId && product.sellerId !== "static") {
    const sellersJson = localStorage.getItem("sellers");
    if (sellersJson) {
      const sellers = JSON.parse(sellersJson);
      const sellerIndex = sellers.findIndex((s: any) => s.id === product.sellerId);
      
      if (sellerIndex !== -1) {
        // Check if product already exists in seller's products
        const existingProductIndex = sellers[sellerIndex].products.findIndex(
          (p: any) => p.id === newProduct.id
        );
        
        if (existingProductIndex !== -1) {
          // Update existing product
          sellers[sellerIndex].products[existingProductIndex] = newProduct;
        } else {
          // Add new product
          sellers[sellerIndex].products.push(newProduct);
        }
        
        localStorage.setItem("sellers", JSON.stringify(sellers));
        console.log("Added/updated product in seller's products:", sellers[sellerIndex].products);
      } else {
        console.error(`Seller with ID ${product.sellerId} not found`);
      }
    }
  }

  return newProduct;
};

export const updateProduct = (
  id: string,
  updatedProduct: Partial<SellerProduct>
): SellerProduct | undefined => {
  // Get the product to find its sellerId
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];
  
  const productToUpdate = sellerProducts.find(p => p.id === id);
  
  // Update in sellerProducts in localStorage
  const index = sellerProducts.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  sellerProducts[index] = { ...sellerProducts[index], ...updatedProduct };
  localStorage.setItem("sellerProducts", JSON.stringify(sellerProducts));
  
  // Also update in the seller's products array
  if (productToUpdate && productToUpdate.sellerId && productToUpdate.sellerId !== "static") {
    const sellersJson = localStorage.getItem("sellers");
    if (sellersJson) {
      const sellers = JSON.parse(sellersJson);
      const sellerIndex = sellers.findIndex((s: any) => s.id === productToUpdate.sellerId);
      
      if (sellerIndex !== -1) {
        // Find and update the product in the seller's products array
        const productIndex = sellers[sellerIndex].products.findIndex((p: any) => p.id === id);
        if (productIndex !== -1) {
          sellers[sellerIndex].products[productIndex] = { 
            ...sellers[sellerIndex].products[productIndex], 
            ...updatedProduct 
          };
          localStorage.setItem("sellers", JSON.stringify(sellers));
        }
      }
    }
  }

  return sellerProducts[index];
};

export const deleteProduct = (id: string): boolean => {
  // Get the product to find its sellerId
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];
  
  const productToDelete = sellerProducts.find(p => p.id === id);
  
  // Remove from sellerProducts in localStorage
  const filteredProducts = sellerProducts.filter((p) => p.id !== id);
  localStorage.setItem("sellerProducts", JSON.stringify(filteredProducts));
  
  // Also remove from the seller's products array
  if (productToDelete && productToDelete.sellerId && productToDelete.sellerId !== "static") {
    const sellersJson = localStorage.getItem("sellers");
    if (sellersJson) {
      const sellers = JSON.parse(sellersJson);
      const sellerIndex = sellers.findIndex((s: any) => s.id === productToDelete.sellerId);
      
      if (sellerIndex !== -1) {
        // Remove the product from the seller's products array
        sellers[sellerIndex].products = sellers[sellerIndex].products.filter(
          (p: any) => p.id !== id
        );
        localStorage.setItem("sellers", JSON.stringify(sellers));
      }
    }
  }

  return true;
};
