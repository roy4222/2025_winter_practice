// 引入必要的 React 和 React Bootstrap 組件
import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

// 定義 DailyForm 組件，接收 onSubmit 和 todayRecord 作為 props
const DailyForm = ({ onSubmit, todayRecord }) => {
  // 使用 useState 鉤子來管理表單狀態
  const [learned, setLearned] = useState(true); // 是否學習
  const [reason, setReason] = useState(''); // 未學習原因
  const [content, setContent] = useState(''); // 學習內容

  // 處理表單提交的函數
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表單的默認提交行為
    // 調用父組件傳入的 onSubmit 函數，並傳遞表單數據
    onSubmit({ 
      learned, 
      reason: learned ? '' : reason, // 如果有學習，原因為空
      content: learned ? content : '' // 如果沒學習，內容為空
    });
    // 重置表單狀態
    setReason('');
    setContent('');
  };

  // 如果今天已經有記錄，顯示記錄內容
  if (todayRecord) {
    return (
      <Card className="mb-4 daily-form-card">
        <Card.Header>
          <h1 className="mb-0 fw-bold text-white">今日學習記錄</h1>
        </Card.Header>
        <Card.Body className="p-4">
          <Alert variant={todayRecord.learned ? 'success' : 'warning'}>
            <Alert.Heading>
              {todayRecord.learned ? '✓ 今天已完成學習！' : '✗ 今天已記錄為未學習'}
            </Alert.Heading>
            {todayRecord.learned ? (
              <p className="mb-0">學習內容：{todayRecord.content}</p>
            ) : (
              <p className="mb-0">未學習原因：{todayRecord.reason}</p>
            )}
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  // 如果今天還沒有記錄，顯示表單
  return (
    <Card className="mb-4 daily-form-card">
      <Card.Header>
        <h1 className="mb-0 fw-bold text-white">今日學習記錄</h1>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          {/* 選擇是否學習的表單組 */}
          <Form.Group className="mb-4">
            <Form.Label className="h5 mb-3 fw-bold text-white">今天有學習嗎？</Form.Label>
            <Row className="g-3">
              {/* "有學習" 選項 */}
              <Col xs={6}>
                <div className={`choice-card ${learned ? 'active' : ''}`} onClick={() => setLearned(true)}>
                  <Form.Check
                    type="radio"
                    label="有"
                    name="learned"
                    checked={learned}
                    onChange={() => setLearned(true)}
                    className="d-none"
                  />
                  <div className="choice-icon">✓</div>
                  <div className="choice-label">有學習</div>
                </div>
              </Col>
              {/* "沒學習" 選項 */}
              <Col xs={6}>
                <div className={`choice-card ${!learned ? 'active' : ''}`} onClick={() => setLearned(false)}>
                  <Form.Check
                    type="radio"
                    label="沒有"
                    name="learned"
                    checked={!learned}
                    onChange={() => setLearned(false)}
                    className="d-none"
                  />
                  <div className="choice-icon">✗</div>
                  <div className="choice-label">沒學習</div>
                </div>
              </Col>
            </Row>
          </Form.Group>

          {/* 根據是否學習顯示不同的輸入框 */}
          {learned ? (
            // 如果有學習，顯示學習內容輸入框
            <Form.Group className="mb-4">
              <Form.Label className="h5 mb-3">今天學習了什麼？</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="請輸入今天的學習內容..."
                className="shadow-sm"
              />
            </Form.Group>
          ) : (
            // 如果沒學習，顯示原因輸入框
            <Form.Group className="mb-4">
              <Form.Label className="h5 mb-3">原因</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="請輸入沒有學習的原因..."
                className="shadow-sm"
              />
            </Form.Group>
          )}

          {/* 提交按鈕 */}
          <div className="text-center">
            <Button variant="primary" type="submit" size="lg" className="px-5">
              提交記錄
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

// 導出 DailyForm 組件
export default DailyForm;
