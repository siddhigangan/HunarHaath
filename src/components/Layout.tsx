
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Leaf, Wind } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-nature-linen/50 bamboo-texture">
      {/* Bamboo stick decoration - left */}
      <div className="absolute top-0 left-0 w-8 h-full opacity-20 pointer-events-none overflow-hidden">
        <div className="relative h-full w-full">
          <div className="absolute left-3 top-0 h-full w-4 bg-nature-bamboo rounded-full"></div>
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={`joint-left-${i}`} 
              className="absolute left-2 w-6 h-1 bg-nature-bark/70 rounded-full"
              style={{ top: `${(i + 1) * 8}%` }}
            />
          ))}
        </div>
      </div>
      
      {/* Bamboo stick decoration - right */}
      <div className="absolute top-0 right-0 w-8 h-full opacity-20 pointer-events-none overflow-hidden">
        <div className="relative h-full w-full">
          <div className="absolute right-3 top-0 h-full w-4 bg-nature-bamboo rounded-full"></div>
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={`joint-right-${i}`} 
              className="absolute right-2 w-6 h-1 bg-nature-bark/70 rounded-full"
              style={{ top: `${(i + 1) * 8 + 4}%` }}
            />
          ))}
        </div>
      </div>
      
      {/* Floating leaf decorations */}
      <Leaf className="leaf-decoration text-nature-moss top-[15%] left-[10%] rotate-45" size={24} />
      <Leaf className="leaf-decoration text-nature-leaf top-[25%] right-[8%] -rotate-12" size={18} />
      <Leaf className="leaf-decoration text-nature-olive top-[45%] left-[15%] rotate-90" size={20} />
      <Leaf className="leaf-decoration text-nature-sage top-[65%] right-[12%] rotate-180" size={26} />
      <Leaf className="leaf-decoration text-nature-bamboo top-[80%] left-[12%] rotate-15" size={22} />
      <Wind className="leaf-decoration text-nature-moss/20 top-[35%] right-[20%] -rotate-12" size={32} />
      <Wind className="leaf-decoration text-nature-moss/20 top-[55%] left-[18%] rotate-12" size={28} />
      
      <Navbar />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
