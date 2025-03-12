import { useState } from "react";
import Board from "./component/Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `勝者：${winner}`;
  } else {
    status = `輪到玩家：${xIsNext ? "X" : "O"}`;
  }

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <p>{status}</p>
      <Board squares={squares} onClick={handleClick} />
      <button onClick={() => setSquares(Array(9).fill(null))}>重新開始</button>
    </div>
  );
}

export default Game;
