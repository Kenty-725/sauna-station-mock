import React, { useState } from "react";
import AuthApp from "../auth/AuthApp";

// 1. 施設担当者向け ログイン画面
export const ManagerLoginPage = ({ navigateTo }) => (
  <AuthApp
    onAuthSuccess={(userData) => {
      console.log("Manager login success:", userData);
      navigateTo("managerDashboard");
    }}
    userType="manager"
  />
);

// 2. 施設担当者向け ダッシュボード
export const ManagerDashboardPage = ({ navigateTo }) => (
  <div className="min-h-screen bg-gray-50 font-inter">
    <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
      ダッシュボード
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
            onClick={() => navigateTo("managerBookingList")}
            className="text-orange-600 hover:underline font-semibold mt-4"
          >
            すべての予約を見る
          </button>
        </div>
      </div>

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

    <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">施設情報管理</h3>
      <p className="text-gray-700 mb-6">
        施設の詳細情報や予約可能な時間枠などを編集できます。
      </p>
      <button
        onClick={() => navigateTo("managerFacilityEdit")}
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
      >
        施設情報を編集する
      </button>
    </div>
  </div>
);

// 3. 施設担当者向け 予約一覧・管理画面
export const ManagerBookingListPage = ({ navigateTo }) => (
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

      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-6">
        {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
          <div key={day} className="font-bold text-gray-700 p-2">
            {day}
          </div>
        ))}
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
export const ManagerFacilityEditPage = ({ navigateTo }) => {
  const [facilityName, setFacilityName] = useState("極上サウナ&スパ 天空の湯");
  const [facilityAddress, setFacilityAddress] =
    useState("東京都渋谷区〇〇1-2-3");
  const [facilityDescription, setFacilityDescription] = useState(
    '都会の喧騒を忘れさせる、天空に浮かぶ隠れ家サウナ。フィンランド式サウナ、ロウリュサービス、そして地下水を使用したこだわりの水風呂が自慢です。広々とした外気浴スペースで、心ゆくまで"ととのう"体験をお楽しみください。男女別で、アメニティも充実しています。'
  );

  const handleFacilityUpdate = (event) => {
    event.preventDefault();
    alert("施設情報を更新しました！");
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

// 5. 施設担当者向け 予約枠管理画面
export const ManagerBookingSlotManagePage = ({ navigateTo }) => {
  const [newSlotDate, setNewSlotDate] = useState("");
  const [newSlotTime, setNewSlotTime] = useState("");
  const [newSlotPlan, setNewSlotPlan] = useState("");
  const [newSlotMaxCapacity, setNewSlotMaxCapacity] = useState("");
  const [newSlotCurrentBookings, setNewSlotCurrentBookings] = useState("");

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
      setNewSlotDate("");
      setNewSlotTime("");
      setNewSlotPlan("");
      setNewSlotMaxCapacity("");
      setNewSlotCurrentBookings("");
    } else {
      alert("予約枠の情報をすべて入力してください。");
    }
  };

  const handleDeleteSlot = (index) => {
    const updatedSlots = registeredSlots.filter((_, i) => i !== index);
    setRegisteredSlots(updatedSlots);
  };

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

  const parseCsv = (csvText) => {
    const lines = csvText.trim().split("\n");
    return lines.map((line) => {
      const [date, time, plan, maxCapacity, currentBookings] = line.split(",");
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

        <h3 className="text-2xl font-bold text-gray-800 mb-6">CSVで一括登録</h3>
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
            type="button"
            onClick={() => alert("予約枠情報を保存しました！")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full w-full max-w-xs shadow-lg transform transition-transform duration-200 hover:scale-105"
          >
            予約枠情報を保存する
          </button>
        </div>
      </div>
    </div>
  );
};

// 6. 施設担当者向け 営業時間管理画面
export const ManagerBusinessHoursManagePage = ({ navigateTo }) => {
  const [dailyHours, setDailyHours] = useState({
    月: "10:00 - 23:00",
    火: "10:00 - 23:00",
    水: "10:00 - 23:00",
    木: "10:00 - 23:00",
    金: "10:00 - 23:00",
    土: "09:00 - 24:00",
    日: "09:00 - 24:00",
    祝日: "09:00 - 24:00",
  });

  const handleHourChange = (day, value) => {
    setDailyHours((prevHours) => ({
      ...prevHours,
      [day]: value,
    }));
  };

  const handleSaveBusinessHours = () => {
    alert("営業時間を保存しました！");
    console.log("営業時間:", dailyHours);
  };

  const daysOfWeekOrder = ["月", "火", "水", "木", "金", "土", "日", "祝日"];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        営業時間管理
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">営業時間設定</h3>
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

// 7. 施設担当者向け スタッフ管理画面
export const ManagerStaffManagePage = ({ navigateTo }) => (
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
