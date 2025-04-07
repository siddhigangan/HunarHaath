import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import SellerLogin from "@/pages/SellerLogin";
import SellerDashboard from "@/pages/SellerDashboard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import HomeDecorCategory from "./pages/Category/homedecor";
import FoodCategory from "./pages/Category/Food";
import PotteryCategory from "./pages/Category/Pottery";
import JewelryCategory from "./pages/Category/Jewelry";
import ArtisanRegister from "./pages/ArtisanRegister";
import { AboutUs } from "@/pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Faqs from "./pages/Faqs";
import ClothingCategory from "@/pages/Category/Clothing";
import AccessoriesCategory from "@/pages/Category/Accessories";

const queryClient = new QueryClient();

function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CartProvider>
          <Router>
            <Routes>
              <Route element={<LayoutWrapper />}>
                <Route path="/" element={<Home />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="login" element={<Login />} />
                <Route path="seller-login" element={<SellerLogin />} />
                <Route path="seller-dashboard" element={<SellerDashboard />} />
                <Route path="category/pottery" element={<PotteryCategory />} />
                <Route path="category/jewelry" element={<JewelryCategory />} />
                <Route path="category/food" element={<FoodCategory />} />
                <Route path="category/home-decor" element={<HomeDecorCategory />} />
                <Route path="category/clothing" element={<ClothingCategory />} />
                <Route path="category/accessories" element={<AccessoriesCategory />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="faqs" element={<Faqs />} />
                <Route path="artisan-register" element={<ArtisanRegister />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
