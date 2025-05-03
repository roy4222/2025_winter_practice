"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!isLogin && password !== confirmPassword) {
        throw new Error("密碼不匹配");
      }

      // 這裡可以加入實際的 Firebase 身份驗證邏輯
      console.log(isLogin ? "登入" : "註冊", email, password);
      
      // 模擬 API 呼叫延遲
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模擬成功
      alert(isLogin ? "登入成功！" : "註冊成功！");
    } catch (err) {
      setError(err instanceof Error ? err.message : "發生錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={30}
            priority
          />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "登入帳戶" : "註冊新帳戶"}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                電子郵件
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                密碼
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium">
                  確認密碼
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "處理中..." : isLogin ? "登入" : "註冊"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline text-sm"
            >
              {isLogin ? "還沒有帳戶？註冊" : "已有帳戶？登入"}
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>此頁面僅作展示用途</p>
          <p className="mt-1">需要實際功能請整合 Firebase Authentication</p>
        </div>
      </div>
    </div>
  );
}
