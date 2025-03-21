import { Link } from "react-router-dom";

interface Category {
  name: string;
  image: string;
  path: string;
}

export function FeaturedCategories() {
  const categories: Category[] = [
    {
      name: "Pottery",
      image: "/potterythumb.jpg",
      path: "/category/pottery",
    },
    {
      name: "Jewelry",
      image: "/jewthumb.jpg",
      path: "/category/jewelry",
    },
    {
      name: "Home Decor",
      image: "/homethumb.jpg", // ✅ Fixed filename
      path: "/category/home-decor",
    },
    {
      name: "Food",
      image: "/papad.jpg", // ✅ Fixed filename & path
      path: "/category/food",
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
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-full h-[250px] relative rounded-lg overflow-hidden"> 
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/fallback.jpg")} // ✅ Added fallback image
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-serif text-white text-center">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
