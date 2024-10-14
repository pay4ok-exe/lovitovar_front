import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PersonalData from "../components/PersonalData";
import Notifications from "../components/Notifications";
import Settings from "../components/Settings";
import MyPosts from "../components/MyPosts";

// Photos
import UserIcon from "../assets/user.png";
import RingingIcon from "../assets/ringing.png";
import PostsIcon from "../assets/online.png";
import SettingsIcon from "../assets/cogwheel.png";
import LogoutIcon from "../assets/logout.png";

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-grow mt-24 mb-4">
        {/* Wrapper to ensure alignment with Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex">
          {/* Sidebar with icons and updated styling */}
          {/* <aside className="w-64 bg-white p-4 shadow-md float-left mr-8">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/profile/"
                  className="flex items-center space-x-2 text-gray-700">
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                  <span>Личные данные</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/messages"
                  className="flex items-center space-x-2 text-gray-700">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span>Сообщения</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/notifications"
                  className="flex items-center space-x-2 text-gray-700">
                  <i className="fa fa-bell" aria-hidden="true"></i>
                  <span>Уведомления</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/my-posts"
                  className="flex items-center space-x-2 text-gray-700">
                  <i className="fa fa-bullhorn" aria-hidden="true"></i>
                  <span>Мои объявления</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/settings"
                  className="flex items-center space-x-2 text-gray-700">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                  <span>Настройки</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-gray-700">
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  <span>Выйти</span>
                </Link>
              </li>
            </ul>
          </aside> */}

          <aside className="pl-8 w-64 bg-white p-4 shadow-md flex flex-col justify-around rounded-lg mr-4">
            <ul className="space-y-8 mt-4">
              <li>
                <Link
                  to="/profile/"
                  className="flex items-center space-x-2 text-gray-700">
                  <img src={UserIcon} alt="Личные данные" className="h-5 w-5" />
                  <span>Личные данные</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/notifications"
                  className="flex items-center space-x-2 text-gray-700">
                  <img
                    src={RingingIcon}
                    alt="Уведомления"
                    className="h-5 w-5"
                  />
                  <span>Уведомления</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/my-posts"
                  className="flex items-center space-x-2 text-gray-700">
                  <img
                    src={PostsIcon}
                    alt="Мои объявления"
                    className="h-5 w-5"
                  />
                  <span>Мои объявления</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/settings"
                  className="flex items-center space-x-2 text-gray-700">
                  <img src={SettingsIcon} alt="Настройки" className="h-5 w-5" />
                  <span>Настройки</span>
                </Link>
              </li>
            </ul>
            <div className="mt-auto mb-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-700">
                <img src={LogoutIcon} alt="Выйти" className="h-5 w-5" />
                <span>Выйти</span>
              </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="bg-white shadow-md rounded-lg p-6 flex-1">
            <Routes>
              <Route path="/" element={<PersonalData />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="my-posts" element={<MyPosts />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
