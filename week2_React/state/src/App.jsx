// 引入 React 和 useState hook
import React, { useState } from 'react';

function App() {
  // 初始化任務列表狀態
  const [tasks, setTasks] = useState([
    { id: 1, name: '洗衣服', completed: false },
    { id: 2, name: '寫程式', completed: false },
    { id: 3, name: '讀書', completed: false },
  ]);

  // 初始化新任務名稱狀態
  const [newTaskName, setNewTaskName] = useState('');

  // 添加新任務的函數
  const addTask = () => {
    if (newTaskName.trim() !== '') {
      // 創建新任務並添加到任務列表
      setTasks([...tasks, { id: Date.now(), name: newTaskName, completed: false }]);
      // 清空輸入框
      setNewTaskName('');
    }
  };

  // 切換任務完成狀態的函數
  const toggleTask = (id) => {
    // 更新指定任務的完成狀態
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // 刪除任務的函數
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      {/* 輸入新任務的文本框 */}
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="輸入新任務"
      />
      {/* 添加新任務的按鈕 */}
      <button onClick={addTask}>添加任務</button>
      
      {/* 任務列表 */}
      <ul>
        {/* 使用 map 函數遍歷所有任務並渲染 */}
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {/* 任務名稱，點擊可切換完成狀態 */}
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                cursor: 'pointer',
                textDecoration: task.completed ? 'line-through' : 'none', // 完成的任務會有刪除線
                marginRight: '10px'
              }}
            >
              {task.name}
            </span>
            
            {/* 完成狀態指示器 */}
            <span>{task.completed ? '✅' : '❌'}</span>
            
            {/* 刪除按鈕 */}
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px' }}>
              刪除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 導出 App 組件
export default App;
