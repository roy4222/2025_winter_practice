// 從 React 中引入 useState hook
import { useState } from 'react'

// 子組件：顯示點擊次數
function ChildComponent({ clicks }) {
  return <div>{clicks}</div>;
}

// 定義 MyComponent 組件
function MyComponent() {
  // 使用 useState 創建 clicks 狀態變量和更新函數 setClicks，初始值為 0
  const [clicks, setClicks] = useState(0);

  // 定義點擊處理函數
  const handleClick = () => {
    // 更新 clicks 狀態，增加 1
    setClicks(clicks + 1);
    // 在控制台輸出當前的 clicks 值
    console.log(clicks);
  };

  // 渲染組件
  return (
    <>
      {/* 創建一個按鈕，顯示點擊次數，並綁定點擊事件處理函數 */}
      <button onClick={handleClick}>點擊次數:{clicks}</button>
      {/* 渲染子組件，傳遞 clicks 作為 prop */}
      <ChildComponent clicks={clicks} />  
    </>
  )
}

// 定義主 App 組件
function App() {
  // 渲染三個 MyComponent 實例
  return (
    <>
      <MyComponent />
      <MyComponent />
      <MyComponent />
    </>
  )
}

// 導出 App 組件作為默認導出
export default App
