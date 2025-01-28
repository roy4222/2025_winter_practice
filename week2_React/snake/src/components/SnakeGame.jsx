import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import MainMap from './MainMap';
import Information from './Information';
import Actions from './Actions';
import GameOverlay from './GameOverlay';
import { GRID_SIZE, PAGE_PADDING, INITIAL_SNAKE, SNAKE_INITIAL_SPEED, direction, ARROW_RIGHT } from './constants';

// 定義背景容器樣式
const Background = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: ${PAGE_PADDING}px;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
`;

// 定義遊戲容器樣式
const GameContainer = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    overflow: hidden;
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

// 定義按鈕容器樣式
const ButtonGroup = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 20;
`;

// 定義按鈕行容器
const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

// 定義通用按鈕樣式
const GameButton = styled.button`
    padding: 8px 16px;
    font-size: 1rem;
    background-color: #ff69b4;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 100px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
        filter: brightness(1.1);
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        filter: brightness(0.9);
    }

    .icon {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
    }

    /* 暫停/繼續按鈕特殊樣式 */
    &[data-action="pause"] {
        background-color: ${props => props.$isPaused ? '#4CAF50' : '#ff69b4'};
    }

    /* 遊戲結束按鈕特殊樣式 */
    &[data-action="gameover"] {
        background-color: #f44336;
    }
`;

// 定義 SnakeGame 組件，接收 isDarkMode 和 setIsDarkMode 作為 props
const SnakeGame = ({ isDarkMode, setIsDarkMode }) => {
    // 使用 useState 鉤子來管理遊戲狀態
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [currentDirection, setCurrentDirection] = useState(direction[ARROW_RIGHT]);
    const [isGameStarted, setIsGameStarted] = useState(false);  // 確保初始狀態為未開始
    const [isPaused, setIsPaused] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [food, setFood] = useState(null);
    const speedRef = useRef(SNAKE_INITIAL_SPEED);
    const gameInterval = useRef(null);
    // 移動蛇的函數
    const moveSnake = useCallback(() => {
        // 如果遊戲未開始、已暫停或已結束，則不執行任何操作
        if (!isGameStarted || isPaused || isGameOver) return;

        setSnake(prev => {
            // 計算新的蛇頭位置，使用模運算確保在網格範圍內
            const newHead = {
                x: (prev.head.x + currentDirection.x + GRID_SIZE) % GRID_SIZE,
                y: (prev.head.y + currentDirection.y + GRID_SIZE) % GRID_SIZE
            };

            // 檢查是否撞到自己的身體
            const hasCollision = prev.bodyList.some(
                segment => segment.x === newHead.x && segment.y === newHead.y
            );

            // 如果發生碰撞，設置遊戲結束狀態並返回當前狀態
            if (hasCollision) {
                setIsGameOver(true);
                return prev;
            }

            // 更新蛇的身體，將當前頭部加入身體列表的開始
            const newBodyList = [prev.head, ...prev.bodyList];
            
            // 檢查是否吃到食物
            if (food && newHead.x === food.x && newHead.y === food.y) {
                const newScore = score + 1;
                setScore(newScore);        // 更新分數
                updateSpeed(newScore);     // 根據新分數更新速度
                setFood(null);             // 移除已被吃掉的食物
                // 返回更新後的蛇狀態，包括新的頭部、身體、長度和速度
                return {
                    ...prev,
                    head: newHead,
                    bodyList: newBodyList,
                    maxLength: prev.maxLength + 1,
                    speed: speedRef.current
                };
            }

            // 如果沒有吃到食物，且身體長度超過最大長度，則移除尾部
            if (newBodyList.length > prev.maxLength - 1) {
                newBodyList.pop();
            }

            // 返回更新後的蛇狀態
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
    // 根據新的分數來調整蛇的移動速度
    const updateSpeed = useCallback((newScore) => {
        // 每吃一個食物減少10ms，但最快速度為50ms
        const newSpeed = Math.max(50, SNAKE_INITIAL_SPEED - (newScore * 10));
        // 更新速度參考值
        speedRef.current = newSpeed;
        // 更新蛇的狀態，包括新的速度
        setSnake(prev => ({...prev, speed: newSpeed}));
    }, []);

    // 重置遊戲的函數
    // 將所有遊戲相關的狀態恢復到初始值
    const resetGame = useCallback(() => {
        // 重置速度參考值為初始速度
        speedRef.current = SNAKE_INITIAL_SPEED;
        
        // 如果存在遊戲間隔，清除它
        if (gameInterval.current) {
            clearInterval(gameInterval.current);
        }
        
        // 重置所有遊戲狀態
        setIsGameStarted(false);  // 遊戲未開始
        setIsPaused(false);       // 遊戲未暫停
        setIsGameOver(false);     // 遊戲未結束
        setScore(0);              // 分數歸零
        setFood(null);            // 清除食物
        
        // 重置蛇的移動方向為向右
        setCurrentDirection(direction[ARROW_RIGHT]);
        
        // 重置蛇的狀態為初始狀態
        const resetSnake = {
            ...INITIAL_SNAKE,
            speed: SNAKE_INITIAL_SPEED
        };
        setSnake(resetSnake);
        
        // 使用初始速度重新設置遊戲間隔
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
                {/* 按鈕組 */}
                <ButtonGroup>
                    <ButtonRow>
                        <GameButton onClick={() => setIsDarkMode(!isDarkMode)}>
                            <span className="icon">🌓</span>
                            主題
                        </GameButton>
                    </ButtonRow>
                    <ButtonRow>
                        <GameButton 
                            onClick={() => !isGameOver && setIsPaused(!isPaused)}
                            data-action={isGameOver ? "gameover" : "pause"}
                            $isPaused={isPaused}
                        >
                            <span className="icon">
                                {isGameOver ? '💀' : (isPaused ? '▶' : '⏸')}
                            </span>
                            {isGameOver ? '結束' : (isPaused ? '繼續' : '暫停')}
                        </GameButton>
                        <GameButton onClick={resetGame}>
                            <span className="icon">🔄</span>
                            重來
                        </GameButton>
                    </ButtonRow>
                </ButtonGroup>

                {/* 遊戲資訊 */}
                <Information 
                    score={score}
                    speed={snake.speed}
                    isDarkMode={isDarkMode}
                />
                {/* 遊戲地圖 */}
                <MainMap 
                    snake={snake}
                    food={food}
                    isDarkMode={isDarkMode}
                />

                {/* 遊戲開始和結束畫面 */}
                <GameOverlay 
                    isGameStarted={isGameStarted}
                    isGameOver={isGameOver}
                    score={score}
                    onStart={() => {
                        setIsGameStarted(true);
                        setIsPaused(false);
                    }}
                    onRestart={resetGame}
                />
            </GameContainer>

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
                resetGame={resetGame}
            />
        </Background>
    );
};

export default SnakeGame;
