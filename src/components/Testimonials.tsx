
export function Testimonials() {
  const testimonials = [
    {
      quote: "The quality of the handcrafted jewelry I ordered exceeded my expectations. I love knowing the story behind each piece!",
      author: "Jessica M.",
      location: "Portland, OR"
    },
    {
      quote: "CraftConnect has connected me with talented artisans I would have never discovered otherwise. My home is filled with unique pieces now.",
      author: "Michael T.",
      location: "Austin, TX"
    },
    {
      quote: "As an artisan, this platform has helped me reach customers worldwide. The support from the CraftConnect team has been amazing!",
      author: "Sarah L.",
      location: "Asheville, NC"
    }
  ];

  return (
    <section className="py-12 bg-craft-sage/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-12">What People Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md flex flex-col animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-grow">
                <svg className="h-8 w-8 text-craft-terracotta mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z" />
                </svg>
                <p className="italic text-craft-forest mb-6">{testimonial.quote}</p>
              </div>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
