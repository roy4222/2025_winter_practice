import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Blocks from './components/blocks';
import Title from './components/title';
import Progress from './components/progress';
import { GAME_STATUS } from './components/constants';
import { LevelManager } from './components/level';

// 成功動畫
const successAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// 失敗動畫
const failureAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

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
  
  // 添加動畫效果
  animation: ${props => {
    if (props.$gameStatus === GAME_STATUS.COMPLETED) return successAnimation;
    if (props.$gameStatus === GAME_STATUS.FAILED) return failureAnimation;
    return 'none';
  }} 0.5s ease;
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
  // 關卡管理器
  const levelManager = useRef(new LevelManager());
  
  // 遊戲狀態相關的 state
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.READY);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(levelManager.current.getCurrentLevelInfo().timeLimit);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayIndex, setCurrentPlayIndex] = useState(-1);
  
  // 音效函數
  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // 設置音效類型
    switch (type) {
      case 'success':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
      case 'failure':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case 'match':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
    }
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
  };

  // 初始化關卡
  useEffect(() => {
    const levelInfo = levelManager.current.getCurrentLevelInfo();
    const newQuestions = levelManager.current.generateQuestions();
    setQuestions(newQuestions);
    setTimeRemaining(levelInfo.timeLimit);
    setMatchedPairs(0);
    setAnswer([]);
    setCurrentPlayIndex(-1);
  }, [currentLevel]);

  // 題目播放邏輯
  useEffect(() => {
    let timer;
    if (isPlaying && currentPlayIndex < questions.length) {
      timer = setTimeout(() => {
        setCurrentPlayIndex(prev => prev + 1);
      }, 1000);
    } else if (isPlaying && currentPlayIndex >= questions.length) {
      setIsPlaying(false);
      setCurrentPlayIndex(-1);
      setGameStatus(GAME_STATUS.PLAYING);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentPlayIndex, questions.length]);

  // 計時器邏輯
  useEffect(() => {
    let timer;
    if (gameStatus === GAME_STATUS.PLAYING) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // 時間到，遊戲結束
            setGameStatus(GAME_STATUS.FAILED);
            playSound('failure');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStatus]);

  // 播放題目
  const playQuestions = () => {
    setIsPlaying(true);
    setCurrentPlayIndex(0);
    setAnswer([]);
  };

  // 開始遊戲
  const startGame = () => {
    setGameStatus(GAME_STATUS.READY);
    const newQuestions = levelManager.current.generateQuestions();
    setQuestions(newQuestions);
    setAnswer([]);
    setTimeRemaining(levelManager.current.getCurrentLevelInfo().timeLimit);
    playQuestions();
  };

  // 重試當前關卡
  const retryLevel = () => {
    levelManager.current.resetLevel();
    const levelInfo = levelManager.current.getCurrentLevelInfo();
    setTimeRemaining(levelInfo.timeLimit);
    setMatchedPairs(0);
    setAnswer([]);
    setGameStatus(GAME_STATUS.READY);
    playQuestions();
  };

  // 進入下一關
  const nextLevel = () => {
    if (levelManager.current.nextLevel()) {
      setCurrentLevel(levelManager.current.currentLevel);
      setGameStatus(GAME_STATUS.READY);
      setTimeRemaining(levelManager.current.getCurrentLevelInfo().timeLimit);
      setMatchedPairs(0);
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
        playSound('match');
        setMatchedPairs(prev => {
          const newMatched = prev + 1;
          const levelInfo = levelManager.current.getCurrentLevelInfo();
          if (newMatched >= levelInfo.requiredMatches) {
            setGameStatus(GAME_STATUS.COMPLETED);
            playSound('success');
          } else {
            // 如果還沒達到目標配對數，生成新題目並開始播放
            setTimeout(() => {
              const newQuestions = levelManager.current.generateQuestions();
              setQuestions(newQuestions);
              setAnswer([]);
              playQuestions();
            }, 1000);
          }
          return newMatched;
        });
      } else {
        setGameStatus(GAME_STATUS.FAILED);
        playSound('failure');
      }
      setAnswer(questions);
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
            {!isPlaying && gameStatus === GAME_STATUS.READY && (
              <GameButton onClick={startGame}>
                開始遊戲
              </GameButton>
            )}
            {/* 在完成關卡時顯示下一關按鈕 */}
            {!isPlaying && gameStatus === GAME_STATUS.COMPLETED && (
              <GameButton onClick={nextLevel}>
                下一關
              </GameButton>
            )}
            {!isPlaying && gameStatus === GAME_STATUS.FAILED && (
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
        <BlockContainer $gameStatus={gameStatus}>
          <Blocks
            blockNum={levelManager.current.getCurrentLevelInfo().gridSize * levelManager.current.getCurrentLevelInfo().gridSize}
            questions={questions}
            answer={answer}
            isGameStart={gameStatus === GAME_STATUS.PLAYING}
            onBlockClick={handleBlockClick}
            currentPlayIndex={currentPlayIndex}
            isPlaying={isPlaying}
            showAllAnswers={gameStatus === GAME_STATUS.FAILED || gameStatus === GAME_STATUS.COMPLETED}
          />
        </BlockContainer>
      </Container>
    </Background>
  );
};

export default MemoryBlocks;