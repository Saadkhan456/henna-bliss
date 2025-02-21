import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import RegisteredUsers from "./RegisteredUsers";
import PendingRequests from "./PendingRequests";
import AcceptedRequests from "./AcceptedRequests";
import FinishedRequests from "./FinishedRequests";
import { Menu } from "lucide-react"; // Sidebar toggle icon

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">
          Access Denied! Please log in as an admin.
        </h1>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen bg-gray-100">
      {/* Sidebar (Now in Front) */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content (Behind Sidebar) */}
      <div className="flex-1 flex flex-col z-10 lg:z-20 transition-all">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-white shadow-md p-4 sticky top-0 z-10 lg:z-20">
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto bg-white shadow-md">
          <Routes>
            <Route path="registered-users" element={<RegisteredUsers />} />
            <Route path="pending-requests" element={<PendingRequests />} />
            <Route path="accepted-requests" element={<AcceptedRequests />} />
            <Route path="finished-requests" element={<FinishedRequests />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
