import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosInstance from "../axios/axiosInstance";

const AddProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingProduct = location.state?.post || null; // Get product data from state if editing

  const [product, setProduct] = useState({
    title: existingProduct?.productName || "",
    price: existingProduct?.price || "",
    description: existingProduct?.description || "",
    category: existingProduct?.categoryName || "",
    images: existingProduct?.imagesUrl || [], // Preloaded images
    isActive: existingProduct?.isActive || true, // Default to active
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
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox for isActive
    });
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
        images: [...prevProduct.images, ...uploadedUrls], // Add new images
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

    const productData = {
      productName: product.title,
      price: product.price,
      description: product.description,
      categoryName: product.category,
      imagesUrl: product.images,
      isActive: product.isActive, // Pass isActive status
    };

    try {
      if (existingProduct) {
        // If editing, update the product
        await axiosInstance.patch(
          `/products/${existingProduct._id}`,
          productData
        );
        alert("Продукт успешно обновлен!");
      } else {
        // If creating, add a new product
        await axiosInstance.post("/createProduct", productData);
        alert("Продукт успешно добавлен!");
      }

      navigate("/"); // Redirect to user's posts
    } catch (error) {
      console.error("Ошибка при сохранении продукта:", error);
      alert("Не удалось сохранить продукт.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) navigate("/auth-required");
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex flex-col items-center pt-24 pb-10">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-8">
            {existingProduct
              ? "Редактировать объявление"
              : "Разместить объявление"}
          </h1>
          <form
            className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg"
            onSubmit={handleSubmit}>
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
            {/* isActive Toggle */}
            <div className="mb-6 flex items-center gap-2">
              <span className="text-gray-700 font-medium">Активно</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive" // Add the "name" attribute
                  checked={product.isActive}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
                <div className="w-5 h-5 bg-white rounded-full shadow-md absolute left-0.5 top-0.5 transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300">
              {loading
                ? "Сохранение..."
                : existingProduct
                ? "Сохранить изменения"
                : "Разместить объявление"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddProductPage;
