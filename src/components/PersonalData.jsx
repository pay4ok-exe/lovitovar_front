import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance"; // Import your configured Axios instance

const PersonalData = () => {
  const [username, setUsername] = useState(""); // User's username
  const [email, setEmail] = useState(""); // User's email
  const [phone, setPhone] = useState(""); // User's phone number
  const [isEditing, setIsEditing] = useState(false); // Edit mode state
  const navigate = useNavigate();

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        const { username, email, phone } = response.data;

        // Set user data to state
        setUsername(username || "");
        setEmail(email || "");
        setPhone(phone || "");
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
        alert("Не удалось загрузить данные пользователя.");
      }
    };

    fetchUserData();
  }, []);

  // Submit updated user data to the backend
  const handleSubmit = async () => {
    // Prepare the data to send (only include updated fields)
    const updateData = {};
    if (username) updateData.username = username;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;

    try {
      // Send update request to the backend
      const response = await axiosInstance.put("/profile", updateData);

      // Notify the user of success
      alert("Данные успешно обновлены!");
      console.log("Обновленные данные:", response.data);

      setIsEditing(false); // Disable edit mode after saving
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
      alert(
        error.response?.data?.message ||
          "Не удалось обновить данные. Попробуйте снова."
      );
    }

    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Личные данные</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Имя пользователя"
            className={`${
              !isEditing ? "cursor-not-allowed" : "cursor-text"
            } appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!isEditing} // Disable input unless editing
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Электронная почта"
            className={`cursor-not-allowed appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            value={email}
            disabled={true} // Disable input unless editing
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Телефон"
            className={`${
              !isEditing ? "cursor-not-allowed" : "cursor-text"
            } appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="\+?\d{10,15}"
            disabled={!isEditing} // Disable input unless editing
          />
        </div>

        {/* Edit and Save Buttons */}
        {!isEditing ? (
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setIsEditing(true)} // Enable editing
          >
            Редактировать
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Сохранить изменения
          </button>
        )}
      </form>

      {/* Forgot Password Link */}
      <div className="mt-8">
        <button
          onClick={() => {
            sessionStorage.setItem("current-email", email);
            navigate("/forgot");
          }}
          className="text-indigo-600 hover:text-indigo-500">
          Забыли пароль?
        </button>
      </div>
    </div>
  );
};

export default PersonalData;
