import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonalData = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // State for password change process
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const navigate = useNavigate();

  // Submit Personal Data Changes
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Personal Data Updated:", {
      firstName,
      lastName,
      email,
      phone,
    });
  };

  // Handle Password Change Submission
  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (currentPassword === "correct_password") {
      // Replace with real password validation logic
      setShowPasswordFields(true);
    } else {
      alert("Incorrect current password.");
    }
  };

  // Submit New Password
  const handleNewPasswordSubmit = (event) => {
    event.preventDefault();
    if (newPassword === confirmNewPassword) {
      console.log("New password set:", newPassword);
      alert("Password changed successfully!");
      setChangePassword(false);
      setShowPasswordFields(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Личные данные</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Имя"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Фамилия"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          type="email"
          placeholder="Электронная почта"
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Телефон"
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Сохранить изменения
        </button>
      </form>

      {/* Change Password Section */}
      <div className="mt-8">
        {!changePassword ? (
          <button
            onClick={() => setChangePassword(true)}
            className="text-indigo-600 hover:text-indigo-500">
            Изменить пароль
          </button>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Текущий пароль"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Проверить пароль
            </button>
            <button
              onClick={() => navigate("/forgot")}
              className="text-indigo-600 hover:text-indigo-500">
              Забыли пароль?
            </button>
          </form>
        )}

        {/* New Password Fields */}
        {showPasswordFields && (
          <form onSubmit={handleNewPasswordSubmit} className="space-y-4 mt-4">
            <input
              type="password"
              placeholder="Новый пароль"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Подтвердите новый пароль"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Сохранить новый пароль
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PersonalData;
