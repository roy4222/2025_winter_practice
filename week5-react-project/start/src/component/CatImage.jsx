// 引入 React 的 useState 和 useEffect Hooks
import { useState, useEffect } from "react";

// 定義 CatImage 組件
function CatImage() {
  // 使用 useState 來儲存貓咪圖片的 URL
  const [catUrl, setCatUrl] = useState("");

  // 使用 useEffect 在組件載入時獲取貓咪圖片
  useEffect(() => {
    // 從 The Cat API 獲取隨機貓咪圖片
    fetch("https://api.thecatapi.com/v1/images/search")
      // 將回應轉換為 JSON 格式
      .then((response) => response.json())
      // 設置貓咪圖片的 URL
      .then((data) => {
        setCatUrl(data[0].url);
      });
  }, []); // 空陣列表示只在組件首次載入時執行

  // 渲染組件
  return (
    <div>
      <h3>隨機貓咪圖片 🐱</h3>
      {/* 當 catUrl 存在時才顯示圖片 */}
      {catUrl && <img src={catUrl} alt="Random Cat" width="300" />}
    </div>
  );
}

// 導出組件
export default CatImage;
