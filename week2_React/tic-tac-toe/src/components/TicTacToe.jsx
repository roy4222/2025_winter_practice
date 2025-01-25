import styled from "styled-components";
import { useState } from "react";
import { pinkPurpleTheme, pinkPurpleDarkTheme } from '../styles/theme';
import Squares from './Squares';

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
    // 定義玩家標識，1 代表 O，-1 代表 X
    const Player = ["1", "-1"];
    
    // 初始化玩家步驟的默認狀態
    const defaultUserSteps = {
        "1": [],  // 玩家 O 的步驟
        "-1": []  // 玩家 X 的步驟
    };
    
    // 使用 useState 鉤子管理當前玩家，初始為第一個玩家（O）
    const [currentPlayer, setCurrentPlayer] = useState(Player[0]);
    
    // 使用 useState 鉤子管理玩家步驟，初始為默認狀態
    const [playerStepsMap, setPlayerStepsMap] = useState(defaultUserSteps);
    
    // 使用 useState 鉤子管理遊戲模式，false 為雙人模式，true 為單人模式
    const [isSinglePlay, setIsSinglePlay] = useState(false);
    
    // 使用 useState 鉤子管理深色模式狀態
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    // 使用 useState 鉤子管理遊戲判斷信息
    const [judgmentInfo, setJudgmentInfo] = useState({
        winnerId: 0,         // 獲勝者 ID，0 表示沒有獲勝者
        winnerSteps: [],     // 獲勝路徑
        lastStepToWin: {}    // 獲勝的最後一步
    });
    
    // 解構 judgmentInfo 以方便使用
    const {
        winnerId,
        winnerSteps,
        lastStepToWin
    } = judgmentInfo;
    
    // 判斷遊戲是否以平局結束
    // 通過檢查所有玩家的步驟總數是否等於 9（棋盤格子數）來確定
    const isGameEndedInTie = Player.flatMap(player => playerStepsMap[player]).length === 9;


    
    // 處理格子點擊事件
    const handleSquareClick = (index) => {
        // 檢查遊戲是否已結束或該格子是否已被點擊
        // winnerId 不為 0 表示已有勝者
        // isGameEndedInTie 為 true 表示遊戲已平局
        // 使用 some() 方法檢查兩個玩家的步驟中是否包含當前點擊的格子索引
        if (winnerId || isGameEndedInTie || 
            Player.some(player => playerStepsMap[player].includes(index))) {
            return; // 該格子已被佔用
        }

        // 更新玩家步驟
        const newPlayerStepsMap = {
            ...playerStepsMap, // 保留其他玩家的步驟
            [currentPlayer]: [...playerStepsMap[currentPlayer], index] // 為當前玩家添加新的步驟
        };
        setPlayerStepsMap(newPlayerStepsMap); // 更新 state 中的 playerStepsMap

        // 切換玩家
        // 如果當前玩家是 Player[0]，則切換到 Player[1]，反之亦然
        setCurrentPlayer(currentPlayer === Player[0] ? Player[1] : Player[0]);
    };

    // 將 playerStepsMap 轉換為 squares 陣列
    const squares = Array(9).fill(null).map((_, index) => {
        // 創建一個長度為 9 的陣列，初始值均為 null
        // 使用 map 遍歷每個索引位置
        if (playerStepsMap["1"].includes(index)) return "1"; // 如果索引存在於玩家 1 的步驟中，返回 "1"
        if (playerStepsMap["-1"].includes(index)) return "-1"; // 如果索引存在於玩家 -1 的步驟中，返回 "-1"
        return ""; // 如果該索引位置未被任何玩家佔據，返回空字符串
    });

    return (
        <TicTacToeGame $isDarkMode={isDarkMode}>
            <div className="container">
                <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                    切換{isDarkMode ? '淺色' : '深色'}主題
                </button>
                <div className="information">資訊看板</div>
                <Squares 
                    squares={squares}
                    onSquareClick={handleSquareClick}
                    isDarkMode={isDarkMode}
                />
                <div className="actions">
                    <button onClick={() => restartGame()}>重新開始按鈕</button>
                    <button onClick={() => setIsSinglePlay(!isSinglePlay)}>切換按鈕</button>
                </div>
            </div>
        </TicTacToeGame>
    )
}

export default TicTacToe;