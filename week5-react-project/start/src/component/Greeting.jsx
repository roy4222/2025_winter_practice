import { useState } from "react";

function Greeting() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Roy422");

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>你好，{name}！</h2>
      <p>你按了 {count} 次</p>
      <button onClick={handleClick}>點我一下</button>
    </div>
  );
}

export default Greeting;
