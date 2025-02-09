// 計算平均值的函數
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

// 計算中位數的函數
const getMedian = (array) => {
    // 1. 對數組進行排序（確保數值是從小到大排列）
  const sorted = array.toSorted((a, b) => a - b);
  // 2. 計算中位數
  const median =
    sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 - 1]]) // 偶數長度時取中間兩個數的平均
      : sorted[Math.floor(sorted.length / 2)]; // 奇數長度時取中間的數
  return median;
}

// 計算眾數的函數
const getMode = (array) => {
  // 創建一個對象來存儲每個數字出現的次數
  const counts = {};
  // 遍歷數組，統計每個數字出現的次數
  array.forEach(el => counts[el] = counts[el] ? counts[el] + 1 : 1);
  console.log(counts);
  return counts;
}

// 主計算函數
const calculate = () => {
  // 獲取輸入框的值
  const value = document.querySelector("#numbers").value;
  // 將輸入值分割成數組
  const array = value.split(/,\s*/g);
  // 將字符串轉換為數字，並過濾掉非數字值
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
  // 計算平均值
  const mean = getMean(numbers);
  // 計算中位數
  const median = getMedian(numbers);
  // 計算眾數（目前只是打印結果）
  console.log(getMode(numbers));

  // 將結果顯示在頁面上
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
}
