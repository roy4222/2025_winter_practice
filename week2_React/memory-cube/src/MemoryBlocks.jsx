import React, { useState } from "react";
import styled from "styled-components";
import Blocks from './components/blocks';

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
  display: flex;
  align-items: center;
  justify-content: center;
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
  // 定義生成隨機整數的工具函數
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  // 定義生成問題的函數，根據當前等級和方塊數量
  const generateQuestions = (level, blockNum) => {
    const num = level + 2;
    const questions = new Array(num).fill(0).map(() => 
      getRandomInt(blockNum));    
    return questions;
  };

  // 定義遊戲的初始等級
  const DEFAULT_LEVEL = 1;
  // 使用 useState 鉤子管理當前等級狀態
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  
  // 定義不同等級對應的方塊數量
  const blockNumSet = [4, 9, 16, 25];
  // 定義每隔多少等級增加方塊數量
  const levelGap = 4;
  // 計算當前等級對應的方塊數量索引
  const blockNumSetIndex = Math.min(Math.floor(level / levelGap), 3);
  // 獲取當前等級的方塊數量
  const blockNum = blockNumSet[blockNumSetIndex];
  // 使用 useState 鉤子管理問題狀態，初始值為第一級的問題
  const [questions, setQuestions] = useState(generateQuestions(DEFAULT_LEVEL, blockNumSet[0]));
  
  // 定義初始答案為空數組
  const DEFAULT_ANSWER = [];
  // 使用 useState 鉤子管理答案狀態
  const [answer, setAnswer] = useState(DEFAULT_ANSWER);

  // 使用 useState 鉤子管理遊戲是否開始的狀態
  const [isGameStart, setIsGameStart] = useState(false);
  
  // 定義初始機會數
  const DEFAULT_CHANCE = 3;
  // 使用 useState 鉤子管理剩餘機會數狀態
  const [chance, setChance] = useState(DEFAULT_CHANCE);
  // 使用 useState 鉤子管理加載狀態
  const [isLoading, setIsLoading] = useState(false);

  // 定義處理方塊點擊的函數
  const handleBlockClick = (index) => {
    // 如果正在加載中，則不處理點擊事件
    if (isLoading) return;
    // 將點擊的方塊索引添加到答案數組中
    setAnswer([...answer, index]);
  };

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
        <Level>第 {level} 關</Level>
        <BlockContainer>
          <Blocks
            blockNum={blockNum}
            questions={questions}
            answer={answer}
            isGameStart={isGameStart}
            onBlockClick={handleBlockClick}
          />
        </BlockContainer>
        <Progress>進度條</Progress>
        <Chance>剩餘機會: {chance}</Chance>
      </Container>
    </Background>
  );
};

export default MemoryBlocks;