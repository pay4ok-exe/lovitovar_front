import React from "react";

const PersonalData = () => {
  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Личные данные</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Имя"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Фамилия"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <input
          type="email"
          placeholder="Электронная почта"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="tel"
          placeholder="Телефон"
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default PersonalData;
