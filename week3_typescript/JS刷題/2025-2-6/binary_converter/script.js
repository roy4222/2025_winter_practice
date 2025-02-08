// 獲取DOM元素
const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// 定義動畫數據
const animationData = [
  {
    inputVal: 5,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) 返回 "10" + 1 (5 % 2)。然後從堆疊中彈出。',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) 返回 "1" + 0 (2 % 2) 並將該值傳給下方堆疊。然後從堆疊中彈出。',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    addElDelay: 2000,
    msg: "decimalToBinary(1) 返回 '1' (基本情況) 並將該值傳給下方堆疊。然後從堆疊中彈出。",
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];

// 十進制轉二進制的遞迴函數
const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

// 顯示動畫的函數
const showAnimation = () => {
  result.innerText = "堆疊調用動畫";

  animationData.forEach((obj) => {
    // 添加動畫框
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    // 更新消息
    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    // 移除動畫框
    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  // 顯示最終結果
  setTimeout(() => {
    result.textContent = decimalToBinary(5);
  }, 20000);
};

// 檢查用戶輸入並處理
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  // 驗證輸入
  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("請輸入一個大於或等於0的十進制數字");
    return;
  }

  // 如果輸入為5，顯示動畫
  if (inputInt === 5) {
    showAnimation();
    return;
  }

  // 顯示轉換結果
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

// 為轉換按鈕添加點擊事件監聽器
convertBtn.addEventListener("click", checkUserInput);

// 為輸入框添加按鍵事件監聽器
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});