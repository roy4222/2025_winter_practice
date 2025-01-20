import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// 定義精選商品數據
const featuredProducts = [
  {
    id: 1,
    name: '精品咖啡',
    description: '來自世界各地的優質咖啡豆',
    price: 299,
    image: 'https://img.4gamers.com.tw/puku-clone-version/140035921db588142ad57ec4d7138081361347bb.jpg'
  },
  {
    id: 2,
    name: '手工餅乾',
    description: '使用天然食材製作的美味餅乾',
    price: 199,
    image: 'https://img.4gamers.com.tw/puku-clone-version/140035921db588142ad57ec4d7138081361347bb.jpg'
  },
  {
    id: 3,
    name: '有機茶葉',
    description: '有機認證的優質茶葉',
    price: 399,
    image: 'https://img.4gamers.com.tw/puku-clone-version/140035921db588142ad57ec4d7138081361347bb.jpg'
  }
];

// 定義 Home 組件
export default function Home() {
  // 使用 useNavigate hook 來實現頁面導航
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section：主要的宣傳區塊 */}
      <div className="bg-gradient text-white py-5" style={{
        background: 'linear-gradient(45deg, #FF6B6B 30%, #FFB84C 90%)', // 設置背景漸層
        minHeight: '70vh', // 設置最小高度
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              {/* 主標題 */}
              <h1 className="display-4 fw-bold mb-4 text-dark">歡迎來到精品購物</h1>
              {/* 副標題 */}
              <h5 className="mb-4 text-dark">發現獨特的商品，享受優質的購物體驗</h5>
              {/* 行動呼籲按鈕 */}
              <Button 
                variant="light" 
                size="lg"
                onClick={() => navigate('/products')} // 點擊時導航到產品頁面
                className="text-primary rounded-pill px-4 shadow"
              >
                立即購物
              </Button>
            </Col>
            <Col md={12} className="py-4">
              <img
                src="https://news-cdn.para-daily.com/wp-content/uploads/2023/07/20142116/%E6%88%AA%E5%9C%96-2023-07-20-%E4%B8%8B%E5%8D%882.18.26.webp"
                alt="Shopping"
                className="img-fluid rounded shadow-lg"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover'
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section：特色介紹區塊 */}
      <Container className="py-5">
        <Row>
          {/* 優質商品特色 */}
          <Col md={4} className="text-center mb-4">
            <div className="p-4">
              <i className="fas fa-star fa-3x mb-3 text-primary"></i>
              <h4 className="mb-3">優質商品</h4>
              <p className="text-muted">
                嚴選高品質商品，確保每一件商品都符合您的期待
              </p>
            </div>
          </Col>
          {/* 快速配送特色 */}
          <Col md={4} className="text-center mb-4">
            <div className="p-4">
              <i className="fas fa-truck fa-3x mb-3 text-primary"></i>
              <h4 className="mb-3">快速配送</h4>
              <p className="text-muted">
                專業物流團隊，讓您購買的商品快速送達
              </p>
            </div>
          </Col>
          {/* 貼心服務特色 */}
          <Col md={4} className="text-center mb-4">
            <div className="p-4">
              <i className="fas fa-headset fa-3x mb-3 text-primary"></i>
              <h4 className="mb-3">貼心服務</h4>
              <p className="text-muted">
                專業客服團隊，為您解答任何購物疑問
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Featured Products Section：熱門商品展示區塊 */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">熱門商品</h2>
          <Row>
            {/* 使用 map 函數遍歷並渲染每個熱門商品 */}
            {featuredProducts.map((product) => (
              <Col key={product.id} md={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  {/* 商品圖片 */}
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    alt={product.name}
                  />
                  <Card.Body className="text-center">
                    {/* 商品名稱 */}
                    <Card.Title>{product.name}</Card.Title>
                    {/* 商品描述 */}
                    <Card.Text className="text-muted">
                      {product.description}
                    </Card.Text>
                    {/* 查看詳情按鈕 */}
                    <Button 
                      variant="outline-primary"
                      onClick={() => navigate('/products')} // 點擊時導航到產品頁面
                    >
                      查看詳情
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
