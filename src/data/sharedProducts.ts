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
  isNewArrival: true,
  mobile: product.mobile, // ✅ Added mobile number
});

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
  return getAllProducts().find((product) => product.id === id);
};

export const getNewArrivals = (): SellerProduct[] => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return getAllProducts().filter(
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

  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];

  sellerProducts.push(newProduct);
  localStorage.setItem("sellerProducts", JSON.stringify(sellerProducts));

  return newProduct;
};

export const updateProduct = (
  id: string,
  updatedProduct: Partial<SellerProduct>
): SellerProduct | undefined => {
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];

  const index = sellerProducts.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  sellerProducts[index] = { ...sellerProducts[index], ...updatedProduct };
  localStorage.setItem("sellerProducts", JSON.stringify(sellerProducts));

  return sellerProducts[index];
};

export const deleteProduct = (id: string): boolean => {
  const sellerProductsJson = localStorage.getItem("sellerProducts");
  const sellerProducts: SellerProduct[] = sellerProductsJson ? JSON.parse(sellerProductsJson) : [];

  const filteredProducts = sellerProducts.filter((p) => p.id !== id);
  localStorage.setItem("sellerProducts", JSON.stringify(filteredProducts));

  return true;
};
