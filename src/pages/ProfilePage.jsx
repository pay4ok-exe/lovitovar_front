import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PersonalData from "../components/PersonalData";
import Notifications from "../components/Notifications";
import Settings from "../components/Settings";
import MyPosts from "../components/MyPosts";

// Photos
import UserIcon from "../assets/user.png";
import RingingIcon from "../assets/ringing.png";
import PostsIcon from "../assets/online.png";
import SettingsIcon from "../assets/cogwheel.png";
import LogoutIcon from "../assets/logout.png";
import Profile from "../assets/profile.svg";

const ProfilePage = () => {
  const [username, setUsername] = useState("Имя пользователя");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername =
      localStorage.getItem("username") || "Имя пользователя";
    setUsername(storedUsername);
  });

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("username"); // Optional: remove username
    alert("Вы вышли из аккаунта."); // Optional alert
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-grow mt-24 mb-4">
        {/* Wrapper to ensure alignment with Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex">
          {/* Sidebar with icons and updated styling */}
          <aside className="pl-8 w-64 bg-white p-4 shadow-md flex flex-col justify-around rounded-lg mr-4">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8">
              <img
                src={Profile}
                alt="Профиль"
                className="w-20 h-20 shadow-md my-4"
              />
              <p className="text-lg font-bold text-gray-800">{username}</p>
            </div>
            <ul className="space-y-8 mt-4">
              <li>
                <Link
                  to="/profile/"
                  className="flex items-center space-x-2 text-gray-700">
                  <img src={UserIcon} alt="Личные данные" className="h-5 w-5" />
                  <span>Личные данные</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/notifications"
                  className="flex items-center space-x-2 text-gray-700">
                  <img
                    src={RingingIcon}
                    alt="Уведомления"
                    className="h-5 w-5"
                  />
                  <span>Уведомления</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/my-posts"
                  className="flex items-center space-x-2 text-gray-700">
                  <img
                    src={PostsIcon}
                    alt="Мои объявления"
                    className="h-5 w-5"
                  />
                  <span>Мои объявления</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/settings"
                  className="flex items-center space-x-2 text-gray-700">
                  <img src={SettingsIcon} alt="Настройки" className="h-5 w-5" />
                  <span>Настройки</span>
                </Link>
              </li>
            </ul>
            <div className="mt-auto mb-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 w-full">
                <img src={LogoutIcon} alt="Выйти" className="h-5 w-5" />
                <span>Выйти</span>
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="bg-white shadow-md rounded-lg p-6 flex-1">
            <Routes>
              <Route path="/" element={<PersonalData />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="my-posts" element={<MyPosts />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
