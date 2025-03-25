import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import PotteryCategory from "./pages/Category/Pottery";
import JewelryCategory from "./pages/Category/Jewelry";
import HomeDecorCategory from "./pages/Category/homedecor";
import FoodCategory from "./pages/Category/Food";
import ArtisanRegister from "./pages/ArtisanRegister";  // New Artisan Registration Page
import SellerDashboard from "./pages/SellerDashboard";  // New Seller Dashboard

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Category Routes */}
          <Route path="/category/pottery" element={<PotteryCategory />} />
          <Route path="/category/jewelry" element={<JewelryCategory />} />
          <Route path="/category/home-decor" element={<HomeDecorCategory />} /> 
          <Route path="/category/food" element={<FoodCategory />} />

          {/* Artisan Routes */}
          <Route path="/artisan-register" element={<ArtisanRegister />} />  {/* New */}
          <Route path="/seller-dashboard" element={<SellerDashboard />} />  {/* New */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
