// 導入全局樣式組件
import GlobalStyles from './styles/GlobalStyles'
// 導入井字遊戲組件
import SnakeGame from './components/SnakeGame'
import { ThemeProvider } from 'styled-components'
import { pinkPurpleTheme, pinkPurpleDarkTheme } from './styles/theme'
import { useState } from 'react'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const theme = isDarkMode ? pinkPurpleDarkTheme : pinkPurpleTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SnakeGame isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </ThemeProvider>
  )
}

export default App
