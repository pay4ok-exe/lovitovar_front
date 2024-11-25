import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginSection from "../components/LoginSection";
import axiosInstance from "../axios/axiosInstance"; // Import your axios instance

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send login data to the backend
      const response = await axiosInstance.post("/login", { email, password });

      // Handle successful login
      const { token, ...userData } = response.data;
      console.log("Login successful:", userData);

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Navigate to the profile page
      navigate("/profile");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Не удалось авторизоваться!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LoginSection
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleSubmit={handleSubmit}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;
