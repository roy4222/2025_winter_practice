// 導入 React 庫，用於創建 React 組件
import React from 'react';
// 導入 styled-components 庫，用於創建樣式化組件
import styled from 'styled-components';
import WinnerSquare from './WinnerSquare';

// 定義單個格子組件
// 接收四個 props：index（格子索引）、value（格子值）、onClick（點擊事件處理函數）、isDarkMode（深色模式標誌）
const Square = ({ index, value, onClick, isDarkMode }) => {
  return (
    // 渲染一個 div 元素，代表棋盤上的一個格子
    <div 
      // 添加 "square" 類名，用於樣式設置
      className="square"
      // 當格子被點擊時，調用 onClick 函數並傳入當前格子的索引
      onClick={() => onClick(index)}
    >
      {/* 根據 value 的值顯示不同的內容：
          - 如果 value 為 "1"，顯示 "O"
          - 如果 value 為 "-1"，顯示 "X"
          - 如果 value 為其他值（通常是空值），不顯示任何內容 */}
      {value === "1" ? "O" : value === "-1" ? "X" : ""}
    </div>
  );
};

// 定義棋盤組件
// 接收props：squares（棋盤狀態數組）、onSquareClick（格子點擊事件處理函數）、isDarkMode（深色模式標誌）、winningSquares（獲勝格子數組）
const Squares = ({ squares, onSquareClick, isDarkMode, winningSquares }) => {
  return (
    // 渲染一個包含所有格子的容器 div
    <div className="squares">
      {/* 使用 map 函數遍歷 squares 數組，為每個元素創建一個 Square 組件 */}
      {squares.map((value, index) => (
        // 根據是否為獲勝格子來決定渲染WinnerSquare還是普通Square
        winningSquares?.includes(index) ? (
          <WinnerSquare
            key={index}
            index={index}
            value={value}
            onClick={onSquareClick}
          />
        ) : (
          <Square
            key={index}
            index={index}
            value={value}
            onClick={onSquareClick}
            isDarkMode={isDarkMode}
          />
        )
      ))}
    </div>
  );
};

// 導出 Squares 組件，使其可以在其他文件中被導入和使用
export default Squares;