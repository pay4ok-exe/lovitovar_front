import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Skeleton } from "@mui/material";
import Profile from "../assets/profile.svg";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Product data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data.product || {}); // Ensure product is an object
      } catch (error) {
        console.error("Error loading product:", error);
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
      (prevIndex) => (prevIndex + 1) % (product.imagesUrl?.length || 1)
    );

  const showPreviousImage = () =>
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (product.imagesUrl?.length || 1) - 1 : prevIndex - 1
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
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

  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Header />
        <div className="flex-1 w-full pt-20 flex justify-center items-center">
          <h1 className="text-black text-xl">Продукт не найдено</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Gallery */}
          <div className="flex-1 flex gap-4">
            {product.imagesUrl?.slice(0, 2).map((img, index) => (
              <div
                key={index}
                className="w-1/2 cursor-pointer"
                onClick={() => openModal(index)}>
                <img
                  src={img}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-80 object-cover rounded-md"
                />
              </div>
            )) || <p>No images available</p>}
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/3 bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">
              {product.productName || "No Name"}
            </h2>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">
              {product.price ? `${product.price} BYN` : "Price not available"}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Category:{" "}
              <span className="font-medium">
                {product.categoryName || "Not specified"}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Description:{" "}
              <span className="font-medium">
                {product.description || "No description available"}
              </span>
            </p>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Контакт</h3>
              {product.userId ? (
                <div className="flex items-center mt-4 space-x-4">
                  <img src={Profile} className="w-7 h-7" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {product.userId?.username || "Имя продавца неизвестно"}
                    </p>
                    <p
                      className="text-sm text-indigo-700 underline cursor-pointer"
                      onClick={() => {
                        if (product.userId?.phone) {
                          navigator.clipboard.writeText(product.userId.phone); // Copy to clipboard
                          alert("Номер телефона скопирован в буфер обмена!"); // Show alert
                        }
                      }}>
                      {product.userId?.phone || "Телефон продавца неизвестен"}
                    </p>
                  </div>
                  {product.userId?.phone && (
                    <a
                      href={`tel:${product.userId.phone}`} // Use `tel:` to make it a calling link
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium focus:outline-none">
                      Позвонить
                    </a>
                  )}
                </div>
              ) : (
                <p>Seller information not available</p>
              )}
            </div>
          </div>
        </div>

        {/* Product Description */}
        <section className="mt-10 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-700">
            {product.description || "No description available"}
          </p>
        </section>
      </main>
      <div className="bottom-0 absolute w-full">
        <Footer />
      </div>

      {/* Modal for Viewing Images */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          aria-label="Image Viewer">
          <button
            className="absolute top-6 right-6 bg-red-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-red-600 transition duration-300"
            onClick={closeModal}>
            ✕
          </button>

          <div className="relative w-full max-w-4xl mx-4">
            <img
              src={product.imagesUrl?.[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="w-full object-contain max-h-[90vh] rounded-lg"
            />
            <div className="absolute inset-0 flex justify-between items-center px-4">
              <button
                className="text-center w-12 h-12 flex items-center justify-center rounded-full text-indigo-700 bg-white border border-indigo-500 hover:bg-indigo-700 hover:text-white transition duration-300"
                onClick={showPreviousImage}>
                ❮
              </button>
              <button
                className="text-center w-12 h-12 flex items-center justify-center rounded-full text-indigo-700 bg-white border border-indigo-500 hover:bg-indigo-700 hover:text-white transition duration-300"
                onClick={showNextImage}>
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
