// 引入必要的 React 和 React Router 組件
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// 引入 React Bootstrap 組件
import { Navbar, Container, Nav, Badge, Offcanvas, Button } from 'react-bootstrap';
// 引入自定義組件
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
// 引入 Bootstrap 和 Font Awesome 的 CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// 模擬商品數據
const products = [
  { id: 1, name: '精品咖啡', price: 299, image: 'https://source.unsplash.com/400x300/?coffee' },
  { id: 2, name: '手工餅乾', price: 199, image: 'https://source.unsplash.com/400x300/?cookies' },
  { id: 3, name: '有機茶葉', price: 399, image: 'https://source.unsplash.com/400x300/?tea' },
  { id: 4, name: '巧克力蛋糕', price: 499, image: 'https://source.unsplash.com/400x300/?chocolate-cake' },
];

function App() {
  // 使用 useState 鉤子管理購物車狀態和顯示狀態
  // cart: 儲存購物車中的商品，初始為空陣列
  // showCart: 控制購物車側邊欄的顯示與隱藏，初始為 false（隱藏）
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // 添加商品到購物車
  // 如果商品已存在，增加數量；如果不存在，添加新商品
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // 使用 map 方法創建新陣列，增加已存在商品的數量
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // 使用展開運算符添加新商品，初始數量為 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 從購物車中移除商品
  // 如果商品數量為1，直接移除；如果大於1，減少數量
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem.quantity === 1) {
        // 使用 filter 方法創建新陣列，移除指定商品
        return prevCart.filter(item => item.id !== productId);
      }
      // 使用 map 方法創建新陣列，減少指定商品的數量
      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // 清空購物車
  // 將購物車重置為空陣列
  const clearCart = () => {
    setCart([]);
  };

  // 計算購物車中的總商品數量
  // 使用 reduce 方法累加所有商品的數量
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // 計算購物車中的總價格
  // 使用 reduce 方法累加所有商品的價格乘以數量
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    // 使用 React Router 的 Router 組件包裹整個應用
    <Router>
      {/* 使用 flex 佈局，確保頁腳始終在底部 */}
      <div className="d-flex flex-column min-vh-100">
        {/* 導航欄：使用 React Bootstrap 的 Navbar 組件 */}
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            {/* 網站標題，使用 Link 組件實現路由跳轉 */}
            <Navbar.Brand as={Link} to="/">精品購物</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* 導航鏈接 */}
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">首頁</Nav.Link>
                <Nav.Link as={Link} to="/about">關於我們</Nav.Link>
                <Nav.Link as={Link} to="/products">商品</Nav.Link>
                <Nav.Link as={Link} to="/contact">聯絡我們</Nav.Link>
              </Nav>
              {/* 購物車按鈕 */}
              <Button 
                variant="outline-light" 
                onClick={() => setShowCart(true)}
                className="position-relative"
              >
                {/* 使用 Font Awesome 圖標 */}
                <i className="fas fa-shopping-cart"></i>
                {/* 顯示購物車商品數量的徽章 */}
                {getTotalItems() > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* 購物車側邊欄：使用 React Bootstrap 的 Offcanvas 組件 */}
        <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>購物車</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cart.length === 0 ? (
              <p>購物車是空的</p>
            ) : (
              <>
                {/* 購物車商品列表 */}
                {cart.map(item => (
                  <div key={item.id} className="card mb-3">
                    <div className="card-body">
                      <h6 className="card-title">{item.name}</h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>單價: ${item.price}</span>
                        <div className="btn-group">
                          {/* 減少商品數量按鈕 */}
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="btn btn-sm">{item.quantity}</span>
                          {/* 增加商品數量按鈕 */}
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => addToCart(item)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* 購物車總計、清空購物車和結帳按鈕 */}
                <div className="mt-3">
                  <h5>總計: ${getTotalPrice()}</h5>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-danger w-50 me-2" onClick={clearCart}>清空購物車</button>
                    <button className="btn btn-primary w-50">結帳</button>
                  </div>
                </div>
              </>
            )}
          </Offcanvas.Body>
        </Offcanvas>

        {/* 主要內容區域：使用 flex-grow-1 確保內容區域填滿剩餘空間 */}
        <main className="flex-grow-1">
          {/* 使用 React Router 的 Routes 和 Route 組件定義路由 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* 頁腳：使用 Bootstrap 的背景和文字顏色類 */}
        <footer className="bg-dark text-light py-4 mt-auto">
          <Container className="text-center">
            <p className="mb-0"> 2025 精品購物. All rights reserved.</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

// 導出 App 組件
export default App;
