import { useState } from "react";

// EditForm 組件：用於編輯待辦事項
// 接收 todo 對象和 editTodo 函數作為 props
function EditForm({todo, editTodo}) {
    // 使用 useState 鉤子來管理輸入框的內容
    // 初始值設為傳入的 todo 的內容
    const [content, setContent] = useState(todo.content);

    // 處理表單提交的函數
    const handleSubmit = (e) => {
        e.preventDefault();           // 阻止表單的默認提交行為
        editTodo(todo.id, content);   // 調用父組件的 editTodo 函數來更新待辦事項
        setContent("");               // 清空輸入框內容
    }

    // 渲染編輯表單
    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="輸入修改內容"
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
            />
            <button type="submit">完成</button>
        </form>
    );
}

// 導出 EditForm 組件
export default EditForm;
