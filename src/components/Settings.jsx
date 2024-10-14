import React, { useState } from "react";

const Settings = () => {
  // State to manage checkbox values
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);

  // Handle checkbox changes
  const handleNotificationsChange = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleDarkThemeChange = () => {
    setDarkThemeEnabled(!darkThemeEnabled);
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Настройки</h2>
      <div className="space-y-4">
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={handleNotificationsChange} // Add the onChange handler
              className="checkbox"
            />
            <span className="ml-2">Включить уведомления</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={darkThemeEnabled}
              onChange={handleDarkThemeChange} // Add the onChange handler
              className="checkbox"
            />
            <span className="ml-2">Темная тема</span>
          </label>
        </div>
        <button type="button" className="btn btn-warning">
          Сбросить настройки
        </button>
      </div>
    </div>
  );
};

export default Settings;
