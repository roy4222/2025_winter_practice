// 選取DOM元素
const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

// 初始化遊戲狀態
let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

// 擲骰子函數
const rollDice = () => {
  // 初始化骰子值數組
  diceValuesArr = [];

  // 生成5個隨機骰子值
  for (let i = 0; i < 5; i++) {
    // 生成1到6之間的隨機整數
    const randomDice = Math.floor(Math.random() * 6) + 1;
    // 將生成的值添加到數組中
    diceValuesArr.push(randomDice);
  };

  // 更新DOM中的骰子顯示
  listOfAllDice.forEach((dice, index) => {
    // 將每個骰子元素的文本內容設置為對應的隨機值
    dice.textContent = diceValuesArr[index];
  });
};

// 更新遊戲統計信息
const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

// 更新單個分數選項
const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

// 更新總分和分數歷史
const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

// 重置所有分數選項
const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });

  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

// 檢測最高重複骰子數並更新相應選項
const getHighestDuplicates = (arr) => {
  // 創建一個對象來存儲每個數字出現的次數
  const counts = {};

  // 遍歷數組，計算每個數字出現的次數
  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  let highestCount = 0;

  // 再次遍歷數組，找出出現次數最多的數字（至少出現3次）
  for (const num of arr) {
    const count = counts[num];
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
  }

  // 計算所有骰子的總和
  const sumOfAllDice = arr.reduce((a, b) => a + b, 0);

  // 如果有四個或更多相同的骰子，更新"四條"選項
  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice);
  }

  // 如果有三個或更多相同的骰子，更新"三條"選項
  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice);
  }
};

// 檢測葫蘆
const detectFullHouse = (arr) => {
  // 創建一個對象來存儲每個數字出現的次數
  const counts = {};

  // 遍歷數組，計算每個數字出現的次數
  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  // 檢查是否同時存在三個相同的骰子和一對骰子
  const hasThreeOfAKind = Object.values(counts).includes(3);
  const hasPair = Object.values(counts).includes(2);

  // 如果同時存在三條和一對，更新"葫蘆"選項
  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25);
  }
};

// 檢測順子
const checkForStraights = (arr) => {
  // 將數組排序並去重
  const sortedNumbersArr = arr.sort((a, b) => a - b);
  const uniqueNumbersArr = [...new Set(sortedNumbersArr)];
  // 將去重後的數組轉換為字符串，方便後續比較
  const uniqueNumbersStr = uniqueNumbersArr.join("");

  // 定義小順和大順的可能組合
  const smallStraightsArr = ["1234", "2345", "3456"];
  const largeStraightsArr = ["12345", "23456"];

  // 檢查是否有小順（四個連續的數字）
  if (smallStraightsArr.some(straight => uniqueNumbersStr.includes(straight))) {
    updateRadioOption(3, 30);
  }

  // 檢查是否有大順（五個連續的數字）
  if (largeStraightsArr.includes(uniqueNumbersStr)) {
    updateRadioOption(4, 40);
  }
};

// 擲骰子按鈕事件監聽器
rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("你已經在這回合擲骰三次了。請選擇一個分數。");
  } else {
    rolls++;
    resetRadioOptions();
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);

    // 更新"以上皆非"選項
    updateRadioOption(5, 0);
  }
});

// 規則按鈕事件監聽器
rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;

  if (isModalShowing) {
    rulesBtn.textContent = "隱藏規則";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "顯示規則";
    rulesContainer.style.display = "none";
  }
});

// 保存分數按鈕事件監聽器
keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;

  // 查找選中的分數選項
  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }

  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);
    if (round > 6) {
      setTimeout(() => {
        alert(`遊戲結束！你的總分是 ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    alert("請選擇一個選項或擲骰子");
  }
});