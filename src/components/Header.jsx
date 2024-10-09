// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
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
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link
              to="/login"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              Войти
            </Link>
            <Link
              to="/register"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Разместить объявление
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
