// 從 React 中引入 StrictMode 組件
import { StrictMode } from 'react'
// 從 react-dom/client 中引入 createRoot 函數
import { createRoot } from 'react-dom/client'
// 引入 App 組件
import App from './App.jsx'

// 創建根元素並渲染應用
createRoot(document.getElementById('root')).render(
  // 使用 StrictMode 包裹應用，以啟用額外的開發時檢查
  <StrictMode>
    {/* 渲染 App 組件 */}
    <App />
  </StrictMode>,
)
