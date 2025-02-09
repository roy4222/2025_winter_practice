// DOM 元素
const messageInput = document.getElementById("message-input");
const checkMessageButton = document.getElementById("check-message-btn");
const spamScoreElement = document.getElementById("spam-score");
const ruleMatchesElement = document.getElementById("rule-matches");
const historyListElement = document.getElementById("history-list");
const addRuleButton = document.getElementById("add-rule-btn");
const customRulesListElement = document.getElementById("custom-rules-list");

// 預設垃圾郵件規則
const spamRules = [
  {
    pattern: /please help|assist me/i,
    description: "求助類型垃圾郵件",
    weight: 3
  },
  {
    pattern: /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i,
    description: "金錢相關垃圾郵件",
    weight: 5
  },
  {
    pattern: /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i,
    description: "免費金錢詐騙",
    weight: 8
  },
  {
    pattern: /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i,
    description: "股票詐騙",
    weight: 7
  },
  {
    pattern: /(?:^|\s)d[e3][a@4]r\s+fr[i1|][e3]nd(?:$|\s)/i,
    description: "可疑稱謂",
    weight: 2
  },
  {
    pattern: /casino|gambling|bet now|poker|slots/i,
    description: "賭博相關",
    weight: 8
  },
  {
    pattern: /(?:^|\s)v[i1|]agr[a@4]|c[i1|][a@4]l[i1|]s/i,
    description: "藥品廣告",
    weight: 9
  },
  {
    pattern: /urgent|immediate action|limited time|act now/i,
    description: "緊急行動要求",
    weight: 4
  },
  {
    pattern: /lottery|winner|prize|congratulations|you've won/i,
    description: "中獎詐騙",
    weight: 7
  },
  {
    pattern: /bank account|wire transfer|western union|paypal/i,
    description: "銀行轉帳相關",
    weight: 6
  }
];

// 自定義規則存儲
let customRules = [];

// 歷史記錄存儲
let history = [];

// 計算垃圾郵件分數
function calculateSpamScore(message, matches) {
  // 如果沒有匹配的規則，返回0分
  if (!matches.length) return 0;
  
  // 計算所有匹配規則的權重總和
  const totalWeight = matches.reduce((sum, match) => sum + match.weight, 0);
  // 計算最大可能權重（假設每個匹配的規則都有最高權重10）
  const maxPossibleWeight = matches.length * 10;
  // 計算分數：(總權重 / 最大可能權重) * 100，並四捨五入到整數
  // 使用Math.min確保分數不超過100
  return Math.min(Math.round((totalWeight / maxPossibleWeight) * 100), 100);
}

// 更新圓形進度條
function updateScoreCircle(score) {
  // 獲取圓形進度條元素
  const circle = document.querySelector('.score-circle');
  // 設置圓形進度條的背景，使用conic-gradient創建圓形效果
  circle.style.background = `conic-gradient(
    var(--primary-color) ${score}%,
    #ddd ${score}%
  )`;
  // 更新顯示的分數文字
  spamScoreElement.textContent = score;
}

// 檢查訊息
function checkMessage(message) {
  const allRules = [...spamRules, ...customRules];
  const matches = [];

  allRules.forEach(rule => {
    if (rule.pattern.test(message)) {
      matches.push(rule);
    }
  });

  const score = calculateSpamScore(message, matches);
  
  // 更新UI
  updateScoreCircle(score);
  displayRuleMatches(matches);
  addToHistory(message, score, matches);
  
  return { score, matches };
}

// 顯示匹配的規則
function displayRuleMatches(matches) {
  ruleMatchesElement.innerHTML = matches.length ? 
    matches.map(rule => `
      <div class="rule-match">
        <strong>${rule.description}</strong>
        <div>權重: ${rule.weight}</div>
      </div>
    `).join('') :
    '<div class="rule-match">未檢測到任何垃圾郵件特徵</div>';
}

// 添加到歷史記錄
function addToHistory(message, score, matches) {
  const timestamp = new Date().toLocaleString('zh-TW');
  const historyItem = { message, score, matches, timestamp };
  history.unshift(historyItem);
  
  // 限制歷史記錄數量
  if (history.length > 10) history.pop();
  
  displayHistory();
}

// 顯示歷史記錄
function displayHistory() {
  historyListElement.innerHTML = history.map(item => `
    <div class="history-item">
      <div>
        <strong>時間:</strong> ${item.timestamp}<br>
        <strong>分數:</strong> ${item.score}
      </div>
      <div class="history-message">
        ${item.message.substring(0, 50)}${item.message.length > 50 ? '...' : ''}
      </div>
    </div>
  `).join('');
}

// 添加自定義規則
function addCustomRule(pattern, description, weight) {
  try {
    const regex = new RegExp(pattern, 'i');
    const rule = {
      pattern: regex,
      description: description,
      weight: parseInt(weight)
    };
    
    customRules.push(rule);
    displayCustomRules();
    return true;
  } catch (error) {
    alert('無效的正則表達式模式！');
    return false;
  }
}

// 顯示自定義規則
function displayCustomRules() {
  customRulesListElement.innerHTML = customRules.map((rule, index) => `
    <div class="rule-match">
      <strong>${rule.description}</strong>
      <div>模式: ${rule.pattern.toString()}</div>
      <div>權重: ${rule.weight}</div>
      <button class="btn secondary" onclick="removeCustomRule(${index})">
        <span class="material-icons">delete</span>
        刪除
      </button>
    </div>
  `).join('');
}

// 刪除自定義規則
function removeCustomRule(index) {
  customRules.splice(index, 1);
  displayCustomRules();
}

// 事件監聽器
checkMessageButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (!message) {
    alert('請輸入要檢查的訊息！');
    return;
  }
  checkMessage(message);
});

addRuleButton.addEventListener('click', () => {
  const pattern = document.getElementById('rule-pattern').value.trim();
  const description = document.getElementById('rule-description').value.trim();
  const weight = document.getElementById('rule-weight').value;
  
  if (!pattern || !description || !weight) {
    alert('請填寫所有欄位！');
    return;
  }
  
  if (addCustomRule(pattern, description, weight)) {
    // 清空輸入欄位
    document.getElementById('rule-pattern').value = '';
    document.getElementById('rule-description').value = '';
    document.getElementById('rule-weight').value = '';
  }
});

// 初始化顯示
updateScoreCircle(0);
displayHistory();
displayCustomRules();
