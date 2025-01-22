// 引入 React 和必要的 hooks
import React, { useState, useEffect } from 'react';

// 定義 Clock 組件
const Clock = () => {
  // 使用 useState 來管理時間和日/夜模式狀態
  const [time, setTime] = useState(new Date()); //用 useState 存放當前時間，每秒更新。
  const [isDayTime, setIsDayTime] = useState(true); //用於判斷是否為白天，基於 time.getHours() 更新。

  // 使用 useEffect 來設置計時器，每秒更新時間
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      setTime(newTime);
      // 判斷是否為白天（早上6點到晚上6點）
      setIsDayTime(newTime.getHours() >= 6 && newTime.getHours() < 18);
    }, 1000);

    // 清理函數：組件卸載時清除計時器
    return () => clearInterval(timer);
  }, []);

  // 格式化時間顯示
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  // 格式化日期顯示
  const date = time.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  // 渲染時鐘組件
  return (
    <div className={`clock-container ${isDayTime ? 'day-mode' : 'night-mode'}`}>
      <div className="clock">
        <div className="time">
          {[hours, minutes, seconds].map((unit, index) => (
            <React.Fragment key={index}>
              <span className={`time-unit ${['hours', 'minutes', 'seconds'][index]}`}>{unit}</span>
              {index < 2 && <span className="colon">:</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="date">{date}</div>
      </div>
      <div className="mode-indicator">{isDayTime ? '☀️' : '🌙'}</div>
    </div>
  );
};

// 導出 Clock 組件
export default Clock;
