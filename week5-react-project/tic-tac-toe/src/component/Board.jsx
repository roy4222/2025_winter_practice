// 引入 Square 元件
import Square from "./Square";

/**
 * 井字遊戲棋盤元件
 * @param {Array} squares - 九宮格當前狀態的陣列（長度為9）
 * @param {function} onClick - 處理格子點擊事件的回調函數
 */
function Board({ squares, onClick }) {
  return (
    <div>
      {/* 第一行棋盤 */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => onClick(0)} /> {/* 位置 0 */}
        <Square value={squares[1]} onSquareClick={() => onClick(1)} /> {/* 位置 1 */}
        <Square value={squares[2]} onSquareClick={() => onClick(2)} /> {/* 位置 2 */}
      </div>
      
      {/* 第二行棋盤 */}
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => onClick(3)} /> {/* 位置 3 */}
        <Square value={squares[4]} onSquareClick={() => onClick(4)} /> {/* 位置 4 */}
        <Square value={squares[5]} onSquareClick={() => onClick(5)} /> {/* 位置 5 */}
      </div>
      
      {/* 第三行棋盤 */}
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => onClick(6)} /> {/* 位置 6 */}
        <Square value={squares[7]} onSquareClick={() => onClick(7)} /> {/* 位置 7 */}
        <Square value={squares[8]} onSquareClick={() => onClick(8)} /> {/* 位置 8 */}
      </div>
    </div>
  );
}

export default Board;
