import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: 'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
    alt: 'Handcrafted pottery collection',
    title: 'Discover Artisanal Treasures',
    subtitle: 'Handcrafted with Love, Created with Passion',
    cta: 'Explore Collection'
  },
  {
    id: 2,
    image: 'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb',
    alt: 'Traditional textiles and fabrics',
    title: 'Traditional Craftsmanship',
    subtitle: 'Supporting Local Artisans and Preserving Heritage',
    cta: 'Meet Our Artisans'
  },
  {
    id: 3,
    image: 'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    alt: 'Handmade home decor items',
    title: 'Unique Home Decor',
    subtitle: 'One-of-a-kind Pieces to Transform Your Space',
    cta: 'Shop Home Decor'
  }
];

export function HeroBanner(){
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  const goToPrevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  const goToNextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center">
        <div className="container-custom px-6 max-w-5xl">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ease-out ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute'
              }`}
              aria-hidden={index !== currentSlide}
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-lg">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                  {slide.subtitle}
                </p>
                <button className="btn-craft text-lg px-8 py-3">
                  {slide.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrentSlide(index);
              setTimeout(() => {
                setIsTransitioning(false);
              }, 500);
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
};

