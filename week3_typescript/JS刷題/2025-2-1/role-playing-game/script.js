// 初始化玩家狀態
let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// 獲取DOM元素
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const locations = ["town", "store", "cave"];

// 初始化按鈕點擊事件
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// 更新遊戲狀態
function update(location) {

}

// 前往城鎮
function goTown() {
  button1.innerText = "Go to store";
  button2.innerText = "Go to cave";
  button3.innerText = "Fight dragon";
  button1.onclick = goStore;
  button2.onclick = goCave;
  button3.onclick = fightDragon;
  text.innerText = "You are in the town square. You see a sign that says \"Store\".";
}

// 前往商店
function goStore() {
  button1.innerText = "Buy 10 health (10 gold)";
  button2.innerText = "Buy weapon (30 gold)";
  button3.innerText = "Go to town square";
  button1.onclick = buyHealth;
  button2.onclick = buyWeapon;
  button3.onclick = goTown;
  text.innerText = "You enter the store.";
}

// 前往洞穴
function goCave() {
  console.log("Going to cave.");
}

// 與龍戰鬥
function fightDragon() {
  console.log("Fighting dragon.");
}

// 購買生命值
function buyHealth() {

}

// 購買武器
function buyWeapon() {

}