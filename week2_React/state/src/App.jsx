// 定義一個包含任務的陣列，每個任務都是一個物件
const tasks = [
  { id: 1, name: 'Do laundry', completed: true },
  { id: 2, name: 'Write code', completed: false },
  { id: 3, name: 'Read book', completed: true },
];

// 定義 App 組件
function App() {
  return (
    <ul>
      {tasks
        // 過濾出已完成的任務
        .filter((task) => task.completed)
        // 將過濾後的任務映射為 li 元素
        .map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
    </ul>
  );
}

// 導出 App 組件作為默認導出
export default App;
