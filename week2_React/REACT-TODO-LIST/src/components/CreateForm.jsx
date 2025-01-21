import { useState } from "react";

function CreateForm({ addTodo }) {

    const [content, setContent] = useState("");

    // 定義處理表單提交的函數
    const handleSubmit = (e) => {
        e.preventDefault(); // 阻止表單的默認提交行為
        addTodo(content);   // 調用父組件傳遞的 addTodo 函數，添加新的待辦事項
        setContent("");     // 清空輸入框內容
    }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="輸入代辦事項"
      value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">加入</button>
    </form>
  );
}

export default CreateForm;
