import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Greeting from "./component/Greeting";
import Counter from "./component/Counter";
import CatImage from "./component/CatImage";

function App() {
  return (
    <div>
      <h1>Hello, Ping!</h1>
      <nav>
        <Link to="/">首頁</Link> | <Link to="/about">關於我們</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Greeting />
      <Counter />
      <CatImage />
    </div>
  );
}

export default App;
