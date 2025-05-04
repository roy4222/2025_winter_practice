"use client"; // 聲明這是客戶端組件，允許使用React hooks和瀏覽器API

import Header from "../components/Header"; // 導入頁面頂部的Header組件
import Footer from "../components/Footer"; // 導入頁面底部的Footer組件

/**
 * 身份驗證頁面佈局組件
 * 為所有身份驗證相關頁面（登入、註冊等）提供一致的佈局結構
 * 位於 (auth) 路由群組中，此資料夾名稱不會反映在URL路徑中
 * 
 * @param {Object} props - 組件屬性
 * @param {React.ReactNode} props.children - 子組件，將在佈局中央區域渲染
 * @returns {JSX.Element} 渲染的身份驗證頁面佈局
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode; // 定義children屬性為React節點類型
}) {
  return (
    <div className="flex flex-col min-h-screen"> {/* 主容器，使用flex佈局確保頁面至少佔滿整個視窗高度 */}
      <Header /> {/* 渲染頁面頂部的Header組件 */}
      <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12"> {/* 主要內容區域，居中對齊，支援深色模式 */}
        <div className="w-full max-w-md px-4"> {/* 內容容器，限制最大寬度並添加水平內邊距 */}
          {children} {/* 渲染子組件（登入表單或註冊表單等） */}
        </div>
      </main>
      <Footer /> {/* 渲染頁面底部的Footer組件 */}
    </div>
  );
} 