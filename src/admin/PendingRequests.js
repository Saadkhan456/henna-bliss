import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, CheckCircle } from "lucide-react"; // Icons for better UI

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending requests
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(
          "https://saadprojectbk.vercel.app/admin/pending-requests"
        );
        if (response.data.success) {
          setRequests(response.data.requests);
        } else {
          setError("Failed to fetch requests.");
        }
      } catch (err) {
        setError("Error fetching requests.");
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  // Accept request
  const handleAccept = async (id) => {
    if (!window.confirm("Are you sure you want to accept this request?"))
      return;

    try {
      const response = await axios.put(
        `https://saadprojectbk.vercel.app/admin/accept-request/${id}`
      );
      if (response.data.success) {
        setRequests(requests.filter((request) => request._id !== id));
      } else {
        alert("Failed to accept request.");
      }
    } catch (error) {
      alert("Error accepting request.");
      console.error("Error accepting request:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Pending Requests
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin text-gray-500" size={32} />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      ) : requests.length > 0 ? (
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
              {requests.map((request, index) => (
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
                      onClick={() => handleAccept(request._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded flex items-center justify-center transition"
                    >
                      <CheckCircle size={18} className="mr-1" /> Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center font-medium">
          No pending requests found.
        </p>
      )}
    </div>
  );
};

export default PendingRequests;
