import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopup";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // Check if admin is logged in
    const adminLoginStatus = localStorage.getItem("isAdminLoggedIn") === "true";
    setIsAdminLoggedIn(adminLoginStatus);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLoginPopup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("phone");
    setUser(null);
    navigate("/");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAdminLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-black p-4 text-white flex items-center justify-between relative">
        <div className="text-xl font-bold">Henna Bliss 🌿</div>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navbar Links for Desktop */}
        <div className="lg:flex space-x-12 text-lg w-full lg:w-auto hidden lg:block">
          <Link to="/" className="hover:underline block lg:inline px-2 py-1">
            Home
          </Link>
          <Link
            to="/about"
            className="hover:underline block lg:inline px-2 py-1"
          >
            About Us
          </Link>
          <Link
            to="/results"
            className="hover:underline block lg:inline px-2 py-1"
          >
            Results
          </Link>
          <button
            className="hover:underline block lg:inline px-2 py-1"
            onClick={() => (user ? navigate("/cart") : setShowLoginPopup(true))}
          >
            My Cart
          </button>
          <button
            className="hover:underline block lg:inline px-2 py-1"
            onClick={() =>
              user ? navigate("/orders") : setShowLoginPopup(true)
            }
          >
            My Orders
          </button>

          {/* Admin Login / Dashboard Link */}
          {isAdminLoggedIn ? (
            <button
              className="hover:underline block lg:inline px-2 py-1 text-green-400"
              onClick={() => navigate("/admin-dashboard")}
            >
              Go to Dashboard
            </button>
          ) : (
            <Link
              to="/admin-login"
              className="hover:underline block lg:inline px-2 py-1 text-red-400"
            >
              Admin Login
            </Link>
          )}
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden lg:block text-sm">
                Welcome, {user.email.split("@")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLoginPopup(true)}
              className="bg-white text-black px-4 py-2 rounded text-sm"
            >
              Login
            </button>
          )}

          {/* Admin Logout Button */}
          {isAdminLoggedIn && (
            <button
              onClick={handleAdminLogout}
              className="bg-red-500 text-white px-4 py-2 rounded text-sm"
            >
              Logout Admin
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen
            ? "transform translate-x-0"
            : "transform translate-x-full"
        } lg:hidden fixed top-0 right-0 w-3/4 bg-black text-white h-full p-4 transition-all duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Henna Bliss 🌿</div>
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Links */}
        <div className="mt-8 space-y-6">
          <Link
            to="/"
            className="block hover:underline text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block hover:underline text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/results"
            className="block hover:underline text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Results
          </Link>
          <button
            className="block hover:underline text-lg"
            onClick={() => {
              if (user) {
                navigate("/cart");
              } else {
                setShowLoginPopup(true);
                setIsMobileMenuOpen(false);
              }
            }}
          >
            My Cart
          </button>
          <button
            className="block hover:underline text-lg"
            onClick={() => {
              if (user) {
                navigate("/orders");
              } else {
                setShowLoginPopup(true);
                setIsMobileMenuOpen(false);
              }
            }}
          >
            My Orders
          </button>

          {/* Admin Login / Dashboard Link for Mobile */}
          {isAdminLoggedIn ? (
            <button
              className="block hover:underline text-lg text-green-400"
              onClick={() => {
                navigate("/admin-dashboard");
                setIsMobileMenuOpen(false);
              }}
            >
              Go to Dashboard
            </button>
          ) : (
            <Link
              to="/admin-login"
              className="block hover:underline text-lg text-red-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>

      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Navbar;
