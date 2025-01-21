// 引入 React 圖標庫中的刪除和編輯圖標
import { MdDelete, MdEdit } from "react-icons/md";

// 定義 Todo 組件，接受 todo 對象和相關操作函數作為 props
function Todo({ todo , deleteTodo, editTodo , toggleCompleted}) {
    return (
        // 創建待辦事項容器，根據完成狀態添加 completed 類
        <div className={`todo ${todo.isCompleted ? "completed" : ""}`}>
            {/* 顯示待辦事項內容，點擊時切換完成狀態 */}
            <input 
                type="checkbox" 
                checked={todo.isCompleted}
                onChange={() => toggleCompleted(todo.id)}
                style={{ marginRight: "10px" }}
            />

            <p>{todo.content}</p>
            <div>
                {/* 編輯按鈕，點擊時調用 editTodo 函數 */}
                <MdEdit 
                    style={{cursor: "pointer"}} 
                    onClick={() => editTodo(todo.id)}
                />
                {/* 刪除按鈕，點擊時調用 deleteTodo 函數 */}
                <MdDelete 
                    style={{cursor: "pointer" , marginLeft: "5px"}} 
                    onClick={() => deleteTodo(todo.id)}
                />
            </div>
        </div>
    );
}

// 導出 Todo 組件
export default Todo;