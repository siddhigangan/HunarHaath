const ContactUs = () => { 
    return (
      <div className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-craft-forest mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-4">
          Have questions or need assistance? Get in touch with us via the form below or reach out through our contact details.
        </p>
  
        {/* Contact Information */}
        <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-craft-sand mb-4">HunarHaath</h2>
          <h3 className="text-2xl font-semibold text-craft-sand mb-4">Reach Out To Our Team</h3>
  
          {/* Phone Numbers */}
          <p className="text-gray-700 font-semibold">📞 PHONE:</p>
          <ul className="text-gray-700 ml-4 space-y-2">
            <li><strong>Khushi Gilda:</strong> +91 8830466445</li>
            <li><strong>Sandali Katrojwar:</strong> +91 8624013449</li>
            <li><strong>Siddhi Gangan:</strong> +91 9516371467</li>
            <li><strong>Rohit Deshlahara:</strong> +91 7385468400</li>
            <li><strong>Yash Malpani:</strong> +91 9403985986</li>
          </ul>
  
          {/* Email & Business Hours */}
          <p className="text-gray-700 mt-4">
            <strong>📧 Email:</strong> <a href="mailto:hunarhaathh@gmail.com" className="text-blue-600 hover:underline">hunarhaathh@gmail.com</a>
          </p><br></br>
          <p className="text-gray-700">
            <strong>🕒 Business Hours:</strong> Monday - Saturday | 9:00 AM - 6:00 PM
          </p>
        </div>
  
        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-craft-sand" 
              placeholder="Your Name" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-craft-sand" 
              placeholder="Your Email" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-craft-sand" 
              rows={4} 
              placeholder="Your Message" 
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-craft-forest text-white px-4 py-2 rounded-md hover:bg-craft-sand transition"
          >
            Send Message
          </button>
        </form>
      </div>
    );
  };
  
  export default ContactUs;
  