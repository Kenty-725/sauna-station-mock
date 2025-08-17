import React from "react";

const Header = ({
  userType,
  navigateTo,
  isAuthenticated,
  userData,
  onLogout,
}) => (
  <header className="bg-white text-gray-800 p-4 shadow-md rounded-b-lg border-b border-gray-100">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-bold font-inter text-orange-700">
        Sauna Station
      </h1>
      <nav>
        {userType === "general" && !isAuthenticated && (
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => navigateTo("userTop")}
                className="hover:text-orange-500 transition-colors duration-200"
              >
                トップ
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("userFacilityList")}
                className="hover:text-orange-500 transition-colors duration-200"
              >
                施設を探す
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("userLogin")}
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-200"
              >
                ログイン
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("managerLogin")}
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-200"
              >
                施設担当者ログイン
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("adminLogin")}
                className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
              >
                管理者ログイン
              </button>
            </li>
          </ul>
        )}

        {userType === "general" && isAuthenticated && (
          <ul className="flex space-x-4 items-center">
            <li>
              <button
                onClick={() => navigateTo("userTop")}
                className="hover:text-orange-500 transition-colors duration-200"
              >
                トップ
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("userFacilityList")}
                className="hover:text-orange-500 transition-colors duration-200"
              >
                施設を探す
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("userMyPage")}
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-200"
              >
                マイページ
              </button>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-200"
              >
                ログアウト
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  </header>
);

export default Header;
