import React from "react";

const BookingModal = ({ date, timeSlot, onClose, onConfirm }) => {
  if (!timeSlot) return null;

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
        return "text-gray-500 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-95 animate-scaleIn">
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

export default BookingModal;
