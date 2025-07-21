import React, { useState } from "react";

// BookingModal コンポーネント
const BookingModal = ({ date, timeSlot, onClose, onConfirm }) => {
  if (!timeSlot) return null; // timeSlotがない場合は何もレンダリングしない

  // 混雑度に応じたスタイルを返すヘルパー関数
  const getCongestionStyle = (congestion) => {
    switch (congestion) {
      case "空きあり":
        return "text-green-600 font-semibold";
      case "やや混雑":
        return "text-yellow-600 font-semibold";
      case "混雑":
        return "text-red-600 font-semibold";
      case "満員":
        return "text-gray-500 font-semibold"; // 満員は予約不可なのでグレーアウト
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-scaleIn">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ご予約内容の確認
        </h3>
        <div className="space-y-3 text-gray-700 mb-8">
          <p>
            <span className="font-semibold">日付:</span> {date}
          </p>
          <p>
            <span className="font-semibold">プラン:</span> {timeSlot.plan}
          </p>
          <p>
            <span className="font-semibold">時間:</span> {timeSlot.time}
          </p>
          <p>
            <span className="font-semibold">混雑具合:</span>{" "}
            <span className={getCongestionStyle(timeSlot.congestion)}>
              {timeSlot.congestion}
            </span>
          </p>
          <p className="text-xl font-bold text-orange-700 mt-4">
            <span className="text-gray-700">料金:</span> ¥
            {timeSlot.price.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col space-y-3">
          <button
            onClick={onConfirm}
            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full w-full shadow-lg transform transition-transform duration-200 hover:scale-105
              ${
                timeSlot.congestion === "満員"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            disabled={timeSlot.congestion === "満員"}
          >
            {timeSlot.congestion === "満員"
              ? "満員のため予約不可"
              : "予約を確定する"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full w-full shadow-md transition-colors duration-200"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};

// メインアプリケーションコンポーネント
const App = () => {
  // 現在表示しているページを管理するステート
  const [currentPage, setCurrentPage] = useState("userTop"); // 初期ページは一般ユーザーのトップページ

  // ページ遷移関数
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo(0, 0); // ページトップへスクロール
  };

  // 各画面のコンポーネントを定義

  // --- 共通ヘッダーコンポーネント ---
  const Header = ({ userType, navigateTo }) => (
    <header className="bg-white text-gray-800 p-4 shadow-md rounded-b-lg border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold font-inter text-orange-700">
          Sauna Station
        </h1>{" "}
        {/* アプリ名を変更 */}
        <nav>
          {userType === "general" && (
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
                  onClick={() => navigateTo("userMyPage")}
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  マイページ
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
          {/* Manager and Admin navigation moved to sidebar */}
        </nav>
      </div>
    </header>
  );

  // --- Manager Layout with Sidebar ---
  const ManagerLayout = ({ children, navigateTo, currentPage }) => (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white shadow-lg flex flex-col pt-4">
        <div className="p-4 border-b border-gray-700 mb-4">
          <h2 className="text-2xl font-bold text-orange-400">
            施設管理メニュー
          </h2>
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
                onClick={() => navigateTo("managerBookingSlotManage")} // 新しい予約枠管理ページへのリンク
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
                onClick={() => navigateTo("managerBusinessHoursManage")} // 新しい営業時間管理ページへのリンク
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

  // --- Admin Layout with Sidebar ---
  const AdminLayout = ({ children, navigateTo, currentPage }) => (
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

  // 1. 一般ユーザー向け トップページ
  const UserTopPage = () => (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header userType="general" navigateTo={navigateTo} />
      <main className="container mx-auto p-6">
        <section
          className="relative h-96 bg-cover bg-center rounded-xl shadow-lg mb-12 flex items-center justify-center text-white"
          style={{
            backgroundImage: `url(https://placehold.co/1200x500/8B4513/FFFFFF?text=Sauna+Hero+Image)`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
              最高の"ととのう"体験を
              <br />
              Sauna Stationで見つけよう
            </h2>{" "}
            {/* アプリ名を変更 */}
            <p className="text-xl mb-8 drop-shadow-md">
              全国のサウナ施設を検索・予約。あなたにぴったりの癒しを見つけましょう。
            </p>
            <div className="flex justify-center items-center space-x-4">
              <input
                type="text"
                placeholder="場所や施設名で検索..."
                className="p-4 rounded-full border-2 border-white bg-white bg-opacity-90 text-gray-800 w-full max-w-md shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={() => navigateTo("userFacilityList")} // 施設一覧検索ページへ遷移
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
              >
                検索
              </button>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            人気のサウナ施設
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 border border-gray-100"
              >
                <img
                  src={`https://placehold.co/400x250/FDBA74/FFFFFF?text=Sauna+Image+${i}`}
                  alt={`サウナ施設${i}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    サウナ施設名 {i}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    東京都渋谷区 | 広々とした露天風呂と本格フィンランドサウナ
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-orange-700">
                      ¥2,500〜
                    </span>
                    <button
                      onClick={() => navigateTo("userFacilityDetail")} // 施設詳細ページへ遷移
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors duration-200"
                    >
                      詳細を見る
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center py-12 bg-orange-50 rounded-xl shadow-lg border border-orange-100">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Sauna Stationであなたのサウナライフを豊かに
          </h3>{" "}
          {/* アプリ名を変更 */}
          <p className="text-lg text-gray-700 mb-6">
            予約から施設管理まで、サウナ運営に必要なすべてがここに。
          </p>
          <button
            onClick={() => navigateTo("managerLogin")} // 施設担当者ログイン画面へ遷移
            className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
          >
            施設運営者の方はこちら
          </button>
        </section>
      </main>
    </div>
  );

  // 2. 一般ユーザー向け 施設一覧検索ページ
  const UserFacilityListPage = () => (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header userType="general" navigateTo={navigateTo} />
      <main className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          サウナ施設一覧
        </h2>

        {/* 検索・フィルターエリア */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">検索条件</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label
                htmlFor="location"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                場所
              </label>
              <input
                type="text"
                id="location"
                placeholder="例: 東京都渋谷区"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="keyword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                キーワード
              </label>
              <input
                type="text"
                id="keyword"
                placeholder="例: オートロウリュ、水風呂"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                価格帯
              </label>
              <select
                id="price"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>選択してください</option>
                <option>〜1,500円</option>
                <option>1,501円〜3,000円</option>
                <option>3,001円〜</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sort"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                並び順
              </label>
              <select
                id="sort"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>おすすめ順</option>
                <option>人気順</option>
                <option>料金が安い順</option>
                <option>新しい順</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105">
              検索
            </button>
          </div>
        </div>

        {/* 施設一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 border border-gray-100"
            >
              <img
                src={`https://placehold.co/400x250/FDBA74/FFFFFF?text=Sauna+Image+${i}`}
                alt={`サウナ施設${i}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  サウナ施設名 {i}
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  東京都港区 | 駅から徒歩5分
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700 mb-4">
                  <span className="flex items-center">
                    <span className="text-orange-500 mr-1">🔥</span>サウナ:{" "}
                    {90 + i}℃
                  </span>
                  <span className="flex items-center">
                    <span className="text-blue-500 mr-1">💧</span>水風呂:{" "}
                    {15 + i}℃
                  </span>
                  <span className="flex items-center">
                    <span className="text-green-500 mr-1">🌬️</span>外気浴あり
                  </span>
                  <span className="flex items-center">
                    <span className="text-red-500 mr-1">♨️</span>ロウリュ
                    {i % 2 === 0 ? "あり" : "なし"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-orange-700">
                    ¥{2500 + i * 100}〜
                  </span>
                  <button
                    onClick={() => navigateTo("userFacilityDetail")} // 施設詳細ページへ遷移
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors duration-200"
                  >
                    詳細を見る
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ページネーション */}
        <div className="flex justify-center mt-12 space-x-2">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">
            前へ
          </button>
          <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">
            1
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">
            2
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">
            3
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">
            次へ
          </button>
        </div>
      </main>
    </div>
  );

  // 3. 一般ユーザー向け 施設詳細ページ（予約画面含む）
  const UserFacilityDetailPage = () => {
    // 選択された日付を管理するステート
    const [selectedDate, setSelectedDate] = useState(null);
    // 選択された時間枠を管理するステート
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    // 予約モーダルの表示を管理するステート
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 予約プランと時間枠のダミーデータ（混雑具合を計算するための情報を含む）
    // 2025年7月20日（土）からの一週間を想定
    const weeklyAvailableSlots = {
      "2025年7月20日": [
        // 土曜日
        {
          time: "10:00 - 12:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 2,
        },
        {
          time: "12:00 - 14:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 7,
        },
        {
          time: "14:00 - 16:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 10,
        },
      ],
      "2025年7月21日": [
        // 日曜日
        {
          time: "10:00 - 12:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 1,
        },
        {
          time: "12:00 - 14:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 3,
        },
      ],
      "2025年7月22日": [
        // 月曜日
        {
          time: "09:00 - 12:00",
          plan: "貸切VIPプラン",
          price: 15000,
          maxCapacity: 1,
          currentBookings: 0,
        },
      ],
      "2025年7月23日": [], // 火曜日 - 予約枠なし
      "2025年7月24日": [
        // 水曜日
        {
          time: "10:00 - 12:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 4,
        },
        {
          time: "12:00 - 14:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 8,
        },
      ],
      "2025年7月25日": [
        // 木曜日
        {
          time: "10:00 - 12:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 0,
        },
        {
          time: "12:00 - 14:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 5,
        },
        {
          time: "14:00 - 16:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 2,
        },
      ],
      "2025年7月26日": [
        // 金曜日
        {
          time: "10:00 - 12:00",
          plan: "2時間スタンダードプラン",
          price: 3000,
          maxCapacity: 10,
          currentBookings: 1,
        },
      ],
    };

    // 予約数と空き状況に基づいて混雑具合を計算する関数
    const calculateCongestion = (maxCapacity, currentBookings) => {
      if (currentBookings >= maxCapacity) {
        return "満員";
      } else if (currentBookings / maxCapacity >= 0.7) {
        return "混雑";
      } else if (currentBookings / maxCapacity >= 0.4) {
        return "やや混雑";
      } else {
        return "空きあり";
      }
    };

    // 混雑度に応じたスタイルを返すヘルパー関数 (BookingModalと共通)
    const getCongestionStyle = (congestion) => {
      switch (congestion) {
        case "空きあり":
          return "text-green-600 font-semibold";
        case "やや混雑":
          return "text-yellow-600 font-semibold";
        case "混雑":
          return "text-red-600 font-semibold";
        case "満員":
          return "text-gray-500 font-semibold";
        default:
          return "text-gray-600";
      }
    };

    // 週の開始日（ダミーとして2025年7月20日）
    const weekStartDate = new Date("2025-07-20T00:00:00");
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
    const currentWeekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStartDate);
      date.setDate(weekStartDate.getDate() + i);
      const dayString = `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;

      // 各スロットに計算された混雑具合を追加
      const slotsWithCongestion = (weeklyAvailableSlots[dayString] || []).map(
        (slot) => ({
          ...slot,
          congestion: calculateCongestion(
            slot.maxCapacity,
            slot.currentBookings
          ),
        })
      );

      currentWeekDays.push({
        date: date,
        dateString: dayString,
        dayOfWeek: daysOfWeek[date.getDay()],
        slots: slotsWithCongestion,
      });
    }

    // 時間枠クリック時のハンドラ
    const handleTimeSlotClick = (dayData, slot) => {
      // 満員の場合はクリックできないようにする
      if (slot.congestion === "満員") {
        alert("この時間枠は満員のため予約できません。");
        return;
      }
      setSelectedDate(dayData.dateString);
      setSelectedTimeSlot(slot);
      setIsModalOpen(true); // モーダルを表示
    };

    // 予約確定ボタンクリック時の処理 (モーダル内から呼ばれる)
    const handleConfirmBooking = () => {
      if (!selectedDate || !selectedTimeSlot) {
        alert("日付と時間枠が正しく選択されていません。");
        return;
      }
      if (selectedTimeSlot.congestion === "満員") {
        alert("この時間枠は満員のため予約できません。");
        return;
      }
      alert(
        `予約が確定しました！\n日付: ${selectedDate}\nプラン: ${selectedTimeSlot.plan}\n時間: ${selectedTimeSlot.time}\n混雑具合: ${selectedTimeSlot.congestion}`
      );
      // 予約完了後、状態をリセット
      setSelectedDate(null);
      setSelectedTimeSlot(null);
      setIsModalOpen(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <Header userType="general" navigateTo={navigateTo} />
        <main className="container mx-auto p-6">
          <button
            onClick={() => navigateTo("userFacilityList")} // 施設一覧検索ページへ戻る
            className="mb-6 flex items-center text-gray-700 hover:text-gray-900 font-semibold"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            施設一覧に戻る
          </button>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              極上サウナ&スパ 天空の湯
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              東京都渋谷区 | 渋谷駅から徒歩10分
            </p>

            {/* 施設画像カルーセル (簡易版) */}
            <div className="relative mb-8 rounded-lg overflow-hidden">
              <img
                src="https://placehold.co/800x450/FDBA74/FFFFFF?text=Facility+Main+Image"
                alt="施設メイン画像"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                1 / 5
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 施設情報セクション */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  施設概要
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  都会の喧騒を忘れさせる、天空に浮かぶ隠れ家サウナ。
                  フィンランド式サウナ、ロウリュサービス、そして地下水を使用したこだわりの水風呂が自慢です。
                  広々とした外気浴スペースで、心ゆくまで"ととのう"体験をお楽しみください。
                  男女別で、アメニティも充実しています。
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  設備・サービス
                </h3>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>フィンランド式サウナ</li>
                  <li>オートロウリュ</li>
                  <li>水風呂（地下水使用）</li>
                  <li>外気浴スペース</li>
                  <li>休憩スペース</li>
                  <li>シャワーブース</li>
                  <li>タオル、シャンプー、ボディソープ完備</li>
                  <li>Wi-Fi完備</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  営業時間
                </h3>
                <p className="text-gray-700 mb-6">
                  月〜金: 10:00 - 23:00 (最終受付 22:00)
                  <br />
                  土日祝: 09:00 - 24:00 (最終受付 23:00)
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  アクセス
                </h3>
                <p className="text-gray-700 mb-6">
                  JR山手線 渋谷駅 ハチ公口より徒歩10分
                  <br />
                  東京メトロ銀座線 渋谷駅より徒歩8分
                </p>
              </div>

              {/* 予約セクション */}
              <div className="bg-orange-50 p-6 rounded-xl shadow-inner border border-orange-100 col-span-full">
                {" "}
                {/* 横幅いっぱいに変更 */}
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  ご予約
                </h3>
                {/* 週単位カレンダーUI */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    日付と予約枠を選択
                  </label>
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-300">
                    <div className="flex justify-between items-center mb-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        &lt; 前の週
                      </button>
                      <span className="font-bold text-lg text-gray-800">
                        2025年7月20日 - 7月26日
                      </span>{" "}
                      {/* 週の表示 */}
                      <button className="text-gray-600 hover:text-gray-900">
                        次の週 &gt;
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {currentWeekDays.map((dayData, index) => (
                        <div
                          key={index}
                          className="flex flex-col border border-gray-200 rounded-lg p-2 min-h-[150px] overflow-hidden"
                        >
                          <div
                            className={`font-semibold text-lg mb-2 ${
                              dayData.date.getDay() === 0
                                ? "text-red-600"
                                : dayData.date.getDay() === 6
                                ? "text-blue-600"
                                : "text-gray-800"
                            }`}
                          >
                            {dayData.date.getDate()} ({dayData.dayOfWeek})
                          </div>
                          <div className="flex-grow space-y-1 overflow-y-auto custom-scrollbar">
                            {dayData.slots.length > 0 ? (
                              dayData.slots.map((slot, slotIndex) => (
                                <button
                                  key={slotIndex}
                                  onClick={() =>
                                    handleTimeSlotClick(dayData, slot)
                                  }
                                  className={`w-full text-left p-1 rounded-md transition-colors duration-150 text-xs
                                    ${
                                      selectedTimeSlot?.time === slot.time &&
                                      selectedTimeSlot?.plan === slot.plan &&
                                      selectedDate === dayData.dateString
                                        ? "bg-orange-300"
                                        : "bg-gray-50 hover:bg-orange-100"
                                    }
                                    border border-gray-200
                                    ${
                                      slot.congestion === "満員"
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }
                                  `}
                                  disabled={slot.congestion === "満員"}
                                >
                                  <p className="font-medium">{slot.time}</p>
                                  <p className="text-gray-600">{slot.plan}</p>
                                  <p
                                    className={`${getCongestionStyle(
                                      slot.congestion
                                    )}`}
                                  >
                                    {slot.congestion}
                                  </p>
                                </button>
                              ))
                            ) : (
                              <p className="text-gray-400 text-xs mt-4">
                                予約枠なし
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* 予約モーダル */}
        {isModalOpen && (
          <BookingModal
            date={selectedDate}
            timeSlot={selectedTimeSlot}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmBooking}
          />
        )}
      </div>
    );
  };

  // 4. 一般ユーザー向け マイページ（予約履歴・ユーザー情報）
  const UserMyPage = () => (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header userType="general" navigateTo={navigateTo} />
      <main className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          マイページ
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ユーザー情報セクション */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">登録情報</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                氏名
              </label>
              <p className="text-gray-900 text-lg">山田 太郎</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                メールアドレス
              </label>
              <p className="text-gray-900 text-lg">taro.yamada@example.com</p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                電話番号
              </label>
              <p className="text-gray-900 text-lg">090-1234-5678</p>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors duration-200">
              情報を編集する
            </button>
          </div>

          {/* 予約履歴セクション */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">予約履歴</h3>
            <div className="space-y-6">
              {/* 予約履歴アイテム */}
              <div className="border-b pb-4 last:border-b-0 last:pb-0">
                <p className="text-lg font-semibold text-gray-900">
                  極上サウナ&スパ 天空の湯
                </p>
                <p className="text-gray-700">
                  日時: 2025年7月20日(土) 14:00 - 16:00
                </p>
                <p className="text-gray-700">プラン: 2時間スタンダードプラン</p>
                <p className="text-gray-700">ステータス: 完了</p>
                <button className="text-blue-600 hover:underline text-sm mt-2">
                  詳細を見る
                </button>
              </div>
              <div className="border-b pb-4 last:border-b-0 last:pb-0">
                <p className="text-lg font-semibold text-gray-900">
                  都会のオアシス サウナリゾート
                </p>
                <p className="text-gray-700">
                  日時: 2025年8月5日(月) 18:00 - 20:00
                </p>
                <p className="text-gray-700">プラン: 3時間ゆったりプラン</p>
                <p className="text-gray-700">ステータス: 予約済み</p>
                <button className="text-red-600 hover:underline text-sm mt-2 mr-4">
                  キャンセル
                </button>
                <button className="text-blue-600 hover:underline text-sm mt-2">
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // --- 施設担当者向け画面 ---

  // 1. 施設担当者向け ログイン画面
  const ManagerLoginPage = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-inter">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          施設担当者ログイン
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigateTo("managerDashboard", "manager");
          }}
        >
          {" "}
          {/* ログイン成功でダッシュボードへ遷移 */}
          <div className="mb-6">
            <label
              htmlFor="manager-id"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              ID
            </label>{" "}
            {/* ラベルをIDに変更 */}
            <input
              type="text" // typeをtextに変更
              id="manager-id"
              placeholder="担当者IDを入力" // プレースホルダーを変更
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="manager-password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              パスワード
            </label>
            <input
              type="password"
              id="manager-password"
              placeholder="パスワードを入力"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full w-full shadow-lg transform transition-transform duration-200 hover:scale-105"
          >
            ログイン
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          <button
            onClick={() => navigateTo("userTop")}
            className="text-orange-500 hover:underline"
          >
            トップページに戻る
          </button>
        </p>
      </div>
    </div>
  );

  // 2. 施設担当者向け ダッシュボード（本日の予約、売上速報）
  const ManagerDashboardPage = () => (
    <div className="min-h-screen bg-gray-50 font-inter">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        ダッシュボード
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* 本日の予約 */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">本日の予約</h3>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <p className="text-lg font-semibold text-gray-900">
                10:00 - 12:00: 山田 太郎 様 (2時間スタンダード)
              </p>
              <p className="text-gray-600 text-sm">電話: 090-xxxx-xxxx</p>
            </div>
            <div className="border-b pb-3">
              <p className="text-lg font-semibold text-gray-900">
                14:00 - 16:00: 佐藤 花子 様 (3時間ゆったり)
              </p>
              <p className="text-gray-600 text-sm">電話: 080-xxxx-xxxx</p>
            </div>
            <div className="border-b pb-3">
              <p className="text-lg font-semibold text-gray-900">
                18:00 - 20:00: 田中 健太 様 (2時間スタンダード)
              </p>
              <p className="text-gray-600 text-sm">電話: 070-xxxx-xxxx</p>
            </div>
            <button
              onClick={() => navigateTo("managerBookingList")} // 予約一覧・管理画面へ遷移
              className="text-orange-600 hover:underline font-semibold mt-4"
            >
              すべての予約を見る
            </button>
          </div>
        </div>

        {/* 売上速報 */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            売上速報 (本日)
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-700">総売上:</span>
              <span className="font-bold text-orange-900">¥ 25,000</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-700">予約数:</span>
              <span className="font-bold text-orange-900">12件</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-700">平均単価:</span>
              <span className="font-bold text-orange-900">¥ 2,083</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            ※データはリアルタイムで更新されます。
          </p>
        </div>
      </div>

      {/* 施設情報クイックリンク */}
      <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">施設情報管理</h3>
        <p className="text-gray-700 mb-6">
          施設の詳細情報や予約可能な時間枠などを編集できます。
        </p>
        <button
          onClick={() => navigateTo("managerFacilityEdit")} // 施設情報編集画面へ遷移
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          施設情報を編集する
        </button>
      </div>
    </div>
  );

  // 3. 施設担当者向け 予約一覧・管理画面（カレンダー形式）
  const ManagerBookingListPage = () => (
    <div className="min-h-screen bg-gray-50 font-inter">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        予約一覧・管理
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">
            &lt; 前の月
          </button>
          <h3 className="text-2xl font-bold text-gray-800">2025年7月</h3>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">
            次の月 &gt;
          </button>
        </div>

        {/* カレンダー表示 (簡易版) */}
        <div className="grid grid-cols-7 gap-1 text-center text-sm mb-6">
          {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
            <div key={day} className="font-bold text-gray-700 p-2">
              {day}
            </div>
          ))}
          {/* ダミーの日付と予約表示 */}
          {Array.from({ length: 31 }).map((_, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg ${
                i + 1 === 20
                  ? "bg-orange-200 font-bold text-orange-900"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              {i + 1}
              {i + 1 === 20 && (
                <div className="text-xs text-orange-800 mt-1">3件</div>
              )}
              {i + 1 === 25 && (
                <div className="text-xs text-orange-800 mt-1">1件</div>
              )}
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          2025年7月20日の予約詳細
        </h3>
        <div className="space-y-4">
          {/* 予約アイテム */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center border border-gray-100">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                10:00 - 12:00: 山田 太郎 様
              </p>
              <p className="text-gray-700 text-sm">
                プラン: 2時間スタンダードプラン / 支払い: 完了
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-lg">
                詳細
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-lg">
                キャンセル
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center border border-gray-100">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                14:00 - 16:00: 佐藤 花子 様
              </p>
              <p className="text-gray-700 text-sm">
                プラン: 3時間ゆったりプラン / 支払い: 未完了
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-lg">
                詳細
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-lg">
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. 施設担当者向け 施設情報編集画面
  const ManagerFacilityEditPage = () => {
    // 施設情報に関するステート
    const [facilityName, setFacilityName] =
      useState("極上サウナ&スパ 天空の湯");
    const [facilityAddress, setFacilityAddress] =
      useState("東京都渋谷区〇〇1-2-3");
    const [facilityDescription, setFacilityDescription] = useState(
      '都会の喧騒を忘れさせる、天空に浮かぶ隠れ家サウナ。フィンランド式サウナ、ロウリュサービス、そして地下水を使用したこだわりの水風呂が自慢です。広々とした外気浴スペースで、心ゆくまで"ととのう"体験をお楽しみください。男女別で、アメニティも充実しています。'
    );
    // 営業時間と予約プランは別の管理画面へ移動するため削除
    // const [facilityHours, setFacilityHours] = useState("月〜金: 10:00 - 23:00 (最終受付 22:00)\n土日祝: 09:00 - 24:00 (最終受付 23:00)");
    // const [facilityPlans, setFacilityPlans] = useState(`[
    // { "name": "2時間スタンダードプラン", "price": 3000 },
    // { "name": "3時間ゆったりプラン", "price": 4500 }
    // ]`);

    // 施設情報更新ハンドラ
    const handleFacilityUpdate = (event) => {
      event.preventDefault();
      alert("施設情報を更新しました！");
      // ここでAPI連携などを行い、データを保存する
      console.log("施設情報:", {
        facilityName,
        facilityAddress,
        facilityDescription,
      });
    };

    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          施設情報編集
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <form onSubmit={handleFacilityUpdate}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">基本情報</h3>
            <div className="mb-6">
              <label
                htmlFor="facility-name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                施設名
              </label>
              <input
                type="text"
                id="facility-name"
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="facility-address"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                住所
              </label>
              <input
                type="text"
                id="facility-address"
                value={facilityAddress}
                onChange={(e) => setFacilityAddress(e.target.value)}
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="facility-description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                施設概要
              </label>
              <textarea
                id="facility-description"
                rows="5"
                value={facilityDescription}
                onChange={(e) => setFacilityDescription(e.target.value)}
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              ></textarea>
            </div>
            {/* 営業時間と予約プランの入力フィールドを削除 */}

            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full w-full max-w-xs shadow-lg transform transition-transform duration-200 hover:scale-105"
              >
                情報を更新する
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // 5. 施設担当者向け 予約枠管理画面 (新設)
  const ManagerBookingSlotManagePage = () => {
    const [newSlotDate, setNewSlotDate] = useState("");
    const [newSlotTime, setNewSlotTime] = useState("");
    const [newSlotPlan, setNewSlotPlan] = useState("");
    const [newSlotMaxCapacity, setNewSlotMaxCapacity] = useState(""); // 最大収容人数を追加
    const [newSlotCurrentBookings, setNewSlotCurrentBookings] = useState(""); // 現在の予約数を追加

    const [registeredSlots, setRegisteredSlots] = useState([
      {
        date: "2025-07-20",
        time: "10:00 - 12:00",
        plan: "2時間スタンダードプラン",
        maxCapacity: 10,
        currentBookings: 2,
      },
      {
        date: "2025-07-20",
        time: "12:00 - 14:00",
        plan: "2時間スタンダードプラン",
        maxCapacity: 10,
        currentBookings: 7,
      },
      {
        date: "2025-07-21",
        time: "10:00 - 12:00",
        plan: "3時間ゆったりプラン",
        maxCapacity: 5,
        currentBookings: 1,
      },
    ]);

    // 予約数と空き状況に基づいて混雑具合を計算する関数 (UserFacilityDetailPageと共通)
    const calculateCongestion = (maxCapacity, currentBookings) => {
      if (currentBookings >= maxCapacity) {
        return "満員";
      } else if (currentBookings / maxCapacity >= 0.7) {
        return "混雑";
      } else if (currentBookings / maxCapacity >= 0.4) {
        return "やや混雑";
      } else {
        return "空きあり";
      }
    };

    // 混雑度に応じたスタイルを返すヘルパー関数 (UserFacilityDetailPageと共通)
    const getCongestionStyle = (congestion) => {
      switch (congestion) {
        case "空きあり":
          return "text-green-600 font-semibold";
        case "やや混雑":
          return "text-yellow-600 font-semibold";
        case "混雑":
          return "text-red-600 font-semibold";
        case "満員":
          return "text-gray-500 font-semibold";
        default:
          return "text-gray-600";
      }
    };

    // 予約枠追加ハンドラ
    const handleAddSlot = () => {
      if (
        newSlotDate &&
        newSlotTime &&
        newSlotPlan &&
        newSlotMaxCapacity !== "" &&
        newSlotCurrentBookings !== ""
      ) {
        const newSlot = {
          date: newSlotDate,
          time: newSlotTime,
          plan: newSlotPlan,
          maxCapacity: parseInt(newSlotMaxCapacity),
          currentBookings: parseInt(newSlotCurrentBookings),
        };
        setRegisteredSlots([...registeredSlots, newSlot]);
        // フォームをリセット
        setNewSlotDate("");
        setNewSlotTime("");
        setNewSlotPlan("");
        setNewSlotMaxCapacity("");
        setNewSlotCurrentBookings("");
      } else {
        alert("予約枠の情報をすべて入力してください。");
      }
    };

    // 予約枠削除ハンドラ
    const handleDeleteSlot = (index) => {
      const updatedSlots = registeredSlots.filter((_, i) => i !== index);
      setRegisteredSlots(updatedSlots);
    };

    // CSVファイル読み込みハンドラ
    const handleCsvUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          try {
            const parsedSlots = parseCsv(text);
            setRegisteredSlots((prevSlots) => [...prevSlots, ...parsedSlots]);
            alert("CSVファイルを正常に読み込み、予約枠を追加しました。");
          } catch (error) {
            alert(
              "CSVファイルの読み込み中にエラーが発生しました。形式を確認してください。"
            );
            console.error("CSV parse error:", error);
          }
        };
        reader.readAsText(file);
      }
    };

    // CSV解析関数 (簡易版: ヘッダーなし、カンマ区切り、date,time,plan,maxCapacity,currentBookings の順を想定)
    const parseCsv = (csvText) => {
      const lines = csvText.trim().split("\n");
      return lines.map((line) => {
        const [date, time, plan, maxCapacity, currentBookings] =
          line.split(",");
        return {
          date: date.trim(),
          time: time.trim(),
          plan: plan.trim(),
          maxCapacity: parseInt(maxCapacity.trim()),
          currentBookings: parseInt(currentBookings.trim()),
        };
      });
    };

    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          予約枠管理
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            新しい予約枠を追加
          </h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="new-slot-date"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  日付
                </label>
                <input
                  type="date"
                  id="new-slot-date"
                  value={newSlotDate}
                  onChange={(e) => setNewSlotDate(e.target.value)}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="new-slot-time"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  時間帯
                </label>
                <input
                  type="text"
                  id="new-slot-time"
                  placeholder="例: 10:00 - 12:00"
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="new-slot-plan"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  プラン
                </label>
                <input
                  type="text"
                  id="new-slot-plan"
                  placeholder="例: 2時間スタンダードプラン"
                  value={newSlotPlan}
                  onChange={(e) => setNewSlotPlan(e.target.value)}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="new-slot-max-capacity"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  最大収容人数
                </label>
                <input
                  type="number"
                  id="new-slot-max-capacity"
                  placeholder="例: 10"
                  value={newSlotMaxCapacity}
                  onChange={(e) => setNewSlotMaxCapacity(e.target.value)}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="new-slot-current-bookings"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  現在の予約数
                </label>
                <input
                  type="number"
                  id="new-slot-current-bookings"
                  placeholder="例: 3"
                  value={newSlotCurrentBookings}
                  onChange={(e) => setNewSlotCurrentBookings(e.target.value)}
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddSlot}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full shadow-md transition-transform duration-200 hover:scale-105"
            >
              予約枠を追加
            </button>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            CSVで一括登録
          </h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
            <label
              htmlFor="csv-upload"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              CSVファイルを選択
            </label>
            <input
              type="file"
              id="csv-upload"
              accept=".csv"
              onChange={handleCsvUpload}
              className="block w-full text-sm text-gray-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-orange-100 file:text-orange-700
                hover:file:bg-orange-200"
            />
            <p className="text-xs text-gray-500 mt-2">
              ※CSVは「日付,時間帯,プラン名,最大収容人数,現在の予約数」の形式で入力してください。
              <br />
              例: 2025-07-20,10:00 - 12:00,2時間スタンダードプラン,10,2
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            登録済み予約枠
          </h3>
          {registeredSlots.length > 0 ? (
            <div className="space-y-3">
              {registeredSlots.map((slot, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {slot.date} {slot.time}
                    </p>
                    <p className="text-gray-700 text-sm">{slot.plan}</p>
                    <p className="text-gray-700 text-sm">
                      予約数: {slot.currentBookings} / {slot.maxCapacity}
                    </p>
                    <p
                      className={`text-sm ${getCongestionStyle(
                        calculateCongestion(
                          slot.maxCapacity,
                          slot.currentBookings
                        )
                      )}`}
                    >
                      混雑具合:{" "}
                      {calculateCongestion(
                        slot.maxCapacity,
                        slot.currentBookings
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteSlot(index)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-lg shadow-sm"
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              登録されている予約枠はありません。
            </p>
          )}

          <div className="flex justify-center mt-10">
            <button
              type="button" // submitではなくbuttonに変更
              onClick={() => alert("予約枠情報を保存しました！")} // 仮の保存メッセージ
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full w-full max-w-xs shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              予約枠情報を保存する
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 6. 施設担当者向け 営業時間管理画面 (新設)
  const ManagerBusinessHoursManagePage = () => {
    // 各曜日の営業時間を管理するステート
    const [dailyHours, setDailyHours] = useState({
      月: "10:00 - 23:00",
      火: "10:00 - 23:00",
      水: "10:00 - 23:00",
      木: "10:00 - 23:00",
      金: "10:00 - 23:00",
      土: "09:00 - 24:00",
      日: "09:00 - 24:00",
      祝日: "09:00 - 24:00", // 祝日を追加
    });

    // 各曜日の入力変更ハンドラ
    const handleHourChange = (day, value) => {
      setDailyHours((prevHours) => ({
        ...prevHours,
        [day]: value,
      }));
    };

    const handleSaveBusinessHours = () => {
      alert("営業時間を保存しました！");
      console.log("営業時間:", dailyHours); // 保存するデータ
    };

    const daysOfWeekOrder = ["月", "火", "水", "木", "金", "土", "日", "祝日"]; // 祝日を順序に追加

    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          営業時間管理
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            営業時間設定
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {daysOfWeekOrder.map((day) => (
              <div key={day}>
                <label
                  htmlFor={`hours-${day}`}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  {day}曜日
                </label>
                <input
                  type="text"
                  id={`hours-${day}`}
                  value={dailyHours[day]}
                  onChange={(e) => handleHourChange(day, e.target.value)}
                  placeholder="例: 10:00 - 23:00"
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSaveBusinessHours}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full w-full max-w-xs shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              営業時間を保存する
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 7. 施設担当者向け スタッフ管理画面（※拡張）
  const ManagerStaffManagePage = () => (
    <div className="min-h-screen bg-gray-50 font-inter">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        スタッフ管理 (拡張機能)
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
        <p className="text-gray-700 text-lg mb-6">
          この画面は、将来的にスタッフアカウントの追加、権限管理、シフト管理などの機能が追加されることを想定しています。
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg opacity-75 cursor-not-allowed">
          スタッフを追加 (開発中)
        </button>
      </div>
    </div>
  );

  // --- システム管理者向け画面 ---

  // 1. システム管理者向け ログイン画面
  const AdminLoginPage = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-inter">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          システム管理者ログイン
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigateTo("adminCompanyList", "admin");
          }}
        >
          {" "}
          {/* ログイン成功で企業・施設一覧管理画面へ遷移 */}
          <div className="mb-6">
            <label
              htmlFor="admin-email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="admin-email"
              placeholder="メールアドレスを入力"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="admin-password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              パスワード
            </label>
            <input
              type="password"
              id="admin-password"
              placeholder="パスワードを入力"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full w-full shadow-lg transform transition-transform duration-200 hover:scale-105"
          >
            ログイン
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          <button
            onClick={() => navigateTo("userTop")}
            className="text-orange-500 hover:underline"
          >
            トップページに戻る
          </button>
        </p>
      </div>
    </div>
  );

  // 2. システム管理者向け 企業・施設一覧管理画面
  const AdminCompanyListPage = () => (
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

        {/* 施設一覧テーブル */}
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
  const AdminAccountManagePage = () => (
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

        {/* 担当者アカウント一覧テーブル */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="py-3 px-4 border-b text-left">アカウントID</th>
                <th className="py-3 px-4 border-b text-left">氏名</th>
                <th className="py-3 px-4 border-b text-left">メールアドレス</th>
                <th class="py-3 px-4 border-b text-left">担当施設</th>
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

  // 現在のページに応じてレンダリング
  const renderPage = () => {
    switch (currentPage) {
      case "userTop":
        return <UserTopPage />;
      case "userFacilityList":
        return <UserFacilityListPage />;
      case "userFacilityDetail":
        return <UserFacilityDetailPage />;
      case "userMyPage":
        return <UserMyPage />;
      case "managerLogin":
        return <ManagerLoginPage />;
      case "managerDashboard":
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerDashboardPage navigateTo={navigateTo} />
          </ManagerLayout>
        );
      case "managerBookingList":
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerBookingListPage navigateTo={navigateTo} />
          </ManagerLayout>
        );
      case "managerBookingSlotManage": // 新しい予約枠管理ページ
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerBookingSlotManagePage />
          </ManagerLayout>
        );
      case "managerBusinessHoursManage": // 新しい営業時間管理ページ
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerBusinessHoursManagePage />
          </ManagerLayout>
        );
      case "managerFacilityEdit":
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerFacilityEditPage />
          </ManagerLayout>
        );
      case "managerStaffManage":
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerStaffManagePage />
          </ManagerLayout>
        );
      case "adminLogin":
        return <AdminLoginPage />;
      case "adminCompanyList":
        return (
          <AdminLayout navigateTo={navigateTo} currentPage={currentPage}>
            <AdminCompanyListPage />
          </AdminLayout>
        );
      case "adminAccountManage":
        return (
          <AdminLayout navigateTo={navigateTo} currentPage={currentPage}>
            <AdminAccountManagePage />
          </AdminLayout>
        );
      default:
        return <UserTopPage />; // デフォルトページ
    }
  };

  return <>{renderPage()}</>;
};

export default App;
