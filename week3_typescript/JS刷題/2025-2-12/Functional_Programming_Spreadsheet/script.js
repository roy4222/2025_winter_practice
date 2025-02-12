// 定義一個物件，用於映射運算符到對應的函數
const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
}

// 定義一個函數，用於評估中綴表達式
const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));

// 檢查字符串是否包含高優先級運算（乘法或除法）
const highPrecedence = str => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  return regex.test(str);
}
console.log(highPrecedence("5*3"));

// 檢查一個數字是否為偶數
const isEven = num => num % 2 === 0;

// 計算數組中所有數字的總和
const sum = nums => nums.reduce((acc, el) => acc + el, 0);

// 計算數組中所有數字的平均值
const average = nums => sum(nums) / nums.length;

// 計算數組的中位數
const median = nums => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
}

// 定義電子表格可用的函數
const spreadsheetFunctions = {
  sum,
  average,
  median
}

// 生成指定範圍內的數字數組
const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);

// 生成指定範圍內的字符數組
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));

// 評估公式
const evalFormula = (x, cells) => {
  const idToText = id => cells.find(cell => cell.id === id).value;
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
  const elemValue = num => character => idToText(character + num);
  const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));
  const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
}

// 頁面加載完成後執行的函數
window.onload = () => {
  const container = document.getElementById("container");
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  }
  const letters = charRange("A", "J");
  letters.forEach(createLabel);
  range(1, 99).forEach(number => {
    createLabel(number);
    letters.forEach(letter => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      input.onchange = update;
      container.appendChild(input);
    })
  })
}

// 當輸入框的值改變時調用的函數
const update = event => {
  const element = event.target;
  const value = element.value.replace(/\s/g, "");
  if (!value.includes(element.id) && value.startsWith('=')) {
    // 待實現的邏輯
  }
}