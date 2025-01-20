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
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // 添加商品到購物車
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // 如果商品已存在，增加數量
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // 如果商品不存在，添加新商品
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 從購物車中移除商品
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem.quantity === 1) {
        // 如果商品數量為1，直接從購物車中移除
        return prevCart.filter(item => item.id !== productId);
      }
      // 如果商品數量大於1，減少數量
      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // 計算購物車中的總商品數量
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // 計算購物車中的總價格
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* 導航欄 */}
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/">精品購物</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
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
                <i className="fas fa-shopping-cart"></i>
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

        {/* 購物車側邊欄 */}
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
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="btn btn-sm">{item.quantity}</span>
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
                {/* 購物車總計和結帳按鈕 */}
                <div className="mt-3">
                  <h5>總計: ${getTotalPrice()}</h5>
                  <button className="btn btn-primary w-100">結帳</button>
                </div>
              </>
            )}
          </Offcanvas.Body>
        </Offcanvas>

        {/* 主要內容區域 */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* 頁腳 */}
        <footer className="bg-dark text-light py-4 mt-auto">
          <Container className="text-center">
            <p className="mb-0"> 2025 精品購物. All rights reserved.</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
