// 初始化遊戲變數
let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// 獲取 DOM 元素
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

// 定義武器列表
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

// 定義怪物列表
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

// 定義遊戲位置
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  }
];

// 初始化按鈕
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

// 購買健康
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
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex].name;
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
  // 設置 fighting 變量為 0，表示正在與史萊姆戰鬥
  // monsters 數組中的第一個元素（索引 0）是史萊姆
  fighting = 0;
  // 調用 goFight 函數開始戰鬥
  goFight();
}

// 戰鬥野獸
function fightBeast() {
  // 設置 fighting 變量為 1，表示正在與野獸戰鬥
  // monsters 數組中的第二個元素（索引 1）是野獸
  fighting = 1;
  // 調用 goFight 函數開始戰鬥
  goFight();
}

// 戰鬥龍
function fightDragon() {
  // 設置 fighting 變量為 2，表示正在與龍戰鬥
  // monsters 數組中的第三個元素（索引 2）是龍
  fighting = 2;
  // 調用 goFight 函數開始戰鬥
  goFight();
}

// 進入戰鬥
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

// 攻擊
function attack() {
  // 顯示怪物攻擊的訊息
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  // 顯示玩家使用武器攻擊的訊息
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + ".";

  // 計算怪物對玩家造成的傷害，並減少玩家的生命值
  health -= getMonsterAttackValue(monsters[fighting].level);
  // 計算玩家對怪物造成的傷害，包括武器威力、隨機因素和經驗值，並減少怪物的生命值
  monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;

  // 更新顯示的玩家生命值
  healthText.innerText = health;
  // 更新顯示的怪物生命值
  monsterHealthText.innerText = monsterHealth;

  // 檢查戰鬥結果
  if (health <= 0) {
    // 如果玩家生命值小於等於0，遊戲失敗
    lose();
  } else if (monsterHealth <= 0) {
    // 如果怪物生命值小於等於0
    if (fighting === 2) {
      // 如果正在與最終Boss（龍）戰鬥，玩家獲勝
      winGame();
    } else {
      // 如果是其他怪物，玩家擊敗怪物
      defeatMonster();
    }
  }
}

// 獲取怪物攻擊值
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
}

// 閃避
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

// 贏得遊戲
function winGame() {
  update(locations[6]);
}

// 重新開始遊戲
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}