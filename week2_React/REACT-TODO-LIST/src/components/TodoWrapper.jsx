import { useState } from "react"
import CreateForm from "./CreateForm"
import Todo from "./Todo"

// TodoWrapper 組件：管理整個待辦事項應用的主要組件
function TodoWrapper() {
    // 使用 useState hook 來管理待辦事項列表
    // todos: 當前的待辦事項列表
    // setTodos: 用來更新列表的函數
    const [todos, setTodos] = useState([
        {content:'吃飯', id:Math.random(), isCompleted:false, isEditing:false},
        {content:'睡覺', id:Math.random(), isCompleted:false, isEditing:false},
        {content:'寫作業', id:Math.random(), isCompleted:false, isEditing:false},
        {content:'打掃廁所', id:Math.random(), isCompleted:false, isEditing:false},
    ]);

    // addTodo: 添加新的待辦事項
    // 參數 todo: 新待辦事項的內容
    const addTodo = (todo) => {
        setTodos([
            ...todos,
            {
                content: todo,
                id: Math.random(),
                isCompleted: false,
                isEditing: false
            }
        ]);
    }

    // deleteTodo: 刪除指定 id 的待辦事項
    // 參數 id: 要刪除的待辦事項的 id
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    // toggleCompleted: 切換指定 id 待辦事項的完成狀態
    // 參數 id: 要切換狀態的待辦事項的 id
    const toggleCompleted = (id) => {
        setTodos(todos.map((todo) => 
            todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
        ));
    }

    // toggleEditing: 切換指定 id 待辦事項的編輯狀態
    // 參數 id: 要切換編輯狀態的待辦事項的 id
    const toggleEditing = (id) => {
        setTodos(todos.map((todo) => 
            todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo
        ));
    }

    // editTodo: 編輯指定 id 待辦事項的內容
    // 參數:
    //   id: 要編輯的待辦事項的 id
    //   newContent: 新的待辦事項內容
    const editTodo = (id, newContent) => {
        setTodos(todos.map((todo) => 
            todo.id === id ? {...todo, content: newContent, isEditing: false} : todo
        ));
    }
    
    // 渲染組件
    return (
        <div className="wrapper">
            <h1>代辦事項</h1>
            {/* CreateForm 組件用於創建新的待辦事項 */}
            <CreateForm addTodo={addTodo} />
            {/* 遍歷並渲染所有待辦事項 */}
            {todos.map((todo) => (
                <Todo 
                    key={todo.id} 
                    todo={todo} 
                    deleteTodo={deleteTodo} 
                    toggleCompleted={toggleCompleted} 
                    toggleEditing={toggleEditing} 
                    editTodo={editTodo}
                />
            ))}
        </div>
    )
}

export default TodoWrapper