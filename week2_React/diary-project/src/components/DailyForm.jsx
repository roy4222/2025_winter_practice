import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const DailyForm = ({ onSubmit }) => {
  const [learned, setLearned] = useState(true);
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ learned, reason });
    setReason('');
  };

  return (
    <Card className="mb-4 daily-form-card">
      <Card.Header>
        <h2 className="mb-0 text-white">今日學習記錄</h2>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="h5 mb-3">今天有學習嗎？</Form.Label>
            <Row className="g-3">
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

          {!learned && (
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

export default DailyForm;
