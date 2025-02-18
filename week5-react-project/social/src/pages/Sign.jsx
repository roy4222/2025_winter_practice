import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// 定義Sign組件：用於處理用戶登入的主要組件
const Sign = () => {
  // 使用useState鉤子來管理email和password的狀態
  // 這允許我們在用戶輸入時實時更新這些值
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 處理表單提交的函數
  // 當用戶點擊登入按鈕時觸發
  const handleSubmit = (e) => {
    e.preventDefault(); // 防止表單的默認提交行為
    console.log('登入資訊:', { email, password }); // 輸出登入資訊到控制台（實際應用中應替換為API調用）
  };

  return (
    // 主容器：使用Flexbox居中內容，設置最小高度和背景漸變
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 使用Framer Motion創建動畫效果的登入卡片 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} // 初始狀態：透明度為0，向下偏移20px
        animate={{ opacity: 1, y: 0 }} // 動畫結束狀態：完全不透明，回到原位
        transition={{ duration: 0.5 }} // 動畫持續時間為0.5秒
        className="px-16 py-10 text-left bg-white shadow-2xl rounded-2xl w-[32rem] relative overflow-hidden"
      >
        {/* 頂部的裝飾條：添加視覺吸引力 */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
        
        {/* 標題：使用Framer Motion添加淡入效果 */}
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }} // 延遲0.2秒後開始動畫
          className="text-4xl font-bold text-center mb-8 text-gray-800"
        >
          登入您的帳戶
        </motion.h3>

        {/* 登入表單：處理用戶輸入和提交 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 電子郵件輸入區域：使用Framer Motion添加滑入效果 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="email">
              電子郵件
            </label>
            <input
              type="email"
              placeholder="請輸入您的電子郵件"
              className="w-full px-5 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 更新email狀態
              required
            />
          </motion.div>

          {/* 密碼輸入區域：使用Framer Motion添加滑入效果 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-lg font-medium text-gray-700 mb-2">
              密碼
            </label>
            <input
              type="password"
              placeholder="請輸入您的密碼"
              className="w-full px-5 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 更新password狀態
              required
            />
          </motion.div>

          {/* 登入按鈕和註冊連結：使用Framer Motion添加上滑效果 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between pt-4"
          >
            <button 
              className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition duration-200"
            >
              登入
            </button>
            <Link 
              to="/register" 
              className="text-lg text-blue-600 hover:text-blue-800 font-medium hover:underline transition duration-200"
            >
              註冊新帳戶
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Sign;
