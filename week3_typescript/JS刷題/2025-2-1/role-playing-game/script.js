// 初始化玩家的遊戲狀態
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// 選取 DOM 元素
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

// 定義武器數組，包含名稱和攻擊力
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

// 定義怪物數組，包含名稱、等級和生命值
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]

// 定義遊戲中的不同位置，包含按鈕文本、按鈕功能和描述文本
const locations = [
  {
    name: "town square", // 城鎮廣場
    "button text": ["Go to store", "Go to cave", "Fight dragon"], // 按鈕文字：去商店、去洞穴、與龍戰鬥
    "button functions": [goStore, goCave, fightDragon], // 對應的按鈕功能
    text: "You are in the town square. You see a sign that says \"Store\"." // 位置描述
  },
  {
    name: "store", // 商店
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"], // 按鈕：購買生命值、購買武器、返回廣場
    "button functions": [buyHealth, buyWeapon, goTown], // 對應的功能
    text: "You enter the store." // 商店描述
  },
  {
    name: "cave", // 洞穴
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"], // 按鈕：戰鬥史萊姆、戰鬥獠牙野獸、返回廣場
    "button functions": [fightSlime, fightBeast, goTown], // 對應的功能
    text: "You enter the cave. You see some monsters." // 洞穴描述
  },
  {
    name: "fight", // 戰鬥場景
    "button text": ["Attack", "Dodge", "Run"], // 按鈕：攻擊、閃避、逃跑
    "button functions": [attack, dodge, goTown], // 對應的功能
    text: "You are fighting a monster." // 戰鬥描述
  },
  {
    name: "kill monster", // 殺死怪物後的場景
    "button text": ["Go to town square", "Go to town square", "Go to town square"], // 按鈕：返回廣場（三個相同選項）
    "button functions": [goTown, goTown, goTown], // 對應的功能
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.' // 殺死怪物後的描述
  },
  {
    name: "lose", // 失敗場景
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], // 按鈕：重新開始（三個相同選項）
    "button functions": [restart, restart, restart], // 對應的功能
    text: "You die. &#x2620;" // 失敗描述，包含骷髏頭表情符號
  },
  { 
    name: "win", // 勝利場景
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], // 按鈕：重新開始（三個相同選項）
    "button functions": [restart, restart, restart], // 對應的功能
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" // 勝利描述，包含慶祝表情符號
  },
  {
    name: "easter egg", // 彩蛋遊戲
    "button text": ["2", "8", "Go to town square?"], // 按鈕：選擇2、選擇8、返回廣場
    "button functions": [pickTwo, pickEight, goTown], // 對應的功能
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!" // 彩蛋遊戲描述
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// 更新遊戲界面
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

// 前往城鎮廣場
function goTown() {
  update(locations[0]);
}

// 前往商店
function goStore() {
  update(locations[1]);
}

// 前往洞穴
function goCave() {
  update(locations[2]);
}

// 購買生命值
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

// 購買武器
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

// 出售武器
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

// 戰鬥史萊姆
function fightSlime() {
  fighting = 0;
  goFight();
}

// 戰鬥獠牙野獸
function fightBeast() {
  fighting = 1;
  goFight();
}

// 戰鬥龍
function fightDragon() {
  fighting = 2;
  goFight();
}

// 進入戰鬥狀態
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

// 攻擊
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

// 計算怪物的攻擊值
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

// 判斷是否擊中怪物
function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

// 閃避攻擊
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

// 擊敗怪物
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

// 遊戲失敗
function lose() {
  update(locations[5]);
}

// 遊戲勝利
function winGame() {
  update(locations[6]);
}

// 重新開始遊戲
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

// 彩蛋遊戲
function easterEgg() {
  update(locations[7]);
}

// 選擇數字 2
function pickTwo() {
  pick(2);
}

// 選擇數字 8
function pickEight() {
  pick(8);
}

// 彩蛋遊戲邏輯
function pick(guess) {
  // 創建一個空數組來存儲隨機數
  const numbers = [];
  
  // 生成10個0到10之間的隨機整數
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  
  // 顯示玩家的選擇和生成的隨機數
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  
  // 檢查玩家的猜測是否在隨機數中
  if (numbers.includes(guess)) {
    // 如果猜對了，獎勵20金幣
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    // 如果猜錯了，扣除10點生命值
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    
    // 檢查玩家是否還有生命值
    if (health <= 0) {
      // 如果生命值歸零，遊戲結束
      lose();
    }
  }
}