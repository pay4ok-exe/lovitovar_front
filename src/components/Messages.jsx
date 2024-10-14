import React from "react";

const Messages = () => {
  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Сообщения</h2>
      <div className="overflow-auto h-96 bg-gray-100 p-4">
        <div className="bg-white p-2 rounded-lg shadow mb-2">
          Привет, как дела?
        </div>
        <div className="bg-white p-2 rounded-lg shadow mb-2">
          Привет! Все хорошо, спасибо!
        </div>
        {/* Add more messages as needed */}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Напишите сообщение..."
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default Messages;
