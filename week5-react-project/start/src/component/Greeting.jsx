// Greeting 元件：用於顯示問候語和當前日期
function Greeting() {
    // 定義使用者名稱
    const name = "Roy";
    // 獲取當前日期並格式化為本地字符串
    const today = new Date().toLocaleDateString();
  
    // 渲染問候語和日期
    return (
      <div>
        {/* 顯示問候語，並插入使用者名稱 */}
        <h2>你好，{name}！</h2>
        {/* 顯示當前日期 */}
        <p>今天是 {today}</p>
      </div>
    );
  }
  
  // 導出 Greeting 元件，使其可以在其他檔案中被引用
  export default Greeting;