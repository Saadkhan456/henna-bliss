import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, CheckCircle } from "lucide-react"; // Icons for better UI

const AcceptedRequests = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch accepted requests
  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const response = await axios.get(
          "https://saadprojectbk.vercel.app/admin/accepted-requests"
        );
        if (response.data.success) {
          setAcceptedRequests(response.data.requests);
        } else {
          setError("Failed to fetch accepted requests.");
        }
      } catch (err) {
        setError("Error fetching accepted requests.");
        console.error("Error fetching accepted requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedRequests();
  }, []);

  // Mark as delivered
  const handleDelivered = async (id) => {
    if (!window.confirm("Are you sure this request is delivered?")) return;

    try {
      const response = await axios.put(
        `https://saadprojectbk.vercel.app/admin/deliver-request/${id}`
      );
      if (response.data.success) {
        setAcceptedRequests(
          acceptedRequests.filter((request) => request._id !== id)
        );
      } else {
        alert("Failed to mark as delivered.");
      }
    } catch (error) {
      alert("Error marking request as delivered.");
      console.error("Error marking request as delivered:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Accepted Requests
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin text-gray-500" size={32} />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      ) : acceptedRequests.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="w-full text-sm md:text-base">
            {/* Table Header */}
            <thead className="bg-gray-800 text-white">
              <tr className="text-left">
                <th className="p-3 md:p-4">Product</th>
                <th className="p-3 md:p-4">Email</th>
                <th className="p-3 md:p-4">Phone</th>
                <th className="p-3 md:p-4">Quantity</th>
                <th className="p-3 md:p-4">Price</th>
                <th className="p-3 md:p-4">Address</th>
                <th className="p-3 md:p-4 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {acceptedRequests.map((request, index) => (
                <tr
                  key={request._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  }`}
                >
                  <td className="p-3 md:p-4">{request.productName}</td>
                  <td className="p-3 md:p-4">{request.email}</td>
                  <td className="p-3 md:p-4">{request.phone}</td>
                  <td className="p-3 md:p-4">{request.quantity}</td>
                  <td className="p-3 md:p-4">${request.price}</td>
                  <td className="p-3 md:p-4">{request.address}</td>
                  <td className="p-3 md:p-4 text-center">
                    <button
                      onClick={() => handleDelivered(request._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded flex items-center justify-center transition"
                    >
                      <CheckCircle size={18} className="mr-1" /> Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center font-medium">
          No accepted requests found.
        </p>
      )}
    </div>
  );
};

export default AcceptedRequests;
