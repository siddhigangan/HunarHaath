import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from "@/context/CartContext";
import { getAllProducts } from '@/data/sharedProducts';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isTranslateReady, setIsTranslateReady] = useState(false);

  const isMobile = useIsMobile();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const sellerId = localStorage.getItem("sellerId");
    const isSellerLoggedIn = localStorage.getItem("isSeller");
    setIsSeller(!!(sellerId && isSellerLoggedIn));
  }, []);

  useEffect(() => {
    const addTranslateScript = () => {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.id = "google-translate-script";
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,mr",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
        setIsTranslateReady(true);
      }
    };

    if (!document.getElementById("google-translate-script")) {
      addTranslateScript();
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }

    return () => {
      window.googleTranslateElementInit = () => {};
    };
  }, []);

  useEffect(() => {
    if (!isTranslateReady) return;

    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-combo {
        padding: 6px 12px !important;
        border-radius: 8px !important;
        border: 1px solid #d1d5db !important;
        background-color: #f9fafb !important;
        font-size: 14px !important;
        color: #1f2937 !important;
        font-family: inherit !important;
      }
      .goog-te-banner-frame { display: none !important; }
      .goog-tooltip, .goog-tooltip:hover { display: none !important; }
      .goog-text-highlight { background-color: transparent !important; }
      body { top: 0 !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isTranslateReady]);

  const handleLogout = () => {
    localStorage.removeItem("sellerId");
    localStorage.removeItem("isSeller");
    sessionStorage.clear();
    setIsSeller(false);
    window.location.href = "/";
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const products = getAllProducts();
    const results = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.artisan.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const categories = [
    { name: "Pottery", path: "/category/pottery" },
    { name: "Jewelry", path: "/category/jewelry" },
    { name: "Food", path: "/category/Food" },
    { name: "Home Decor", path: "/category/home-decor" },
    { name: "Clothing", path: "/category/clothing" },
    { name: "Accessories", path: "/category/accessories" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-craft-terracotta">HunarHaath</span>
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="text-craft-forest hover:text-craft-terracotta transition"
                >
                  {category.name}
                </Link>
              ))}
              <Link to="/all-products" className="text-craft-forest hover:text-craft-terracotta">All Products</Link>
              <Link to="/sellers" className="text-craft-forest hover:text-craft-terracotta">Sellers</Link>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {!isMobile && (
              <div className="relative w-64">
                <Input
                  type="text"
                  placeholder="Search crafts..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pr-8 border-craft-earth/30 focus-visible:ring-craft-terracotta/50"
                />
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-craft-forest/70" />
                {searchResults.length > 0 && (
                  <div className="absolute z-20 mt-2 w-full bg-white border shadow-md rounded-md">
                    <div className="p-2 border-b flex justify-end">
                      <button onClick={() => setSearchResults([])} className="text-sm text-red-500 hover:underline">
                        Close
                      </button>
                    </div>
                    {searchResults.map((product: any) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="block px-4 py-2 hover:bg-gray-100 text-sm text-craft-forest"
                      >
                        {product.name} by {product.artisan}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Link to="/cart" className="relative text-gray-700 hover:text-craft-terracotta">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-craft-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isSeller ? (
              <>
                <Button variant="ghost" size="icon" onClick={() => navigate("/seller-dashboard")}>
                  <User className="h-5 w-5 text-craft-terracotta" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5 text-craft-terracotta" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5 text-craft-forest" />
                  </Button>
                </Link>
                <Link to="/seller-login">
                  <Button variant="ghost" className="text-craft-terracotta text-sm">Seller Login</Button>
                </Link>
              </>
            )}

            {/* Translate Widget */}
            <div id="google_translate_element" className="hidden md:block ml-2" />

            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        {isMobile && (
          <div className="p-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search crafts..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pr-8 border-craft-earth/30 focus-visible:ring-craft-terracotta/50"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-craft-forest/70" />
            </div>
          </div>
        )}
      </div>

      {isMobile && isOpen && (
        <nav className="bg-white border-t border-gray-200">
          <ul className="p-4 space-y-2">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  to={category.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-craft-forest hover:text-craft-terracotta"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/all-products" className="block text-craft-terracotta" onClick={() => setIsOpen(false)}>
                View All Products
              </Link>
            </li>
            <li>
              <Link to="/sellers" className="block text-craft-terracotta" onClick={() => setIsOpen(false)}>
                Sellers
              </Link>
            </li>
            {isSeller ? (
              <>
                <li>
                  <Link to="/seller-dashboard" onClick={() => setIsOpen(false)} className="block text-craft-terracotta">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left text-craft-terracotta"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/seller-login" className="block text-craft-terracotta" onClick={() => setIsOpen(false)}>
                  Seller Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
