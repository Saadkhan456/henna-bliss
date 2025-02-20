import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Results from "./pages/Results";
import LoginPopup from "./components/LoginPopup";
import AdminDashboard from "./admin/AdminDashboard";
import "./index.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar onLoginClick={() => setShowLogin(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
        {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
      </div>
    </Router>
  );
}

export default App;
