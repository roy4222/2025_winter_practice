// 導入必要的 React 和 React Bootstrap 組件
import React, { useState } from 'react';
import { Card, Form, Button, ProgressBar } from 'react-bootstrap';

// 定義 GoalSetting 組件，接收 currentDays, targetDays 和 onSetTarget 作為 props
const GoalSetting = ({ currentDays, targetDays, onSetTarget }) => {
  // 使用 useState 鉤子來管理新目標天數的狀態
  const [newTarget, setNewTarget] = useState(targetDays || 100);
  
  // 計算學習進度百分比，最大為 100%
  const progress = Math.min(Math.round((currentDays / (targetDays || 100)) * 100), 100);

  // 處理表單提交的函數
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表單的默認提交行為
    onSetTarget(parseInt(newTarget)); // 調用父組件傳入的函數，更新目標天數
  };

  // 渲染組件
  return (
    <Card className="mb-4">
      <Card.Header>
        <h2 className="mb-0 fw-bold text-white">學習目標</h2>
      </Card.Header>
      <Card.Body>
        {/* 設定目標天數的表單 */}
        <Form onSubmit={handleSubmit} className="mb-3">
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">設定目標天數</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="number"
                min="1"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)} // 更新 newTarget 狀態
              />
              <Button type="submit" variant="primary">設定</Button>
            </div>
          </Form.Group>
        </Form>

        {/* 顯示學習進度 */}
        <div className="progress-wrapper">
          <ProgressBar 
            now={progress} 
            label={`${progress}%`}
            variant={progress === 100 ? "success" : "primary"} // 當達成目標時，進度條變為綠色
            className="mb-2"
          />
          <div className="text-center fw-bold">
            目前進度：{currentDays} / {targetDays} 天
            {/* 當達成目標時顯示祝賀訊息 */}
            {progress === 100 && (
              <div className="alert alert-success mt-3">
                🎉 恭喜！你已經達成學習目標！
              </div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// 導出 GoalSetting 組件
export default GoalSetting;
