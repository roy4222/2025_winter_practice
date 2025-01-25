// 導入必要的庫
import styled, { keyframes } from 'styled-components';
import { pinkPurpleTheme, pinkPurpleDarkTheme } from '../styles/theme';

// 定義文字閃爍動畫
const textGlow = keyframes`
  0% {
    // 初始狀態：強烈的文字陰影效果
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #f09, 0 0 80px #f09, 0 0 90px #f09, 0 0 100px #f09, 0 0 150px #f09;
  }
  50% {
    // 中間狀態：減弱的文字陰影效果
    text-shadow: 0 0 4px #fff, 0 0 8px #fff, 0 0 15px #fff, 0 0 30px #f09, 0 0 60px #f09, 0 0 70px #f09, 0 0 80px #f09, 0 0 110px #f09;
  }
  100% {
    // 結束狀態：回到初始的強烈文字陰影效果
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #f09, 0 0 80px #f09, 0 0 90px #f09, 0 0 100px #f09, 0 0 150px #f09;
  }
`;

// 樣式化的資訊容器
const InfoContainer = styled.div`
  // 根據深淺模式設置背景顏色
  background: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.primary : pinkPurpleTheme.colors.primary};
  // 根據深淺模式設置文字顏色
  color: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.text : pinkPurpleTheme.colors.text};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  // 移除所有子元素的邊框
  * {
    border: none !important;
    padding: 0;
  }

  // 懸停效果
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  // 獲勝者文字樣式
  .winner {
    animation: ${textGlow} 2s ease-in-out infinite;
    color: #fff;
  }

  // 當前玩家文字樣式
  .current-player {
    font-weight: bold;
  }

  // 平局文字樣式
  .tie {
    background: linear-gradient(45deg, #ff9a9e, #fad0c4, #ffecd2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// Information組件
const Information = ({ winnerId, isGameEndedInTie, currentPlayer, isDarkMode }) => {
  return (
    <InfoContainer $isDarkMode={isDarkMode}>
      {winnerId ? (
        // 如果有獲勝者，顯示獲勝信息
        <div className="winner">
          🎉 獲勝者是: {winnerId === "1" ? "O" : "X"} 🎉
        </div>
      ) : isGameEndedInTie ? (
        // 如果遊戲平局，顯示平局信息
        <div className="tie">
          🤝 遊戲平局! 🤝
        </div>
      ) : (
        // 如果遊戲進行中，顯示當前玩家
        <div className="current-player">
          🎮 當前玩家: {currentPlayer === "1" ? "O" : "X"}
        </div>
      )}
    </InfoContainer>
  );
};

export default Information;