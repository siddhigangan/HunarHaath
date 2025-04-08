import { Product as SellerProduct, getSellers } from "./sellers";
import { Product as StaticProduct, products } from "./products";

// Convert static product to seller product format
const convertStaticProduct = (product: StaticProduct): SellerProduct => {
  // Find the seller by artisan name
  const sellers = getSellers();
  const seller = sellers.find(s => s.name === product.artisan);
  
  // Only mark the first 4 products as trending
  const isTrending = parseInt(product.id) <= 4;
  
  // Set createdAt to a date 10 days ago for static products
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - 10);
  
  return {
    id: product.id,
    sellerId: seller?.id || "static",
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    images: [product.image],
    materials: product.materials,
    artisan: product.artisan,
    createdAt: createdAt.toISOString(),
    isTrending,
    mobile: product.mobile,
    inStock: true,
  };
};

// Get all products (both static and seller-added)
export const getAllProducts = (): SellerProduct[] => {
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];

  const convertedStaticProducts = products.map(convertStaticProduct);
  return [...convertedStaticProducts, ...sellerProducts];
};

// ✅ FIXED: Support category as array (like ["Accessories"])
export const getProductsByCategory = (category: string): SellerProduct[] => {
  return getAllProducts().filter((product) => {
    if (Array.isArray(product.category)) {
      return product.category.includes(category);
    }
    return product.category === category;
  });
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
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get only seller products from localStorage
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];

  // Filter only products created in the last 7 days
  return sellerProducts.filter(
    (product) => new Date(product.createdAt) >= sevenDaysAgo
  );
};

export const getTrendingProducts = (): SellerProduct[] => {
  return getAllProducts().filter((product) => product.isTrending);
};

export const addProduct = (
  product: Omit<SellerProduct, "id" | "createdAt">
): SellerProduct => {
  const newProduct: SellerProduct = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  // Add to sellerProducts in localStorage
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];

  sellerProducts.push(newProduct);
  localStorage.setItem("sellerProducts", JSON.stringify(sellerProducts));

  // Also add to the seller's products array
  if (product.sellerId && product.sellerId !== "static") {
    const sellersJson = localStorage.getItem("sellers");
    if (sellersJson) {
      const sellers = JSON.parse(sellersJson);
      const sellerIndex = sellers.findIndex((s: any) => s.id === product.sellerId);
      
      if (sellerIndex !== -1) {
        // Add the product to the seller's products array
        sellers[sellerIndex].products.push(newProduct);
        localStorage.setItem("sellers", JSON.stringify(sellers));
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
