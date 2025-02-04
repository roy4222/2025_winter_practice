// 獲取顯示當前日期的段落元素和日期格式選擇下拉選單元素
const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

// 創建一個新的 Date 對象
const date = new Date();
// 獲取當前日期的各個部分
const day = date.getDate();
const month = date.getMonth() + 1; // 月份從 0 開始，所以要加 1
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

// 格式化日期為 "日-月-年" 格式
const formattedDate = `${day}-${month}-${year}`;
// 將格式化的日期顯示在段落元素中
currentDateParagraph.textContent = formattedDate;

// 為日期格式選擇下拉選單添加 change 事件監聽器
dateOptionsSelectElement.addEventListener("change", () => {
  // 根據選擇的選項更改日期顯示格式
  switch (dateOptionsSelectElement.value) {
    case "yyyy-mm-dd":
      // 將日期格式轉換為 "年-月-日"
      currentDateParagraph.textContent = formattedDate
        .split("-")
        .reverse()
        .join("-");
      break;
    case "mm-dd-yyyy-h-mm":
      // 顯示完整日期時間格式
      currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
      break;
    default:
      // 默認顯示原始格式 "日-月-年"
      currentDateParagraph.textContent = formattedDate;
  }
});
