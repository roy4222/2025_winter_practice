"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

/**
 * 身份驗證表單組件的屬性接口
 * @interface AuthFormProps
 * @property {boolean} isLogin - 指示當前是登入模式(true)還是註冊模式(false)
 */
interface AuthFormProps {
  isLogin: boolean;
}

/**
 * 重構後的身份驗證表單組件
 * 使用集中式的認證上下文來處理用戶登入和註冊功能
 * 
 * @param {AuthFormProps} props - 組件屬性
 * @returns {JSX.Element} 渲染的身份驗證表單
 */
export default function AuthFormRefactored({ isLogin }: AuthFormProps) {
  // 使用認證上下文
  const { loading, error, signIn, signUp, socialSignIn, clearError } = useAuth();
  
  // 表單輸入狀態
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * 處理表單提交的函數
   * 根據當前模式（登入/註冊）執行相應的認證操作
   * @param {React.FormEvent} e - 表單提交事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    // 如果是註冊模式且密碼與確認密碼不匹配，不進行後續操作
    if (!isLogin && password !== confirmPassword) {
      alert("密碼不匹配");
      return;
    }

    if (isLogin) {
      // 登入模式
      await signIn(email, password);
    } else {
      // 註冊模式
      await signUp(email, password);
    }
  };

  return (
    <div className="w-full">
      {/* 頁面頂部的Logo */}
      <div className="mb-10 flex justify-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={30}
          style={{ height: 'auto' }}
          priority
        />
      </div>
      
      {/* 主要表單容器 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* 表單標題 */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "登入帳戶" : "註冊新帳戶"}
        </h2>
        
        {/* 錯誤訊息顯示區域 */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {/* 身份驗證表單 */}
        <form onSubmit={handleSubmit}>
          {/* 電子郵件輸入欄位 */}
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
          
          {/* 密碼輸入欄位 */}
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
          
          {/* 確認密碼欄位，僅在註冊模式顯示 */}
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
          
          {/* 提交按鈕 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "處理中..." : isLogin ? "登入" : "註冊"}
          </button>
        </form>
        
        {/* 第三方登入區域 */}
        <div className="mt-6">
          {/* 分隔線和文字 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                或使用第三方帳號
              </span>
            </div>
          </div>
          
          {/* 第三方登入按鈕 */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {/* Google登入按鈕 */}
            <button
              type="button"
              onClick={() => socialSignIn("google")}
              disabled={loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {/* Google圖標 */}
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.752,2.605-3.157,4.513-6.005,4.513 c-3.448,0-6.242-2.795-6.242-6.242s2.794-6.242,6.242-6.242c1.599,0,3.054,0.604,4.15,1.598l2.624-2.624 C16.542,3.006,14.356,2.005,12,2.005c-5.514,0-9.985,4.471-9.985,9.985S6.486,21.975,12,21.975 c5.514,0,9.985-4.471,9.985-9.985c0-0.656-0.064-1.297-0.185-1.918h-9.255V12.151z" />
              </svg>
              Google
            </button>
            
            {/* GitHub登入按鈕 */}
            <button
              type="button"
              onClick={() => socialSignIn("github")}
              disabled={loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {/* GitHub圖標 */}
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>
        </div>
        
        {/* 切換登入/註冊模式的連結 */}
        <div className="mt-6 text-center">
          {isLogin ? (
            <Link href="/signup" className="text-blue-600 hover:underline text-sm">
              還沒有帳戶？註冊
            </Link>
          ) : (
            <Link href="/signin" className="text-blue-600 hover:underline text-sm">
              已有帳戶？登入
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 