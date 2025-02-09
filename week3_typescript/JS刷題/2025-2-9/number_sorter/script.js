// 獲取排序按鈕元素
const sortButton = document.getElementById("sort");

// 定義排序輸入數組的函數
const sortInputArray = (event) => {
  event.preventDefault(); // 阻止表單默認提交行為

  // 獲取所有下拉菜單的值並轉換為數字數組
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));

  // 使用內建的sort方法對數組進行排序
  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });

  // 更新UI以顯示排序後的結果
  updateUI(sortedValues);
}

// 更新UI的函數
const updateUI = (array = []) => {
  // 遍歷排序後的數組，更新對應的輸出元素
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })
}

// 冒泡排序算法--逐步交換相鄰元素，把最大值「冒泡」到最右邊 
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        // 交換相鄰元素
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

// 選擇排序算法--找到最小值後交換，每次固定一個最小值
const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    // 找到剩餘未排序元素中的最小值
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    // 將找到的最小值與當前位置交換
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
}

// 插入排序算法--從第二個數開始，把當前數插入到前面正確的位置
const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;
    // 將當前元素插入到已排序部分的正確位置
    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }
  return array;
}

// 為排序按鈕添加點擊事件監聽器
sortButton.addEventListener("click", sortInputArray);