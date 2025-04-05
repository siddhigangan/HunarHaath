import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import PotteryCategory from "./pages/Category/Pottery";
import JewelryCategory from "./pages/Category/Jewelry";
import HomeDecorCategory from "./pages/Category/homedecor";
import FoodCategory from "./pages/Category/Food";
import ArtisanRegister from "./pages/ArtisanRegister";
import SellerDashboard from "./pages/SellerDashboard";
import { AboutUs } from "@/components/AboutUs";
import SellerLogin from "./pages/SellerLogin";
import ContactUs from "./pages/ContactUs";
import Faqs from "./pages/Faqs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Category Routes */}
          <Route path="/category/pottery" element={<PotteryCategory />} />
          <Route path="/category/jewelry" element={<JewelryCategory />} />
          <Route path="/category/home-decor" element={<HomeDecorCategory />} /> 
          <Route path="/category/food" element={<FoodCategory />} />

          {/* Artisan Routes */}
          <Route path="/artisan-register" element={<ArtisanRegister />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller/login" element={<SellerLogin />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
