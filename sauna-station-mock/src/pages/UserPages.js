import React, { useState } from "react";
import Header from "../components/Header";
import BookingModal from "../components/BookingModal";

// 1. 一般ユーザー向け トップページ
export const UserTopPage = ({
  navigateTo,
  isAuthenticated,
  userData,
  onLogout,
}) => (
  <div className="min-h-screen bg-gray-50 font-inter">
    <Header
      userType="general"
      navigateTo={navigateTo}
      isAuthenticated={isAuthenticated}
      userData={userData}
      onLogout={onLogout}
    />
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
          </h2>
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
              onClick={() => navigateTo("userFacilityList")}
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
                    onClick={() => navigateTo("userFacilityDetail")}
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
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          予約から施設管理まで、サウナ運営に必要なすべてがここに。
        </p>
        <button
          onClick={() => navigateTo("managerLogin")}
          className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          施設運営者の方はこちら
        </button>
      </section>
    </main>
  </div>
);

// 2. 一般ユーザー向け 施設一覧検索ページ
export const UserFacilityListPage = ({
  navigateTo,
  isAuthenticated,
  userData,
  onLogout,
}) => (
  <div className="min-h-screen bg-gray-50 font-inter">
    <Header
      userType="general"
      navigateTo={navigateTo}
      isAuthenticated={isAuthenticated}
      userData={userData}
      onLogout={onLogout}
    />
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
                  <span className="text-blue-500 mr-1">💧</span>水風呂: {15 + i}
                  ℃
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
                  onClick={() => navigateTo("userFacilityDetail")}
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
export const UserFacilityDetailPage = ({
  navigateTo,
  isAuthenticated,
  userData,
  onLogout,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 予約プランと時間枠のダミーデータ
  const weeklyAvailableSlots = {
    "2025年7月20日": [
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
      {
        time: "09:00 - 12:00",
        plan: "貸切VIPプラン",
        price: 15000,
        maxCapacity: 1,
        currentBookings: 0,
      },
    ],
    "2025年7月23日": [],
    "2025年7月24日": [
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
      {
        time: "10:00 - 12:00",
        plan: "2時間スタンダードプラン",
        price: 3000,
        maxCapacity: 10,
        currentBookings: 1,
      },
    ],
  };

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

  const weekStartDate = new Date("2025-07-20T00:00:00");
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const currentWeekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStartDate);
    date.setDate(weekStartDate.getDate() + i);
    const dayString = `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日`;

    const slotsWithCongestion = (weeklyAvailableSlots[dayString] || []).map(
      (slot) => ({
        ...slot,
        congestion: calculateCongestion(slot.maxCapacity, slot.currentBookings),
      })
    );

    currentWeekDays.push({
      date: date,
      dateString: dayString,
      dayOfWeek: daysOfWeek[date.getDay()],
      slots: slotsWithCongestion,
    });
  }

  const handleTimeSlotClick = (dayData, slot) => {
    if (slot.congestion === "満員") {
      alert("この時間枠は満員のため予約できません。");
      return;
    }
    setSelectedDate(dayData.dateString);
    setSelectedTimeSlot(slot);
    setIsModalOpen(true);
  };

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
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header
        userType="general"
        navigateTo={navigateTo}
        isAuthenticated={isAuthenticated}
        userData={userData}
        onLogout={onLogout}
      />
      <main className="container mx-auto p-6">
        <button
          onClick={() => navigateTo("userFacilityList")}
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

            <div className="bg-orange-50 p-6 rounded-xl shadow-inner border border-orange-100 col-span-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                ご予約
              </h3>
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
                    </span>
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
export const UserMyPage = ({
  navigateTo,
  isAuthenticated,
  userData,
  onLogout,
}) => (
  <div className="min-h-screen bg-gray-50 font-inter">
    <Header
      userType="general"
      navigateTo={navigateTo}
      isAuthenticated={isAuthenticated}
      userData={userData}
      onLogout={onLogout}
    />
    <main className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        マイページ
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">予約履歴</h3>
          <div className="space-y-6">
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
