'use client'; // 標記此組件為客戶端組件，允許使用互動功能

import { Todo } from '../types'; // 引入待辦事項的類型定義
import { TodoItem } from './TodoItem'; // 引入單個待辦事項組件

// 定義 TodoList 組件的 props 介面
interface TodoListProps {
  todos: Todo[]; // 待辦事項陣列
  onToggle: (id: string) => void; // 切換待辦事項完成狀態的回調函數
  onDelete: (id: string) => void; // 刪除待辦事項的回調函數
}

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  // 如果沒有待辦事項，顯示空狀態提示
  if (todos.length === 0) {
    return (
      <div className="py-8 text-center">
        {/* 空狀態圖標 */}
        <svg 
          className="w-16 h-16 mx-auto text-gray-400 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
          />
        </svg>
        {/* 空狀態主要提示文字 */}
        <p className="text-gray-700 text-lg font-medium">目前沒有待辦事項</p>
        {/* 空狀態次要提示文字 */}
        <p className="text-gray-600 text-sm mt-1">添加一些任務開始使用</p>
      </div>
    );
  }

  // 如果有待辦事項，渲染待辦事項列表
  return (
    <div className="space-y-2">
      {/* 使用 map 方法遍歷待辦事項陣列，為每個待辦事項渲染一個 TodoItem 組件 */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // 使用唯一 ID 作為 key，幫助 React 高效更新
          todo={todo} // 傳遞待辦事項數據
          onToggle={onToggle} // 傳遞切換完成狀態的處理函數
          onDelete={onDelete} // 傳遞刪除待辦事項的處理函數
        />
      ))}
    </div>
  );
};
