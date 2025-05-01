"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "學習 Next.js", completed: false },
    { id: 2, text: "學習 Tailwind CSS", completed: false },
    { id: 3, text: "建立一個專案", completed: true },
  ]);
  
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
      },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">待辦事項清單</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="新增待辦事項..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors"
        >
          新增
        </button>
      </div>
      
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 mr-3 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span
                className={`${
                  todo.completed
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        共有 {todos.length} 個待辦事項，{todos.filter((t) => t.completed).length} 個已完成
      </div>
    </div>
  );
} 