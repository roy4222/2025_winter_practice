// AI模式的邏輯處理
const getAiMove = (squares, playerSteps, aiSteps) => {
  // 獲取所有空位
  const emptySquares = squares
    .map((square, index) => square === "" ? index : null)
    .filter(index => index !== null);

  // 如果沒有空位,返回null
  if (emptySquares.length === 0) return null;

  // 定義獲勝組合
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫向
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縱向
    [0, 4, 8], [2, 4, 6]  // 對角線
  ];

  // 檢查是否有機會獲勝
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    const aiCount = pattern.filter(pos => aiSteps.includes(pos)).length;
    const emptyCount = pattern.filter(pos => squares[pos] === "").length;
    
    // 如果AI已經佔據了兩個位置且第三個位置為空,則選擇該位置獲勝
    if (aiCount === 2 && emptyCount === 1) {
      const winningMove = pattern.find(pos => squares[pos] === "");
      return winningMove;
    }
  }

  // 檢查是否需要阻擋對手獲勝
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    const playerCount = pattern.filter(pos => playerSteps.includes(pos)).length;
    const emptyCount = pattern.filter(pos => squares[pos] === "").length;
    
    // 如果玩家已經佔據了兩個位置且第三個位置為空,則阻擋該位置
    if (playerCount === 2 && emptyCount === 1) {
      const blockingMove = pattern.find(pos => squares[pos] === "");
      return blockingMove;
    }
  }

  // 優先選擇中心位置
  if (squares[4] === "") {
    return 4;
  }

  // 其次選擇角落位置
  const corners = [0, 2, 6, 8];
  const emptyCorners = corners.filter(pos => squares[pos] === "");
  if (emptyCorners.length > 0) {
    return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
  }

  // 最後選擇邊緣位置
  const edges = [1, 3, 5, 7];
  const emptyEdges = edges.filter(pos => squares[pos] === "");
  if (emptyEdges.length > 0) {
    return emptyEdges[Math.floor(Math.random() * emptyEdges.length)];
  }

  // 如果上述策略都無法執行,隨機選擇一個空位
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

export default getAiMove;