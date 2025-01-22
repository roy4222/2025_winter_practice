// 導入必要的 React 和 React Bootstrap 組件
import React, { useRef } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

// 定義 DataExport 組件，接收 onExport 和 onImport 作為 props
const DataExport = ({ onExport, onImport }) => {
  // 創建一個 ref 來引用文件輸入元素
  const fileInputRef = useRef(null);

  // 處理匯出功能
  const handleExport = () => {
    onExport(); // 調用父組件傳入的 onExport 函數
  };

  // 處理匯入功能
  const handleImport = (event) => {
    const file = event.target.files[0]; // 獲取選擇的文件
    if (file) {
      const reader = new FileReader(); // 創建 FileReader 實例
      reader.onload = (e) => {
        try {
          // 嘗試解析文件內容為 JSON
          const data = JSON.parse(e.target.result);
          onImport(data); // 調用父組件傳入的 onImport 函數，傳入解析後的數據
        } catch (error) {
          // 如果解析失敗，顯示錯誤提示
          alert('檔案格式錯誤，請確保是有效的JSON檔案');
        }
      };
      reader.readAsText(file); // 以文本形式讀取文件
    }
  };

  // 渲染組件
  return (
    <Card className="mb-4">
      <Card.Header>
        <h2 className="mb-0">資料備份</h2>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          <Col xs={12} md={6}>
            {/* 匯出按鈕 */}
            <Button 
              variant="primary" 
              onClick={handleExport}
              className="w-100"
            >
              匯出學習記錄
            </Button>
          </Col>
          <Col xs={12} md={6}>
            {/* 隱藏的文件輸入元素 */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              style={{ display: 'none' }}
            />
            {/* 匯入按鈕，點擊時觸發隱藏的文件輸入元素 */}
            <Button
              variant="outline-primary"
              onClick={() => fileInputRef.current.click()}
              className="w-100"
            >
              匯入學習記錄
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// 導出 DataExport 組件
export default DataExport;
