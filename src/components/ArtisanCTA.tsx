
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function ArtisanCTA() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-craft-cream/50 flex items-center justify-center border border-dashed border-craft-forest/30">
          <p className="text-craft-forest/60">Artisan background image placeholder</p>
        </div>
        <div className="absolute inset-0 bg-craft-forest/60" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 animate-fade-up">Are You a Craft Artisan?</h2>
          <p className="text-lg mb-8 opacity-90 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Join our community of talented artisans and share your handcrafted creations with customers worldwide. 
            Grow your business, tell your story, and connect with people who appreciate your craft.
          </p>
          <Button asChild size="lg" className="bg-craft-terracotta hover:bg-craft-clay text-white animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Link to="/sell">Start Selling Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
