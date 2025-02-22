import React, { useEffect, useState } from "react";
import axios from "axios";

const FinishedRequests = () => {
  const [finishedRequests, setFinishedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch finished (delivered) requests
  useEffect(() => {
    const fetchFinishedRequests = async () => {
      try {
        const response = await axios.get(
          "https://saadprojectbk.vercel.app/admin/finished-requests"
        );
        if (response.data.success) {
          setFinishedRequests(response.data.requests);
        } else {
          setError("Failed to fetch finished requests.");
        }
      } catch (err) {
        setError("Error fetching finished requests.");
        console.error("Error fetching finished requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedRequests();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Finished Requests</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : finishedRequests.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Product</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {finishedRequests.map((request) => (
              <tr key={request._id} className="text-center">
                <td className="border p-2">{request.productName}</td>
                <td className="border p-2">{request.email}</td>
                <td className="border p-2">{request.phone}</td>
                <td className="border p-2">{request.quantity}</td>
                <td className="border p-2">₹{request.price}</td>
                <td className="border p-2">{request.address}</td>
                <td className="border p-2 text-green-600 font-bold">
                  Delivered
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No delivered requests found.</p>
      )}
    </div>
  );
};

export default FinishedRequests;
