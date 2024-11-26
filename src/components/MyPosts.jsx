import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";

const MyPosts = () => {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [archivedPosts, setArchivedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("current");
  const navigate = useNavigate();

  // Fetch user's posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/my-products");
        const products = response.data.products;

        // Separate into current and archived posts
        setCurrentPosts(products.filter((post) => post.isActive));
        setArchivedPosts(products.filter((post) => !post.isActive));
      } catch (error) {
        console.error("Ошибка при загрузке объявлений:", error);
        alert("Не удалось загрузить объявления.");
      }
    };

    fetchPosts();
  }, []);

  // Truncate description to 10 words
  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 10
      ? `${words.slice(0, 10).join(" ")}...`
      : description;
  };

  // Move post to archive
  const handleArchive = async (postId) => {
    try {
      await axiosInstance.patch(`/products/${postId}`, { isActive: false });
      const postToArchive = currentPosts.find((post) => post._id === postId);
      if (postToArchive) {
        setArchivedPosts((prev) => [
          ...prev,
          { ...postToArchive, isActive: false },
        ]);
        setCurrentPosts((prev) => prev.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.error(
        "Ошибка при архивировании объявления:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message || "Не удалось архивировать объявление."
      );
    }
  };

  // Return post from archive to current posts
  const handleReturnToCurrent = async (postId) => {
    try {
      await axiosInstance.patch(`/products/${postId}`, { isActive: true });
      const postToReturn = archivedPosts.find((post) => post._id === postId);
      if (postToReturn) {
        setCurrentPosts((prev) => [
          ...prev,
          { ...postToReturn, isActive: true },
        ]);
        setArchivedPosts((prev) => prev.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.error(
        "Ошибка при возврате объявления:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Не удалось вернуть объявление.");
    }
  };

  // Delete post
  const handleDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/products/${postId}`);
      if (activeTab === "current") {
        setCurrentPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      } else {
        setArchivedPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      }
      alert("Объявление успешно удалено.");
    } catch (error) {
      console.error("Ошибка при удалении объявления:", error);
      alert("Не удалось удалить объявление.");
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Мои объявления
      </h2>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("current")}
          className={`py-2 px-4 text-lg font-medium ${
            activeTab === "current"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}>
          Текущие
        </button>
        <button
          onClick={() => setActiveTab("archived")}
          className={`py-2 px-4 text-lg font-medium ${
            activeTab === "archived"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}>
          Архив
        </button>
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeTab === "current" &&
          (currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <div
                key={post._id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                onClick={() => navigate(`/product/${post._id}`)}>
                <img
                  src={post.imagesUrl[0]}
                  alt={post.productName}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-bold">{post.productName}</h3>
                <p className="text-gray-600">
                  {truncateDescription(post.description)}
                </p>
                <p className="text-gray-600 font-semibold">
                  Цена: {post.price} руб.
                </p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event
                      navigate("/add-product", { state: { post } });
                    }}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
                    Изменить
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event
                      handleArchive(post._id);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-600">
                    В архив
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              У вас нет текущих объявлений.
            </p>
          ))}

        {activeTab === "archived" &&
          (archivedPosts.length > 0 ? (
            archivedPosts.map((post) => (
              <div
                key={post._id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <img
                  src={post.imagesUrl[0]}
                  alt={post.productName}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-bold">{post.productName}</h3>
                <p className="text-gray-600">
                  {truncateDescription(post.description)}
                </p>
                <p className="text-gray-600 font-semibold">
                  Цена: {post.price} руб.
                </p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleReturnToCurrent(post._id)}
                    className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600">
                    Вернуть
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700">
                    Удалить
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              У вас нет архивных объявлений.
            </p>
          ))}
      </div>
    </div>
  );
};

export default MyPosts;
