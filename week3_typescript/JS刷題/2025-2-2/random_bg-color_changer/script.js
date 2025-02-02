// 定義一個包含深色系十六進制顏色代碼的陣列
const darkColorsArr = [
  "#2C3E50",
  "#34495E",
  "#2C2C2C",
  "#616A6B",
  "#4A235A",
  "#2F4F4F",
  "#0E4B5A",
  "#36454F",
  "#2C3E50",
  "#800020",
];

// 定義一個函數，用於獲取陣列中的隨機索引
function getRandomIndex() {
  const randomIndex = Math.floor(darkColorsArr.length * Math.random());
  return randomIndex;
}

// 選取 body 元素和顯示顏色代碼的 span 元素
const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");

// 定義一個函數，用於更改背景顏色
function changeBackgroundColor() {
  // 獲取隨機顏色
  const color = darkColorsArr[getRandomIndex()];

  // 更新顏色代碼顯示和背景顏色
  bgHexCodeSpanElement.innerText = color;
  body.style.backgroundColor = color;
}

// 選取按鈕元素
const btn = document.querySelector("#btn");

// 為按鈕添加點擊事件，觸發更改背景顏色的函數
btn.onclick = changeBackgroundColor;