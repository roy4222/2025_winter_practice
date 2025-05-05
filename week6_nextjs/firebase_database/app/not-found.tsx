"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen flex items-center justify-center bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md z-[9999]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-amber-500 dark:text-amber-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">找不到頁面</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            您嘗試訪問的頁面不存在或已被移除。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
            >
              返回上一頁
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-center"
            >
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 