// 導入必要的 React 鉤子和樣式庫
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

// 導入遊戲常數和主要地圖組件
import { SNAKE_INITIAL_SPEED, GRID_SIZE, direction, INITIAL_SNAKE, ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT } from './constants';
import MainMap from './MainMap';

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
    text-align: center;
    padding: ${({ theme }) => theme.spacing.large};
`;

// 定義資訊看板樣式
const SnakeGame_Information = styled.div`
    border: 2px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing.medium};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

// 定義控制區域樣式
const ControlArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    gap: ${({ theme }) => theme.spacing.medium};
`;

// 定義方向鍵容器樣式
const DirectionPad = styled.div`
    display: grid;
    grid-template-areas:
        ". up ."
        "left . right"
        ". down .";
    gap: 8px;
    margin: ${({ theme }) => theme.spacing.medium} 0;
`;

// 定義方向鍵按鈕樣式
const DirectionButton = styled.button`
    width: 60px;
    height: 60px;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05)
        );
        pointer-events: none;
    }

    &[data-direction="up"] {
        grid-area: up;
        &:before {
            content: '↑';
        }
    }

    &[data-direction="down"] {
        grid-area: down;
        &:before {
            content: '↓';
        }
    }

    &[data-direction="left"] {
        grid-area: left;
        &:before {
            content: '←';
        }
    }

    &[data-direction="right"] {
        grid-area: right;
        &:before {
            content: '→';
        }
    }
`;

// 定義主題切換按鈕樣式
const ThemeToggleButton = styled.button`
    padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
    margin: ${({ theme }) => theme.spacing.medium};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.fontSize.medium};
    
    &:hover {
        opacity: 0.9;
    }
`;

// 定義暫停按鈕樣式
const PauseButton = styled.button`
    padding: ${({ theme }) => theme.spacing.medium};
    margin: ${({ theme }) => theme.spacing.medium} 0;
    background-color: ${({ theme, isDarkMode }) => isDarkMode ? theme.colors.success : theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.fontSize.large};
    font-weight: bold;
    width: 100%;
    max-width: 200px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    &:before {
        content: ${({ $isPaused }) => $isPaused ? "'⯈'" : "'❚❚'"};
        font-size: 1.2em;
        margin-right: 8px;
        display: inline-block;
        transition: transform 0.3s ease;
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05)
        );
        pointer-events: none;
    }
`;

// 定義重來按鈕樣式
const RestartButton = styled.button`
    padding: ${({ theme }) => theme.spacing.medium};
    margin: ${({ theme }) => theme.spacing.medium} 0;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.fontSize.large};
    font-weight: bold;
    width: 100%;
    max-width: 200px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        background-color: ${({ theme }) => theme.colors.primary};
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    &:before {
        content: '↺';
        font-size: 1.4em;
        margin-right: 8px;
        display: inline-block;
        transition: transform 0.3s ease;
    }

    &:hover:before {
        transform: rotate(-180deg);
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05)
        );
        pointer-events: none;
    }
`;

// 定義一個創建食物的函數
const CreateFood = () => {
    return {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    }
}

const SnakeGame = ({ isDarkMode, setIsDarkMode }) => {
    // 遊戲狀態
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [currentDirection, setCurrentDirection] = useState(direction[ARROW_RIGHT]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);

    // 處理方向改變
    const handleDirectionChange = (newDirection) => {
        // 防止反向移動
        if (
            (currentDirection === direction[ARROW_UP] && newDirection === direction[ARROW_DOWN]) ||
            (currentDirection === direction[ARROW_DOWN] && newDirection === direction[ARROW_UP]) ||
            (currentDirection === direction[ARROW_LEFT] && newDirection === direction[ARROW_RIGHT]) ||
            (currentDirection === direction[ARROW_RIGHT] && newDirection === direction[ARROW_LEFT])
        ) {
            return;
        }
        setCurrentDirection(newDirection);
        setSnake(prev => ({
            ...prev,
            direction: newDirection
        }));
        if (!isGameStarted) {
            setIsGameStarted(true);
        }
    };

    // 處理蛇的移動
    useEffect(() => {
        if (!isGameStarted || isPaused) return;

        const moveSnake = () => {
            setSnake(prev => {
                const newHead = {
                    x: (prev.head.x + currentDirection.x + GRID_SIZE) % GRID_SIZE,
                    y: (prev.head.y + currentDirection.y + GRID_SIZE) % GRID_SIZE
                };

                return {
                    ...prev,
                    head: newHead,
                    direction: currentDirection,
                    bodyList: [prev.head, ...prev.bodyList.slice(0, prev.maxLength - 2)]
                };
            });
        };

        const gameInterval = setInterval(moveSnake, snake.Speed);
        return () => clearInterval(gameInterval);
    }, [isGameStarted, isPaused, currentDirection]);

    return (
        <Background>
            <GameContainer>
                <ThemeToggleButton onClick={() => setIsDarkMode(!isDarkMode)}>
                    切換{isDarkMode ? '淺色' : '深色'}主題
                </ThemeToggleButton>
                <SnakeGame_Information>
                    資訊看板
                </SnakeGame_Information>
                
                <MainMap snake={snake} />
                    
                <ControlArea>
                    <DirectionPad>
                        <DirectionButton
                            data-direction="up"
                            onClick={() => handleDirectionChange(direction[ARROW_UP])}
                        />
                        <DirectionButton
                            data-direction="left"
                            onClick={() => handleDirectionChange(direction[ARROW_LEFT])}
                        />
                        <DirectionButton
                            data-direction="right"
                            onClick={() => handleDirectionChange(direction[ARROW_RIGHT])}
                        />
                        <DirectionButton
                            data-direction="down"
                            onClick={() => handleDirectionChange(direction[ARROW_DOWN])}
                        />
                    </DirectionPad>
                    <PauseButton isDarkMode={isDarkMode} $isPaused={isPaused} onClick={() => setIsPaused(!isPaused)}>
                        {isPaused ? '播放' : '暫停'}
                    </PauseButton>
                    <RestartButton onClick={() => {
                        setSnake(INITIAL_SNAKE);
                        setIsGameStarted(false);
                        setIsPaused(false);
                        setScore(0);
                    }}>
                        重來一場
                    </RestartButton>
                </ControlArea>
            </GameContainer>
        </Background>
    );
};

export default SnakeGame;
