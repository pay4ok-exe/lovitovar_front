import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Profile from "../assets/profile.svg";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 w-full z-10 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start pr-20">
            <Link to="/" className="flex items-center">
              <img className="h-16 w-auto sm:h-10" src={Logo} alt="Лого" />
              <span className="ml-3 text-xl font-bold text-gray-900">
                ЛовиТовар
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link
              to="/"
              className="text-base font-medium text-gray-500 hover:text-gray-900">
              Главная
            </Link>
            <Link
              to="/about"
              className="text-base font-medium text-gray-500 hover:text-gray-900">
              О нас
            </Link>
            <Link
              to="/contact"
              className="text-base font-medium text-gray-500 hover:text-gray-900">
              Контакты
            </Link>
          </nav>
          {/* Search Bar */}
          <div className="flex items-center flex-1 ml-6">
            <form className="w-full max-w-xl relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md pl-4 pr-10 py-2"
                placeholder="Поиск..."
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                🔍
              </button>
            </form>
          </div>

          {/*  */}
          <div className="hidden md:flex items-center justify-end gap-2">
            <Link
              to={isAuthenticated ? "/add-product" : "/auth-required"}
              className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Разместить объявление
            </Link>
            {isAuthenticated ? (
              <div className="relative">
                {/* Profile Button */}
                <div
                  className="flex items-center justify-between px-3 text-base cursor-pointer font-medium text-indigo-600  py-2 hover:text-indigo-700 border-indigo-600 border rounded-md focus:outline-none"
                  onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <span className="mr-2">{username || "Мой профиль"}</span>
                  <img
                    src={Profile} // Replace with your profile image path
                    alt="Профиль"
                    className="w-6 h-6 rounded-full"
                  />
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Мой профиль
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="whitespace-nowrap text-base font-medium text-indigo-600 px-6 py-2 hover:text-indigo-700 border-indigo-600 border rounded-md">
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
