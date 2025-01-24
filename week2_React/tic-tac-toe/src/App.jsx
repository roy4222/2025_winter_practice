import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          切換{isDarkMode ? '淺色' : '深色'}主題
        </button>
        <h1>Vite + React + Styled Components</h1>
        <div className="card">
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
