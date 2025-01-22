import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Counter = ({ startDate, totalDays }) => {
  return (
    <Card className="text-center mb-4 counter-card">
      <Card.Header>
        <h2 className="mb-0 text-white">學習持續天數</h2>
      </Card.Header>
      <Card.Body className="py-4">
        <Row className="align-items-center">
          <Col>
            <div className="counter-circle">
              <Card.Title className="display-4 mb-0">{totalDays}</Card.Title>
              <div className="counter-label">天</div>
            </div>
          </Col>
        </Row>
        <Card.Text className="mt-4 text-muted">
          從 <span className="fw-bold text-primary">{startDate}</span> 開始學習
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Counter;
