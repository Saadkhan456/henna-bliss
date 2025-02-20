import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Trash2 } from "lucide-react"; // Icons for better UI

const RegisteredUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch registered users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://saadprojectbk.vercel.app/admin/registered-users"
        );
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          setError("Failed to fetch users.");
        }
      } catch (err) {
        setError("Error fetching users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete a user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await axios.delete(
        `https://saadprojectbk.vercel.app/admin/delete-user/${id}`
      );
      if (response.data.success) {
        setUsers(users.filter((user) => user._id !== id));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      alert("Error deleting user.");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-6">
        Registered Users
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin text-gray-500" size={32} />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="w-full text-sm md:text-base">
            {/* Table Header */}
            <thead className="bg-gray-800 text-white">
              <tr className="text-left">
                <th className="p-3 md:p-4">Email</th>
                <th className="p-3 md:p-4">Phone</th>
                <th className="p-3 md:p-4 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  }`}
                >
                  <td className="p-3 md:p-4">{user.email}</td>
                  <td className="p-3 md:p-4">{user.phone}</td>
                  <td className="p-3 md:p-4 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded flex items-center justify-center transition"
                    >
                      <Trash2 size={18} className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center font-medium">
          No registered users found.
        </p>
      )}
    </div>
  );
};

export default RegisteredUser;
