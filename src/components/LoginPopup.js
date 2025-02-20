import React, { useState } from "react";

const LoginPopup = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validatePassword = (password) =>
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

  const handleSubmit = async () => {
    let newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email))
      newErrors.email = "Enter a valid @gmail.com email";

    if (!isLogin) {
      if (!phone) newErrors.phone = "Phone number is required";
      else if (!validatePhone(phone))
        newErrors.phone = "Phone number must be 10 digits";

      if (!password) newErrors.password = "Password is required";
      else if (!validatePassword(password))
        newErrors.password = "Must be 8+ chars, 1 special char, 1 number";

      if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
      else if (password !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const url = isLogin
          ? "https://saadprojectbk.vercel.app/login"
          : "https://saadprojectbk.vercel.app/register";
        const body = isLogin ? { email, password } : { email, phone, password };

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
          // Store both email and phone in localStorage
          localStorage.setItem("user", JSON.stringify({ email, phone }));
          onLoginSuccess({ email, phone });
          showAlert(data.message, "success");
          setTimeout(() => onClose(), 2000);
        } else {
          showAlert(data.message, "error");
        }
      } catch (err) {
        showAlert("An error occurred. Please try again.", "error");
      }
    }
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 relative">
        {alertMessage && (
          <div
            className={`absolute top-[-50px] left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-md text-white text-sm
            ${alertType === "success" ? "bg-green-500" : "bg-red-500"}`}
          >
            {alertMessage}
          </div>
        )}

        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {!isLogin && (
          <>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 mb-2 border rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </>
        )}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 mb-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        <button
          className="w-full bg-blue-600 text-white py-2 mt-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-sm mt-2 text-center">
          {isLogin ? "New user? " : "Already have an account? "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

        <button
          onClick={onClose}
          className="text-red-600 mt-3 block text-center hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
