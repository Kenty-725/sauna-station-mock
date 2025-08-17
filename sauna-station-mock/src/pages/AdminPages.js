import React from "react";
import AuthApp from "../auth/AuthApp";

// 1. システム管理者向け ログイン画面
export const AdminLoginPage = ({ navigateTo }) => (
  <AuthApp
    onAuthSuccess={(userData) => {
      console.log("Admin login success:", userData);
      navigateTo("adminCompanyList");
    }}
    userType="admin"
  />
);

// 2. システム管理者向け 企業・施設一覧管理画面
export const AdminCompanyListPage = ({ navigateTo }) => (
  <div className="min-h-screen bg-gray-50 font-inter">
    <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
      企業・施設一覧管理
    </h2>

    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
      <div className="flex justify-end mb-6">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
          新規施設追加
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="py-3 px-4 border-b text-left">施設ID</th>
              <th className="py-3 px-4 border-b text-left">施設名</th>
              <th className="py-3 px-4 border-b text-left">担当者メール</th>
              <th className="py-3 px-4 border-b text-left">登録日</th>
              <th className="py-3 px-4 border-b text-left">ステータス</th>
              <th className="py-3 px-4 border-b text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-gray-50 border-b">
                <td className="py-3 px-4">SAUNA00{i}</td>
                <td className="py-3 px-4">サウナ施設名 {i}</td>
                <td className="py-3 px-4">manager{i}@example.com</td>
                <td className="py-3 px-4">2024/01/0{i}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      i === 1
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {i === 1 ? "稼働中" : "審査中"}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded-lg">
                    編集
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-lg">
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// 3. システム管理者向け 担当者アカウント管理画面
export const AdminAccountManagePage = ({ navigateTo }) => (
  <div className="min-h-screen bg-gray-50 font-inter">
    <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
      担当者アカウント管理
    </h2>

    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
      <div className="flex justify-end mb-6">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
          新規担当者追加
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="py-3 px-4 border-b text-left">アカウントID</th>
              <th className="py-3 px-4 border-b text-left">氏名</th>
              <th className="py-3 px-4 border-b text-left">メールアドレス</th>
              <th className="py-3 px-4 border-b text-left">担当施設</th>
              <th className="py-3 px-4 border-b text-left">登録日</th>
              <th className="py-3 px-4 border-b text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-gray-50 border-b">
                <td className="py-3 px-4">MGR00{i}</td>
                <td className="py-3 px-4">担当者 太郎 {i}</td>
                <td className="py-3 px-4">manager{i}@example.com</td>
                <td className="py-3 px-4">サウナ施設名 {i}</td>
                <td className="py-3 px-4">2024/01/0{i}</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded-lg">
                    編集
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-lg">
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
