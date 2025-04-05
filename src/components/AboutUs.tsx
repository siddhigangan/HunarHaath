import React from 'react';

export function AboutUs() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif text-center mb-12">About Us</h1>
        
        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            At HunarHaath, we're passionate about bridging the gap between local artisans and the digital world. 
            Our mission is to empower talented craftspeople by providing them with a platform to showcase their unique creations 
            to a global audience. We believe in preserving traditional craftsmanship while embracing modern technology to create 
            meaningful connections between artisans and art enthusiasts.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img src="/khushi.jpg" alt="Khushi" className="w-48 h-48 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-xl font-serif mb-2">Khushi Gilda</h3>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
            <img src="/sandali.jpg" alt="Sandali" className="w-48 h-48 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-xl font-serif mb-2">Sandali Katrojwar</h3>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
            <img src="/siddhi.jpg" alt="Siddhi" className="w-48 h-48 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-xl font-serif mb-2">Siddhi Gangan</h3>
            </div>

            {/* Team Member 4 */}
            <div className="text-center">
            <img src="/rohit.jpg" alt="Rohit" className="w-48 h-48 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-xl font-serif mb-2">Rohit Deshlahara</h3>
            </div>

            {/* Team Member 5 */}
            <div className="text-center">
              <img src="/yash.jpg" alt="Yash" className="w-48 h-48 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-xl font-serif mb-2">Yash Malpani</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 