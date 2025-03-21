
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
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
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-craft-terracotta">
              HUNARHAATH
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="text-craft-forest hover:text-craft-terracotta transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          {/* Search, Cart, and Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative w-64">
              <Input
                type="text"
                placeholder="Search crafts..."
                className="pr-8 border-craft-earth/30 focus-visible:ring-craft-terracotta/50"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-craft-forest/70" />
            </div>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-craft-forest" />
                <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-craft-terracotta text-white rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-craft-forest" />
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search (only visible on mobile) */}
        {isMobile && (
          <div className="pt-1 pb-3 px-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search crafts..."
                className="w-full pr-8 border-craft-earth/30 focus-visible:ring-craft-terracotta/50"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-craft-forest/70" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isOpen && (
        <nav className="md:hidden bg-white border-t border-craft-earth/10">
          <div className="container mx-auto py-3 px-4">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="block py-2 px-4 text-craft-forest hover:bg-craft-cream rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-craft-earth/10">
                <Link
                  to="/login"
                  className="block py-2 px-4 text-craft-forest hover:bg-craft-cream rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block py-2 px-4 text-craft-forest hover:bg-craft-cream rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
