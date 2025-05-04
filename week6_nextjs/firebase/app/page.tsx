"use client"; // 聲明這是客戶端組件，允許使用React hooks和瀏覽器API

import Link from "next/link"; // 導入Next.js的Link組件用於客戶端導航
import Image from "next/image"; // 導入Next.js的Image組件用於優化圖片加載
import Header from "./components/Header"; // 導入頁面頂部的Header組件
import Footer from "./components/Footer"; // 導入頁面底部的Footer組件
import ScrollAnimation from "./components/ScrollAnimation"; // 導入滾動觸發動畫組件

/**
 * 首頁組件
 * 展示網站的主要內容，包括英雄區塊、特色功能和號召行動區塊
 * 使用滾動觸發動畫讓元件一個個顯示出來
 * @returns {JSX.Element} 渲染的首頁內容
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen"> {/* 主容器，使用flex佈局確保頁面至少佔滿整個視窗高度 */}
      <Header /> {/* 渲染頁面頂部的Header組件 */}
      
      <main className="flex-grow"> {/* 主要內容區域，flex-grow確保它佔用所有可用空間 */}
        {/* 英雄區塊 - 網站頂部的主要宣傳區域 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white"> {/* 使用漸變背景色 */}
          <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center text-center"> {/* 內容容器，居中對齊 */}
            <ScrollAnimation variant="slideUp" duration={0.7}>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Next.js 與 Firebase 整合範例 {/* 主標題 */}
              </h1>
            </ScrollAnimation>
            <ScrollAnimation variant="fadeIn" delay={0.2} duration={0.7}>
              <p className="max-w-2xl text-xl mb-10">
                快速打造功能完整的網頁應用程式，享受 Next.js 的強大功能和 Firebase 的靈活後端服務。 {/* 副標題說明 */}
              </p>
            </ScrollAnimation>
            <ScrollAnimation variant="scale" delay={0.4}>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"> {/* 按鈕容器，在小螢幕上垂直排列，大螢幕上水平排列 */}
                <Link href="/auth/signup" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md shadow-md transition-colors">
                  立即註冊 {/* 主要行動按鈕 */}
                </Link>
                <Link href="/features" className="bg-transparent border border-white hover:bg-white/10 text-white font-medium py-3 px-6 rounded-md transition-colors">
                  了解更多 {/* 次要行動按鈕 */}
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>

        {/* 特色功能區塊 - 展示網站的主要功能特點 */}
        <div className="py-16 bg-white dark:bg-gray-900"> {/* 支援深色模式的背景 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* 內容容器 */}
            <div className="text-center mb-12"> {/* 區塊標題部分 */}
              <ScrollAnimation variant="slideUp">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                  特色功能 {/* 區塊標題 */}
                </h2>
              </ScrollAnimation>
              <ScrollAnimation variant="fadeIn" delay={0.2}>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
                  探索我們平台所提供的強大功能 {/* 區塊描述 */}
                </p>
              </ScrollAnimation>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"> {/* 功能卡片網格，響應式佈局 */}
              {/* 功能卡片 1 - 安全身份驗證 */}
              <ScrollAnimation variant="slideUp" delay={0.1}>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"> {/* 卡片容器，懸停時增加陰影效果 */}
                  <div className="h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center mb-4"> {/* 圖標容器 */}
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg> {/* 鎖定圖標，代表安全性 */}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">安全身份驗證</h3> {/* 功能標題 */}
                  <p className="text-gray-500 dark:text-gray-400">
                    使用 Firebase Authentication 提供安全且易於使用的身份驗證系統，支援電子郵件/密碼、Google、Facebook 等多種登入方式。 {/* 功能描述 */}
                  </p>
                </div>
              </ScrollAnimation>

              {/* 功能卡片 2 - 即時數據庫 */}
              <ScrollAnimation variant="slideUp" delay={0.2}>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg> {/* 數據同步圖標 */}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">即時數據庫</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    利用 Firebase Realtime Database 或 Firestore 提供即時數據同步，讓你的應用程式能夠即時反映數據變化。
                  </p>
                </div>
              </ScrollAnimation>

              {/* 功能卡片 3 - 快速開發 */}
              <ScrollAnimation variant="slideUp" delay={0.3}>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg> {/* 勾選圖標，代表完成/效率 */}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">快速開發</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    結合 Next.js 的開發效率和 Firebase 的後端服務，大幅縮短開發時間，讓你能夠專注於產品功能而非基礎架構。
                  </p>
                </div>
              </ScrollAnimation>
            </div>
            
            <div className="mt-12 text-center"> {/* 查看更多按鈕容器 */}
              <ScrollAnimation variant="scale" delay={0.4}>
                <Link href="/features" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  查看所有功能 {/* 功能區塊的行動按鈕 */}
                </Link>
              </ScrollAnimation>
            </div>
          </div>
        </div>

        {/* 號召行動區塊 - 鼓勵用戶註冊或登入 */}
        <div className="bg-blue-600"> {/* 藍色背景突出顯示 */}
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"> {/* 在大螢幕上使用flex佈局 */}
            <ScrollAnimation variant="slideLeft">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">準備好開始了嗎？</span> {/* 主要號召文字 */}
                <span className="block text-blue-200">立即加入我們的平台</span> {/* 次要號召文字，使用較淺的顏色 */}
              </h2>
            </ScrollAnimation>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0"> {/* 按鈕容器，在大螢幕上不換行 */}
              <ScrollAnimation variant="slideRight" delay={0.2}>
                <div className="inline-flex rounded-md shadow">
                  <Link href="/auth/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors">
                    立即註冊 {/* 註冊按鈕 */}
                  </Link>
                </div>
                <div className="ml-3 inline-flex rounded-md shadow">
                  <Link href="/auth/signin" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors">
                    登入 {/* 登入按鈕 */}
                  </Link>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </main>
      
      <Footer /> {/* 渲染頁面底部的Footer組件 */}
    </div>
  );
}
