"use client"; // 聲明這是客戶端組件，允許使用React hooks和瀏覽器API

import React from "react";
import Link from "next/link"; // 導入Next.js的Link組件用於客戶端導航

// 定義錯誤頁面組件的屬性接口
interface ErrorProps {
  error: Error;    // 錯誤對象，包含錯誤信息
  reset: () => void; // 重置函數，用於嘗試恢復應用
}

/**
 * 全局錯誤處理組件
 * 當應用中發生未捕獲的錯誤時顯示
 * 提供重試和返回首頁的選項
 * 
 * @param {ErrorProps} props - 包含錯誤信息和重置函數的屬性
 * @returns {JSX.Element} 渲染的錯誤頁面
 */
export default function Error({ error, reset }: ErrorProps) {
  return (
    // 全屏覆蓋的錯誤容器，帶有模糊背景效果
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen flex items-center justify-center bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md z-[9999]">
      {/* 錯誤信息卡片 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center justify-center text-center">
          {/* 錯誤圖標 */}
          <div className="text-red-500 dark:text-red-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          {/* 錯誤標題 */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">發生錯誤</h1>
          {/* 錯誤信息，如果沒有具體錯誤信息則顯示默認文本 */}
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error.message || "發生了未預期的錯誤，請嘗試重新載入頁面。"}
          </p>
          {/* 操作按鈕區域，在小屏幕上垂直排列，大屏幕上水平排列 */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            {/* 重試按鈕，點擊時調用reset函數 */}
            <button
              onClick={reset}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              重試
            </button>
            {/* 返回首頁按鈕，使用Link組件進行客戶端導航 */}
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors text-center"
            >
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 