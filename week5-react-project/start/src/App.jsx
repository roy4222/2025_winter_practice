import './App.css'
import MyButton from './component/MyButton'
import Greeting from './component/Greeting'
import Counter from './component/Counter'
import CatImage from './component/CatImage'

function App() {
  return (
    <div>
      <h1>Hello, Roy!</h1>
      <p>歡迎來到你的第一個 React 專案 🎉</p>
      <MyButton />
      <Greeting />
      <Counter />
      <CatImage />
    </div>
  );
}

export default App;
