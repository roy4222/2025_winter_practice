import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Header 組件：網站的頂部導航欄
function Header() {
  return (
    // Navbar 組件：使用 Bootstrap 的導航欄，設置背景色為淺色，可展開，並添加自定義類和陰影效果
    <Navbar bg="light" expand="lg" className="navbar-custom shadow-sm">
      {/* Container 組件：用於控制內容的寬度和對齊方式 */}
      <Container>
        {/* Navbar.Brand：網站品牌/logo 區域 */}
        <Navbar.Brand href="#home" className="fw-bold">
          {/* 使用 span 元素和文字顏色類來創建雙色品牌名稱 */}
          <span className="text-primary">Roy422</span>React
        </Navbar.Brand>
        {/* Navbar.Toggle：在小螢幕上顯示的漢堡選單按鈕 */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Navbar.Collapse：可折疊的導航內容區域 */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav 組件：導航鏈接列表，使用 ms-auto 類將其推到右側 */}
          <Nav className="ms-auto">
            {/* Nav.Link：各個導航項目，使用 href 屬性鏈接到頁面相應部分 */}
            <Nav.Link href="#home" className="mx-2">首頁</Nav.Link>
            <Nav.Link href="#about" className="mx-2">關於我們</Nav.Link>
            <Nav.Link href="#services" className="mx-2">服務項目</Nav.Link>
            <Nav.Link href="#contact" className="mx-2">聯絡我們</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Main() {
  // 使用 useState hook 來管理計數器狀態
  const [count, setCount] = useState(0);
  
  return (
    <Container className="my-5">
      {/* 首頁區塊 */}
      <section id="home" className="mb-5">
        <div className="text-center hero-section py-5">
          <h1 className="display-4 fw-bold mb-4">專業的網站開發服務</h1>
          <p className="lead mb-4">我們提供最優質的網站開發解決方案，幫助您的企業快速數位轉型</p>
          <Button variant="primary" size="lg" className="rounded-pill px-4">
            立即諮詢
          </Button>
        </div>
      </section>

      {/* 關於我們區塊 */}
      <section id="about" className="my-5 py-5">
        <h2 className="text-center fw-bold mb-5">關於我們</h2>
        <Row className="g-4">
          {/* 專業技術卡片 */}
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100 text-center">
              <Card.Body className="d-flex flex-column">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-laptop-code fs-1 text-primary"></i>
                </div>
                <Card.Title className="fw-bold">專業技術</Card.Title>
                <Card.Text>
                  擁有豐富的前端開發經驗，精通 React、Vue、Angular 等現代框架
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* 優秀團隊卡片 */}
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100 text-center">
              <Card.Body className="d-flex flex-column">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-users fs-1 text-primary"></i>
                </div>
                <Card.Title className="fw-bold">優秀團隊</Card.Title>
                <Card.Text>
                  由資深工程師組成的專業團隊，為您提供最佳的技術支援
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* 準時交付卡片 */}
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100 text-center">
              <Card.Body className="d-flex flex-column">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-clock fs-1 text-primary"></i>
                </div>
                <Card.Title className="fw-bold">準時交付</Card.Title>
                <Card.Text>
                  嚴格把控項目進度，確保準時完成每一個專案
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* 服務項目區塊 */}
      <section id="services" className="my-5 py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-5">服務項目</h2>
          <Row className="g-4">
            {/* 網站開發服務卡片 */}
            <Col lg={4}>
              <Card className="service-card border-0 shadow-sm h-100">
                <Card.Body>
                  <h3 className="h5 fw-bold mb-3">網站開發</h3>
                  <p className="text-muted mb-4">
                    提供客製化網站開發服務，包含響應式設計、SEO 優化等
                  </p>
                  <Button variant="outline-primary" className="rounded-pill">了解更多</Button>
                </Card.Body>
              </Card>
            </Col>
            {/* 應用程式開發服務卡片 */}
            <Col lg={4}>
              <Card className="service-card border-0 shadow-sm h-100">
                <Card.Body>
                  <h3 className="h5 fw-bold mb-3">應用程式開發</h3>
                  <p className="text-muted mb-4">
                    專業的手機與網頁應用程式開發，為您打造最佳使用者體驗
                  </p>
                  <Button variant="outline-primary" className="rounded-pill">了解更多</Button>
                </Card.Body>
              </Card>
            </Col>
            {/* 技術諮詢服務卡片 */}
            <Col lg={4}>
              <Card className="service-card border-0 shadow-sm h-100">
                <Card.Body>
                  <h3 className="h5 fw-bold mb-3">技術諮詢</h3>
                  <p className="text-muted mb-4">
                    提供專業的技術諮詢服務，協助您解決開發過程中的各種問題
                  </p>
                  <Button variant="outline-primary" className="rounded-pill">了解更多</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 聯絡我們區塊 */}
      <section id="contact" className="my-5 py-5">
        <h2 className="text-center fw-bold mb-5">聯絡我們</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5">
                <Form>
                  <Row>
                    {/* 姓名輸入欄位 */}
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label>姓名</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="請輸入姓名" 
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    {/* 電話輸入欄位 */}
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label>電話</Form.Label>
                        <Form.Control 
                          type="tel" 
                          placeholder="請輸入電話" 
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* 電子郵件輸入欄位 */}
                  <Form.Group className="mb-4">
                    <Form.Label>電子郵件</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="請輸入電子郵件" 
                      className="py-2"
                    />
                  </Form.Group>

                  {/* 訊息內容輸入欄位 */}
                  <Form.Group className="mb-4">
                    <Form.Label>訊息內容</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4} 
                      placeholder="請輸入訊息內容"
                      className="py-2"
                    />
                  </Form.Group>

                  {/* 送出按鈕 */}
                  <div className="text-center">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      className="rounded-pill px-5"
                    >
                      送出訊息
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

// Footer 組件：網站的頁腳部分
function Footer() {
  return (
    // 使用 Bootstrap 的類別設置背景色、文字顏色、內邊距和上邊距
    <footer className="bg-dark text-light py-5 mt-auto">
      <Container>
        {/* 使用 Row 和 Col 組件來創建響應式布局 */}
        <Row className="gy-4">
          {/* 第一列：關於我們 */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">關於我們</h5>
            <p className="text-muted">
              我們是一家專業的網站開發公司，致力於為客戶提供最優質的數位解決方案。
            </p>
          </Col>
          {/* 第二列：聯絡資訊 */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">聯絡資訊</h5>
            {/* 使用 Font Awesome 圖標來增強視覺效果 */}
            <p className="text-muted mb-2">
              <i className="fas fa-map-marker-alt me-2"></i>
              台北市信義區信義路五段7號
            </p>
            <p className="text-muted mb-2">
              <i className="fas fa-phone me-2"></i>
              (02) 2345-6789
            </p>
            <p className="text-muted">
              <i className="fas fa-envelope me-2"></i>
              contact@techsolutions.com
            </p>
          </Col>
          {/* 第三列：社交媒體連結 */}
          <Col md={4}>
            <h5 className="fw-bold mb-3">追蹤我們</h5>
            {/* 使用 flex 布局來排列社交媒體圖標 */}
            <div className="d-flex gap-3">
              {/* 每個社交媒體連結都使用 Font Awesome 圖標 */}
              <a href="#" className="text-light fs-4">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>
        {/* 分隔線 */}
        <hr className="my-4" />
        {/* 版權聲明 */}
        <div className="text-center text-muted">
          <p className="mb-0">&copy; 2025 TechSolutions. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

// App 組件：整個應用的主要結構
function App() {
  return (
    // 使用 flex 布局確保頁腳始終位於底部
    <div className="d-flex flex-column min-vh-100">
      <Header />  {/* 頁首組件 */}
      <Main />    {/* 主要內容組件 */}
      <Footer />  {/* 頁腳組件 */}
    </div>
  );
}

// 導出 App 組件作為默認導出
export default App;
