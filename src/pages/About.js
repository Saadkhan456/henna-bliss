import React from "react";

const AboutUs = () => {
  return (
    <div className="font-inter">
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center text-white flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://static.toiimg.com/photo/68595529.cms')",
        }}
      >
        <h1 className="text-4xl font-bold bg-black bg-opacity-20 px-4 py-2 rounded">
          About Us
        </h1>
      </div>

      {/* Introduction Section */}
      <div className="max-w-5xl mx-auto my-10 text-center px-4">
        <h2 className="text-3xl font-bold mb-4 text-green-700">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to{" "}
          <span className="font-bold text-green-700">Henna Bliss</span>, your
          trusted brand for premium-quality Mehendi cones. We specialize in
          crafting 🍀 100% natural, chemical-free Mehendi for every occasion,
          from casual designs to intricate bridal artwork.
        </p>
      </div>

      {/* Product Showcase */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10 px-6">
        {/* Simple Mehendi Cone */}
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://i.ibb.co/3y88JP4K/Whats-App-Image-2025-02-16-at-6-47-53-PM.jpg"
            alt="Simple Mehendi Cone"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-2xl font-bold text-green-700">
              Simple Mehendi Cone
            </h3>
            <p className="text-gray-600 mt-2">
              Perfect for casual occasions, festivals, and daily wear. Get a
              deep stain with our organic formula.
            </p>
          </div>
        </div>

        {/* Bridal Mehendi Cone */}
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://pyaariweddings.co/public/static/assets/ckfinder/userfiles/files/Neha%20assar.jpeg"
            alt="Bridal Mehendi Cone"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-2xl font-bold text-green-700">
              Bridal Mehendi Cone
            </h3>
            <p className="text-gray-600 mt-2">
              Specially crafted for brides, giving the richest, darkest stain
              for a long-lasting impression.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-5xl mx-auto my-12 px-6">
        <h2 className="text-3xl font-bold text-center text-green-700">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">🌿 100% Natural</h3>
            <p className="text-gray-600">
              Our Mehendi is made from pure henna leaves with no chemicals or
              artificial dyes.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">🎨 Rich & Dark Stain</h3>
            <p className="text-gray-600">
              Our special formula ensures the deepest, longest-lasting color.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">🫧 Cleanly Made</h3>
            <p className="text-gray-600">
              Made under Safety Precautions and Hygiene
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">🚚 Fast & Safe Delivery</h3>
            <p className="text-gray-600">
              We ensure quick, hassle-free shipping to keep your celebrations on
              time.
            </p>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="bg-black text-white p-4 mt-12">
        <div className="flex flex-col items-center space-y-4">
          {/* Order Message */}
          <div className="text-center text-sm mt-4">
            <p>
              📩 We accept orders through WhatsApp and Instagram! 💬 We reply
              fast!
            </p>
          </div>
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://wa.me/message/3N56IHCC72EHB1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"
                alt="WhatsApp"
                className="w-8 h-8"
              />
            </a>
            <a
              href="https://www.instagram.com/henna.bliss01?utm_source=qr&igsh=MjZhM3BqdG0yZnZl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
        <div className="text-center text-sm mt-4">
          <p>&copy; 2025 Henna Bliss. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
