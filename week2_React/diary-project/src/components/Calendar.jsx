import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card } from 'react-bootstrap';

// LearningCalendar 組件：用於顯示學習日曆
const LearningCalendar = ({ learningData }) => {
  // 設定日曆方塊的 CSS 類別
  const tileClassName = ({ date }) => {
    // 將日期轉換為 'YYYY-MM-DD' 格式的字串
    const dateStr = date.toISOString().split('T')[0];
    // 檢查該日期是否有學習記錄
    if (learningData && learningData[dateStr]) {
      // 根據學習狀態返回相應的 CSS 類別
      return learningData[dateStr].learned ? 'learned-day' : 'missed-day';
    }
    return ''; // 如果沒有記錄，返回空字串
  };

  // 設定日曆方塊的內容
  const tileContent = ({ date }) => {
    const dateStr = date.toISOString().split('T')[0];
    if (learningData && learningData[dateStr]) {
      return (
        <div className="calendar-content">
          {/* 顯示學習狀態的圖標 */}
          {learningData[dateStr].learned ? '✓' : '✗'}
        </div>
      );
    }
    return null; // 如果沒有記錄，不顯示任何內容
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h1 className="mb-0 fw-bold text-white">學習日曆</h1>
      </Card.Header>
      <Card.Body>
        {/* React-Calendar 組件 */}
        <Calendar 
          className="learning-calendar"
          tileClassName={tileClassName} // 設定日曆方塊的 CSS 類別
          tileContent={tileContent} // 設定日曆方塊的內容
          defaultValue={new Date('2025-01-22')} // 設定默認選中的日期
          defaultActiveStartDate={new Date('2025-01-01')} // 設定默認顯示的月份
          minDetail="month" // 設定最小顯示單位為月
          showNeighboringMonth={false} // 不顯示相鄰月份的日期
        />
        {/* 日曆圖例 */}
        <div className="calendar-legend mt-3">
          <div>
            <span className="legend-dot learned"></span>
            已學習
          </div>
          <div>
            <span className="legend-dot missed"></span>
            未學習
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LearningCalendar;
