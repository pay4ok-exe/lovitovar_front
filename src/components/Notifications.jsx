import React from "react";

const Notifications = () => {
  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Уведомления</h2>
      <ul className="space-y-2">
        <li className="bg-gray-100 p-2 rounded-lg">Новое сообщение от Алисы</li>
        <li className="bg-gray-100 p-2 rounded-lg">Ваш заказ был отправлен</li>
        {/* Add more notifications */}
      </ul>
    </div>
  );
};

export default Notifications;
