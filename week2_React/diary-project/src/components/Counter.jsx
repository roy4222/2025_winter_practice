// 導入必要的 React 和 React Bootstrap 組件
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

// 定義 Counter 組件，接收 startDate 和 totalDays 作為 props
const Counter = ({ startDate, totalDays }) => {
  return (
    // 創建一個卡片組件，設置居中對齊和下邊距
    <Card className="text-center mb-4 counter-card">
      {/* 卡片標題部分 */}
      <Card.Header>
        <h2 className="mb-0 text-white">學習持續天數</h2>
      </Card.Header>
      {/* 卡片主體部分 */}
      <Card.Body className="py-4">
        <Row className="align-items-center">
          <Col>
            {/* 創建一個圓形計數器 */}
            <div className="counter-circle">
              {/* 顯示總天數 */}
              <Card.Title className="display-4 mb-0">{totalDays}</Card.Title>
              {/* 顯示"天"字 */}
              <div className="counter-label">天</div>
            </div>
          </Col>
        </Row>
        {/* 顯示學習開始日期 */}
        <Card.Text className="mt-4 text-muted">
          從 <span className="fw-bold text-primary">{startDate}</span> 開始學習
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// 導出 Counter 組件以供其他文件使用
export default Counter;
