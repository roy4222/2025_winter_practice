/**
 * 井字遊戲的單個格子元件
 * @param {string} value - 格子當前顯示的值（'X'、'O' 或 null）
 * @param {function} onSquareClick - 點擊格子時觸發的回調函數
 */
function Square({value, onSquareClick}) {
    return (
        <button 
            className="square" 
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

export default Square;
