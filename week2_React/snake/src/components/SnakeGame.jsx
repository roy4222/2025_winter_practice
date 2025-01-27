import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SNAKE_INITIAL_SPEED, GRID_SIZE, direction, INITIAL_SNAKE, ARROW_RIGHT } from './constants';
import MainMap from './MainMap';
import Actions from './Actions';

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
    // 使用 useRef 來追踪當前速度
    const speedRef = useRef(SNAKE_INITIAL_SPEED);
    
    // 使用 useState 鉤子來管理遊戲狀態
    const [snake, setSnake] = useState({ ...INITIAL_SNAKE, Speed: SNAKE_INITIAL_SPEED });
    const [currentDirection, setCurrentDirection] = useState(direction[ARROW_RIGHT]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);
    const [food, setFood] = useState(null);

    // 生成新的食物位置
    const generateFood = () => {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
        } while (
            (newFood.x === snake.head.x && newFood.y === snake.head.y) || 
            snake.bodyList.some(body => body.x === newFood.x && body.y === newFood.y)
        );
        setFood(newFood);
    };

    // 在遊戲開始時生成第一個食物
    useEffect(() => {
        if (isGameStarted && !food) {
            generateFood();
        }
    }, [isGameStarted]);

    // 使用 useEffect 鉤子來處理蛇的移動邏輯
    useEffect(() => {
        if (!isGameStarted || isPaused) return;

        const moveSnake = () => {
            setSnake(prev => {
                const newHead = {
                    x: (prev.head.x + currentDirection.x + GRID_SIZE) % GRID_SIZE,
                    y: (prev.head.y + currentDirection.y + GRID_SIZE) % GRID_SIZE
                };

                const ateFood = food && newHead.x === food.x && newHead.y === food.y;
                if (ateFood) {
                    setScore(prevScore => prevScore + 10);
                    generateFood();
                    // 更新速度引用
                    speedRef.current = Math.max(50, speedRef.current - 10);
                }

                return {
                    ...prev,
                    head: newHead,
                    direction: currentDirection,
                    bodyList: [prev.head, ...prev.bodyList.slice(0, ateFood ? prev.maxLength - 1 : prev.maxLength - 2)],
                    maxLength: ateFood ? prev.maxLength + 1 : prev.maxLength,
                    Speed: speedRef.current
                };
            });
        };

        const gameInterval = setInterval(moveSnake, speedRef.current);
        return () => clearInterval(gameInterval);
    }, [isGameStarted, isPaused, currentDirection, food]);

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
                {/* 主遊戲地圖 */}
                <MainMap snake={snake} food={food} />
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
                />
            </GameContainer>
        </Background>
    );
};

// 導出 SnakeGame 組件
export default SnakeGame;
