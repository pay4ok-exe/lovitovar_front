import React from "react";
import { FiUser, FiEye, FiPlusCircle } from "react-icons/fi";

const Notifications = () => {
  const defaultNotifications = [
    {
      id: 1,
      icon: <FiPlusCircle className="text-indigo-500 w-6 h-6" />,
      text: "Алиса добавила новый продукт.",
      timestamp: "5 минут назад",
    },
    {
      id: 2,
      icon: <FiUser className="text-green-500 w-6 h-6" />,
      text: "Вы добавили новый продукт.",
      timestamp: "10 минут назад",
    },
    {
      id: 3,
      icon: <FiEye className="text-yellow-500 w-6 h-6" />,
      text: "Кто-то посмотрел ваш продукт.",
      timestamp: "1 час назад",
    },
    {
      id: 4,
      icon: <FiPlusCircle className="text-indigo-500 w-6 h-6" />,
      text: "Иван добавил новый продукт.",
      timestamp: "2 часа назад",
    },
    {
      id: 5,
      icon: <FiEye className="text-yellow-500 w-6 h-6" />,
      text: "Ваш продукт просмотрели 5 раз.",
      timestamp: "3 часа назад",
    },
    {
      id: 6,
      icon: <FiUser className="text-green-500 w-6 h-6" />,
      text: "Вы изменили описание продукта.",
      timestamp: "Вчера",
    },
    {
      id: 7,
      icon: <FiPlusCircle className="text-indigo-500 w-6 h-6" />,
      text: "Мария добавила новый продукт.",
      timestamp: "2 дня назад",
    },
    {
      id: 8,
      icon: <FiEye className="text-yellow-500 w-6 h-6" />,
      text: "Кто-то сохранил ваш продукт в избранное.",
      timestamp: "3 дня назад",
    },
    {
      id: 9,
      icon: <FiUser className="text-green-500 w-6 h-6" />,
      text: "Вы обновили цену продукта.",
      timestamp: "На прошлой неделе",
    },
    {
      id: 10,
      icon: <FiEye className="text-yellow-500 w-6 h-6" />,
      text: "Ваш продукт просмотрели 20 раз.",
      timestamp: "Месяц назад",
    },
  ];

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Уведомления
      </h2>
      <ul className="space-y-4">
        {defaultNotifications.map((notification) => (
          <li
            key={notification.id}
            className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <div className="flex-shrink-0">{notification.icon}</div>
            <div className="ml-4">
              <p className="text-gray-800 font-medium">{notification.text}</p>
              <p className="text-gray-500 text-sm">{notification.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
