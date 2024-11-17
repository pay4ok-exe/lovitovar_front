import React, { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Example image array from the backend
  const images = [
    "https://via.placeholder.com/600x500",
    "https://via.placeholder.com/600x500",
  ];

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const showNextImage = () =>
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);

  const showPreviousImage = () =>
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
        {/* Top Section with Images and Main Details */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Gallery */}
          <div className="flex-1 flex gap-4">
            {images.slice(0, 2).map((img, index) => (
              <div
                key={index}
                className="w-1/2 cursor-pointer"
                onClick={() => openModal(index)}>
                <img
                  src={img}
                  alt={`iPhone 13 - View ${index + 1}`}
                  className="w-full h-80 object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Product Cost and Contact Information */}
          <div className="w-full md:w-1/3 bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">30 000 ₽</h2>
            <p className="text-sm text-gray-600 mt-2">
              Состояние:{" "}
              <span className="font-medium">Новый, есть коробка</span>
            </p>
            <p className="text-sm text-gray-600">
              Гарантия: <span className="font-medium">Осталась 6 месяцев</span>
            </p>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Контакты</h3>
              <div className="flex items-center mt-4 space-x-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Контактное лицо"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">Анна Жукова</p>
                  <p className="text-sm text-gray-600">Продавец</p>
                </div>
              </div>
              <div className="flex space-x-4 mt-4">
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">
                  Позвонить
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">
                  Написать
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <section className="mt-10 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание</h2>
          <p className="text-gray-700">
            Продается iPhone 13 в идеальном состоянии. Полный комплект с
            коробкой, зарядным кабелем и оригинальными аксессуарами. Телефон не
            был в ремонте, работает безупречно.
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
            <li>Цвет: Чёрный</li>
            <li>Память: 128 ГБ</li>
            <li>Процессор: A15 Bionic</li>
            <li>Экран: 6.1" Super Retina XDR</li>
            <li>Камера: 12 Мп (основная), 12 Мп (фронтальная)</li>
          </ul>
        </section>
      </main>
      <Footer />

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          aria-label="Image Viewer">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 bg-red-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-red-600 transition duration-300"
            onClick={closeModal}
            aria-label="Close Modal">
            ✕
          </button>

          {/* Image and Navigation */}
          <div className="relative w-full max-w-4xl mx-4">
            {/* Current Image */}
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="w-full object-contain max-h-[90vh] rounded-lg"
            />

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex justify-between items-center px-4">
              <button
                className="text-center w-12 h-12 flex items-center justify-center rounded-full text-indigo-700 bg-white border border-indigo-500 hover:bg-indigo-700 hover:text-white transition duration-300"
                onClick={showPreviousImage}
                aria-label="Previous Image">
                ❮
              </button>
              <button
                className="text-center w-12 h-12 flex items-center justify-center rounded-full text-indigo-700 bg-white border border-indigo-500 hover:bg-indigo-700 hover:text-white transition duration-300"
                onClick={showNextImage}
                aria-label="Next Image">
                ❯
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
