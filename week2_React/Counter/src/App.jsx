// 導入 React 的 useState hook
import { useState } from 'react'
// 導入 App 組件的樣式
import './App.css'

// Counter 組件：實現一個簡單的計數器功能
function Counter() {
  // 使用 useState hook 來管理計數狀態
  // count: 當前計數值
  // setCount: 更新計數值的函數
  const [count, setCount] = useState(0)

  // 處理增加按鈕點擊事件的函數
  const handleIncrement = () => {
    console.log(count) // 在控制台輸出當前計數值
    setCount(count + 1) // 將計數值加 1
  }

  // 處理減少按鈕點擊事件的函數
  const handleDecrement = () => {
    console.log(count) // 在控制台輸出當前計數值
    setCount(count - 1) // 將計數值減 1
  }

  // 渲染計數器 UI
  return (
    <>
      <div>
        {/* 減少按鈕：點擊時將計數值減 1 */}
        <button onClick={handleDecrement}>-</button>

        {/* 顯示當前計數值 */}
        <span>{count}</span>

        {/* 增加按鈕：點擊時將計數值加 1 */}
        <button onClick={handleIncrement}>+</button>  
      </div>
    </>
  )
}

// App 組件：應用的主要組件
function App() {
  // 渲染 App 組件的 UI
  return (
    <>
      {/* 在 App 中渲染 Counter 組件 */}
      <Counter />
    </>
  )
}

// 導出 App 組件作為默認導出，以便在其他文件中導入使用
export default App
