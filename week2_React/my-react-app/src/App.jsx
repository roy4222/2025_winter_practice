// 引入 React 及必要的 hooks
import React from 'react';
// 引入 CSS 樣式檔
import './App.css';
// 引入時鐘組件
import Clock from './components/Clock';
import Timer from './components/Timer';
import WorldClock from './components/WorldClock';

// App 組件：應用的主要組件
function App() {
  return (
    <div className="app">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">  {/* 在大螢幕（lg）佔 4 欄（12 等分網格），中螢幕（md）佔 6 欄（即半寬） */}
            <div className="dashboard-item h-100">
              <Clock /> {/* 渲染 Clock 組件 */}
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="dashboard-item h-100">
              <Timer /> {/* 渲染 Timer 組件 */}
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="dashboard-item h-100">
              <WorldClock /> {/* 渲染 WorldClock 組件 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 導出 App 組件作為默認導出
export default App;
