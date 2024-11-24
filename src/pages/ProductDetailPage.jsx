import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Skeleton } from "@mui/material"; // Для отображения Skeleton

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Данные продукта
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Ошибка при загрузке продукта:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const showNextImage = () =>
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.imagesUrl.length
    );

  const showPreviousImage = () =>
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imagesUrl.length - 1 : prevIndex - 1
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
          <Skeleton variant="rectangular" width="100%" height={400} />
          <Skeleton
            variant="text"
            width="50%"
            height={40}
            style={{ marginTop: 20 }}
          />
          <Skeleton variant="text" width="30%" height={30} />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Продукт не найден</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
        {/* Верхний блок с изображениями и основной информацией */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Галерея изображений */}
          <div className="flex-1 flex gap-4">
            {product.imagesUrl.slice(0, 2).map((img, index) => (
              <div
                key={index}
                className="w-1/2 cursor-pointer"
                onClick={() => openModal(index)}>
                <img
                  src={img}
                  alt={`Изображение продукта ${index + 1}`}
                  className="w-full h-80 object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Информация о цене и контактах */}
          <div className="w-full md:w-1/3 bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">
              {product.productName}
            </h2>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">
              {product.price} ₽
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Категория:{" "}
              <span className="font-medium">
                {product.categoryName || "Не указано"}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Описание:{" "}
              <span className="font-medium">{product.description}</span>
            </p>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Контакты</h3>
              <div className="flex items-center mt-4 space-x-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt={product.user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {product.user.username}
                  </p>
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

        {/* Описание продукта */}
        <section className="mt-10 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание</h2>
          <p className="text-gray-700">{product.description}</p>
          <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
            <li>Цена: {product.price} ₽</li>
            <li>Категория: {product.categoryName}</li>
          </ul>
        </section>
      </main>
      <Footer />

      {/* Модальное окно для просмотра изображений */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          aria-label="Просмотр изображения">
          <button
            className="absolute top-6 right-6 bg-red-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-red-600 transition duration-300"
            onClick={closeModal}
            aria-label="Закрыть модальное окно">
            ✕
          </button>

          <div className="relative w-full max-w-4xl mx-4">
            <img
              src={product.imagesUrl[currentImageIndex]}
              alt={`Изображение ${currentImageIndex + 1}`}
              className="w-full object-contain max-h-[90vh] rounded-lg"
            />
            <div className="absolute inset-0 flex justify-between items-center px-4">
              <button
                className="text-center w-12 h-12 flex items-center justify-center rounded-full text-indigo-700 bg-white border border-indigo-500 hover:bg-indigo-700 hover:text-white transition duration-300"
                onClick={showPreviousImage}
                aria-label="Предыдущее изображение">
                ❮
              </button>
              <button
                className="text-center w-12 h-12 flex items-center justify-center rounded-full text-indigo-700 bg-white border border-indigo-500 hover:bg-indigo-700 hover:text-white transition duration-300"
                onClick={showNextImage}
                aria-label="Следующее изображение">
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
