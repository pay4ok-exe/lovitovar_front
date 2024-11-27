import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterSection from "../components/RegisterSection";
import axiosInstance from "../axios/axiosInstance"; // Настроенный axios
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState(""); // Добавлено поле для телефона
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      const response = await axiosInstance.post("/register", {
        username,
        email,
        password,
        phone,
      });
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("username", response.data.username);
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Ошибка регистрации:",
        error.response?.data || error.message
      );
      alert("Ошибка при регистрации. Пожалуйста, попробуйте снова.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <RegisterSection
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          phone={phone} // Добавлено
          setPhone={setPhone} // Добавлено
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleSubmit={handleSubmit}
        />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
