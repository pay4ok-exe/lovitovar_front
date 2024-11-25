import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VerificationCodeInput from "../components/VerificationCodeInput";
import axiosInstance from "../axios/axiosInstance"; // Import axios instance

const ForgotPage = () => {
  const [step, setStep] = useState(1); // Track the current step in the flow
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission for each step
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === 1) {
      // Step 1: Request password reset
      try {
        setLoading(true);
        const response = await axiosInstance.post("/forgot-password", {
          email,
        });
        console.log("Password reset request successful:", response.data);
        alert("Reset code sent to your email!");
        setStep(2);
      } catch (error) {
        console.error(
          "Error requesting password reset:",
          error.response?.data?.message || error.message
        );
        alert(error.response?.data?.message || "Failed to send reset code.");
      } finally {
        setLoading(false);
      }
    } else if (step === 2) {
      // Step 2: Verify the reset code
      try {
        setLoading(true);
        console.log("Hello", code);
        const response = await axiosInstance.post("/verify-code", {
          email,
          code,
        });
        console.log("Code verified successfully:", response.data);
        alert("Code verified successfully!");
        setStep(3);
      } catch (error) {
        console.error(
          "Error verifying code:",
          error.response?.data?.message || error.message
        );
        alert(error.response?.data?.message || "Invalid or expired code.");
      } finally {
        setLoading(false);
      }
    } else if (step === 3) {
      // Step 3: Reset the password
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
      try {
        setLoading(true);
        const response = await axiosInstance.post("/confirm-password", {
          email,
          code,
          newPassword,
        });
        console.log("Password reset successful:", response.data);
        alert(
          "Password reset successful! You can now log in with your new password."
        );
        navigate("/login");
      } catch (error) {
        console.error(
          "Error resetting password:",
          error.response?.data?.message || error.message
        );
        alert(error.response?.data?.message || "Failed to reset password.");
      } finally {
        setLoading(false);
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
                Reset Your Password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Please enter your email address to request a password reset
                link.
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
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
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Enter Verification Code
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Please enter the 4-digit code sent to your email address.
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <VerificationCodeInput value={code} onCompleted={setCode} />
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {loading ? "Verifying..." : "Verify Code"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Set New Password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Enter your new password below.
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="new-password" className="sr-only">
                      New password
                    </label>
                    <input
                      id="new-password"
                      name="new-password"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="sr-only">
                      Confirm new password
                    </label>
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm new password"
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
                    {loading ? "Resetting..." : "Reset Password"}
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
