import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  useEffect(() => {
    const addTranslateScript = () => {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.id = "google-translate-script";
      document.body.appendChild(script);
    };

    // Google Translate initialization function
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,mr",
            layout: window.google.translate.InlineLayout.SIMPLE, // Using InlineLayout.SIMPLE
          },
          "google_translate_element"
        );
      }
    };

    // Ensure the script is added only once
    if (!document.getElementById("google-translate-script")) {
      addTranslateScript();
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }

    return () => {
      // Cleanup function to reset googleTranslateElementInit when the component is unmounted
      window.googleTranslateElementInit = () => {};
    };
  }, []);

  return (
    <footer className="bg-craft-forest text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">HunarHaath</h3>
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
              <li><Link to="/Category/Pottery" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Pottery</Link></li>
              <li><Link to="/Category/Jewelry" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Jewelry</Link></li>
              <li><Link to="/Category/Food" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Food</Link></li>
              <li><Link to="/Category/homedecor" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Home Decor</Link></li>
              <li><Link to="/Category/Clothing" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Clothing</Link></li>
              <li><Link to="/Category/Accessories" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-4">Information</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-craft-cream/80 hover:text-craft-sand transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-craft-cream/80 hover:text-craft-sand transition-colors">FAQs</Link></li>
              <li><Link to="/customize-product" className="text-craft-cream/80 hover:text-craft-sand transition-colors">Customize your product</Link></li>
            </ul>
          </div>
        </div>

        {/* Google Translate Widget */}
        <div id="google_translate_element" className=" md:block ml-2" />

        <div className="border-t border-craft-cream/20 mt-8 pt-8 text-center text-craft-cream/60">
          <p>&copy; {new Date().getFullYear()} HunarHaath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
