import React, { useState } from "react";
import {
  UserIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

const STEPS = [
  "アカウント作成",
  "施設基本情報",
  "所在地・営業情報",
  "予約ポリシー",
  "確認 & 公開",
];

export default function OnboardingPage({ navigateTo }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const nextStep = () => {
    setMessage("");
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setMessage("");
    setStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = () => {
    // 公開に必要な最小限のフィールド
    const requiredFields = ["email", "facilityName", "address", "openingHours"];
    const isReady = requiredFields.every((field) => formData[field]);

    if (isReady) {
      setMessage("施設は正常に公開されました！");
      // 公開成功後、施設担当者ダッシュボードに遷移
      setTimeout(() => {
        navigateTo("managerDashboard");
      }, 2000);
    } else {
      setMessage(
        "公開に必要な情報が不足しています。必須項目を確認してください。"
      );
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: // アカウント作成
        return (
          <>
            <h2 className="text-3xl font-extrabold text-orange-300 text-center mb-8">
              アカウント作成
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 font-bold mb-2">
                  担当者名
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="managerName"
                    value={formData.managerName || ""}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-2">
                  メールアドレス
                </label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-2">
                  パスワード
                </label>
                <div className="relative">
                  <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={nextStep}
                className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-orange-700 transition-colors duration-200 shadow-lg"
              >
                次へ
              </button>
            </div>
          </>
        );
      case 1: // 施設基本情報
        return (
          <>
            <h2 className="text-3xl font-extrabold text-orange-300 text-center mb-8">
              施設基本情報
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 font-bold mb-2">
                  施設名
                </label>
                <div className="relative">
                  <BuildingOffice2Icon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="facilityName"
                    value={formData.facilityName || ""}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-2">
                  ロゴ/写真
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="flex items-center bg-gray-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                戻る
              </button>
              <button
                onClick={nextStep}
                className="bg-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-orange-700 transition-colors duration-200"
              >
                次へ
              </button>
            </div>
          </>
        );
      case 2: // 所在地・営業情報
        return (
          <>
            <h2 className="text-3xl font-extrabold text-orange-300 text-center mb-8">
              所在地・営業情報
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 font-bold mb-2">
                  住所
                </label>
                <div className="relative">
                  <MapPinIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-2">
                  営業時間
                </label>
                <div className="flex space-x-2">
                  <input
                    type="time"
                    name="openingHours"
                    value={formData.openingHours || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="self-center">-</span>
                  <input
                    type="time"
                    name="closingHours"
                    value={formData.closingHours || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-2">
                  定休日
                </label>
                <input
                  type="text"
                  placeholder="例: 土, 日, 祝日"
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="flex items-center bg-gray-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                戻る
              </button>
              <button
                onClick={nextStep}
                className="bg-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-orange-700 transition-colors duration-200"
              >
                次へ
              </button>
            </div>
          </>
        );
      case 3: // 予約ポリシー
        return (
          <>
            <h2 className="text-3xl font-extrabold text-orange-300 text-center mb-8">
              予約ポリシー
            </h2>
            <div className="space-y-6 text-center text-lg">
              <div className="p-4 bg-gray-800 rounded-xl">
                <p className="text-gray-400">
                  キャンセル期限:{" "}
                  <span className="text-white font-bold">開始 24時間前</span>{" "}
                  まで
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded-xl">
                <p className="text-gray-400">
                  予約締切:{" "}
                  <span className="text-white font-bold">開始 24時間前</span>{" "}
                  まで
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded-xl">
                <p className="text-gray-400">
                  承認方式:{" "}
                  <span className="text-white font-bold">手動承認</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="flex items-center bg-gray-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                戻る
              </button>
              <button
                onClick={nextStep}
                className="bg-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-orange-700 transition-colors duration-200"
              >
                次へ
              </button>
            </div>
          </>
        );
      case 4: // 確認 & 公開
        return (
          <>
            <h2 className="text-3xl font-extrabold text-orange-300 text-center mb-8">
              確認 & 公開
            </h2>
            {message && (
              <div
                className={`text-sm sm:text-base text-center px-4 py-3 rounded-xl relative mb-6 ${
                  message.includes("成功")
                    ? "bg-green-700 text-green-100"
                    : "bg-red-700 text-red-100"
                }`}
              >
                {message}
              </div>
            )}
            <div className="space-y-4 text-center">
              <p className="text-lg font-bold">施設情報</p>
              <ul className="text-left bg-gray-800 p-6 rounded-xl space-y-2">
                <li>
                  <span className="font-bold">施設名:</span>{" "}
                  {formData.facilityName || "未入力"}
                </li>
                <li>
                  <span className="font-bold">住所:</span>{" "}
                  {formData.address || "未入力"}
                </li>
                <li>
                  <span className="font-bold">営業時間:</span>{" "}
                  {formData.openingHours || "未入力"}
                </li>
              </ul>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="flex items-center bg-gray-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors duration-200"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                戻る
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center bg-green-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 transition-colors duration-200"
              >
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                公開する
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center font-[Inter]">
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-gray-700 rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side: Step Indicator */}
        <div className="md:w-1/3 p-8 bg-gray-800 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-300 mb-4">
              進行状況
            </h3>
            {STEPS.map((stepName, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  step >= index ? "text-orange-400" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    step >= index ? "bg-orange-600" : "bg-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span>{stepName}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button
              onClick={() => navigateTo("userTop")}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            >
              トップページに戻る
            </button>
          </div>
        </div>

        {/* Right Side: Step Content */}
        <div className="w-full md:w-2/3 p-8 sm:p-12 flex flex-col justify-center">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
