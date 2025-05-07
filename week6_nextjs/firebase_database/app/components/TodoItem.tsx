'use client'; // 標記此組件為客戶端組件，允許使用事件處理

import { Todo } from '../types'; // 引入待辦事項的類型定義

// 定義 TodoItem 組件的 props 介面
interface TodoItemProps {
  todo: Todo;                 // 待辦事項物件
  onToggle: (id: string) => void; // 切換待辦事項完成狀態的回調函數
  onDelete: (id: string) => void; // 刪除待辦事項的回調函數
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center gap-3 py-3 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors">
      {/* 自定義勾選框 */}
      <div 
        onClick={() => onToggle(todo.id)} // 點擊時觸發切換完成狀態
        className={`w-5 h-5 rounded-full border flex-shrink-0 cursor-pointer flex items-center justify-center
          ${todo.completed 
            ? 'bg-indigo-600 border-indigo-600' // 已完成狀態的樣式
            : 'border-gray-400 hover:border-indigo-500'}`} // 未完成狀態的樣式
      >
        {/* 當待辦事項完成時顯示勾選圖標 */}
        {todo.completed && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 text-white" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
      </div>

      {/* 待辦事項的內容文字 */}
      <span 
        className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900 font-medium'}`}
        onClick={() => onToggle(todo.id)} // 點擊文字也可以切換完成狀態
      >
        {todo.content}
      </span>

      {/* 刪除按鈕 */}
      <button
        onClick={() => onDelete(todo.id)} // 點擊時觸發刪除操作
        className="text-gray-500 hover:text-rose-600 transition-colors"
        aria-label="刪除" // 無障礙標籤
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h10a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
    </div>
  );
};
