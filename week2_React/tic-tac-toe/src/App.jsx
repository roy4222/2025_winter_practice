// 從 React 中導入 useState hook，用於管理組件的狀態
import { useState } from 'react'
// 從 styled-components 導入 ThemeProvider，用於提供主題上下文
import { ThemeProvider } from 'styled-components'
// 從本地文件導入淺色和深色主題設置
import { lightTheme, darkTheme } from './styles/theme'
// 導入全局樣式組件
import GlobalStyles from './styles/GlobalStyles'
// 導入 App 組件的樣式
import './App.css'

// 定義 App 組件
function App() {
  // 使用 useState 創建一個狀態變量 isDarkMode 和對應的更新函數 setIsDarkMode
  // 初始值為 false，表示默認使用淺色主題
  const [isDarkMode, setIsDarkMode] = useState(false)

  // 根據 isDarkMode 的值選擇使用深色或淺色主題
  const theme = isDarkMode ? darkTheme : lightTheme

  // 返回 JSX
  return (
    // 使用 ThemeProvider 包裹整個應用，提供主題上下文
    <ThemeProvider theme={theme}>
      {/* 應用全局樣式 */}
      <GlobalStyles />
      {/* App 的主要容器 */}
      <div className="App">
        {/* 切換主題的按鈕 */}
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {/* 根據當前主題模式顯示相應的文字 */}
          切換{isDarkMode ? '淺色' : '深色'}主題
        </button>
        {/* 標題 */}
        <h1>Bable雛形</h1>
      </div>
    </ThemeProvider>
  )
}

// 導出 App 組件作為默認導出
export default App
