// 獲取排序按鈕元素
const sortButton = document.getElementById("sort");

// 定義排序輸入數組的函數
const sortInputArray = (event) => {
  // 防止表單默認提交行為
  event.preventDefault();

  // 獲取所有下拉選單的值，並轉換為數字數組
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));

  // 更新UI顯示
  updateUI(inputValues);
}

// 更新UI的函數
const updateUI = (array = []) => {
  // 遍歷數組，更新每個輸出值的顯示
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })
}

// 冒泡排序函數（待實現）
const bubbleSort = (array) => {
  // 冒泡排序邏輯將在這裡實現
}

// 為排序按鈕添加點擊事件監聽器
sortButton.addEventListener("click", sortInputArray);