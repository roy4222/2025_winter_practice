// 獲取DOM元素
const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");
const checkpointMessage = document.querySelector(".checkpoint-screen > p");
const ctx = canvas.getContext("2d");

// 設置畫布尺寸
canvas.width = innerWidth;
canvas.height = innerHeight;

// 定義重力常數和檢查點碰撞檢測狀態
const gravity = 0.5;
let isCheckpointCollisionDetectionActive = true;

// 根據螢幕高度調整尺寸的函數
const proportionalSize = (size) => {
  return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
}

// 玩家類別
class Player {
  constructor() {
    // 初始化玩家位置和尺寸
    this.position = {
      x: proportionalSize(10),
      y: proportionalSize(400),
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = proportionalSize(40);
    this.height = proportionalSize(40);
  }

  // 繪製玩家
  draw() {
    ctx.fillStyle = "#99c9ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  
  // 更新玩家狀態
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // 處理重力和邊界碰撞
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = gravity;
      }
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }

    // 處理左右邊界
    if (this.position.x < this.width) {
      this.position.x = this.width;
    }
    if (this.position.x >= canvas.width - this.width * 2) {
      this.position.x = canvas.width - this.width * 2;
    }
  }
}

// 平台類別
class Platform {
  constructor(x, y) {
    this.position = { x, y };
    this.width = 200;
    this.height = proportionalSize(40);
  }

  // 繪製平台
  draw() {
    ctx.fillStyle = "#acd157";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// 檢查點類別
class CheckPoint {
  constructor(x, y, z) {
    this.position = { x, y };
    this.width = proportionalSize(40);
    this.height = proportionalSize(70);
    this.claimed = false;
  }

  // 繪製檢查點
  draw() {
    ctx.fillStyle = "#f1be32";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // 標記檢查點為已達成
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity;
    this.claimed = true;
  }
}

// 創建玩家實例
const player = new Player();

// 定義平台位置
const platformPositions = [
  { x: 500, y: proportionalSize(450) },
  { x: 700, y: proportionalSize(400) },
  { x: 850, y: proportionalSize(350) },
  { x: 900, y: proportionalSize(350) },
  { x: 1050, y: proportionalSize(150) },
  { x: 2500, y: proportionalSize(450) },
  { x: 2900, y: proportionalSize(400) },
  { x: 3150, y: proportionalSize(350) },
  { x: 3900, y: proportionalSize(450) },
  { x: 4200, y: proportionalSize(400) },
  { x: 4400, y: proportionalSize(200) },
  { x: 4700, y: proportionalSize(150) },
];

// 創建平台實例
const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
);

// 定義檢查點位置
const checkpointPositions = [
  { x: 1170, y: proportionalSize(80), z: 1 },
  { x: 2900, y: proportionalSize(330), z: 2 },
  { x: 4800, y: proportionalSize(80), z: 3 },
];

// 創建檢查點實例
const checkpoints = checkpointPositions.map(
  (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
);

// 動畫循環函數
const animate = () => {
  // 請求下一幀動畫
  requestAnimationFrame(animate);
  // 清除整個畫布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 繪製所有平台
  platforms.forEach((platform) => {
    platform.draw();
  });

  // 繪製所有檢查點
  checkpoints.forEach(checkpoint => {
    checkpoint.draw();
  });

  // 更新玩家狀態（包括位置和速度）
  player.update();

  // 處理玩家移動
  if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
    // 如果按下右鍵且玩家未達到螢幕右側限制，向右移動
    player.velocity.x = 5;
  } else if (keys.leftKey.pressed && player.position.x > proportionalSize(100)) {
    // 如果按下左鍵且玩家未達到螢幕左側限制，向左移動
    player.velocity.x = -5;
  } else {
    // 如果沒有按鍵被按下，停止水平移動
    player.velocity.x = 0;

    // 移動背景元素（平台和檢查點）以創造玩家移動的錯覺
    if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
      // 如果按下右鍵，所有平台和檢查點向左移動
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
      checkpoints.forEach((checkpoint) => {
        checkpoint.position.x -= 5;
      });
    } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
      // 如果按下左鍵，所有平台和檢查點向右移動
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
      checkpoints.forEach((checkpoint) => {
        checkpoint.position.x += 5;
      });
    }
  }

  // 處理平台碰撞
  platforms.forEach((platform) => {
    // 定義碰撞檢測規則
    const collisionDetectionRules = [
      player.position.y + player.height <= platform.position.y,
      player.position.y + player.height + player.velocity.y >= platform.position.y,
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
    ];

    // 如果所有規則都滿足，玩家站在平台上
    if (collisionDetectionRules.every((rule) => rule)) {
      player.velocity.y = 0;
      return;
    }

    // 定義平台側面碰撞檢測規則
    const platformDetectionRules = [
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
      player.position.y + player.height >= platform.position.y,
      player.position.y <= platform.position.y + platform.height,
    ];

    // 如果所有規則都滿足，玩家碰到平台側面
    if (platformDetectionRules.every(rule => rule)) {
      player.position.y = platform.position.y + player.height;
      player.velocity.y = gravity;
    }
  });

  // 處理檢查點碰撞
  checkpoints.forEach((checkpoint, index, checkpoints) => {
    // 定義檢查點碰撞檢測規則
    const checkpointDetectionRules = [
      player.position.x >= checkpoint.position.x,
      player.position.y >= checkpoint.position.y,
      player.position.y + player.height <=
        checkpoint.position.y + checkpoint.height,
      isCheckpointCollisionDetectionActive,
      player.position.x - player.width <=
        checkpoint.position.x - checkpoint.width + player.width * 0.9,
      index === 0 || checkpoints[index - 1].claimed === true,
    ];

    // 如果所有規則都滿足，玩家到達檢查點
    if (checkpointDetectionRules.every((rule) => rule)) {
      checkpoint.claim();

      if (index === checkpoints.length - 1) {
        // 如果是最後一個檢查點
        isCheckpointCollisionDetectionActive = false;
        showCheckpointScreen("You reached the final checkpoint!");
        movePlayer("ArrowRight", 0, false);
      } else if (player.position.x >= checkpoint.position.x &&
         player.position.x <= checkpoint.position.x + 40) {
        // 如果是中間檢查點
        showCheckpointScreen("You reached a checkpoint!");
      }
    }
  });
}

// 定義按鍵狀態
const keys = {
  rightKey: {
    pressed: false
  },
  leftKey: {
    pressed: false
  }
};

// 處理玩家移動的函數
const movePlayer = (key, xVelocity, isPressed) => {
  if (!isCheckpointCollisionDetectionActive) {
    player.velocity.x = 0;
    player.velocity.y = 0;
    return;
  }

  switch (key) {
    case "ArrowLeft":
      keys.leftKey.pressed = isPressed;
      if (xVelocity === 0) {
        player.velocity.x = xVelocity;
      }
      player.velocity.x -= xVelocity;
      break;
    case "ArrowUp":
    case " ":
    case "Spacebar":
      player.velocity.y -= 8;
      break;
    case "ArrowRight":
      keys.rightKey.pressed = isPressed;
      if (xVelocity === 0) {
        player.velocity.x = xVelocity;
      }
      player.velocity.x += xVelocity;
  }
}

// 開始遊戲的函數
const startGame = () => {
  canvas.style.display = "block";
  startScreen.style.display = "none";
  animate();
}

// 顯示檢查點訊息的函數
const showCheckpointScreen = (msg) => {
  checkpointScreen.style.display = "block";
  checkpointMessage.textContent = msg;
  if (isCheckpointCollisionDetectionActive) {
    setTimeout(() => (checkpointScreen.style.display = "none"), 2000);
  }
};

// 添加事件監聽器
startBtn.addEventListener("click", startGame);

window.addEventListener("keydown", ({ key }) => {
  movePlayer(key, 8, true);
});

window.addEventListener("keyup", ({ key }) => {
  movePlayer(key, 0, false);
});
