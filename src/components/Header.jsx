import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Header = () => {
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
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 gap-2">
            <Link
              to="/register"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Разместить объявление
            </Link>
            <Link
              to="/login"
              className="whitespace-nowrap text-base font-medium text-indigo-600 px-6 py-2 hover:text-indigo-700 border-indigo-600 border rounded-md">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
