import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VerificationCodeInput from "../components/VerificationCodeInput";

const ForgotPage = () => {
  const [step, setStep] = useState(1); // Track the current step in the flow
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission for each step
  const handleSubmit = (event) => {
    event.preventDefault();

    if (step === 1) {
      console.log("Password reset request for:", email);
      setSubmitted(true);
      setStep(2); // Move to step 2
    } else if (step === 2) {
      console.log("Code entered:", code);
      // Validate code (for demo purposes, assume it's valid)
      setStep(3); // Move to step 3 (new password)
    } else if (step === 3) {
      if (newPassword === confirmPassword) {
        console.log("New password submitted:", newPassword);
        // Process the new password submission
        alert("Password reset successful!");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert("Passwords do not match. Please try again.");
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
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Send Reset Link
                  </button>
                </div>
              </form>
              {submitted && (
                <div className="text-center mt-4 text-sm font-semibold text-indigo-600">
                  If an account with that email exists, we sent an email to{" "}
                  {email} with a link to reset your password.
                </div>
              )}
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
                <div className="rounded-md shadow-sm -space-y-px">
                  {/* <div>
                    <label htmlFor="code" className="sr-only">
                      Code
                    </label>
                    <input
                      id="code"
                      name="code"
                      type="text"
                      maxLength="4"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="4-digit code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div> */}
                  <VerificationCodeInput />
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Verify Code
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
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Reset Password
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
