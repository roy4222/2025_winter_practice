// 獲取卡路里計數器表單元素
const calorieCounter = document.getElementById('calorie-counter');
// 獲取預算輸入框元素
const budgetNumberInput = document.getElementById('budget');
// 獲取條目下拉選單元素
const entryDropdown = document.getElementById('entry-dropdown');
// 獲取添加條目按鈕元素
const addEntryButton = document.getElementById('add-entry');
// 獲取清除按鈕元素
const clearButton = document.getElementById('clear');
// 獲取輸出區域元素
const output = document.getElementById('output');
// 初始化錯誤標誌
let isError = false;

// 清理輸入字符串，移除加號、減號和空白字符
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

// 檢查輸入是否為無效的科學記數法格式
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

// 添加新的條目到指定的輸入容器中
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);

}