// 導入必要的 React 和 React Bootstrap 組件
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

// 定義徽章數據，包含不同等級的學習成就
const BADGES = [
  {
    id: 'beginner',
    name: '學習小白獎',
    description: '連續學習7天',
    requirement: 7,
    icon: '🌟'
  },
  {
    id: 'intermediate',
    name: '學習達人獎',
    description: '連續學習30天',
    requirement: 30,
    icon: '🏆'
  },
  {
    id: 'master',
    name: '學習大師獎',
    description: '連續學習100天',
    requirement: 100,
    icon: '👑'
  }
];

// Badges 組件，接受 currentStreak 作為 prop
const Badges = ({ currentStreak }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h2 className="mb-0  fw-bold text-white">成就徽章</h2>
        <small className="fw-bold text-white">目前連續學習天數：{currentStreak}天</small>
      </Card.Header>
      <Card.Body>
        <Row xs={1} md={3} className="g-4">
          {/* 遍歷 BADGES 數組，為每個徽章創建一個卡片 */}
          {BADGES.map((badge) => {
            // 檢查是否達成徽章要求
            const isAchieved = currentStreak >= badge.requirement;
            // 計算進度百分比，最大為 100%
            const progress = Math.min(100, (currentStreak / badge.requirement) * 100);
            
            return (
              <Col key={badge.id}>
                <Card 
                  className={`badge-card text-center h-100 ${
                    isAchieved ? 'achieved' : 'locked'
                  }`}
                >
                  <Card.Body>
                    <div className="badge-icon mb-2">{badge.icon}</div>
                    <Card.Title>{badge.name}</Card.Title>
                    <Card.Text className="text-muted">
                      {badge.description}
                    </Card.Text>
                    {/* 根據是否達成顯示不同內容 */}
                    {isAchieved ? (
                      <div className="achievement-status text-success">
                        已獲得！
                      </div>
                    ) : (
                      <div className="achievement-status">
                        {/* 顯示進度條 */}
                        <div className="progress">
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{ width: `${progress}%` }}
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          />
                        </div>
                        {/* 顯示當前進度 */}
                        <small className="text-muted mt-1 d-block">
                          {currentStreak}/{badge.requirement} 天
                        </small>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};

// 導出 Badges 組件
export default Badges;
