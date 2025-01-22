// 引入 React 及必要的 hooks
import React, { useState, useEffect } from 'react';
// 引入 CSS 樣式檔
import './App.css';

// Clock 組件：顯示當前時間
function Clock() {
  // 使用 useState hook 來管理時間狀態
  const [time, setTime] = useState(new Date());

  // 使用 useEffect hook 來處理副作用（設置計時器）
  useEffect(() => {
    // 設置一個每秒更新時間的計時器
    const timer = setInterval(() => {
      setTime(new Date()); // 更新時間狀態
    }, 1000);

    // 清理函數：當組件卸載時清除計時器
    return () => {
      clearInterval(timer);
    };
  }, []); // 空依賴數組意味著這個 effect 只在組件掛載時運行一次

  // 時間格式化

  const hours = time.getHours().toString().padStart(2, '0');  //透過 padStart 確保格式為兩位數（如 01:05:09）
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  //使用 toLocaleDateString 將日期格式化為繁體中文，顯示年、月、日和星期。
  const date = time.toLocaleDateString('zh-TW', {  
    year: 'numeric', //顯示完整年份。
    month: 'long', //月份名稱使用全名（如「一月」、「二月」）。
    day: 'numeric', //顯示完整日期（如「01」、「02」）
    weekday: 'long' //顯示星期（如「星期一」、「星期二」）
  });

  // 渲染時鐘
  return (
    <div className="clock-container">
      <div className="clock">
        <div className="time">
          <span className="hours">{hours}</span>
          <span className="colon">:</span>
          <span className="minutes">{minutes}</span>
          <span className="colon">:</span>
          <span className="seconds">{seconds}</span>
        </div>
        <div className="date">{date}</div>
      </div>
    </div>
  );
}

// App 組件：應用的主要組件
function App() {
  return (
    <div className="app">
      <Clock /> {/* 渲染 Clock 組件 */}
    </div>
  );
}

// 導出 App 組件作為默認導出
export default App;
