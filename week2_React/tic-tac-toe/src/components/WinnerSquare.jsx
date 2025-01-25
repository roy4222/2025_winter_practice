// 導入必要的庫
import styled, { keyframes } from 'styled-components';

// 定義更炫酷的勝利動畫
const celebrate = keyframes`
  0% {
    // 初始狀態：原始大小，無旋轉，設置文字陰影
    transform: scale(1) rotate(0deg);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de;
  }
  50% {
    // 中間狀態：放大1.2倍，旋轉180度，增強文字陰影
    transform: scale(1.2) rotate(180deg);
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de;
  }
  100% {
    // 結束狀態：恢復原始大小，旋轉360度，恢復初始文字陰影
    transform: scale(1) rotate(360deg);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de;
  }
`;

// 樣式化的獲勝格子組件
const StyledWinnerSquare = styled.div`
  // 應用動畫效果
  animation: ${celebrate} 1s ease-in-out infinite;
  // 設置文字顏色
  color: #fbf306;
  // 設置文字粗細
  font-weight: bold;
  // 設置文字大小
  font-size: 1.2em;
`;

// 獲勝格子組件
const WinnerSquare = ({ value, onClick, index }) => {
  return (
    <div className="square" onClick={() => onClick(index)}>
      <StyledWinnerSquare>
        {/* 根據value值顯示相應的符號 */}
        {value === "1" ? "O" : value === "-1" ? "X" : ""}
      </StyledWinnerSquare>
    </div>
  );
};

// 導出WinnerSquare組件
export default WinnerSquare;
