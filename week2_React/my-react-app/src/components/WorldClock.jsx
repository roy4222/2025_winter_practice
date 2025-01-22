import React, { useState, useEffect } from 'react';

// WorldClock 組件：顯示多個城市的當前時間
const WorldClock = () => {
  // 使用 useState 來管理時間狀態
  const [time, setTime] = useState(new Date());

  // 定義要顯示的城市及其對應的時區
  const timeZones = [
    { city: '台北', timezone: 'Asia/Taipei' },
    { city: '紐約', timezone: 'America/New_York' },
    { city: '倫敦', timezone: 'Europe/London' },
    { city: '東京', timezone: 'Asia/Tokyo' },
    { city: '洛杉磯', timezone: 'America/Los_Angeles' }
  ];

  // 使用 useEffect 來設置計時器，每秒更新時間
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 清理函數：組件卸載時清除計時器
    return () => clearInterval(timer);
  }, []);

  // 格式化時間顯示的函數
  const formatTime = (timezone) => {    
    return time.toLocaleTimeString('zh-TW', {
      timeZone: timezone, // 使用IANA時區資料庫的標準時區名稱
      hour12: false, // 使用 24 小時制
      hour: '2-digit', // 確保小時和分鐘都是兩位數
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 渲染世界時鐘組件
  return (
    <div className="world-clock-container">
      <h2 className="text-center mb-4">世界時鐘</h2>
      <div className="list-group">
        {/* 遍歷 timeZones 數組，為每個城市創建一個時鐘項目 */}
        {timeZones.map(({ city, timezone }) => (
          <div
            key={timezone}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-transparent text-white border-light"
          >
            <div className="ms-2 me-auto"> {/* 左側外邊距（margin-start: 2） me-auto：自動填滿右側空間，將右側的時間徽章推到最右。*/}
              <div className="fw-bold">{city}</div> 
            </div>
            {/* 顯示格式化後的時間 */}
            <span className="badge bg-info text-dark rounded-pill fs-5 fw-bold px-3 py-2">
              {formatTime(timezone)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;
