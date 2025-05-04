"use client"; // 聲明這是客戶端組件，允許使用React hooks和瀏覽器API

import { useState } from "react"; // 導入React的useState hook用於管理組件狀態
import Image from "next/image"; // 導入Next.js的Image組件用於優化圖片加載
import { auth } from "../../service/firebase"; // 導入Firebase身份驗證服務
import { 
  createUserWithEmailAndPassword, // 用於創建新用戶的Firebase函數
  signInWithEmailAndPassword, // 用於現有用戶登入的Firebase函數
  GoogleAuthProvider, // Google第三方登入提供者
  GithubAuthProvider, // GitHub第三方登入提供者
  signInWithPopup // 用於彈出視窗方式的第三方登入
} from "firebase/auth";
import Link from "next/link"; // 導入Next.js的Link組件用於頁面導航

/**
 * 身份驗證表單組件的屬性接口
 * @interface AuthFormProps
 * @property {boolean} isLogin - 指示當前是登入模式(true)還是註冊模式(false)
 */
interface AuthFormProps {
  isLogin: boolean;
}

/**
 * 身份驗證表單組件
 * 處理用戶登入和註冊功能，包括電子郵件/密碼認證和第三方登入
 * 
 * @param {AuthFormProps} props - 組件屬性
 * @returns {JSX.Element} 渲染的身份驗證表單
 */
export default function AuthForm({ isLogin }: AuthFormProps) {
  // 狀態管理
  const [email, setEmail] = useState(""); // 管理電子郵件輸入
  const [password, setPassword] = useState(""); // 管理密碼輸入
  const [confirmPassword, setConfirmPassword] = useState(""); // 管理確認密碼輸入(僅註冊時使用)
  const [error, setError] = useState(""); // 管理錯誤訊息
  const [loading, setLoading] = useState(false); // 管理載入狀態，用於禁用按鈕和顯示載入指示器

  /**
   * 處理表單提交的函數
   * 根據當前模式（登入/註冊）執行相應的 Firebase 身份驗證操作
   * @param {React.FormEvent} e - 表單提交事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表單的默認提交行為，防止頁面刷新
    setError(""); // 清空之前的錯誤訊息
    setLoading(true); // 設置載入狀態為 true，顯示載入中並禁用按鈕

    try {
      // 如果是註冊模式且密碼與確認密碼不匹配，拋出錯誤
      if (!isLogin && password !== confirmPassword) {
        throw new Error("密碼不匹配");
      }

      if (isLogin) {
        // 登入模式：使用 Firebase 的登入功能
        await signInWithEmailAndPassword(auth, email, password);
        alert("登入成功！"); // 登入成功後顯示提示
      } else {
        // 註冊模式：使用 Firebase 的創建用戶功能
        await createUserWithEmailAndPassword(auth, email, password);
        alert("註冊成功！"); // 註冊成功後顯示提示
      }
    } catch (err) {
      // 錯誤處理
      let errorMessage = "發生錯誤"; // 預設錯誤訊息
      if (err instanceof Error) {
        // 根據 Firebase 返回的錯誤代碼提供更具體的錯誤訊息
        if (err.message.includes("auth/email-already-in-use")) {
          errorMessage = "此電子郵件已被使用"; // 電子郵件已存在錯誤
        } else if (err.message.includes("auth/weak-password")) {
          errorMessage = "密碼強度不足"; // 密碼強度不足錯誤
        } else if (err.message.includes("auth/invalid-email")) {
          errorMessage = "無效的電子郵件地址"; // 無效電子郵件錯誤
        } else if (err.message.includes("auth/user-not-found") || 
                  err.message.includes("auth/wrong-password")) {
          errorMessage = "電子郵件或密碼錯誤"; // 用戶不存在或密碼錯誤
        } else {
          // 如果是其他錯誤，直接使用錯誤訊息
          errorMessage = err.message;
        }
      }
      setError(errorMessage); // 設置錯誤訊息以顯示給用戶
    } finally {
      setLoading(false); // 無論成功或失敗，都將載入狀態設為 false，啟用按鈕
    }
  };

  /**
   * 處理第三方登入的函數
   * 使用彈出視窗方式進行Google或GitHub登入
   * 
   * @param {("google"|"github")} providerName - 第三方身份驗證提供者名稱
   */
  const handleSocialLogin = async (providerName: "google" | "github") => {
    setError(""); // 清空之前的錯誤訊息
    setLoading(true); // 設置載入狀態為true

    try {
      // 根據提供者名稱創建相應的身份驗證提供者實例
      const provider = providerName === "google" 
        ? new GoogleAuthProvider() // 創建Google提供者
        : new GithubAuthProvider(); // 創建GitHub提供者
      
      // 使用彈出視窗方式進行第三方登入
      const result = await signInWithPopup(auth, provider);
      // 可以在這裡處理成功的登入結果，例如獲取用戶資料
      alert(`使用${providerName === "google" ? "Google" : "GitHub"}登入成功！`);
    } catch (err) {
      // 處理第三方登入錯誤
      let errorMessage = "第三方登入失敗"; // 預設錯誤訊息
      if (err instanceof Error) {
        // 根據錯誤類型提供具體錯誤訊息
        if (err.message.includes("auth/account-exists-with-different-credential")) {
          errorMessage = "此電子郵件已經使用不同的登入方式註冊"; // 帳戶已存在但使用不同登入方式
        } else if (err.message.includes("auth/popup-closed-by-user")) {
          errorMessage = "登入視窗已被關閉"; // 用戶關閉登入視窗
        } else if (err.message.includes("auth/cancelled-popup-request")) {
          errorMessage = "登入請求已取消"; // 登入請求被取消
        } else if (err.message.includes("auth/popup-blocked")) {
          errorMessage = "登入視窗被阻擋，請允許彈出視窗"; // 瀏覽器阻擋彈出視窗
        } else {
          errorMessage = err.message; // 其他錯誤直接使用錯誤訊息
        }
      }
      setError(errorMessage); // 設置錯誤訊息
    } finally {
      setLoading(false); // 無論成功或失敗，都將載入狀態設為false
    }
  };

  // 渲染身份驗證表單UI
  return (
    <div className="w-full">
      {/* 頁面頂部的Logo */}
      <div className="mb-10 flex justify-center">
        <Image
          className="dark:invert" // 在暗模式下反轉顏色
          src="/next.svg" // Next.js logo路徑
          alt="Next.js logo" // 圖片替代文字
          width={120} // 圖片寬度
          height={30} // 圖片高度
          style={{ height: 'auto' }} // 保持圖片比例
          priority // 優先加載此圖片
        />
      </div>
      {/* 主要表單容器 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* 表單標題，根據模式顯示不同文字 */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "登入帳戶" : "註冊新帳戶"}
        </h2>
        
        {/* 錯誤訊息顯示區域，僅在有錯誤時顯示 */}
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
              onChange={(e) => setEmail(e.target.value)} // 更新email狀態
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
              onChange={(e) => setPassword(e.target.value)} // 更新password狀態
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
                onChange={(e) => setConfirmPassword(e.target.value)} // 更新confirmPassword狀態
              />
            </div>
          )}
          
          {/* 提交按鈕，根據模式和載入狀態顯示不同文字 */}
          <button
            type="submit"
            disabled={loading} // 載入中時禁用按鈕
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
              onClick={() => handleSocialLogin("google")} // 點擊時調用Google登入
              disabled={loading} // 載入中時禁用按鈕
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
              onClick={() => handleSocialLogin("github")} // 點擊時調用GitHub登入
              disabled={loading} // 載入中時禁用按鈕
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