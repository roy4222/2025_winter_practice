"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

interface MobileUserSectionProps {
  setMobileMenuOpen: (isOpen: boolean) => void;
}

/**
 * 行動裝置用戶資訊區域組件
 * 根據登入狀態顯示用戶資訊或登入/註冊按鈕
 * 
 * @param {MobileUserSectionProps} props - 組件屬性
 * @returns {JSX.Element} 渲染的行動裝置用戶區域
 */
export default function MobileUserSection({ setMobileMenuOpen }: MobileUserSectionProps) {
  const { currentUser, signOut } = useAuth();
  
  // 處理登出操作
  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
      {currentUser ? (
        // 用戶已登入，顯示用戶資訊和操作選項
        <>
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {currentUser.photoURL ? (
                  <Image 
                    src={currentUser.photoURL} 
                    alt="用戶頭像" 
                    width={40} 
                    height={40} 
                    className="rounded-full"
                  />
                ) : (
                  <span>{currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || '?'}</span>
                )}
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800 dark:text-white">
                {currentUser.displayName || currentUser.email?.split('@')[0] || '用戶'}
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {currentUser.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Link 
              href="/profile"
              className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              個人資料
            </Link>
            <Link 
              href="/settings"
              className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              設定
            </Link>
            <button 
              onClick={handleSignOut}
              className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              登出
            </button>
          </div>
        </>
      ) : (
        // 用戶未登入，顯示訪客資訊和登入/註冊按鈕
        <>
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800 dark:text-white">訪客</div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Link 
              href="/signin"
              className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              登入
            </Link>
            <Link 
              href="/signup"
              className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              註冊
            </Link>
          </div>
        </>
      )}
    </div>
  );
} 