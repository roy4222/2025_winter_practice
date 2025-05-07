'use client'; // 標記此組件為客戶端組件，允許使用 React hooks 和瀏覽器 API

import { useState, useEffect } from 'react'; // 引入 React hooks 用於狀態管理和副作用
import { getTodos, createTodo, toggleTodoCompletion, deleteTodo } from '../service/todoService'; // 引入待辦事項相關的服務函數
import { Todo } from './types'; // 引入待辦事項的類型定義
import { TodoList } from './components/TodoList'; // 引入顯示待辦事項列表的組件

export default function Home() {
  // 狀態管理
  const [todos, setTodos] = useState<Todo[]>([]); // 存儲待辦事項列表
  const [newTodoText, setNewTodoText] = useState(''); // 存儲新待辦事項的文字內容
  const [isLoading, setIsLoading] = useState(true); // 控制載入狀態
  const [error, setError] = useState<string | null>(null); // 存儲錯誤訊息

  // 組件掛載時載入待辦事項
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true); // 開始載入，設置載入狀態
        const todoList = await getTodos(); // 從服務中獲取待辦事項列表
        setTodos(todoList); // 更新待辦事項狀態
        setError(null); // 清除任何錯誤訊息
      } catch (err) {
        console.error('載入待辦事項失敗:', err); // 在控制台記錄錯誤
        setError('載入待辦事項時發生錯誤，請重試。'); // 設置用戶友好的錯誤訊息
      } finally {
        setIsLoading(false); // 無論成功或失敗，都結束載入狀態
      }
    };

    loadTodos(); // 執行載入函數
  }, []); // 空依賴數組表示僅在組件掛載時執行一次

  // 處理添加新待辦事項
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表單的默認提交行為
    if (!newTodoText.trim()) return; // 如果輸入為空或只有空格，則不執行

    try {
      const newTodo = await createTodo(newTodoText.trim()); // 創建新的待辦事項
      setTodos([newTodo, ...todos]); // 將新待辦事項添加到列表的開頭
      setNewTodoText(''); // 清空輸入框
    } catch (err) {
      console.error('添加待辦事項失敗:', err); // 在控制台記錄錯誤
      setError('新增待辦事項時發生錯誤，請重試。'); // 設置錯誤訊息
    }
  };

  // 處理切換待辦事項的完成狀態
  const handleToggleTodo = async (id: string) => {
    try {
      const todoToToggle = todos.find(todo => todo.id === id); // 找到要切換的待辦事項
      if (!todoToToggle) return; // 如果找不到，則退出

      await toggleTodoCompletion(id, !todoToToggle.completed); // 在資料庫中更新完成狀態
      
      // 更新本地狀態，將指定 ID 的待辦事項完成狀態取反
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (err) {
      console.error('更新待辦事項失敗:', err); // 在控制台記錄錯誤
      setError('更新待辦事項時發生錯誤，請重試。'); // 設置錯誤訊息
    }
  };

  // 處理刪除待辦事項
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id); // 從資料庫中刪除待辦事項
      setTodos(todos.filter(todo => todo.id !== id)); // 從本地狀態中移除該待辦事項
    } catch (err) {
      console.error('刪除待辦事項失敗:', err); // 在控制台記錄錯誤
      setError('刪除待辦事項時發生錯誤，請重試。'); // 設置錯誤訊息
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8"> {/* 主容器，設置最大寬度和邊距 */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8"> {/* 卡片容器，添加背景、圓角和陰影 */}
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">待辦事項清單</h1>
        
        {/* 條件渲染錯誤訊息 */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 mb-6 rounded-lg">
            {error}
          </div>
        )}
        
        {/* 添加新待辦事項的表單 */}
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTodoText}
            onChange={e => setNewTodoText(e.target.value)} // 更新輸入值
            placeholder="添加新的待辦事項..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            disabled={!newTodoText.trim()} // 如果輸入為空，禁用按鈕
          >
            新增
          </button>
        </form>
        
        {/* 條件渲染：載入中顯示旋轉動畫，否則顯示待辦事項列表 */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <TodoList 
            todos={todos} // 傳遞待辦事項列表
            onToggle={handleToggleTodo} // 傳遞切換完成狀態的處理函數
            onDelete={handleDeleteTodo} // 傳遞刪除待辦事項的處理函數
          />
        )}
      </div>
    </div>
  );
}
