import { useState } from "react"
import CreateForm from "./CreateForm"
import Todo from "./Todo"

function TodoWrapper() {

    // 使用 useState hook 來管理待辦事項列表
    // todos 是當前的待辦事項列表，setTodos 是用來更新列表的函數
    const [todos, setTodos] = useState([
        {content:'吃飯', id:Math.random(),isCompleted:false},     // 初始化一些待辦事項
        {content:'睡覺', id:Math.random(),isCompleted:false},     // 每個待辦事項都有內容和唯一的 id
        {content:'寫作業', id:Math.random(),isCompleted:false},   // id 使用 Math.random() 生成，確保唯一性
        {content:'打掃廁所', id:Math.random(),isCompleted:false}, // 這種方式在實際應用中可能需要更可靠的 id 生成方法
    ]);

    // 定義 addTodo 函數，接受一個 todo 參數（新的待辦事項內容）
    const addTodo = (todo) => {
        // 使用 setTodos 函數更新 todos 狀態
        // 創建一個新的陣列，包含所有現有的待辦事項 (...todos)
        // 並在末尾添加一個新的待辦事項對象
        setTodos([
            ...todos,
            {
                content: todo,  // 新待辦事項的內容
                id: Math.random()  // 生成一個隨機 ID（注意：在實際應用中應使用更可靠的 ID 生成方法）
            }
        ]);
    }

    // 刪除指定 id 的待辦事項
    const deleteTodo = (id) => {
        // 使用 filter 方法創建新的陣列，排除指定 id 的待辦事項
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    // 切換指定 id 待辦事項的完成狀態
    const toggleCompleted = (id) => {
        // 使用 map 方法創建新的陣列，修改指定 id 待辦事項的狀態
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                // 如果 id 匹配，創建新對象並反轉 isCompleted 狀態
                return {...todo, isCompleted: !todo.isCompleted}
            }
            // 如果 id 不匹配，保持原樣
            return todo
        }))
    }

    return (
        <div className="wrapper">
            <h1>代辦事項</h1>
            <CreateForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted}/>
            ))}
        </div>
    )
}

export default TodoWrapper