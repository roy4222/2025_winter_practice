import styled from 'styled-components';
import { pinkPurpleTheme, pinkPurpleDarkTheme } from '../styles/theme';

// 樣式化的按鈕組件
const StyledButton = styled.button`
  /* 根據深淺模式設置背景顏色 */
  background: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.primary : pinkPurpleTheme.colors.primary};
  /* 根據深淺模式設置文字顏色 */
  color: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.text : '#FFFFFF'};
  /* 移除邊框 */
  border: none;
  /* 設置鼠標樣式為手型 */
  cursor: pointer;
  /* 添加過渡效果，使樣式變化更平滑 */
  transition: all 0.3s ease;
  /* 設置內邊距 */
  padding: 15px;
  /* 設置字體大小 */
  font-size: 1.2rem;
  /* 設置字體粗細 */
  font-weight: bold;
  /* 設置圓角 */
  border-radius: 8px;
  /* 設置寬度 */
  width: 100%;

  /* 懸停效果 */
  &:hover {
    /* 降低不透明度 */
    opacity: 0.9;
    /* 稍微放大按鈕 */
    transform: scale(1.02);
    /* 添加陰影效果 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  /* 點擊效果 */
  &:active {
    transform: scale(0.98);
  }
`;

// RestartButton組件
const RestartButton = ({ onRestart, isDarkMode }) => {
  return (
    <StyledButton 
      onClick={onRestart}
      $isDarkMode={isDarkMode}
    >
      重新開始遊戲
    </StyledButton>
  );
};

export default RestartButton;