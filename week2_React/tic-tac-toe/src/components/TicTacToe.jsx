import styled from "styled-components";
import { useState } from "react";
import { pinkPurpleTheme, pinkPurpleDarkTheme } from '../styles/theme';

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

function TicTacToe() {
    const Player = ["1", "-1"];
    const defaultUserSteps = {
        "1": [],
        "-1": []
    };
    const [currentPlayer, setCurrentPlayer] = useState(Player[0]);
    const [playerStepsMap, setPlayerStepsMap] = useState(defaultUserSteps);
    const [isSinglePlay, setIsSinglePlay] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [judgmentInfo, setJudgmentInfo] = useState({
        winnerId: 0,
        winnerSteps: [],
        lastStepToWin: {}
    });
    const {
        winnerId,
        winnerSteps,
        lastStepToWin
    } = judgmentInfo;
    const isGameEndedInTie = Player.flatMap(player => playerStepsMap[player]).length === 9;

    return (
        <TicTacToeGame $isDarkMode={isDarkMode}>
            <div className="container">
                <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                    切換{isDarkMode ? '淺色' : '深色'}主題
                </button>
                <div className="information">資訊看板</div>
                <div className="squares">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="square">{index + 1}</div>
                    ))}
                </div>
                <div className="actions">
                    <button>重新開始按鈕</button>
                    <button>切換按鈕</button>
                </div>
            </div>
        </TicTacToeGame>
    )
}

export default TicTacToe;