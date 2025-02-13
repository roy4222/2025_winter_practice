// 定義運算符對應的函數
const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
}

// 執行中綴表達式計算
const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));

// 處理高優先級運算（乘法和除法）
const highPrecedence = str => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
}

// 判斷是否為偶數
const isEven = num => num % 2 === 0;
// 計算數組總和
const sum = nums => nums.reduce((acc, el) => acc + el, 0);
// 計算數組平均值
const average = nums => sum(nums) / nums.length;

// 計算數組中位數
const median = nums => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
}

// 定義電子表格函數
// 定義電子表格函數物件
const spreadsheetFunctions = {
  // 空字串函數：直接返回參數
  "": arg => arg,
  
  // 總和函數：使用之前定義的 sum 函數
  sum,
  
  // 平均值函數：使用之前定義的 average 函數
  average,
  
  // 中位數函數：使用之前定義的 median 函數
  median,
  
  // 偶數函數：過濾出所有偶數
  even: nums => nums.filter(isEven),
  
  // 是否存在偶數函數：檢查是否至少有一個偶數
  someeven: nums => nums.some(isEven),
  
  // 是否全為偶數函數：檢查是否所有數字都是偶數
  everyeven: nums => nums.every(isEven),
  
  // 前兩個元素函數：返回數組的前兩個元素
  firsttwo: nums => nums.slice(0, 2),
  
  // 後兩個元素函數：返回數組的後兩個元素
  lasttwo: nums => nums.slice(-2),
  
  // 是否包含2函數：檢查數組是否包含數字2
  has2: nums => nums.includes(2),
  
  // 遞增函數：將數組中的每個數字加1
  increment: nums => nums.map(num => num + 1),
  
  // 隨機數函數：生成指定範圍內的隨機整數
  random: ([x, y]) => Math.floor(Math.random() * y + x),
  
  // 範圍函數：使用之前定義的 range 函數生成數字範圍
  range: nums => range(...nums),
  
  // 去重函數：移除數組中的重複元素
  nodupes: nums => [...new Set(nums).values()]
}

// 應用函數到字符串表達式
const applyFunction = str => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix);
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = args => args.split(",").map(parseFloat);
  const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
}

// 生成範圍數組
const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);
// 生成字符範圍數組
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));

// 評估公式
// 評估公式函數
const evalFormula = (x, cells) => {
  // 根據單元格ID找到對應的值
  const idToText = id => cells.find(cell => cell.id === id).value;

  // 定義範圍的正則表達式，例如 A1:B3
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;

  // 將字符串範圍轉換為數字範圍
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));

  // 獲取指定數字行的單元格值
  const elemValue = num => character => idToText(character + num);

  // 生成指定字符範圍內的所有單元格值
  const addCharacters = character1 => character2 => num => 
    charRange(character1, character2).map(elemValue(num));

  // 展開範圍表達式，例如 A1:B3 變成 A1,A2,A3,B1,B2,B3
  const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => 
    rangeFromString(num1, num2).map(addCharacters(char1)(char2)));

  // 定義單個單元格的正則表達式，例如 A1
  const cellRegex = /[A-J][1-9][0-9]?/gi;

  // 將單元格引用替換為其實際值
  const cellExpanded = rangeExpanded.replace(cellRegex, match => 
    idToText(match.toUpperCase()));

  // 應用電子表格函數
  const functionExpanded = applyFunction(cellExpanded);

  // 如果公式沒有變化，返回結果；否則，遞迴處理
  return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
}

// 頁面加載時初始化電子表格
window.onload = () => {
  // 獲取容器元素
  const container = document.getElementById("container");

  // 創建標籤元素的函數
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  }

  // 生成A到J的字母範圍
  const letters = charRange("A", "J");

  // 創建列標籤（A到J）
  letters.forEach(createLabel);

  // 創建行標籤和輸入框（1到99）
  range(1, 99).forEach(number => {
    // 創建行標籤
    createLabel(number);

    // 為每個字母創建輸入框
    letters.forEach(letter => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number; // 設置aria標籤以提高可訪問性
      input.onchange = update; // 添加更新函數作為變更事件處理器
      container.appendChild(input);
    })
  })
}

// 更新單元格值
const update = event => {
  const element = event.target;
  const value = element.value.replace(/\s/g, "");
  if (!value.includes(element.id) && value.startsWith('=')) {
    element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
  }
}