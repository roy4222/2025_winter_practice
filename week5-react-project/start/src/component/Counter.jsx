import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>計數器</h3>
      <p>當前數字：{count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>減少</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  );
}

export default Counter;
