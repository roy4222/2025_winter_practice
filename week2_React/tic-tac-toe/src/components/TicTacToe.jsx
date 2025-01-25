import styled from "styled-components";
import { useState } from "react";
import { pinkPurpleTheme, pinkPurpleDarkTheme } from '../styles/theme';
import Squares from './Squares';
import Information from './Information';
import RestartButton from './RestartButton';
import SwitchMode from './SwitchMode';
import getAiMove from './AiMode';

const TicTacToeGame = styled.div`
  /* 全局樣式設置 */
  * {
    /* 為所有元素添加邊框，根據深淺模式選擇顏色 */
    border: 1px solid ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.border : pinkPurpleTheme.colors.border};
    /* 為所有元素添加內邊距 */
    padding: 8px;
  }

  /* 主容器樣式 */
  /* 使用 flex 布局，實現居中對齊 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 根據深淺模式設置背景顏色 */
  background: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.background : pinkPurpleTheme.colors.background};
  /* 設置內邊距 */
  padding: 40px;
  /* 確保容器至少佔滿整個視口高度 */
  min-height: 100vh;
  /* 設置基本字體大小 */
  font-size: 1.2rem;

  /* 遊戲容器樣式 */
  .container {
    /* 使用 flex 布局，設置為垂直方向 */
    display: flex;
    flex-direction: column;
    /* 設置元素之間的間隔 */
    gap: 15px;
    /* 設置容器寬度 */
    width: 500px;
    /* 設置內邊距 */
    padding: 20px;
  }

  /* 主題切換按鈕樣式 */
  .theme-toggle {
    /* 設置下邊距 */
    margin-bottom: 20px;
    /* 根據深淺模式設置背景顏色 */
    background: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.primary : pinkPurpleTheme.colors.primary};
    /* 根據深淺模式設置文字顏色 */
    color: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.text : '#FFFFFF'};
    /* 移除邊框 */
    border: none;
    /* 設置內邊距 */
    padding: 15px;
    /* 設置圓角 */
    border-radius: 8px;
    /* 設置鼠標樣式為手型 */
    cursor: pointer;
    /* 添加過渡效果，使樣式變化更平滑 */
    transition: all 0.3s ease;
    /* 設置字體大小 */
    font-size: 1.2rem;
    /* 設置字體粗細 */
    font-weight: bold;

    /* 懸停效果 */
    &:hover {
      /* 降低不透明度 */
      opacity: 0.9;
      /* 稍微放大按鈕 */
      transform: scale(1.02);
    }
  }

  /* 信息、棋盤和操作按鈕的共同樣式 */
  .information, .squares, .actions button {
    /* 根據深淺模式設置背景顏色 */
    background: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.background : pinkPurpleTheme.colors.background};
    /* 根據深淺模式設置文字顏色 */
    color: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.text : pinkPurpleTheme.colors.text};
    /* 文字居中對齊 */
    text-align: center;
    /* 設置內邊距 */
    padding: 20px;
    /* 設置圓角 */
    border-radius: 8px;
    border:none;
  }

  /* 棋盤樣式 */
  .squares {
    /* 使用網格布局來創建3x3的棋盤 */
    display: grid;
    /* 設置3列，每列寬度相等 */
    grid-template-columns: repeat(3, 1fr);
    /* 設置3行，每行高度相等 */
    grid-template-rows: repeat(3, 1fr);
    /* 設置格子之間的間距 */
    gap: 8px;
    /* 確保棋盤為正方形 */
    aspect-ratio: 1;
    /* 為整個棋盤添加內邊距 */
    padding: 8px;
  }

  /* 格子樣式 */
  .square {
    /* 根據深淺模式設置背景顏色 */
    background: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.background : pinkPurpleTheme.colors.background};
    /* 根據深淺模式設置邊框顏色 */
    border: 2px solid ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.border : pinkPurpleTheme.colors.border};
    /* 設置圓角 */
    border-radius: 8px;
    /* 設置鼠標樣式為手型，表示可點擊 */
    cursor: pointer;
    /* 添加過渡效果，使樣式變化更平滑 */
    transition: all 0.3s ease;
    /* 使用 flex 布局使內容居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 設置字體大小 */
    font-size: 2rem;

    /* 懸停效果 */
    &:hover {
      /* 根據深淺模式設置懸停時的背景顏色 */
      background: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.primary : pinkPurpleTheme.colors.primary};
      /* 設置不透明度，使顏色略微透明 */
      opacity: 0.8;
    }
  }

  /* 操作按鈕容器樣式 */
  .actions {
    /* 使用 flex 布局，設置為垂直方向 */
    display: flex;
    flex-direction: column;
    /* 設置按鈕之間的間隔 */
    gap: 15px;
    border:none;

    /* 操作按鈕樣式 */
    button {
      /* 根據深淺模式設置背景顏色 */
      background: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.primary : pinkPurpleTheme.colors.primary};
      /* 根據深淺模式設置文字顏色 */
      color: ${props => props.$isDarkMode ? pinkPurpleDarkTheme.colors.text : '#FFFFFF'};
      /* 移除邊框 */
      border: none;
      /* 設置鼠標樣式為手型 */
      cursor: pointer;
      /* 添加過渡效果，使樣式變化更平滑 */
      transition: all 0.3s ease;
      /* 設置內邊距 */
      padding: 15px;
      /* 設置字體大小 */
      font-size: 1.2rem;
      /* 設置字體粗細 */
      font-weight: bold;
      /* 設置圓角 */
      border-radius: 8px;

      /* 懸停效果 */
      &:hover {
        /* 降低不透明度 */
        opacity: 0.9;
        /* 稍微放大按鈕 */
        transform: scale(1.02);
      }
    }
  }
`;

// 引入必要的 React Hook 和樣式元件
function TicTacToe() {
    // 定義玩家標識
    const Player = ["1", "-1"];
    
    // 初始化玩家步驟的默認狀態
    const defaultUserSteps = {
        "1": [],  // 玩家1的步驟
        "-1": []  // 玩家2的步驟
    };
    
    // 使用 useState 來管理當前玩家、玩家步驟、遊戲模式和主題
    const [currentPlayer, setCurrentPlayer] = useState(Player[0]);
    const [playerStepsMap, setPlayerStepsMap] = useState(defaultUserSteps);
    const [isSinglePlay, setIsSinglePlay] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    // 管理遊戲結果的狀態
    const [judgmentInfo, setJudgmentInfo] = useState({
        winnerId: 0,         // 獲勝者ID
        winnerSteps: [],     // 獲勝步驟
        lastStepToWin: {}    // 獲勝的最後一步
    });
    
    // 解構judgmentInfo以便使用
    const {
        winnerId,
        winnerSteps,
        lastStepToWin
    } = judgmentInfo;
    
    // 判斷遊戲是否平局
    const isGameEndedInTie = Player.flatMap(player => playerStepsMap[player]).length === 9;

    // 定義所有可能的獲勝組合
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫向
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縱向
        [0, 4, 8], [2, 4, 6]  // 對角線
    ];

    // 檢查是否有獲勝者
    const checkWinner = (player, steps) => {
        for (const pattern of winningPatterns) {
            if (pattern.every(position => steps.includes(position))) {
                return {
                    winnerId: player,
                    winnerSteps: pattern,
                    lastStepToWin: steps[steps.length - 1]
                };
            }
        }
        return null;
    };

    // 處理格子點擊事件
    const handleSquareClick = (index) => {
        // 如果遊戲已結束或該格子已被佔用，則不進行操作
        if (winnerId || isGameEndedInTie || 
            Player.some(player => playerStepsMap[player].includes(index))) {
            return;
        }

        // 更新玩家步驟
        const newPlayerStepsMap = {
            ...playerStepsMap,
            [currentPlayer]: [...playerStepsMap[currentPlayer], index]
        };
        setPlayerStepsMap(newPlayerStepsMap);

        // 檢查是否有獲勝者
        const result = checkWinner(currentPlayer, newPlayerStepsMap[currentPlayer]);
        if (result) {
            setJudgmentInfo(result);
            return;
        }

        // 切換到下一個玩家
        const nextPlayer = currentPlayer === Player[0] ? Player[1] : Player[0];
        setCurrentPlayer(nextPlayer);

        // 如果是單人模式且遊戲未結束，則執行AI移動
        if (isSinglePlay && !result && !isGameEndedInTie && nextPlayer === Player[1]) {
            // 生成當前棋盤狀態
            const currentSquares = Array(9).fill(null).map((_, i) => {
                if (newPlayerStepsMap["1"].includes(i)) return "1";
                if (newPlayerStepsMap["-1"].includes(i)) return "-1";
                return "";
            });

            // 獲取AI的移動
            setTimeout(() => {
                const aiMove = getAiMove(
                    currentSquares,
                    newPlayerStepsMap["1"],
                    newPlayerStepsMap["-1"]
                );

                if (aiMove !== null) {
                    // 更新AI的步驟
                    const aiPlayerStepsMap = {
                        ...newPlayerStepsMap,
                        [Player[1]]: [...newPlayerStepsMap[Player[1]], aiMove]
                    };
                    setPlayerStepsMap(aiPlayerStepsMap);

                    // 檢查AI是否獲勝
                    const aiResult = checkWinner(Player[1], aiPlayerStepsMap[Player[1]]);
                    if (aiResult) {
                        setJudgmentInfo(aiResult);
                        return;
                    }

                    // 切換回玩家
                    setCurrentPlayer(Player[0]);
                }
            }, 500); // 添加延遲使AI移動更自然
        }
    };

    // 重新開始遊戲
    const restartGame = () => {
        setPlayerStepsMap(defaultUserSteps);
        setCurrentPlayer(Player[0]);
        setJudgmentInfo({
            winnerId: 0,
            winnerSteps: [],
            lastStepToWin: {}
        });
    };

    // 生成棋盤狀態
    const squares = Array(9).fill(null).map((_, index) => {
        if (playerStepsMap["1"].includes(index)) return "1"; 
        if (playerStepsMap["-1"].includes(index)) return "-1"; 
        return ""; 
    });

    // 渲染遊戲界面
    return (
        <TicTacToeGame $isDarkMode={isDarkMode}>
            <div className="container">
                {/* 主題切換按鈕 */}
                <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                    切換{isDarkMode ? '淺色' : '深色'}主題
                </button>

                {/* 遊戲狀態信息 */}
                <Information
                    winnerId={winnerId}
                    isGameEndedInTie={isGameEndedInTie}
                    currentPlayer={currentPlayer}
                    isDarkMode={isDarkMode}
                />

                {/* 棋盤區域 */}
                <Squares 
                    squares={squares}
                    onSquareClick={handleSquareClick}
                    isDarkMode={isDarkMode}
                    winningSquares={winnerSteps}
                />

                {/* 操作按鈕區域 */}
                <div className="actions">
                    <RestartButton onRestart={restartGame} isDarkMode={isDarkMode} />
                    <SwitchMode 
                        isSinglePlay={isSinglePlay} 
                        onModeChange={() => setIsSinglePlay(!isSinglePlay)}
                        isDarkMode={isDarkMode}
                    />
                </div>
            </div>
        </TicTacToeGame>
    );
}

// 導出 TicTacToe 組件
export default TicTacToe;