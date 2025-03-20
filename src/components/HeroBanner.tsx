import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    image: "/Artisian.jpg", // ✅ Updated image
    alt: "Handcrafted pottery collection",
    title: "Discover Artisanal Treasures",
    subtitle: "Handcrafted with Love, Created with Passion",
    cta: "Explore Collection",
  },
  {
    id: 2,
    image: "/papad.jpg",
    alt: "Handcrafted crispy papads",
    title: "Authentic Handmade Delicacies",
    subtitle: "Savor the Taste of Tradition with Our Handcrafted Papads",
    cta: "Discover More",
  }, 
  {
    id: 3,
    image: "/homeanddecor.jpg",
    alt: "Handmade home decor items",
    title: "Unique Home Decor",
    subtitle: "One-of-a-kind Pieces to Transform Your Space",
    cta: "Shop Home Decor",
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToNextSlide();
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSlide]);

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center">
        <div className="px-6 max-w-5xl">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ease-out ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 absolute"
              }`}
              aria-hidden={index !== currentSlide}
            >
              <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-lg">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
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

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-110" : "bg-white/50"
            }`}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrentSlide(index);
              setTimeout(() => setIsTransitioning(false), 500);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
