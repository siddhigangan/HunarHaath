
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-craft-forest text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Hunarhaath</h3>
            <p className="text-craft-cream/80 mb-4">
              Connecting artisans with customers worldwide. Discover unique handcrafted
              products made with love and skill.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-craft-sand transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-craft-sand transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-craft-sand transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/pottery" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Pottery</Link></li>
              <li><Link to="/category/jewelry" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Jewelry</Link></li>
              <li><Link to="/category/paintings" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Paintings</Link></li>
              <li><Link to="/category/home-decor" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Home Decor</Link></li>
              <li><Link to="/category/clothing" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Clothing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-4">Information</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-craft-cream/80 hover:text-craft-sand transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-craft-cream/80 hover:text-craft-sand transition-colors">FAQs</Link></li>
              <li><Link to="/sell" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Sell on HunarHaath</Link></li>
              <li><Link to="/privacy" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          
        </div>
        
        <div className="border-t border-craft-cream/20 mt-8 pt-8 text-center text-craft-cream/60">
          <p>&copy; {new Date().getFullYear()} Hoonarhaath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
