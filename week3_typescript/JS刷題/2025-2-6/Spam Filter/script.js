// 獲取 DOM 元素
const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");

// 定義不同類型的垃圾郵件正則表達式
const helpRegex = /please help|assist me/i; // 匹配求助類型的垃圾郵件
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i; // 匹配金錢相關的垃圾郵件
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i; // 匹配免費金錢類型的垃圾郵件
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i; // 匹配股票警報類型的垃圾郵件
const dearRegex = /(?:^|\s)d[e3][a@4]r\s+fr[i1|][e3]nd(?:$|\s)/i; // 匹配親愛的朋友類型的垃圾郵件

// 將所有正則表達式放入一個陣列中
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// 定義判斷是否為垃圾郵件的函數
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

// 為檢查按鈕添加點擊事件監聽器
checkMessageButton.addEventListener("click", () => {
  // 檢查輸入是否為空
  if (messageInput.value === "") {
    alert("請輸入一條訊息。");
    return;
  }

  // 判斷輸入是否為垃圾郵件並顯示結果
  result.textContent = isSpam(messageInput.value)
    ? "噢不！這看起來像是一條垃圾訊息。"
    : "這條訊息似乎不包含任何垃圾內容。";
  
  // 清空輸入框
  messageInput.value = "";
});