import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginSection from "../components/LoginSection";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    alert("Hello");
    console.log("Login submitted:", { email, password });
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
