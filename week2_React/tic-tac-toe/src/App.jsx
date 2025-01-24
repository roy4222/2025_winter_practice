import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import { useTheme } from './hooks/useTheme'
import { Card, CardTitle, CardContent, CardActions } from './components/Card'
import StyledButton from './components/StyledButton'
import './App.css'

function App() {
  const { theme, toggleTheme, resetToSystemPreference } = useTheme()
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <div className="App">
        <h1>Bable雛形</h1>
        
        {/* 主題切換按鈕 */}
        <div style={{ marginBottom: '2rem' }}>
          <StyledButton onClick={toggleTheme} style={{ marginRight: '1rem' }}>
            切換為{theme === 'light' ? '深色' : '淺色'}主題
          </StyledButton>
          <StyledButton variant="secondary" onClick={resetToSystemPreference}>
            重置為系統預設
          </StyledButton>
        </div>

        {/* 展示不同變體的卡片 */}
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <Card>
            <CardTitle>基本卡片</CardTitle>
            <CardContent>
              這是一個基本的卡片組件，展示了主題系統的基本用法。
            </CardContent>
          </Card>

          <Card variant="elevated" animated>
            <CardTitle>進階卡片</CardTitle>
            <CardContent>
              這個卡片使用了陰影效果和動畫效果。
            </CardContent>
            <CardActions>
              <StyledButton variant="secondary">取消</StyledButton>
              <StyledButton>確認</StyledButton>
            </CardActions>
          </Card>

          <Card variant="outlined">
            <CardTitle>邊框卡片</CardTitle>
            <CardContent>
              這是一個使用邊框樣式的卡片，沒有陰影效果。
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
