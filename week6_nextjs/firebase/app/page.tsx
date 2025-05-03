"use client";

import { useState } from "react";
import Image from "next/image";
import { auth } from "../service/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * 處理表單提交的函數
   * 根據當前模式（登入/註冊）執行相應的 Firebase 身份驗證操作
   * @param e - 表單提交事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表單的默認提交行為
    setError(""); // 清空之前的錯誤訊息
    setLoading(true); // 設置載入狀態為 true，顯示載入中

    try {
      // 如果是註冊模式且密碼與確認密碼不匹配，拋出錯誤
      if (!isLogin && password !== confirmPassword) {
        throw new Error("密碼不匹配");
      }

      if (isLogin) {
        // 登入模式：使用 Firebase 的登入功能
        await signInWithEmailAndPassword(auth, email, password);
        alert("登入成功！");
      } else {
        // 註冊模式：使用 Firebase 的創建用戶功能
        await createUserWithEmailAndPassword(auth, email, password);
        alert("註冊成功！");
      }
    } catch (err) {
      // 錯誤處理
      let errorMessage = "發生錯誤"; // 預設錯誤訊息
      if (err instanceof Error) {
        // 根據 Firebase 返回的錯誤代碼提供更具體的錯誤訊息
        if (err.message.includes("auth/email-already-in-use")) {
          errorMessage = "此電子郵件已被使用";
        } else if (err.message.includes("auth/weak-password")) {
          errorMessage = "密碼強度不足";
        } else if (err.message.includes("auth/invalid-email")) {
          errorMessage = "無效的電子郵件地址";
        } else if (err.message.includes("auth/user-not-found") || 
                  err.message.includes("auth/wrong-password")) {
          errorMessage = "電子郵件或密碼錯誤";
        } else {
          // 如果是其他錯誤，直接使用錯誤訊息
          errorMessage = err.message;
        }
      }
      setError(errorMessage); // 設置錯誤訊息以顯示給用戶
    } finally {
      setLoading(false); // 無論成功或失敗，都將載入狀態設為 false
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      {/* 主容器，設置最小高度為螢幕高度，使用 flex 布局居中內容，並添加背景色 */}
      <div className="w-full max-w-md">
        {/* 限制內容寬度，確保在大螢幕上不會過寬 */}
        <div className="mb-10 flex justify-center">
          {/* Logo 容器，底部外邊距為 10，水平居中 */}
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={30}
            priority
          />
          {/* Next.js logo 圖片，在暗模式下反轉顏色，設置優先加載 */}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* 主要表單卡片，白色背景（暗模式為深灰色），圓角和陰影效果 */}
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "登入帳戶" : "註冊新帳戶"}
          </h2>
          {/* 標題，根據當前模式（登入/註冊）顯示不同文字 */}
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {/* 錯誤訊息顯示區域，僅在有錯誤時顯示，使用紅色背景和邊框突出顯示 */}
          
          <form onSubmit={handleSubmit}>
            {/* 表單元素，提交時觸發 handleSubmit 函數 */}
            <div className="mb-4">
              {/* 電子郵件輸入區塊 */}
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
              {/* 電子郵件輸入框，綁定到 email 狀態，並在變更時更新狀態 */}
            </div>
            
            <div className="mb-4">
              {/* 密碼輸入區塊 */}
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
              {/* 密碼輸入框，綁定到 password 狀態，並在變更時更新狀態 */}
            </div>
            
            {!isLogin && (
              <div className="mb-4">
                {/* 確認密碼區塊，僅在註冊模式下顯示 */}
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
                {/* 確認密碼輸入框，綁定到 confirmPassword 狀態 */}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "處理中..." : isLogin ? "登入" : "註冊"}
            </button>
            {/* 提交按鈕，在載入中時禁用，並根據當前模式和載入狀態顯示不同文字 */}
          </form>
          
          <div className="mt-6 text-center">
            {/* 切換登入/註冊模式的按鈕容器 */}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline text-sm"
            >
              {isLogin ? "還沒有帳戶？註冊" : "已有帳戶？登入"}
            </button>
            {/* 切換按鈕，點擊時反轉 isLogin 狀態，並根據當前模式顯示相應文字 */}
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          {/* 頁面底部的說明文字 */}
          <p>此頁面僅作展示用途</p>
          <p className="mt-1">需要實際功能請整合 Firebase Authentication</p>
        </div>
      </div>
    </div>
  );
}
