import React from "react";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <img
                className="h-16 w-auto sm:h-10 rounded"
                src={Logo}
                alt="Лого"
              />
              <h4 className="font-bold text-lg mb-2">ЛовиТовар</h4>
            </div>
            <p className="text-sm">Купи легко, продай быстро.</p>
          </div>
          <div>
            <h6 className="font-bold text-lg mb-2">Навигация</h6>
            <ul className="text-sm">
              <li>
                <a href="/" className="hover:text-gray-400">
                  Главная
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  О нас
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Контакты
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-lg mb-2">Контакты</h6>
            <ul className="text-sm">
              <li>Тел: +7 999 999 9999</li>
              <li>Email: info@lovitovar.ru</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-lg mb-2">Социальные сети</h6>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com" className="hover:text-gray-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="hover:text-gray-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="hover:text-gray-400">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-sm">
          © 2024 ЛовиТовар. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
