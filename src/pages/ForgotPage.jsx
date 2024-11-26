import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VerificationCodeInput from "../components/VerificationCodeInput";
import axiosInstance from "../axios/axiosInstance";

const ForgotPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const current_email = localStorage.getItem("current-email");
    if (current_email) setEmail(current_email);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === 1) {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/forgot-password", {
          email,
        });
        console.log("Запрос сброса пароля успешен:", response.data);
        alert("Код для сброса пароля отправлен на вашу почту!");
        setStep(2);
      } catch (error) {
        console.error(
          "Ошибка при запросе сброса пароля:",
          error.response?.data?.message || error.message
        );
        alert(
          error.response?.data?.message || "Не удалось отправить код сброса."
        );
      } finally {
        setLoading(false);
        localStorage.removeItem("current-email");
      }
    } else if (step === 2) {
      try {
        setLoading(true);
        console.log("Код:", code);
        const response = await axiosInstance.post("/verify-code", {
          email,
          code,
        });
        console.log("Код успешно подтвержден:", response.data);
        alert("Код успешно подтвержден!");
        setStep(3);
      } catch (error) {
        console.error(
          "Ошибка при подтверждении кода:",
          error.response?.data?.message || error.message
        );
        alert(error.response?.data?.message || "Неверный или истёкший код.");
      } finally {
        setLoading(false);
      }
    } else if (step === 3) {
      if (newPassword !== confirmPassword) {
        alert("Пароли не совпадают. Попробуйте снова.");
        return;
      }
      try {
        setLoading(true);
        const response = await axiosInstance.post("/confirm-password", {
          email,
          code,
          newPassword,
        });
        console.log("Сброс пароля успешен:", response.data);
        alert("Пароль успешно сброшен! Теперь вы можете войти в свой аккаунт.");
        navigate("/login");
      } catch (error) {
        console.error(
          "Ошибка при сбросе пароля:",
          error.response?.data?.message || error.message
        );
        alert(error.response?.data?.message || "Не удалось сбросить пароль.");
      } finally {
        setLoading(false);
        localStorage.removeItem("token");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {step === 1 && (
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Сброс пароля
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Пожалуйста, введите адрес электронной почты, чтобы запросить
                сброс пароля.
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Адрес электронной почты
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Адрес электронной почты"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {loading ? "Отправка..." : "Отправить код сброса"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Введите код подтверждения
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Пожалуйста, введите 4-значный код, отправленный на вашу почту.
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <VerificationCodeInput value={code} onCompleted={setCode} />
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {loading ? "Проверка..." : "Подтвердить код"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Установить новый пароль
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Введите ваш новый пароль ниже.
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="new-password" className="sr-only">
                      Новый пароль
                    </label>
                    <input
                      id="new-password"
                      name="new-password"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Новый пароль"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="sr-only">
                      Подтвердите новый пароль
                    </label>
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Подтвердите новый пароль"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {loading ? "Сброс пароля..." : "Сбросить пароль"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPage;
