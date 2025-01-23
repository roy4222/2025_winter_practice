// 引入 React 的 useState hook
import { useState } from 'react'
// 引入 CounterControls 組件
import CounterControls from './CounterControls'

// Counter 組件：顯示計數值並包含控制按鈕
function Counter() {
    // 使用 useState hook 來管理計數狀態
    // count 是當前的計數值，setCount 是用來更新計數的函數
    const [count, setCount] = useState(0)

    // 渲染 Counter 組件
    return (
        <div>
            {/* 渲染 CounterControls 組件，傳遞 count 和 setCount 作為 props */}
            <CounterControls count={count} setCount={setCount} />
        </div>
    )
}

// 導出 Counter 組件以供其他文件使用
export default Counter