import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import MainMap from './MainMap';
import Information from './Information';
import Actions from './Actions';
import { GRID_SIZE, PAGE_PADDING, INITIAL_SNAKE, SNAKE_INITIAL_SPEED, direction, ARROW_RIGHT } from './constants';

// 定義背景容器樣式
const Background = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
`;

// 定義遊戲容器樣式
const GameContainer = styled.div`
    display: flex;
    gap: 20px;
    padding: ${({ theme }) => theme.spacing.large};
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 定義左側面板樣式
const LeftPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 200px;
`;

// 定義資訊看板樣式
const SnakeGame_Information = styled.div`
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: ${({ theme }) => theme.spacing.medium};
    background-color: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 200px;
`;

// 定義主題切換按鈕樣式
const ThemeToggleButton = styled.button`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.medium};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.fontSize.medium};
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(1px);
    }
`;

// 定義 SnakeGame 組件，接收 isDarkMode 和 setIsDarkMode 作為 props
const SnakeGame = ({ isDarkMode, setIsDarkMode }) => {
    // 使用 useState 鉤子來管理遊戲狀態
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [currentDirection, setCurrentDirection] = useState(direction[ARROW_RIGHT]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);
    const [food, setFood] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const speedRef = useRef(SNAKE_INITIAL_SPEED);
    const gameInterval = useRef(null);

    // 移動蛇的函數
    const moveSnake = useCallback(() => {
        if (!isGameStarted || isPaused || isGameOver) return;

        setSnake(prev => {
            const newHead = {
                x: (prev.head.x + currentDirection.x + GRID_SIZE) % GRID_SIZE,
                y: (prev.head.y + currentDirection.y + GRID_SIZE) % GRID_SIZE
            };

            // 檢查是否撞到自己
            const hasCollision = prev.bodyList.some(
                segment => segment.x === newHead.x && segment.y === newHead.y
            );

            if (hasCollision) {
                setIsGameOver(true);
                return prev;
            }

            // 更新蛇的身體
            const newBodyList = [prev.head, ...prev.bodyList];
            
            // 檢查是否吃到食物
            if (food && newHead.x === food.x && newHead.y === food.y) {
                const newScore = score + 1;
                setScore(newScore);
                updateSpeed(newScore);
                setFood(null);
                return {
                    ...prev,
                    head: newHead,
                    bodyList: newBodyList,
                    maxLength: prev.maxLength + 1,
                    speed: speedRef.current
                };
            }

            // 如果沒有吃到食物，移除尾部
            if (newBodyList.length > prev.maxLength - 1) {
                newBodyList.pop();
            }

            return {
                ...prev,
                head: newHead,
                bodyList: newBodyList
            };
        });
    }, [isGameStarted, isPaused, isGameOver, currentDirection, food]);

    // 生成食物的函數
    const generateFood = useCallback(() => {
        if (food) return;

        const newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };

        // 確保食物不會生成在蛇的身體上
        const isOnSnake = snake.bodyList.some(
            segment => segment.x === newFood.x && segment.y === newFood.y
        ) || (snake.head.x === newFood.x && snake.head.y === newFood.y);

        if (isOnSnake) {
            generateFood();
            return;
        }

        setFood(newFood);
    }, [food, snake]);

    // 更新速度的函數
    const updateSpeed = useCallback((newScore) => {
        // 每吃一個食物減少10ms,最快50ms
        const newSpeed = Math.max(50, SNAKE_INITIAL_SPEED - (newScore * 10));
        speedRef.current = newSpeed;
        setSnake(prev => ({...prev, speed: newSpeed}));
    }, []);

    // 重置遊戲的函數
    const resetGame = useCallback(() => {
        // 先重置速度參考
        speedRef.current = SNAKE_INITIAL_SPEED;
        
        // 清除並重置 interval
        if (gameInterval.current) {
            clearInterval(gameInterval.current);
        }
        
        // 確保遊戲狀態重置
        setIsGameStarted(false);
        setIsPaused(false);
        setIsGameOver(false);
        setScore(0);
        setFood(null);
        
        // 重置方向
        setCurrentDirection(direction[ARROW_RIGHT]);
        
        // 重置蛇的狀態
        const resetSnake = {
            ...INITIAL_SNAKE,
            speed: SNAKE_INITIAL_SPEED
        };
        setSnake(resetSnake);
        
        // 重新設置 interval
        gameInterval.current = setInterval(moveSnake, SNAKE_INITIAL_SPEED);
    }, [moveSnake]);

    // 使用 useEffect 鉤子來處理蛇的移動邏輯
    useEffect(() => {
        // 清除現有的 interval
        if (gameInterval.current) {
            clearInterval(gameInterval.current);
        }
        // 設置新的 interval
        gameInterval.current = setInterval(moveSnake, speedRef.current);
        return () => {
            if (gameInterval.current) {
                clearInterval(gameInterval.current);
            }
        };
    }, [moveSnake, speedRef.current]);

    // 使用 useEffect 處理食物的生成
    useEffect(() => {
        if (isGameStarted && !isPaused && !isGameOver && !food) {
            generateFood();
        }
    }, [isGameStarted, isPaused, isGameOver, food, generateFood]);

    // 渲染遊戲界面
    return (
        <Background>
            <GameContainer>
                <LeftPanel>
                    {/* 主題切換按鈕 */}
                    <ThemeToggleButton onClick={() => setIsDarkMode(!isDarkMode)}>
                        切換{isDarkMode ? '淺色' : '深色'}主題
                    </ThemeToggleButton>
                    {/* 遊戲規則說明 */}
                    <SnakeGame_Information>
                        <h3>遊戲規則: </h3>
                        <ul>
                            <li>使用方向鍵或W/A/S/D控制蛇的移動</li>
                            <li>按空格鍵暫停或繼續遊戲</li>
                            <li>吃到食物可以增加分數和蛇的長度</li>
                            <li>撞到自己的身體會結束遊戲</li>
                            <li>盡可能獲得高分！</li>
                        </ul>
                    </SnakeGame_Information>
                </LeftPanel>
                <div>
                    {/* 分數顯示 */}
                    <Information score={score} speed={snake.speed} />
                    {/* 主遊戲地圖 */}
                    <MainMap snake={snake} food={food} />
                </div>
                {/* 遊戲控制按鈕和操作 */}
                <Actions 
                    currentDirection={currentDirection}
                    setCurrentDirection={setCurrentDirection}
                    setSnake={setSnake}
                    isGameStarted={isGameStarted}
                    setIsGameStarted={setIsGameStarted}
                    isPaused={isPaused}
                    setIsPaused={setIsPaused}
                    setScore={setScore}
                    isDarkMode={isDarkMode}
                    isGameOver={isGameOver}
                    setIsGameOver={setIsGameOver}
                    updateSpeed={updateSpeed}
                    resetGame={resetGame}
                />
            </GameContainer>
        </Background>
    );
};

export default SnakeGame;
