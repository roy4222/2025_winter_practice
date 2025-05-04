"use client"; // 聲明這是客戶端組件，允許使用React hooks和瀏覽器API

import Link from "next/link"; // 導入Next.js的Link組件用於客戶端導航
import Image from "next/image"; // 導入Next.js的Image組件用於優化圖片加載
import { useState } from "react"; // 導入React的useState hook用於管理組件狀態

/**
 * 頁面頂部導航欄組件
 * 包含網站logo、導航連結和用戶操作按鈕
 * 支援響應式設計，在小螢幕上顯示漢堡選單
 * @returns {JSX.Element} 渲染的頁面頂部導航欄
 */
export default function Header() {
  // 用於控制行動裝置選單的開關狀態
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm"> {/* 頂部導航欄容器，支援深色模式 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* 內容容器，設定最大寬度和內邊距 */}
        <div className="flex justify-between h-16"> {/* 導航欄主要內容區，使用flex佈局 */}
          <div className="flex"> {/* 左側區域：logo和導航連結 */}
            <Link href="/" className="flex-shrink-0 flex items-center"> {/* Logo連結，點擊返回首頁 */}
              <Image
                className="h-8 w-auto dark:invert" // 在深色模式下反轉顏色
                src="/next.svg" // Logo圖片路徑
                alt="Next.js Logo" // 圖片替代文字
                width={100} // 圖片寬度
                height={24} // 圖片高度
                priority // 優先加載此圖片
              />
            </Link>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8"> {/* 導航連結，在小螢幕上隱藏 */}
              <Link 
                href="/" // 首頁連結
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                首頁
              </Link>
              <Link 
                href="/features" // 功能介紹頁連結
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                功能介紹
              </Link>
              <Link 
                href="/about" // 關於我們頁連結
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                關於我們
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center"> {/* 右側區域：登入和註冊按鈕，在小螢幕上隱藏 */}
            <div className="flex space-x-4"> {/* 按鈕容器，設定間距 */}
              <Link 
                href="/auth/signin" // 登入頁連結
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                登入
              </Link>
              <Link 
                href="/auth/signup" // 註冊頁連結
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                註冊
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden"> {/* 行動裝置選單按鈕，僅在小螢幕上顯示 */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // 點擊切換行動裝置選單的開關狀態
            >
              <span className="sr-only">開啟主選單</span> {/* 螢幕閱讀器專用文字 */}
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg> // 漢堡選單圖標
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg> // 關閉圖標
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 行動裝置選單，僅在選單開啟且螢幕小於sm斷點時顯示 */}
      {mobileMenuOpen && (
        <div className="sm:hidden"> {/* 在sm及以上斷點隱藏 */}
          <div className="pt-2 pb-3 space-y-1"> {/* 導航連結區域 */}
            <Link 
              href="/" // 首頁連結
              className="bg-gray-50 dark:bg-gray-900 border-blue-500 text-blue-700 dark:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)} // 點擊後關閉選單
            >
              首頁
            </Link>
            <Link 
              href="/features" // 功能介紹頁連結
              className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)} // 點擊後關閉選單
            >
              功能介紹
            </Link>
            <Link 
              href="/about" // 關於我們頁連結
              className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)} // 點擊後關閉選單
            >
              關於我們
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700"> {/* 用戶操作區域，頂部有分隔線 */}
            <div className="flex items-center px-4"> {/* 用戶資訊區域 */}
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg> {/* 用戶圖標 */}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">訪客</div> {/* 用戶名稱 */}
              </div>
            </div>
            <div className="mt-3 space-y-1"> {/* 用戶操作按鈕區域 */}
              <Link 
                href="/auth/signin" // 登入頁連結
                className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)} // 點擊後關閉選單
              >
                登入
              </Link>
              <Link 
                href="/auth/signup" // 註冊頁連結
                className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)} // 點擊後關閉選單
              >
                註冊
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 