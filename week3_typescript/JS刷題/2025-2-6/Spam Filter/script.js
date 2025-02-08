// 獲取DOM元素
const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");

// 定義正則表達式

// 匹配包含 "please help" 或 "assist me" 的文本，不區分大小寫
// i 標誌表示不區分大小寫
// | 符號表示 "或"，可以匹配兩個短語中的任何一個
const helpRegex = /please help|assist me/i;

// 匹配包含 "dollars" 的文本，不區分大小寫
// i 標誌表示不區分大小寫
const dollarRegex = /dollars/i;

// 建立拒絕列表，包含所有需要檢查的正則表達式
const denyList = [helpRegex, dollarRegex];

// 檢查消息是否為垃圾郵件的函數
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

// 為檢查按鈕添加點擊事件監聽器
checkMessageButton.addEventListener("click", () => {
  // 檢查輸入是否為空
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }

  // 檢查消息並顯示結果
  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  
  // 清空輸入框
  messageInput.value = "";
});