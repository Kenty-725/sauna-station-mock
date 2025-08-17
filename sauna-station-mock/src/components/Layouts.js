import React from "react";
import Header from "./Header";

// Manager Layout with Sidebar
export const ManagerLayout = ({ children, navigateTo, currentPage }) => (
  <div className="flex min-h-screen bg-gray-50 font-inter">
    {/* Sidebar */}
    <aside className="w-64 bg-gray-800 text-white shadow-lg flex flex-col pt-4">
      <div className="p-4 border-b border-gray-700 mb-4">
        <h2 className="text-2xl font-bold text-orange-400">施設管理メニュー</h2>
      </div>
      <nav className="flex-grow">
        <ul>
          <li>
            <button
              onClick={() => navigateTo("managerDashboard")}
              className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3
                ${
                  currentPage === "managerDashboard"
                    ? "bg-orange-600 font-bold"
                    : ""
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h2a1 1 0 001-1m-6 0v-4a1 1 0 011-1h2a1 1 0 011 1v4m-6 0h6"
                ></path>
              </svg>
              <span>ダッシュボード</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("managerBookingList")}
              className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3
                ${
                  currentPage === "managerBookingList"
                    ? "bg-orange-600 font-bold"
                    : ""
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span>予約管理</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("managerBookingSlotManage")}
              className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3
                ${
                  currentPage === "managerBookingSlotManage"
                    ? "bg-orange-600 font-bold"
                    : ""
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zM12 14v-2m0 0V8m0 4h-2m2 0h2"
                ></path>
              </svg>
              <span>予約枠管理</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("managerBusinessHoursManage")}
              className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3
                ${
                  currentPage === "managerBusinessHoursManage"
                    ? "bg-orange-600 font-bold"
                    : ""
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>営業時間管理</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("managerFacilityEdit")}
              className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3
                ${
                  currentPage === "managerFacilityEdit"
                    ? "bg-orange-600 font-bold"
                    : ""
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              <span>施設情報編集</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("managerStaffManage")}
              className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3
                ${
                  currentPage === "managerStaffManage"
                    ? "bg-orange-600 font-bold"
                    : ""
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-9a2 2 0 00-2-2H9a2 2 0 00-2 2v9m-2 0h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2zm0 0l-2.5-2.5M17 20l2.5-2.5M10 9H7m4 0h-4"
                ></path>
              </svg>
              <span>スタッフ管理</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 mt-auto">
        <button
          onClick={() => navigateTo("userTop")}
          className="w-full bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
        >
          ログアウト
        </button>
      </div>
    </aside>

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      <Header userType="manager" navigateTo={navigateTo} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  </div>
);

// Admin Layout with Sidebar
export const AdminLayout = ({ children, navigateTo, currentPage }) => (
  <div className="flex min-h-screen bg-gray-50 font-inter">
    {/* Sidebar */}
    <aside className="w-64 bg-gray-800 text-white shadow-lg flex flex-col pt-4">
      <div className="p-4 border-b border-gray-700 mb-4">
        <h2 className="text-2xl font-bold text-orange-400">管理者メニュー</h2>
      </div>
      <nav className="flex-grow">
        <ul>
          <li>
            <button
              onClick={() => navigateTo("adminCompanyList")}
              className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3
                ${
                  currentPage === "adminCompanyList"
                    ? "bg-orange-600 font-bold"
                    : ""
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              <span>企業・施設管理</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("adminAccountManage")}
              className={`w-full text-left px-6 py-3 hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3
                ${
                  currentPage === "adminAccountManage"
                    ? "bg-orange-600 font-bold"
                    : ""
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M12 20v-9m-9 0h18a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v11a2 2 0 002 2z"
                ></path>
              </svg>
              <span>担当者アカウント</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 mt-auto">
        <button
          onClick={() => navigateTo("userTop")}
          className="w-full bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
        >
          ログアウト
        </button>
      </div>
    </aside>

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      <Header userType="admin" navigateTo={navigateTo} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  </div>
);
