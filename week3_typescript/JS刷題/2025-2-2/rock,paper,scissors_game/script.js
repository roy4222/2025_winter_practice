// 生成電腦隨機選擇的函數
function getRandomComputerResult() {
  // 定義可選擇的選項數組
  const options = ["Rock", "Paper", "Scissors"];
  // 生成一個隨機索引
  const randomIndex = Math.floor(Math.random() * options.length);
  // 返回隨機選擇的選項
  return options[randomIndex];
}

// 判斷玩家是否贏得回合的函數
function hasPlayerWonTheRound(player, computer) {
  // 返回玩家獲勝的條件
  return (
    (player === "Rock" && computer === "Scissors") ||     // 石頭勝剪刀
    (player === "Scissors" && computer === "Paper") ||    // 剪刀勝紙
    (player === "Paper" && computer === "Rock")           // 紙勝石頭
  );
}

// 玩家和電腦的得分
let playerScore = 0;
let computerScore = 0;

// 獲取每回合結果的函數
function getRoundResults(userOption) {
  // 獲取電腦的隨機選擇
  const computerResult = getRandomComputerResult();

  // 判斷回合結果
  if (hasPlayerWonTheRound(userOption, computerResult)) {
    // 玩家獲勝
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    // 平局
    return `It's a tie! Both chose ${userOption}`;
  } else {
    // 電腦獲勝
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

// 選取 DOM 元素
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

// 顯示遊戲結果的函數
function showResults(userOption) {
  // 更新回合結果訊息
  roundResultsMsg.innerText = getRoundResults(userOption);
  // 更新電腦和玩家的分數顯示
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  // 檢查是否有人達到3分（獲勝條件）
  if (playerScore === 3 || computerScore === 3) {
    // 顯示獲勝者訊息
    winnerMsgElement.innerText = `${
      playerScore === 3 ? "Player" : "Computer"
    } has won the game!`;

    // 顯示重置遊戲按鈕，隱藏選項容器
    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  }
}

// 重置遊戲的函數
function resetGame() {
  // 1. 重置玩家和電腦的分數
  playerScore = 0;
  computerScore = 0;

  // 2. 更新分數顯示
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;

  // 3. 隱藏 "重置遊戲" 按鈕
  resetGameBtn.style.display = "none";

  // 4. 顯示 "選項容器"，讓玩家重新選擇
  optionsContainer.style.display = "block";

  // 5. 清空 "勝者訊息" 和 "回合結果訊息"
  winnerMsgElement.innerText = "";
  roundResultsMsg.innerText = "";
}

// 為重置遊戲按鈕添加點擊事件監聽器
resetGameBtn.addEventListener("click", resetGame);

// 獲取石頭、布、剪刀按鈕元素
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

// 為石頭按鈕添加點擊事件監聽器
rockBtn.addEventListener("click", function () {
  showResults("Rock");
});

// 為布按鈕添加點擊事件監聽器
paperBtn.addEventListener("click", function () {
  showResults("Paper");
});

// 為剪刀按鈕添加點擊事件監聽器
scissorsBtn.addEventListener("click", function () {
  showResults("Scissors");
});