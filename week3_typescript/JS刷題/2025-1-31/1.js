// 創建一個循環，從0到count-1
for (let i = 0; i < count; i = i + 1) {
  // 重複character字符i次，並將結果添加到rows數組中
  rows.push(character.repeat(i));
}

// 迴圈執行後的結果
rows = [
    "*",
    "**",
    "***",
    "****",
    "*****"
  ];