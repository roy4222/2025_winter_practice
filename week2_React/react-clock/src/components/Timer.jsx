import React, { useState, useEffect } from 'react';

// Timer 組件：實現一個倒數計時器
const Timer = () => {
  // 狀態管理
  const [time, setTime] = useState(0);          // 倒數計時的秒數
  const [isRunning, setIsRunning] = useState(false);  // 計時器是否運行中
  const [inputTime, setInputTime] = useState('');     // 用戶輸入的時間

  // 使用 useEffect 處理計時邏輯
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {  //設置計時器： 當 isRunning 為 true 且 time > 0 時，每秒減少 time，直到倒數結束。
      // 設置計時器，每秒更新一次
      timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            // 時間到，清除計時器並顯示提示
            clearInterval(timer);
            setIsRunning(false);
            alert('倒數計時結束！');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // 清理函數：組件卸載或依賴項變化時清除計時器
    return () => clearInterval(timer); //清理機制： 每次 isRunning 或 time 改變，React 會清除舊的計時器，確保不會有多個計時器同時運行。
  }, [isRunning, time]);

  // 開始計時
  const handleStart = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };

  // 暫停計時
  const handlePause = () => {
    setIsRunning(false);
  };

  // 重置計時器
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime('');
  };

  // 處理輸入變化
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputTime(value);
    setTime(parseInt(value) * 60 || 0); // 將分鐘轉換為秒
  };

  // 格式化時間顯示
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 渲染 UI
  return (
    <div className="timer-container">
      <h2 className="mb-4">倒數計時器</h2>
      <div className="timer-display mb-4">{formatTime(time)}</div>
      <div className="timer-controls">
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            value={inputTime}
            onChange={handleInputChange}
            placeholder="設定分鐘"
            disabled={isRunning}
          />
        </div>
        <div className="d-flex gap-2 justify-content-center">
          <button
            className={`btn ${isRunning ? 'btn-secondary' : 'btn-primary'}`}
            onClick={handleStart}
            disabled={isRunning || time === 0}
          >
            開始
          </button>
          <button
            className="btn btn-warning"
            onClick={handlePause}
            disabled={!isRunning}
          >
            暫停
          </button>
          <button
            className="btn btn-danger"
            onClick={handleReset}
          >
            重置
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
