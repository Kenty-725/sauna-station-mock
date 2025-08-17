import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

export default function AuthApp({ onAuthSuccess, userType = "general" }) {
  const [isLogin, setIsLogin] = useState(false);

  // ユーザー登録フォームコンポーネント
  const UserRegistrationForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        setMessage("パスワードが一致しません。");
        return;
      }
      console.log("ユーザー登録データ:", formData);
      setMessage("ユーザー登録が完了しました！");
      // 登録成功後にログイン状態に切り替え
      setTimeout(() => {
        setIsLogin(true);
        setMessage("");
      }, 2000);
    };

    return (
      <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-gray-800">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-orange-300">
          アカウント作成
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {message && (
            <div className="bg-green-700 text-green-100 px-4 py-3 rounded-xl relative text-sm sm:text-base text-center">
              {message}
            </div>
          )}
          <div>
            <label className="block text-gray-300 font-bold mb-2 text-lg">
              名前
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-2 text-lg">
              メールアドレス
            </label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-2 text-lg">
              パスワード
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-2 text-lg">
              パスワード（確認用）
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-orange-700 transition-colors duration-200 shadow-lg transform hover:scale-105"
          >
            登録
          </button>
        </form>
        <div className="mt-8 text-center text-gray-400">
          すでにアカウントをお持ちですか？{" "}
          <button
            onClick={() => setIsLogin(true)}
            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors bg-transparent border-none cursor-pointer"
          >
            ログインはこちら
          </button>
        </div>
      </div>
    );
  };

  // ログインフォームコンポーネント
  const LoginForm = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("ログインデータ:", formData);
      setMessage("ログインに成功しました！");

      // ログイン成功後の処理
      setTimeout(() => {
        if (onAuthSuccess) {
          onAuthSuccess({ ...formData, userType });
        }
      }, 1500);
    };

    return (
      <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-gray-800">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-orange-300">
          ログイン
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {message && (
            <div className="bg-green-700 text-green-100 px-4 py-3 rounded-xl relative text-sm sm:text-base text-center">
              {message}
            </div>
          )}
          <div>
            <label className="block text-gray-300 font-bold mb-2 text-lg">
              メールアドレス
            </label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-2 text-lg">
              パスワード
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-orange-700 transition-colors duration-200 shadow-lg transform hover:scale-105"
          >
            ログイン
          </button>
        </form>
        <div className="mt-8 text-center text-gray-400">
          アカウントをお持ちでないですか？{" "}
          <button
            onClick={() => setIsLogin(false)}
            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors bg-transparent border-none cursor-pointer"
          >
            登録はこちら
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center font-[Inter]">
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-gray-700 rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side: Image Container */}
        <div className="hidden md:flex md:w-1/2 p-8 items-center justify-center bg-orange-900 bg-opacity-30">
          <img
            src="https://placehold.co/600x800/FDBA74/FFFFFF?text=Sauna+Station"
            alt="Sauna Station"
            className="rounded-2xl shadow-xl w-full h-auto object-cover"
          />
        </div>

        {isLogin ? <LoginForm /> : <UserRegistrationForm />}
      </div>
    </div>
  );
}
