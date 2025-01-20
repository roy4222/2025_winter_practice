import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 這裡可以加入表單提交邏輯
    console.log('Form submitted:', formData);
    alert('感謝您的訊息！我們會盡快回覆。');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3">聯絡我們</h1>
          <h5 className="text-muted">我們很樂意聆聽您的意見</h5>
        </div>

        <Row className="g-4">
          {/* Contact Information */}
          <Col md={4}>
            <Card className="h-100 bg-primary text-white">
              <Card.Body className="p-4">
                <h4 className="mb-4">聯絡資訊</h4>
                
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-map-marker-alt fa-fw me-3"></i>
                  <div>台北市信義區信義路五段7號</div>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-phone fa-fw me-3"></i>
                  <div>02-2345-6789</div>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-envelope fa-fw me-3"></i>
                  <div>service@example.com</div>
                </div>

                <hr className="my-4" />

                <div>
                  <h5 className="mb-3">營業時間</h5>
                  <p className="mb-0">週一至週五 9:00-18:00</p>
                </div>

                <div className="mt-4">
                  <h5 className="mb-3">社群媒體</h5>
                  <div className="d-flex gap-3">
                    <a href="#" className="text-white">
                      <i className="fab fa-facebook fa-lg"></i>
                    </a>
                    <a href="#" className="text-white">
                      <i className="fab fa-instagram fa-lg"></i>
                    </a>
                    <a href="#" className="text-white">
                      <i className="fab fa-line fa-lg"></i>
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col md={8}>
            <Card className="h-100">
              <Card.Body className="p-4">
                <h4 className="mb-4">傳送訊息</h4>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>姓名</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>電子郵件</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>訊息內容</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" size="lg" className="w-100">
                    送出訊息
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Map */}
        <div className="mt-5">
          <Card>
            <Card.Body className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7030977721434!2d121.56366041500634!3d25.033401983972536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da80a7ad%3A0xacc4d11dc963103c!2z5Y-w5YyX101!5e0!3m2!1szh-TW!2stw!4v1620123456789!5m2!1szh-TW!2stw"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
