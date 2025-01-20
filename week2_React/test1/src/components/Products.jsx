import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

// 商品數據陣列
const products = [
  { id: 1, name: '精品咖啡', price: 299, image: 'https://img.4gamers.com.tw/puku-clone-version/140035921db588142ad57ec4d7138081361347bb.jpg', category: '飲品' },
  { id: 2, name: '手工餅乾', price: 199, image: 'https://img.4gamers.com.tw/puku-clone-version/140035921db588142ad57ec4d7138081361347bb.jpg', category: '零食' },
  { id: 3, name: '有機茶葉', price: 399, image: 'https://img.4gamers.com.tw/puku-clone-version/140035921db588142ad57ec4d7138081361347bb.jpg', category: '飲品' },
  { id: 4, name: '巧克力蛋糕', price: 499, image: 'https://img.4gamers.com.tw/puku-clone-version/140035921db588142ad57ec4d7138081361347bb.jpg', category: '甜點' },
  { id: 5, name: '果醬禮盒', price: 599, image: 'https://img.4gamers.com.tw/puku-clone-version/140035921db588142ad57ec4d7138081361347bb.jpg', category: '禮盒' },
  { id: 6, name: '養生茶包', price: 299, image: 'https://img.4gamers.com.tw/puku-clone-version/140035921db588142ad57ec4d7138081361347bb.jpg', category: '飲品' }
];

export default function Products({ addToCart }) {
  // 使用 useState 鉤子來管理搜尋詞和類別狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  // 從商品數據中提取所有唯一的類別，並加入 'all' 選項
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // 根據搜尋詞和選擇的類別過濾商品
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">商品列表</h1>

      {/* 搜尋和過濾區域 */}
      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="搜尋商品..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3 mb-md-0"
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? '全部分類' : cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* 商品網格 */}
      <Row>
        {filteredProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <div className="overflow-hidden" style={{ height: '200px' }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  className="h-100 object-fit-cover"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-muted mb-2">
                  {product.category}
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0 text-primary">${product.price}</span>
                  <Button
                    variant="outline-primary"
                    onClick={() => addToCart(product)}
                    className="rounded-circle"
                  >
                    <i className="fas fa-plus"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 當沒有找到商品時顯示的訊息 */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-search fa-3x text-muted mb-3"></i>
          <h4>沒有找到相關商品</h4>
          <p className="text-muted">請嘗試其他搜尋條件</p>
        </div>
      )}
    </Container>
  );
}
