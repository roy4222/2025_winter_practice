// 定義遊戲關卡設定
export const LEVELS = [
  {
    id: 1,
    name: "新手入門",
    description: "從簡單的 2x2 方塊開始",
    gridSize: 2,
    timeLimit: 30,
    requiredMatches: 2
  },
  {
    id: 2,
    name: "記憶挑戰",
    description: "進階到 3x3 方塊",
    gridSize: 3,
    timeLimit: 45,
    requiredMatches: 4
  },
  {
    id: 3,
    name: "專家級別",
    description: "挑戰 4x4 方塊",
    gridSize: 4,
    timeLimit: 60,
    requiredMatches: 8
  }
];

// 定義遊戲狀態
export const GAME_STATUS = {
  READY: 'ready',
  PLAYING: 'playing',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  FAILED: 'failed'
};