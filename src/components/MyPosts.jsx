import React from "react";

const MyPosts = () => {
  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Мои объявления</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-bold">Название объявления 1</h3>
          <p className="text-gray-600">Описание объявления 1</p>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-bold">Название объявления 2</h3>
          <p className="text-gray-600">Описание объявления 2</p>
        </div>
        {/* Add more posts as needed */}
      </div>
    </div>
  );
};

export default MyPosts;
