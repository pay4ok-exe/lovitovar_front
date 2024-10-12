import React from "react";
import Header from "../components/Header"; // Import your Header component
import Footer from "../components/Footer"; // Import your Footer component

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-12 pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            О нас
          </h1>
          <div className="text-center mb-10">
            <p className="text-lg text-gray-600">
              Лучшая площадка для продажи ваших товаров. Здесь вы найдёте
              покупателей в считанные дни, а также товары на любой вкус и цвет.
              Удобный интерфейс и широкие возможности платформы сделают процесс
              покупки и продажи максимально комфортным. Присоединяйтесь к
              миллионам пользователей, которые уже оценили преимущества нашего
              сервиса. Начните покупать и продавать с выгодой для себя уже
              сегодня!
            </p>
          </div>

          {/* Contact Information */}
          <section className="py-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Контакты</h2>
            <p className="text-lg text-gray-600">ООО "РудаковИА"</p>
            <p className="text-lg text-gray-600">
              Телефон: (МТС) +375 (33) 303-57-22
            </p>
            <p className="text-lg text-gray-600">Почта: rudakovia@gmail.com</p>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
