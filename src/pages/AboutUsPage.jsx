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
              Добро пожаловать в ЛовиТовар! Мы создаем пространство, где каждый
              может легко купить или продать товары. ЛовиТовар — это удобный и
              надежный маркетплейс, вдохновленный такими платформами, как Avito
              и OLX, чтобы сделать торговлю доступной для всех.
            </p>
          </div>

          {/* Mission Section */}
          <section className="py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Наша миссия
            </h2>
            <p className="text-lg text-gray-600">
              Мы стремимся сделать процесс покупки и продажи товаров доступным и
              простым для всех пользователей. ЛовиТовар — это маркетплейс, где
              можно быстро находить нужные товары или услуги, продавать свои
              вещи и быть уверенными в надежности платформы.
            </p>
          </section>

          {/* Values Section */}
          <section className="py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Наши ценности
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-600">
              <li>
                Простота: Легкий интерфейс и удобный поиск делают использование
                платформы приятным и быстрым.
              </li>
              <li>
                Безопасность: Мы создаем безопасную среду для всех сделок и
                пользователей.
              </li>
              <li>
                Доступность: ЛовиТовар доступен всем пользователям, независимо
                от их технического опыта.
              </li>
              <li>
                Надежность: Мы ценим доверие наших пользователей и поддерживаем
                высокий уровень обслуживания.
              </li>
              <li>
                Ориентация на сообщество: ЛовиТовар развивается вместе с
                потребностями и отзывами пользователей.
              </li>
            </ul>
          </section>

          {/* Team Section */}
          <section className="py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Наша команда
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Replace with actual team member info */}
              <div className="bg-white p-6 shadow rounded">
                <img
                  className="h-24 w-24 mx-auto rounded-full"
                  src="/path-to-image.jpg"
                  alt="Team member"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                  Иван Иванов
                </h3>
                <p className="text-gray-600">
                  Основатель & Генеральный директор
                </p>
              </div>
              <div className="bg-white p-6 shadow rounded">
                <img
                  className="h-24 w-24 mx-auto rounded-full"
                  src="/path-to-image.jpg"
                  alt="Team member"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                  Мария Смирнова
                </h3>
                <p className="text-gray-600">Технический директор</p>
              </div>
              <div className="bg-white p-6 shadow rounded">
                <img
                  className="h-24 w-24 mx-auto rounded-full"
                  src="/path-to-image.jpg"
                  alt="Team member"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                  Алексей Петров
                </h3>
                <p className="text-gray-600">Директор по продукту</p>
              </div>
              {/* Add more team members here */}
            </div>
          </section>

          {/* History Section */}
          <section className="py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Наша история
            </h2>
            <p className="text-lg text-gray-600">
              ЛовиТовар была основана как финальный проект в рамках учебной
              программы, чтобы создать современную торговую платформу для
              пользователей. Мы растем вместе с нашими клиентами, предоставляя
              надежные инструменты для продажи и покупки товаров по всей стране.
            </p>
          </section>

          {/* Call to Action */}
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Присоединяйтесь к нам
            </h2>
            <p className="text-lg text-gray-600">
              Хотите узнать больше? Свяжитесь с нами сегодня, чтобы узнать, как
              ЛовиТовар может помочь вам в продаже или покупке товаров.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Связаться с нами
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
