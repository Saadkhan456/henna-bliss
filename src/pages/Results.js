import React from "react";

const Results = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Mehendi Color Results
      </h1>

      {/* Bridal Cone - Image Right */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold">Bridal Mehendi Cone</h2>
          <p className="text-gray-700">
            Specially crafted for brides, our Mehendi offers an intense,
            long-lasting stain, perfect for wedding ceremonies.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co/bR3ydnGt/Whats-App-Image-2025-02-20-at-9-15-34-PM.jpg"
            alt="Bridal Mehendi Cone Result"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Bridal Cone - Image Left */}
      <div className="flex flex-col md:flex-row-reverse items-center mb-8">
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold">Bridal Mehendi Cone</h2>
          <p className="text-gray-700">
            Formulated for deep, rich color, our bridal Mehendi enhances
            intricate designs with a bold and elegant finish.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://i.postimg.cc/YSk19tj3/Whats-App-Image-2025-02-18-at-4-26-19-PM.jpg"
            alt="Bridal Mehendi Cone Result"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      {/* Simple Cone - Image Right */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold">Simple Mehendi Cone</h2>
          <p className="text-gray-700">
            Desgined for Learning Students, and practice on the go
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co/3y88JP4K/Whats-App-Image-2025-02-16-at-6-47-53-PM.jpg"
            alt=""
            border="0"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Simple Cone - Image Left */}
      <div className="flex flex-col md:flex-row-reverse items-center mb-8">
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold">Simple Mehendi Cone</h2>
          <p className="text-gray-700">
            Our Simple Emehndi Cone is Designed for Mehendi Learing individuals
            at very low price
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co/VcSZtXVj/Whats-App-Image-2025-02-16-at-6-47-53-PM-1.jpg"
            alt="Simple Mehendi Cone Result"
            className="rounded-lg shadow-lg"
          />
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

export default Results;
