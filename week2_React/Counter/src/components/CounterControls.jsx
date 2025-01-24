// CounterControls 組件：控制計數器的按鈕
import PropTypes from 'prop-types'

// CounterControls 函數組件，接收 count 和 setCount 作為 props
function CounterControls({ count, setCount }) {
    // 減少計數的函數
    const decrement = () => {
        // 使用函數式更新來確保使用最新的 state
        setCount(prevCount => prevCount - 1)
    }

    // 增加計數的函數
    const increment = () => {
        // 使用函數式更新來確保使用最新的 state
        setCount(prevCount => prevCount + 1)
    }

    // 重置計數的函數
    const reset = () => {
        // 輸出當前計數到控制台
        console.log(count)
        // 將計數重置為 0
        setCount(0)
    }

    // 渲染 CounterControls 組件的 UI
    return (
        <div>
            {/* 減少按鈕：點擊時調用 decrement 函數 */}
            <button onClick={decrement}>-</button>
            {/* 顯示當前計數值 */}
            <span>{count}</span>
            {/* 增加按鈕：點擊時調用 increment 函數 */}
            <button onClick={increment}>+</button>
            {/* 重置按鈕：點擊時調用 reset 函數 */}
            <button onClick={reset}>重置</button>
        </div>
    )
}

// 定義 PropTypes 以進行類型檢查
CounterControls.propTypes = {
    count: PropTypes.number.isRequired, // count 必須是數字類型
    setCount: PropTypes.func.isRequired // setCount 必須是函數類型
}

// 導出 CounterControls 組件以供其他文件使用
export default CounterControls