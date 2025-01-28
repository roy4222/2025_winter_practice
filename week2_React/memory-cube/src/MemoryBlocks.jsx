import React from "react";
import styled from "styled-components";

// 定義背景容器樣式
const Background = styled.div`
    // 使用 flex 布局
    display: flex;
    // 設置主軸方向為垂直
    flex-direction: column;
    // 在交叉軸上居中對齊子元素
    align-items: center;
    // 設置子元素之間的間距，使用主題中定義的大間距
    gap: ${({ theme }) => theme.spacing.large};
    // 設置寬度為 100%，佔滿父元素寬度
    width: 100%;
    // 設置最小高度為視窗高度，確保至少填滿整個視窗
    min-height: 100vh;
    // 設置內邊距，使用主題中定義的大間距
    padding: ${({ theme }) => theme.spacing.large};
    // 設置背景顏色，使用主題中定義的背景色
    background-color: ${({ theme }) => theme.colors.background};
    // 設置文字顏色，使用主題中定義的文字色
    color: ${({ theme }) => theme.colors.text};
`;

// 定義內容容器樣式
const Container = styled.div`
    // 設置寬度為 100%，佔滿父元素寬度
    width: 100%;
    // 設置最大寬度為 800px，限制內容區域不會過寬
    max-width: 800px;
    // 使用 flex 布局
    display: flex;
    // 設置主軸方向為垂直
    flex-direction: column;
    // 設置子元素之間的間距，使用主題中定義的中等間距
    gap: ${({ theme }) => theme.spacing.medium};
`;

// 定義標題樣式
const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 定義關卡資訊樣式
const Level = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary}20;
  transition: all 0.3s ease;
`;

// 定義方塊容器樣式
const BlockContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.medium};
  margin: ${({ theme }) => theme.spacing.medium} 0;
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.primary}10;
  transition: all 0.3s ease;
`;

// 定義進度條樣式
const Progress = styled.div`
  height: 20px;
  margin: ${({ theme }) => theme.spacing.medium} 0;
  background-color: ${({ theme }) => theme.colors.primary}15;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

// 定義機會/命樣式
const Chance = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary}10;
  transition: all 0.3s ease;
`;

// 定義遊戲按鈕樣式
const GameButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  margin-left: ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};

  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .icon {
    font-size: ${({ theme }) => theme.typography.fontSize.medium};
  }
`;

const MemoryBlocks = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <Background>
      <Container>
        <Title>
          Memory Blocks 記憶方塊
          <GameButton onClick={() => setIsDarkMode(!isDarkMode)}>
            <span className="icon">🌓</span>
            主題
          </GameButton>
        </Title>
        <Level>關卡資訊</Level>
        <BlockContainer>記憶方塊</BlockContainer>
        <Progress>進度條</Progress>
        <Chance>機會/命</Chance>
      </Container>
    </Background>
  );
};

export default MemoryBlocks;