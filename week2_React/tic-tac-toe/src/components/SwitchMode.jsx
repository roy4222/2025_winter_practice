// 導入必要的庫和組件
import React from 'react';
import styled from 'styled-components';
import { pinkPurpleTheme, pinkPurpleDarkTheme } from '../styles/theme';

// 創建一個包含切換按鈕和標籤的容器
const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border:none !important ;
  margin-top: 15px;
`;

// 創建切換模式的標籤樣式
const SwitchLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.text : pinkPurpleTheme.colors.text};
  border:none !important ;
`;

// 創建隱藏的輸入框樣式
const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

// 創建切換按鈕的樣式
const SwitchButton = styled.span`
  cursor: pointer;
  width: 60px;
  height: 30px;
  background: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.primary : pinkPurpleTheme.colors.primary};
  display: block;
  border-radius: 100px;
  position: relative;
  
  // 創建切換按鈕內部的滑動元素
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: ${props => props.$isChecked ? '32px' : '2px'};
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%;
    transition: 0.3s;
    
    // 根據切換狀態添加不同的圖標
    background-image: ${props => props.$isChecked 
      ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E\")"
      : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000'%3E%3Cpath d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E\")"};
    background-size: 22px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

// 創建SwitchMode組件
const SwitchMode = ({ isSinglePlay, onModeChange, isDarkMode }) => {
  return (
    <SwitchContainer>
      <SwitchInput 
        type="checkbox" 
        id="mode-switch"
        checked={isSinglePlay}
        onChange={onModeChange}
      />
      <SwitchButton 
        as="label" 
        htmlFor="mode-switch"
        $isChecked={isSinglePlay}
        $isDarkMode={isDarkMode}
      />
      <SwitchLabel $isDarkMode={isDarkMode}>
        {isSinglePlay ? 'Ai對戰模式' : '手動模式'}
      </SwitchLabel>
    </SwitchContainer>
  );
};

// 導出SwitchMode組件
export default SwitchMode;