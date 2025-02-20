import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const images = [
    {
      url: "https://images.prismic.io/milanmagic/56576f2c-b15c-40f9-94a6-8c4bc24625ab_backhand+mehndi+design.jpg?auto=compress,format&rect=0,0,1470,752&w=1024&h=524",
      message: "Now Mehendi Cones Available Online!",
    },
    {
      url: "https://assets.vogue.in/photos/5ce424d02e615019d80b0184/master/pass/history-of-bridal-mehandi.jpg",
      message: "Bridal and Simple Cones Available",
    },
    {
      url: "https://c1.wallpaperflare.com/preview/489/1014/368/mehndi-henna-indian-wedding-hand.jpg",
      message: "Beautiful Results of our Mehendi Cones",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Simple Cone",
      price: 10,
      description:
        "High-quality mehndi cone for intricate and beautiful designs. Perfect for beginners and professionals alike.",
      image:
        "https://i.ibb.co/VcSZtXVj/Whats-App-Image-2025-02-16-at-6-47-53-PM-1.jpg",
    },
    {
      id: 2,
      name: "Bridal Cone",
      price: 20,
      description: "Bridal Cone for Brides and big celebrations.",
      image: "https://www.imghippo.com/i/PFg8300GGo.jpeg",
    },
  ];

  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, amount) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + amount),
    }));
  };

  const handleAddToCart = (product) => {
    // Check if the user is logged in
    if (!user) {
      showAlert("Please log in or register to add items to the cart.", "error");
      navigate("/"); // Redirect to login page
      return;
    }

    // If the user is logged in, proceed with adding to cart
    let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantities[product.id];
    } else {
      updatedCart.push({ ...product, quantity: quantities[product.id] });
    }

    // Save the cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showAlert(
      `Added ${quantities[product.id]} ${product.name}(s) to the cart!`,
      "success"
    );
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => setAlertMessage(""), 3000); // Clear the alert after 3 seconds
  };

  return (
    <div className="p-6 text-center">
      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 mt-4 rounded-lg text-white text-sm
          ${alertType === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {alertMessage}
        </div>
      )}

      {/* Carousel Section */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center h-96 relative">
              <img
                src={image.url}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <h2 className="text-white text-3xl font-bold">
                  {image.message}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔹 Product Section */}
      <div className="flex flex-col items-center mt-10 space-y-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg text-left"
          >
            <h2 className="text-3xl font-bold text-green-700">
              {product.name}
            </h2>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mt-4 shadow-md"
            />

            <p className="text-lg text-gray-700 mt-4">{product.description}</p>
            <p className="text-xl font-bold text-gray-800 mt-4">
              Price: ₹{product.price.toFixed(2)}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mt-4">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => handleQuantityChange(product.id, -1)}
              >
                -
              </button>
              <span className="text-xl">{quantities[product.id]}</span>
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => handleQuantityChange(product.id, 1)}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
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

export default Home;
