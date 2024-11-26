import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosInstance from "../axios/axiosInstance";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    images: [], // URL загруженных фотографий
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const categories = [
    "Одежда и аксессуары",
    "Косметика и здоровье",
    "Услуги",
    "Автотовары",
    "Электроника",
    "Товары для детей",
    "Товары для дома",
    "Спорт и отдых",
    "Другое",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedUrls = response.data.files.map((file) => file.fileUrl);

      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...uploadedUrls], // Сохраняем ссылки на фотографии
      }));

      setUploading(false);
    } catch (error) {
      console.error("Ошибка загрузки файлов:", error);
      alert("Не удалось загрузить фотографии.");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        productName: product.title,
        price: product.price,
        description: product.description,
        categoryName: product.category,
        imagesUrl: product.images, // Ссылки на загруженные фотографии
      };

      await axiosInstance.post("/createProduct", productData);

      setLoading(false);
      alert("Продукт успешно добавлен!");
      navigate("/");
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
      alert("Ошибка при добавлении продукта.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/auth-required");
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex flex-col items-center pt-24 pb-10">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-8">
            Разместить объявление
          </h1>
          <form
            className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg"
            onSubmit={handleSubmit} // Исправлено: передана функция handleSubmit
          >
            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold mb-2">
                Название продукта
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={product.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Price */}
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-semibold mb-2">
                Цена
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold mb-2">
                Описание
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Category */}
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 font-semibold mb-2">
                Категория
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Выберите категорию</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {/* Images */}
            <div className="mb-6">
              <label
                htmlFor="images"
                className="block text-gray-700 font-semibold mb-2">
                Изображения
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="images"
                  name="files"
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                />
                <label
                  htmlFor="images"
                  className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 cursor-pointer transition duration-300">
                  Загрузить фотографии
                </label>
                {uploading && (
                  <span className="text-indigo-500 ml-2">Загрузка...</span>
                )}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {product.images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`uploaded-${index}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300">
              {loading ? "Сохранение..." : "Разместить объявление"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddProductPage;
