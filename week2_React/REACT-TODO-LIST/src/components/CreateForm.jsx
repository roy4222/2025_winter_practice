// 引入 React 的 useState hook
import { useState } from "react";

// 定義 CreateForm 組件，接收 addTodo 函數作為 prop
function CreateForm({ addTodo }) {
    // 使用 useState hook 來管理輸入框的內容
    const [content, setContent] = useState("");

    // 定義處理表單提交的函數
    const handleSubmit = (e) => {
        e.preventDefault(); // 阻止表單的默認提交行為
        addTodo(content);   // 調用父組件傳遞的 addTodo 函數，添加新的待辦事項
        setContent("");     // 清空輸入框內容
    }

    // 渲染表單
    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="輸入代辦事項"
                value={content} 
                onChange={(e) => setContent(e.target.value)} // 當輸入內容變化時更新 state
            />
            <button type="submit">加入</button>
        </form>
    );
}

// 導出 CreateForm 組件
export default CreateForm;
