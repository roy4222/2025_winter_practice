// CounterControls 組件：控制計數器的按鈕
function CounterControls({ count, setCount }) {
    // 減少計數的函數
    const decrement = () => {
        console.log(count)
        setCount(count - 1)
    }

    // 增加計數的函數
    const increment = () => {
        console.log(count)
        setCount(count + 1)
    }

    // 重置計數的函數
    const reset = () => {
        console.log(count)
        setCount(0)
    }

    // 渲染按鈕
    // 渲染 CounterControls 組件的 UI
    return (
        <div>
            {/* 減少按鈕 */}
            <button onClick={decrement}>-</button>
            {/* 顯示當前計數值 */}
            <span>{count}</span>
            {/* 增加按鈕 */}
            <button onClick={increment}>+</button>
            {/* 重置按鈕 */}
            <button onClick={reset}>重置</button>
        </div>
    )
}

// 導出 CounterControls 組件
export default CounterControls