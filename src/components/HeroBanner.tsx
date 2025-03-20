
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroBanner() {
  return (
    <div className="relative bg-craft-cream overflow-hidden">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-craft-cream flex items-center justify-center border border-dashed border-craft-forest/30">
          <p className="text-craft-forest/70">Hero image placeholder</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-craft-forest/30 to-craft-terracotta/30" />
      </div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-craft-forest mb-6 animate-fade-up">
          Discover Unique <span className="text-craft-terracotta">Handcrafted</span> Treasures
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-craft-forest/80 animate-fade-up" style={{ animationDelay: '100ms' }}>
          Support local artisans and bring home one-of-a-kind pieces crafted with passion and skill.
          Each purchase tells a story and supports a creator.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <Button asChild className="bg-craft-terracotta hover:bg-craft-clay text-white px-8 py-6">
            <Link to="/category/all">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" className="border-craft-forest text-craft-forest hover:bg-craft-forest hover:text-white px-8 py-6">
            <Link to="/artisans">Meet Our Artisans</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
