// 導入 React 和 useState hook
import React, { useState } from 'react';

// 定義 App 組件
function App() {
  // 使用 useState hook 創建 isLoggedIn 狀態和更新函數
  // 初始值設為 false，表示用戶未登入
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 返回 JSX
  return (
    <div>
      {/* 頁面標題 */}
      <h1>React 條件判斷應用</h1>

      {/* 使用三元運算符進行條件渲染 */}
      {isLoggedIn ? (
        // 如果 isLoggedIn 為 true，顯示歡迎訊息
        <p>歡迎回來！您已登入。</p>
      ) : (
        // 如果 isLoggedIn 為 false，顯示登入提示
        <p>請登入以繼續。</p>
      )}

      {/* 登入/登出按鈕 */}
      <button 
        // 點擊事件處理函數：切換 isLoggedIn 狀態
        onClick={() => setIsLoggedIn(!isLoggedIn)}
      >
        {/* 根據 isLoggedIn 狀態動態顯示按鈕文字 */}
        {isLoggedIn ? '登出' : '登入'}
      </button>
    </div>
  );
}

// 導出 App 組件
export default App;
