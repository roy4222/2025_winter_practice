// 獲取DOM元素
const calorieCounter = document.getElementById('calorie-counter');  // 卡路里計數器表單
const budgetNumberInput = document.getElementById('budget');  // 預算輸入框
const entryDropdown = document.getElementById('entry-dropdown');  // 添加條目下拉選單
const addEntryButton = document.getElementById('add-entry');  // 添加條目按鈕
const clearButton = document.getElementById('clear');  // 清除按鈕
const output = document.getElementById('output');  // 輸出結果區域

// 錯誤標誌
let isError = false;

/**
 * 清理輸入字符串
 * @param {string} str - 要清理的輸入字符串
 * @returns {string} 清理後的字符串
 */
function cleanInputString(str) {
  const regex = /[+-\s]/g;  // 匹配加號、減號和空白字符的正則表達式
  return str.replace(regex, '');  // 移除所有匹配的字符
}

/**
 * 檢查輸入是否無效（包含科學記數法）
 * @param {string} str - 要檢查的輸入字符串
 * @returns {boolean} 如果輸入無效則返回true，否則返回false
 */
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;  // 匹配科學記數法的正則表達式（不區分大小寫）
  return str.match(regex);  // 如果找到匹配項，則返回匹配結果，否則返回null
}

/**
 * 添加新的條目到選定的類別中
 */
function addEntry() {
  // 根據下拉選單的值選擇目標輸入容器
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  
  // 計算當前條目數量，用於生成新條目的編號
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  
  // 生成新條目的HTML字符串
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  
  // 將新的HTML插入到目標容器的末尾
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(e) {
  e.preventDefault();  // 防止表單默認提交行為
  isError = false;  // 重置錯誤標誌

  // 獲取各類別的卡路里輸入框
  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");

  // 計算各類別的卡路里總和
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  // 如果有錯誤，提前結束函數
  if (isError) {
    return;
  }

  // 計算消耗的卡路里總和
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  // 計算剩餘卡路里（預算 - 消耗 + 運動）
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  // 判斷是卡路里盈餘還是赤字
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
  
  // 生成結果HTML
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  // 顯示結果
  output.classList.remove('hide');
}

/**
 * 從輸入列表中獲取總卡路里數
 * @param {HTMLInputElement[]} list - 輸入元素列表
 * @returns {number|null} 總卡路里數，如果輸入無效則返回null
 */
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    // 清理並驗證每個輸入值
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    // 如果發現無效輸入，顯示警告並中止計算
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    
    // 累加有效的卡路里值
    calories += Number(currVal);
  }
  
  // 返回總卡路里數
  return calories;
}

// 清除表單的函數
function clearForm() {
  // 獲取所有輸入容器元素並轉換為數組
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  // 遍歷每個輸入容器
  for (const container of inputContainers) {
    // 清空容器內的所有內容
    container.innerHTML = '';
  }

  // 清空預算輸入框的值
  budgetNumberInput.value = '';

  // 隱藏輸出結果區域
  output.classList.add('hide');
}
// 為添加條目按鈕添加點擊事件監聽器，當點擊時調用 addEntry 函數
addEntryButton.addEventListener("click", addEntry);

// 為卡路里計數器表單添加提交事件監聽器，當提交時調用 calculateCalories 函數
calorieCounter.addEventListener("submit", calculateCalories);