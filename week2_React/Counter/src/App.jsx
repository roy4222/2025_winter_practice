import Counter from './components/Counter'

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
