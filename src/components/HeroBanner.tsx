
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, TreePine } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1564270706897-d472b0f35f63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Bamboo forest"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nature-moss/30 to-nature-bamboo/30" />
      </div>
      
      {/* Floating leaf decorations */}
      <Leaf className="absolute text-nature-moss/20 top-1/4 left-[10%] rotate-45 w-12 h-12 animate-leaf-sway" />
      <Leaf className="absolute text-nature-olive/20 top-1/3 right-[15%] -rotate-12 w-16 h-16 animate-leaf-sway" style={{ animationDelay: '0.5s' }} />
      <Leaf className="absolute text-nature-leaf/20 bottom-1/4 left-[20%] rotate-90 w-10 h-10 animate-leaf-sway" style={{ animationDelay: '1s' }} />
      <TreePine className="absolute text-nature-bamboo/15 bottom-1/3 right-[10%] w-20 h-20" />
      
      <div className="relative container mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-nature-moss mb-6 animate-fade-up">
          Discover <span className="text-nature-bamboo italic">Handcrafted</span> Treasures from Nature
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-nature-moss/80 animate-fade-up" style={{ animationDelay: '100ms' }}>
          Support local artisans and bring home one-of-a-kind pieces crafted with sustainable materials.
          Each purchase tells a story and supports a creator who values nature.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <Button asChild className="bg-nature-bamboo hover:bg-nature-moss text-white px-8 py-6 rounded-md transition-all duration-300 shadow-nature hover:shadow-lg">
            <Link to="/category/all" className="flex items-center gap-2">
              <span>Shop Natural Crafts</span>
              <Leaf className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-nature-moss text-nature-moss hover:bg-nature-moss/10 px-8 py-6 rounded-md transition-all duration-300">
            <Link to="/artisans">Meet Our Artisans</Link>
          </Button>
        </div>
      </div>
      
      {/* Bottom decorative wave shape */}
      <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-16 text-nature-linen/95"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
