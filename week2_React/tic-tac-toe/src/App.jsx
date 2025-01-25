// 導入全局樣式組件
import GlobalStyles from './styles/GlobalStyles'
// 導入井字遊戲組件
import TicTacToe from './components/TicTacToe'

// 定義 App 組件
function App() {
  // 返回 JSX
  return (
    <>
      <GlobalStyles />
      <TicTacToe />
    </>
  )
}

// 導出 App 組件作為默認導出
export default App
