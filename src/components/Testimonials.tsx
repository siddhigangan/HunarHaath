export function Testimonials() {
  const reasons = [
    {
      quote: "HunarHaath provides a platform where artisans can showcase their craftsmanship to a global audience, helping them gain visibility and recognition.",
      author: "Increased Reach",
      location: "Connect with global customers"
    },
    {
      quote: "Through HunarHaath, artisans can sell their products directly without middlemen, ensuring they receive fair compensation for their work.",
      author: "Fair Trade",
      location: "Empowering artisans financially"
    },
    {
      quote: "Artisans get access to resources, training, and support from the HunarHaath team, helping them improve their skills and grow sustainably.",
      author: "Skill Development",
      location: "Enhancing artisan potential"
    }
  ];

  return (
    <section className="py-12 bg-craft-sage/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-12">
          Why Artisans Need HunarHaath?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md flex flex-col animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-grow">
                <p className="text-craft-forest mb-6 text-base leading-relaxed">
                  {reason.quote}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg">{reason.author}</p>
                <p className="text-sm text-muted-foreground">{reason.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
