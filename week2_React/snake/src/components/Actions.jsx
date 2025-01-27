// 引入 React 和 useEffect hook
import React, { useEffect } from 'react';
// 引入 styled-components 用於樣式化組件
import styled from 'styled-components';
// 從常量文件中引入遊戲所需的常量
import { 
    direction,     // 方向對象，包含各個方向的坐標變化
    ARROW_UP,      // 向上箭頭鍵常量
    ARROW_DOWN,    // 向下箭頭鍵常量
    ARROW_LEFT,    // 向左箭頭鍵常量
    ARROW_RIGHT,   // 向右箭頭鍵常量
    KEY_W,         // W 鍵常量，用於向上移動
    KEY_S,         // S 鍵常量，用於向下移動
    KEY_A,         // A 鍵常量，用於向左移動
    KEY_D,         // D 鍵常量，用於向右移動
    INITIAL_SNAKE  // 蛇的初始狀態
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
    // 設置按鈕的基本尺寸
    width: 60px;
    height: 60px;
    padding: 0;

    // 使用主題顏色設置背景和文字顏色
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};

    // 移除邊框，添加圓角
    border: none;
    border-radius: 8px;

    // 設置鼠標樣式為指針
    cursor: pointer;

    // 設置文字大小
    font-size: 24px;

    // 使用 flex 布局居中內容
    display: flex;
    align-items: center;
    justify-content: center;

    // 添加過渡效果
    transition: all 0.3s ease;

    // 添加陰影效果
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    // 設置相對定位，用於偽元素
    position: relative;
    overflow: hidden;

    // 懸停效果
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    // 點擊效果
    &:active {
        transform: translateY(1px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    // 添加漸變效果的偽元素
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

    // 為每個方向按鈕設置特定樣式
    &[data-direction="up"] {
        grid-area: up;
        &:before { content: '↑'; }
    }

    &[data-direction="down"] {
        grid-area: down;
        &:before { content: '↓'; }
    }

    &[data-direction="left"] {
        grid-area: left;
        &:before { content: '←'; }
    }

    &[data-direction="right"] {
        grid-area: right;
        &:before { content: '→'; }
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
    currentDirection,       // 當前蛇的移動方向
    setCurrentDirection,    // 設置蛇的移動方向的函數
    setSnake,               // 設置蛇的狀態的函數
    isGameStarted,          // 遊戲是否已開始的標誌
    setIsGameStarted,       // 設置遊戲開始狀態的函數
    isPaused,               // 遊戲是否暫停的標誌
    setIsPaused,            // 設置遊戲暫停狀態的函數
    setScore,               // 設置遊戲分數的函數
    isDarkMode              // 是否為深色模式的標誌
}) => {
    // 處理方向改變的函數
    const handleDirectionChange = (newDirection) => {
        // 防止反向移動（蛇不能立即掉頭）
        // 檢查新方向是否與當前方向相反
        if (
            (currentDirection === direction[ARROW_UP] && newDirection === direction[ARROW_DOWN]) ||
            (currentDirection === direction[ARROW_DOWN] && newDirection === direction[ARROW_UP]) ||
            (currentDirection === direction[ARROW_LEFT] && newDirection === direction[ARROW_RIGHT]) ||
            (currentDirection === direction[ARROW_RIGHT] && newDirection === direction[ARROW_LEFT])
        ) {
            return; // 如果是反向移動，直接返回，不改變方向
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

    // 使用 useEffect 鉤子來處理鍵盤事件
    useEffect(() => {
        // 定義處理鍵盤按下事件的函數
        const handleKeyDown = (event) => {
            switch (event.key.toLowerCase()) {
                case ' ':  // 空白鍵：開始/暫停遊戲
                    if (!isGameStarted) {
                        setIsGameStarted(true);  // 開始遊戲
                        setIsPaused(false);      // 確保遊戲不是暫停狀態
                    } else {
                        setIsPaused(prev => !prev);  // 切換暫停狀態
                    }
                    break;
                case 'w':
                case 'arrowup':
                    if (!isPaused) handleDirectionChange(direction[ARROW_UP]);  // 向上移動
                    break;
                case 's':
                case 'arrowdown':
                    if (!isPaused) handleDirectionChange(direction[ARROW_DOWN]);  // 向下移動
                    break;
                case 'a':
                case 'arrowleft':
                    if (!isPaused) handleDirectionChange(direction[ARROW_LEFT]);  // 向左移動
                    break;
                case 'd':
                case 'arrowright':
                    if (!isPaused) handleDirectionChange(direction[ARROW_RIGHT]);  // 向右移動
                    break;
                default:
                    break;  // 忽略其他按鍵
            }
        };

        // 添加鍵盤事件監聽器
        window.addEventListener('keydown', handleKeyDown);
        
        // 清理函數：組件卸載時移除事件監聽器
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGameStarted, isPaused, handleDirectionChange, setIsGameStarted, setIsPaused, currentDirection]);  // 依賴項列表

    // 渲染遊戲控制界面
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
                setSnake(INITIAL_SNAKE);  // 重置蛇的狀態
                setIsGameStarted(false);  // 設置遊戲為未開始狀態
                setIsPaused(false);       // 取消暫停狀態
                setScore(0);              // 重置分數
            }}>
                重來一場
            </RestartButton>
        </ControlArea>
    );
};

// 導出 Actions 組件供其他部分使用
export default Actions;