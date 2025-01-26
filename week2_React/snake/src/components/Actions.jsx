import React, { useEffect } from 'react';
import styled from 'styled-components';
import { 
    direction, 
    ARROW_UP, 
    ARROW_DOWN, 
    ARROW_LEFT, 
    ARROW_RIGHT,
    KEY_W,
    KEY_S,
    KEY_A,
    KEY_D,
    INITIAL_SNAKE
} from './constants';

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

// Actions 組件：處理遊戲控制和用戶輸入
const Actions = ({
    currentDirection,
    setCurrentDirection,
    setSnake,
    isGameStarted,
    setIsGameStarted,
    isPaused,
    setIsPaused,
    setScore,
    isDarkMode
}) => {
    // 處理方向改變
    const handleDirectionChange = (newDirection) => {
        // 防止反向移動（蛇不能立即掉頭）
        if (
            (currentDirection === direction[ARROW_UP] && newDirection === direction[ARROW_DOWN]) ||
            (currentDirection === direction[ARROW_DOWN] && newDirection === direction[ARROW_UP]) ||
            (currentDirection === direction[ARROW_LEFT] && newDirection === direction[ARROW_RIGHT]) ||
            (currentDirection === direction[ARROW_RIGHT] && newDirection === direction[ARROW_LEFT])
        ) {
            return;
        }
        // 更新方向狀態
        setCurrentDirection(newDirection);
        // 更新蛇的狀態，包括新的方向
        setSnake(prev => ({
            ...prev,
            direction: newDirection
        }));
        // 如果遊戲尚未開始，則開始遊戲
        if (!isGameStarted) {
            setIsGameStarted(true);
        }
    };

    // 處理鍵盤事件
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key.toLowerCase()) {
                case ' ':  // 空白鍵：開始/暫停遊戲
                    if (!isGameStarted) {
                        setIsGameStarted(true);
                        setIsPaused(false);
                    } else {
                        setIsPaused(prev => !prev);
                    }
                    break;
                case 'w':
                case 'arrowup':
                    if (!isPaused) handleDirectionChange(direction[ARROW_UP]);
                    break;
                case 's':
                case 'arrowdown':
                    if (!isPaused) handleDirectionChange(direction[ARROW_DOWN]);
                    break;
                case 'a':
                case 'arrowleft':
                    if (!isPaused) handleDirectionChange(direction[ARROW_LEFT]);
                    break;
                case 'd':
                case 'arrowright':
                    if (!isPaused) handleDirectionChange(direction[ARROW_RIGHT]);
                    break;
                default:
                    break;
            }
        };

        // 添加鍵盤事件監聽器
        window.addEventListener('keydown', handleKeyDown);
        // 清理函數：移除事件監聽器
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGameStarted, isPaused, handleDirectionChange, setIsGameStarted, setIsPaused, currentDirection]);

    return (
        <ControlArea>
            {/* 方向控制按鈕 */}
            <DirectionPad>
                <DirectionButton
                    data-direction="up"
                    onClick={() => !isPaused && handleDirectionChange(direction[ARROW_UP])}
                />
                <DirectionButton
                    data-direction="left"
                    onClick={() => !isPaused && handleDirectionChange(direction[ARROW_LEFT])}
                />
                <DirectionButton
                    data-direction="right"
                    onClick={() => !isPaused && handleDirectionChange(direction[ARROW_RIGHT])}
                />
                <DirectionButton
                    data-direction="down"
                    onClick={() => !isPaused && handleDirectionChange(direction[ARROW_DOWN])}
                />
            </DirectionPad>
            {/* 暫停/播放按鈕 */}
            <PauseButton 
                isDarkMode={isDarkMode} 
                $isPaused={isPaused} 
                onClick={() => setIsPaused(!isPaused)}
            >
                {isPaused ? '播放' : '暫停'}
            </PauseButton>
            {/* 重新開始按鈕 */}
            <RestartButton onClick={() => {
                setSnake(INITIAL_SNAKE);
                setIsGameStarted(false);
                setIsPaused(false);
                setScore(0);
            }}>
                重來一場
            </RestartButton>
        </ControlArea>
    );
};

export default Actions;