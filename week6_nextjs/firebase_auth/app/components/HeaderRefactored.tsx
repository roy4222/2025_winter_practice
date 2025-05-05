"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import HeaderUserSection from "../(auth)/components/HeaderUserSection";
import MobileUserSection from "../(auth)/components/MobileUserSection";

/**
 * 重構後的頁面頂部導航欄組件
 * 使用集中式的認證上下文和拆分出的子組件來處理用戶登入狀態
 * 
 * @returns {JSX.Element} 渲染的頁面頂部導航欄
 */
export default function HeaderRefactored() {
  // 用於控制行動裝置選單的開關狀態
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 左側區域：logo和導航連結 */}
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                className="h-8 w-auto dark:invert"
                src="/next.svg"
                alt="Next.js Logo"
                width={100}
                height={24}
                priority
              />
            </Link>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                首頁
              </Link>
              <Link 
                href="/features"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                功能介紹
              </Link>
              <Link 
                href="/about"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                關於我們
              </Link>
            </nav>
          </div>
          
          {/* 使用拆分出的用戶區域組件 */}
          <HeaderUserSection />
          
          {/* 行動裝置選單按鈕 */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">開啟主選單</span>
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 行動裝置選單 */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          {/* 導航連結區域 */}
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/"
              className="bg-gray-50 dark:bg-gray-900 border-blue-500 text-blue-700 dark:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              首頁
            </Link>
            <Link 
              href="/features"
              className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              功能介紹
            </Link>
            <Link 
              href="/about"
              className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              關於我們
            </Link>
          </div>
          
          {/* 使用拆分出的行動裝置用戶區域組件 */}
          <MobileUserSection setMobileMenuOpen={setMobileMenuOpen} />
        </div>
      )}
    </header>
  );
} 