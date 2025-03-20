
import { Link } from 'react-router-dom';

interface Category {
  name: string;
  image: string;
  path: string;
}

export function FeaturedCategories() {
  const categories: Category[] = [
    {
      name: "Pottery",
      image: "/Bottle.jpg",
      path: "/category/pottery"
    },
    {
      name: "Jewelry",
      image: "",
      path: "/category/jewelry"
    },
    {
      name: "Home Decor",
      image: "/purse real.jfif",
      path: "/category/home-decor"
    },
    {
      name: "Paintings",
      image: "",
      path: "/category/paintings"
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-8">Explore Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.name} 
              to={category.path}
              className="group relative overflow-hidden rounded-lg shadow-md hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <div className="w-full h-full bg-craft-cream/50 flex items-center justify-center border border-dashed border-craft-forest/30">
                  <p className="text-craft-forest/60">{category.name}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-craft-forest/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-serif text-white">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
