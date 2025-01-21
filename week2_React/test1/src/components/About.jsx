// 引入必要的 React Bootstrap 組件
import { Container, Row, Col, Card } from 'react-bootstrap';

// 定義 About 組件
export default function About() {
  // 定義團隊成員資料
  const team = [
    {
      name: '王小明',
      position: '創辦人兼執行長',
      description: '擁有超過15年的電商經驗，致力於打造最佳的購物體驗。',
      avatar: 'https://source.unsplash.com/300x300/?portrait,man,1',
    },
    {
      name: '李小華',
      position: '產品總監',
      description: '專注於產品品質把關，確保每件商品都符合高標準。',
      avatar: 'https://source.unsplash.com/300x300/?portrait,woman,1',
    },
    {
      name: '張小美',
      position: '客戶服務主管',
      description: '帶領專業的客服團隊，提供最優質的服務體驗。',
      avatar: 'https://source.unsplash.com/300x300/?portrait,woman,2',
    },
  ];

  return (
    // py-5: 上下內邊距為5個單位
    <div className="py-5">
      {/* 公司介紹部分 */}
      {/* Container: Bootstrap 容器，提供一個響應式固定寬度容器 */}
      {/* mb-5: 下外邊距為5個單位 */}
      <Container className="mb-5">
        {/* text-center: 文字居中對齊 */}
        <div className="text-center mb-5">
          {/* display-4: 大型標題樣式 */}
          <h1 className="display-4 mb-3">關於我們</h1>
          {/* text-muted: 淡化的文字顏色 */}
          <h5 className="text-muted mb-4">致力於提供最優質的購物體驗</h5>
          {/* lead: 引導段落，字體稍大 */}
          {/* mx-auto: 水平居中 */}
          <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
            我們成立於2020年，是一家專注於提供優質商品的電商平台。
            我們相信，每一次的購物體驗都應該是愉快且值得的。
            因此，我們不斷努力改進我們的服務，從商品挑選到售後服務，
            每一個環節都力求完美。
          </p>
        </div>
      </Container>

      {/* 公司價值觀部分 */}
      {/* bg-light: 淺色背景 */}
      <div className="bg-light py-5 mb-5">
        <Container>
          <h2 className="text-center mb-5">我們的價值觀</h2>
          {/* Row: Bootstrap 網格系統的行 */}
          <Row>
            {/* Col: Bootstrap 網格系統的列 */}
            {/* md={4}: 在中等屏幕及以上時佔4列 */}
            <Col md={4} className="mb-4">
              {/* Card: Bootstrap 卡片組件 */}
              {/* border-0: 無邊框 */}
              {/* h-100: 高度100% */}
              {/* shadow-sm: 小陰影 */}
              <Card className="border-0 h-100 shadow-sm">
                {/* Card.Body: 卡片主體 */}
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    {/* fas fa-award: Font Awesome 圖標 */}
                    {/* text-primary: 主題色文字 */}
                    <i className="fas fa-award fa-3x text-primary"></i>
                  </div>
                  <h4 className="mb-3">品質至上</h4>
                  <p className="text-muted mb-0">
                    我們嚴格把關每一件商品的品質，確保顧客收到的都是最好的產品。
                  </p>
                </Card.Body>
              </Card>
            </Col>
            {/* 顧客第一 */}
            <Col md={4} className="mb-4">
              <Card className="border-0 h-100 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-heart fa-3x text-primary"></i>
                  </div>
                  <h4 className="mb-3">顧客第一</h4>
                  <p className="text-muted mb-0">
                    以顧客需求為優先，提供最貼心的服務和最好的購物體驗。
                  </p>
                </Card.Body>
              </Card>
            </Col>
            {/* 持續創新 */}
            <Col md={4} className="mb-4">
              <Card className="border-0 h-100 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-lightbulb fa-3x text-primary"></i>
                  </div>
                  <h4 className="mb-3">持續創新</h4>
                  <p className="text-muted mb-0">
                    不斷改進我們的服務和系統，為顧客創造更好的購物體驗。
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* 團隊成員部分 */}
      <Container>
        <h2 className="text-center mb-5">我們的團隊</h2>
        <Row>
          {/* 使用 map 函數動態渲染團隊成員卡片 */}
          {team.map((member) => (
            <Col key={member.name} md={4} className="mb-4">
              <Card className="border-0 text-center h-100 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-4">
                    {/* rounded-circle: 圓形圖片 */}
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                  <h4 className="mb-2">{member.name}</h4>
                  <p className="text-primary mb-3">{member.position}</p>
                  <p className="text-muted mb-0">{member.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
