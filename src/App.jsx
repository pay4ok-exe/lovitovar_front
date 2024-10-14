import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import ForgotPage from "./pages/ForgotPage";
import AuthRequiredPage from "./pages/AuthRequiredPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/auth-required" element={<AuthRequiredPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        {/* Profile Page with Sub-routes */}
        <Route path="/profile/*" element={<ProfilePage />} />{" "}
        {/* ProfilePage handles sub-routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
