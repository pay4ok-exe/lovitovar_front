import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AddProductPage = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const categories = ["Электроника", "Одежда", "Дом", "Услуги"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Форма отправлена! (Логика добавления отсутствует)");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center pt-24 pb-10">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Разместить объявление
          </h1>
          <form
            className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="title">
                Название продукта
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={product.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Price */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="price">
                Цена
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Description */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description">
                Описание
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Category */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category">
                Категория
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Выберите категорию</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {/* Image */}
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="image">
                Изображение
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                required
                className="w-full text-gray-700"
              />
            </div>
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition duration-300">
              {loading ? "Загрузка..." : "Разместить"}
            </button>
          </form>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddProductPage;
