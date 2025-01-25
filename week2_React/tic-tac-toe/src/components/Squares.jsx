// 導入 React 庫，用於創建 React 組件
import React from 'react';
// 導入 styled-components 庫，用於創建樣式化組件
import styled from 'styled-components';

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
// 接收三個 props：squares（棋盤狀態數組）、onSquareClick（格子點擊事件處理函數）、isDarkMode（深色模式標誌）
const Squares = ({ squares, onSquareClick, isDarkMode }) => {
  return (
    // 渲染一個包含所有格子的容器 div
    <div className="squares">
      {/* 使用 map 函數遍歷 squares 數組，為每個元素創建一個 Square 組件 */}
      {squares.map((value, index) => (
        // 渲染 Square 組件
        <Square
          // 設置唯一的 key 屬性，幫助 React 識別每個組件
          key={index}
          // 傳遞當前格子的索引
          index={index}
          // 傳遞當前格子的值
          value={value}
          // 傳遞點擊事件處理函數
          onClick={onSquareClick}
          // 傳遞深色模式標誌
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};

// 導出 Squares 組件，使其可以在其他文件中被導入和使用
export default Squares;