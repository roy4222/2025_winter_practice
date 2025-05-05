"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

/**
 * Header 用戶區域組件
 * 根據登入狀態顯示用戶資訊或登入/註冊按鈕
 * 
 * @returns {JSX.Element} 渲染的用戶區域
 */
export default function HeaderUserSection() {
  const { currentUser, signOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // 處理登出操作
  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      {currentUser ? (
        // 用戶已登入，顯示用戶頭像和下拉選單
        <div className="relative">
          {/* 用戶頭像按鈕，點擊時切換下拉選單的顯示狀態 */}
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* 用戶頭像容器 */}
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {/* 條件渲染：如果用戶有頭像則顯示頭像，否則顯示名稱首字母 */}
              {currentUser.photoURL ? (
                // 顯示用戶頭像
                <Image 
                  src={currentUser.photoURL} 
                  alt="用戶頭像" 
                  width={32} 
                  height={32} 
                  className="rounded-full"
                />
              ) : (
                // 顯示用戶名稱或電子郵件的首字母，若都沒有則顯示問號
                <span>{currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || '?'}</span>
              )}
            </div>
            {/* 顯示用戶名稱：優先顯示顯示名稱，其次是郵箱名稱，都沒有則顯示「用戶」 */}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 pr-1">
              {currentUser.displayName || currentUser.email?.split('@')[0] || '用戶'}
            </span>
          </button>
          
          {/* 用戶下拉選單 */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
              <Link 
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setUserMenuOpen(false)}
              >
                個人資料
              </Link>
              <Link 
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setUserMenuOpen(false)}
              >
                設定
              </Link>
              <button 
                onClick={handleSignOut}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                登出
              </button>
            </div>
          )}
        </div>
      ) : (
        // 用戶未登入，顯示登入和註冊按鈕
        <div className="flex space-x-4">
          <Link 
            href="/signin"
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            登入
          </Link>
          <Link 
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            註冊
          </Link>
        </div>
      )}
    </div>
  );
} 