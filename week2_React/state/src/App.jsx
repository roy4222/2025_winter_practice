// 引入必要的 React 庫和組件
import React, { useState } from "react";
import { Card, Button, Modal } from 'react-bootstrap';
// 引入 Bootstrap 的 CSS 文件
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // 使用 useState 鉤子來管理模態框的開關狀態
  const [isModalOpen, setModalOpen] = useState(false);

  // 定義開啟和關閉模態框的函數
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">React Children 範例</h1>

      {/* 使用 Bootstrap 的 Card 組件 */}
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>卡片標題</Card.Title>
          <Card.Text>這是一個可重複使用的卡片組件。</Card.Text>
          {/* 按鈕點擊時觸發 openModal 函數 */}
          <Button variant="primary" onClick={openModal}>打開模態框</Button>
        </Card.Body>
      </Card>

      {/* 使用 Bootstrap 的 Modal 組件 */}
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>模態框標題</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>這是模態框內的內容。</p>
        </Modal.Body>
        <Modal.Footer>
          {/* 關閉按鈕點擊時觸發 closeModal 函數 */}
          <Button variant="secondary" onClick={closeModal}>關閉</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
