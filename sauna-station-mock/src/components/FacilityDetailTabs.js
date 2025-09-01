import React, { useState } from "react";
import {
  FireIcon,
  UserGroupIcon,
  HomeIcon,
  BoltIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

// サウナ・水風呂データ
const saunaData = {
  male: {
    title: "男湯 (入れ替え)",
    sauna: {
      type: "ドライサウナ",
      capacity: 12,
      temperature: 101,
      features: ["対流式 (ストーン)", "電気", "TV", "無音"],
      description:
        "水曜日は女性が男湯側のロになります。15分に1回ミスト式オートロウリュあり サウナ奥の外気浴スペースに給水機あり サウナハットかけるフックサ室前にあり 番台でお水、麦茶、ポカリ販売しています 黄金湯クラフトビールはサ上がりにおすすめ",
    },
    waterBaths: [
      {
        id: 1,
        title: "水風呂 1",
        capacity: 8,
        temperature: 13,
        source: "地下水",
        depth: "80-110cm",
        description:
          "外のサウナコーナーにあり。地下水掛け流し、水中ライトアップ有り",
      },
      {
        id: 2,
        title: "水風呂 2",
        capacity: 2,
        temperature: 22,
        source: "地下水",
        depth: "40-60cm",
        description: "内湯にある水風呂。",
      },
    ],
  },
  female: {
    title: "女湯 (入れ替え)",
    sauna: {
      type: "ドライサウナ",
      capacity: 10,
      temperature: 95,
      features: ["対流式 (ストーン)", "電気", "TV", "無音"],
      description: "女性サウナ室の説明文が入ります。",
    },
    waterBaths: [
      {
        id: 1,
        title: "水風呂 1",
        capacity: 5,
        temperature: 15,
        source: "地下水",
        depth: "80-110cm",
        description:
          "外のサウナコーナーにあり。地下水掛け流し、水中ライトアップ有り",
      },
    ],
  },
};

// 詳細設備データ
const detailedFacilities = [
  {
    name: "ロウリュ (アウフグース)",
    exists: false,
    description: "",
    icon: <FireIcon className="w-6 h-6" />,
  },
  {
    name: "オートロウリュ",
    exists: true,
    description: "常時滴下。15分に1回、ミストオートロウリュ。",
    icon: <FireIcon className="w-6 h-6" />,
  },
  {
    name: "セルフロウリュ",
    exists: false,
    description: "禁止の注意書きあり",
    icon: <FireIcon className="w-6 h-6" />,
  },
  {
    name: "外気浴",
    exists: true,
    description: "",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    name: "休憩スペース (ととのいスポット)",
    exists: true,
    description: "●内風呂 イス: 1脚\n●外気浴 イス: 7脚 ベンチ: 1脚",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    name: "ウィスキング",
    exists: false,
    description: "",
    icon: <HeartIcon className="w-6 h-6" />,
  },
  {
    name: "イオンウォーター",
    exists: true,
    description: "500ml有り\n900ml有り",
    icon: <BoltIcon className="w-6 h-6" />,
  },
];

// 設備・ルールデータ
const facilitiesList = [
  { name: "24時間営業", exists: true },
  { name: "Wi-Fi", exists: true },
  { name: "駐車場", exists: true },
  { name: "館内休憩スペース", exists: true },
  { name: "電源", exists: true },
  { name: "ウォシュレット", exists: true },
  { name: "食事処", exists: false },
  { name: "作業スペース", exists: false },
  { name: "岩盤浴", exists: false },
  { name: "漫画", exists: true },
  { name: "給水器", exists: true },
  { name: "タトゥー", exists: true },
];

// 支払い方法データ
const paymentMethods = [
  { name: "現金", exists: true },
  { name: "クレジットカード", exists: false },
  { name: "電子マネー", exists: false },
];

const FacilityDetailTabs = () => {
  const [currentTab, setCurrentTab] = useState("male");
  const bathData = saunaData[currentTab];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Tab Navigation */}
      <div className="flex text-center text-sm font-bold text-gray-800">
        <button
          className={`flex-1 py-3 px-4 transition-colors duration-200 ${
            currentTab === "male"
              ? "bg-orange-600 text-white border-b-4 border-orange-700"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setCurrentTab("male")}
        >
          {saunaData.male.title}
        </button>
        <button
          className={`flex-1 py-3 px-4 transition-colors duration-200 ${
            currentTab === "female"
              ? "bg-orange-600 text-white border-b-4 border-orange-700"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setCurrentTab("female")}
        >
          {saunaData.female.title}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:space-x-6 mb-8">
          {/* Sauna Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm w-full lg:w-1/2 mb-6 lg:mb-0">
            <div className="flex flex-col items-center text-center">
              <FireIcon className="w-16 h-16 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">サウナ室</h3>
              <div className="text-4xl font-bold text-red-600 mb-2">
                {bathData.sauna.temperature}
                <span className="text-sm font-normal">度</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                収容人数: {bathData.sauna.capacity}人
              </p>
              <div className="flex flex-wrap justify-center mb-3">
                {bathData.sauna.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-800 rounded-full px-3 py-1 text-xs font-semibold m-1"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-xs text-left leading-relaxed">
                {bathData.sauna.description}
              </p>
            </div>
          </div>

          {/* Water Bath Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm w-full lg:w-1/2">
            {bathData.waterBaths.map((bath) => (
              <div key={bath.id} className="text-center mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 text-blue-600 mb-4 flex items-center justify-center">
                    <svg
                      className="w-16 h-16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2c-2.5 0-4.5 2-4.5 4.5 0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5C16.5 4 14.5 2 12 2z" />
                      <path d="M12 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                      <path d="M12 10c-2.2 0-4 1.8-4 4v2h8v-2c0-2.2-1.8-4-4-4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{bath.title}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {bath.temperature}
                    <span className="text-sm font-normal">度</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    収容人数: {bath.capacity}人
                  </p>
                  <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold mb-2">
                    {bath.source}
                  </span>
                  <p className="text-gray-600 text-xs">{bath.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Facility Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-600 mr-3"></div>
            詳細設備
          </h2>
          {detailedFacilities.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 py-3 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex-none w-12 h-12 flex items-center justify-center text-gray-600">
                {item.icon}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-gray-600 text-xs mt-1 whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="flex-none">
                {item.exists ? (
                  <span className="text-green-600 font-bold">〇</span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Facility Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-600 mr-3"></div>
            設備・ルール
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
            {facilitiesList.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span
                  className={`text-sm ${
                    item.exists ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {item.exists ? "●" : "—"}
                </span>
                <span className="text-gray-700 text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-600 mr-3"></div>
            支払い方法
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
            {paymentMethods.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span
                  className={`text-sm ${
                    item.exists ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {item.exists ? "●" : "—"}
                </span>
                <span className="text-gray-700 text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailTabs;
