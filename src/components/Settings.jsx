import React, { useState } from "react";

const Settings = () => {
  // State for notifications toggle
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // State for delete account modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Toggle notifications
  const handleNotificationsChange = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    if (!password) {
      setErrorMessage("Пожалуйста, введите пароль.");
      return;
    }

    try {
      // Simulate delete account API call
      console.log("Deleting account with password:", password);
      alert("Ваш аккаунт был успешно удален.");
      // Redirect or log out user after successful deletion
    } catch (error) {
      console.error("Ошибка при удалении аккаунта:", error);
      setErrorMessage("Неверный пароль. Попробуйте снова.");
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg w-full h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Настройки</h2>

      <div className="space-y-4">
        {/* Notifications Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">
            Включить уведомления
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={handleNotificationsChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
            <div className="w-5 h-5 bg-white rounded-full shadow-md absolute left-0.5 top-0.5 transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* Reset Settings */}
        <button
          type="button"
          className="w-50 block py-2 px-4 bg-yellow-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 transition"
          onClick={() => {
            setNotificationsEnabled(false);
            alert("Настройки сброшены.");
          }}>
          Сбросить настройки
        </button>
      </div>

      {/* Delete Account Button */}
      <div className="mt-4">
        <button
          type="button"
          className="w-40 block py-2 px-4 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition"
          onClick={() => setIsModalOpen(true)}>
          Удалить аккаунт
        </button>
      </div>

      {/* Modal for Delete Account */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Вы уверены, что хотите удалить аккаунт?
            </h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Это действие необратимо. Пожалуйста, подтвердите, введя ваш
              пароль.
            </p>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
              <div className="flex justify-between space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300">
                  Отмена
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="w-full py-2 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
                  Подтвердить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
