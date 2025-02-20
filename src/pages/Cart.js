import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(""); // State for manual phone input
  const [productId, setProductId] = useState(""); // State for random product ID

  // States for alert messages
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // success or error

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      setPhone(userData.phone || ""); // Set phone from user data if available
    }
  }, []);

  // Fetch cart items only if the user is logged in
  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    } else {
      setCartItems([]); // If user is not logged in, clear cart
    }
  }, [user]);

  // Handle removing an item from the cart
  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  };

  // Function to generate a random product ID starting with #
  const generateProductId = () => {
    const randomId = `#${Math.random()
      .toString(36)
      .substr(2, 4)
      .toUpperCase()}`;
    setProductId(randomId); // Set the generated ID
  };

  // Handle showing payment form
  const handlePayNow = (item) => {
    generateProductId(); // Generate the product ID when Pay Now is clicked
    setSelectedItem(item);
    setShowPaymentForm(true);
  };

  // Handle form submission
  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    console.log("Selected Item:", selectedItem); // ✅ Check if name exists

    if (!address || !phone) {
      setAlertMessage("Please enter both your address and phone number.");
      setAlertType("error");
      return;
    }

    // Create payment data object
    const paymentData = {
      productId,
      productName: selectedItem.name, // Add product name here
      email: user.email,
      phone,
      quantity: selectedItem.quantity,
      price: selectedItem.price * selectedItem.quantity,
      address,
    };

    // Send payment data to the server
    try {
      const response = await fetch(
        "https://saadprojectbk.vercel.app/submit-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const data = await response.json();
      if (data.success) {
        setAlertMessage(
          `Payment successful for ${selectedItem.name} with ${selectedItem.quantity} quantity!`
        );
        setAlertType("success");

        // Remove the item from cart after payment
        const updatedCart = cartItems.filter(
          (item) => item.id !== selectedItem.id
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage

        setShowPaymentForm(false); // Close the payment form after submission
      } else {
        setAlertMessage("Failed to submit payment. Please try again.");
        setAlertType("error");
      }
    } catch (err) {
      console.error("❌ Payment submission error:", err);
      setAlertMessage("Something went wrong. Please try again.");
      setAlertType("error");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* Display Alert Message */}
      {alertMessage && (
        <div
          className={`p-4 rounded-lg mb-4 text-white ${
            alertType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p>{alertMessage}</p>
        </div>
      )}

      {user ? (
        cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>

                {/* Pay Now Button */}
                <button
                  onClick={() => handlePayNow(item)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-4"
                >
                  Pay Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )
      ) : (
        <p>Please log in to view your cart.</p>
      )}

      {/* Payment Form */}
      {showPaymentForm && selectedItem && (
        <div className="mt-6 p-4 border bg-white rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4">Payment Form</h2>
          <form onSubmit={handleSubmitPayment}>
            {/* Product ID Field */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Product ID</label>
              <input
                type="text"
                value={productId}
                readOnly
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            {/* Product Name Field */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">
                Product Name
              </label>
              <input
                type="text"
                value={selectedItem.name}
                readOnly
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                value={user ? user.email : ""}
                readOnly
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // Allow manual phone input
                className="w-full p-2 border rounded mt-2"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Quantity</label>
              <input
                type="number"
                value={selectedItem.quantity}
                readOnly
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Price</label>
              <input
                type="text"
                value={`₹${(selectedItem.price * selectedItem.quantity).toFixed(
                  2
                )}`}
                readOnly
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded mt-2"
                placeholder="Enter your address"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-700"
            >
              Submit Payment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
