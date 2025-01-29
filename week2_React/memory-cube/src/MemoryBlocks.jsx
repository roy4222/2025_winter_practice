import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Blocks from './components/blocks';
import Title from './components/title';
import Progress from './components/progress';
import { LEVELS, GAME_STATUS } from './components/constants';

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

// 定義按鈕組容器樣式
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

// 定義標題樣式
const TitleHeader = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
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

// MemoryBlocks 組件：管理整個記憶方塊遊戲的邏輯和狀態
const MemoryBlocks = ({ isDarkMode, setIsDarkMode }) => {
  // 遊戲狀態相關的 state
  const [currentLevel, setCurrentLevel] = useState(1);  // 當前關卡
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.READY);  // 遊戲狀態
  const [matchedPairs, setMatchedPairs] = useState(0);  // 已匹配的對數
  const [timeRemaining, setTimeRemaining] = useState(LEVELS[0].timeLimit);  // 剩餘時間
  const [questions, setQuestions] = useState([]);  // 題目（需要記憶的方塊）
  const [answer, setAnswer] = useState([]);  // 玩家的答案
  const [isLoading, setIsLoading] = useState(false);  // 加載狀態

  // 初始化關卡
  useEffect(() => {
    const levelInfo = LEVELS[currentLevel - 1];
    const blockCount = levelInfo.gridSize * levelInfo.gridSize;
    // 生成新的隨機題目
    const newQuestions = Array(levelInfo.requiredMatches).fill(0)
      .map(() => Math.floor(Math.random() * blockCount));
    setQuestions(newQuestions);
    setTimeRemaining(levelInfo.timeLimit);
    setMatchedPairs(0);
    setAnswer([]);
  }, [currentLevel]);

  // 計時器邏輯
  useEffect(() => {
    let timer;
    if (gameStatus === GAME_STATUS.PLAYING && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGameStatus(GAME_STATUS.FAILED);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);  // 清理計時器
  }, [gameStatus, timeRemaining]);

  // 開始遊戲
  const startGame = () => {
    setGameStatus(GAME_STATUS.PLAYING);
  };

  // 重試當前關卡
  const retryLevel = () => {
    const levelInfo = LEVELS[currentLevel - 1];
    setTimeRemaining(levelInfo.timeLimit);
    setMatchedPairs(0);
    setAnswer([]);
    setGameStatus(GAME_STATUS.READY);
  };

  // 進入下一關
  const nextLevel = () => {
    if (currentLevel < LEVELS.length) {
      setCurrentLevel(prev => prev + 1);
      setGameStatus(GAME_STATUS.READY);
    }
  };

  // 處理方塊點擊
  const handleBlockClick = (index) => {
    if (isLoading || gameStatus !== GAME_STATUS.PLAYING) return;

    const newAnswer = [...answer, index];
    setAnswer(newAnswer);

    // 檢查答案
    if (newAnswer.length === questions.length) {
      const isCorrect = newAnswer.every((ans, i) => ans === questions[i]);
      if (isCorrect) {
        setMatchedPairs(prev => {
          const newMatched = prev + 1;
          const levelInfo = LEVELS[currentLevel - 1];
          if (newMatched >= levelInfo.requiredMatches) {
            setGameStatus(GAME_STATUS.COMPLETED);
          }
          return newMatched;
        });
      } else {
        setGameStatus(GAME_STATUS.FAILED);
      }
      setAnswer([]);
    }
  };

  // 渲染 UI
  return (
    <Background>
      <Container>
        <TitleHeader>
          <span>Memory Blocks 記憶方塊</span>
          <ButtonGroup>
            {/* 切換主題按鈕 */}
            <GameButton onClick={() => setIsDarkMode(!isDarkMode)}>
              <span className="icon">🌓</span>
              主題
            </GameButton>
            {/* 根據遊戲狀態顯示不同的按鈕 */}
            {gameStatus === GAME_STATUS.READY && (
              <GameButton onClick={startGame}>
                開始遊戲
              </GameButton>
            )}
            {gameStatus === GAME_STATUS.COMPLETED && (
              <GameButton onClick={nextLevel}>
                下一關
              </GameButton>
            )}
            {gameStatus === GAME_STATUS.FAILED && (
              <GameButton onClick={retryLevel}>
                重試
              </GameButton>
            )}
          </ButtonGroup>
        </TitleHeader>
        
        {/* 顯示當前關卡標題 */}
        <Title currentLevel={currentLevel} />
        
        {/* 顯示遊戲進度 */}
        <Progress 
          currentLevel={currentLevel}
          matchedPairs={matchedPairs}
          timeRemaining={timeRemaining}
        />

        {/* 顯示方塊區域 */}
        <BlockContainer>
          <Blocks
            blockNum={LEVELS[currentLevel - 1].gridSize * LEVELS[currentLevel - 1].gridSize}
            questions={questions}
            answer={answer}
            isGameStart={gameStatus === GAME_STATUS.PLAYING}
            onBlockClick={handleBlockClick}
          />
        </BlockContainer>
      </Container>
    </Background>
  );
};

export default MemoryBlocks;