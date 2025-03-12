import { useState } from "react";
import Board from "./component/Board";

/**
 * 判斷遊戲勝負的函式
 * @param {Array} squares - 九宮格當前狀態的陣列
 * @returns {string|null} 返回勝者符號('X'/'O')或null(無勝者)
 */
function calculateWinner(squares) {
  // 所有可能的勝利連線組合
  const lines = [
    [0, 1, 2], // 第一橫排
    [3, 4, 5], // 第二橫排
    [6, 7, 8], // 第三橫排
    [0, 3, 6], // 第一豎排
    [1, 4, 7], // 第二豎排
    [2, 5, 8], // 第三豎排
    [0, 4, 8], // 左上到右下對角線
    [2, 4, 6], // 右上到左下對角線
  ];
  
  // 檢查所有勝利組合
  for (let line of lines) {
    const [a, b, c] = line;
    // 如果三個位置的值相同且不為空，則返回勝者
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null; // 無勝者時返回null
}

/**
 * 遊戲主元件，管理遊戲狀態和邏輯
 */
function Game() {
  // 遊戲狀態：九宮格陣列，初始值為9個null
  const [squares, setSquares] = useState(Array(9).fill(null));
  // 玩家切換狀態：true表示下一個玩家是X
  const [xIsNext, setXIsNext] = useState(true);

  /**
   * 處理格子點擊事件
   * @param {number} index - 被點擊的格子索引(0-8)
   */
  function handleClick(index) {
    // 如果格子已有值或已有勝者，則不處理點擊
    if (squares[index] || calculateWinner(squares)) return;
    
    // 建立新的陣列副本（不可變性原則）
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O"; // 根據當前玩家設置符號
    
    // 更新狀態並切換玩家
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // 計算遊戲狀態
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `勝者：${winner}`; // 顯示勝者
  } else {
    status = `輪到玩家：${xIsNext ? "X" : "O"}`; // 顯示下一位玩家
  }

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <p>{status}</p>
      {/* 棋盤元件 */}
      <Board squares={squares} onClick={handleClick} />
      {/* 重新開始按鈕：重置九宮格狀態 */}
      <button onClick={() => setSquares(Array(9).fill(null))}>重新開始</button>
    </div>
  );
}

export default Game;
