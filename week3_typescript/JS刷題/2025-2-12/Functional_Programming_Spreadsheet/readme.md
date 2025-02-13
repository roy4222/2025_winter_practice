# Functional Programming Spreadsheet

這是一個基於功能性程式設計的電子表格應用程式，旨在展示如何使用純函數和不可變數據來實現電子表格的核心功能。

## 功能

1. **基本運算**：支持加 (`+`)、減 (`-`)、乘 (`*`)、除 (`/`) 等基本運算。
2. **高優先級運算**：自動處理乘法和除法的優先級。
3. **數組操作**：
   - `sum`：計算數組的總和。
   - `average`：計算數組的平均值。
   - `median`：計算數組的中位數。
   - `even`：過濾出數組中的偶數。
   - `someeven`：檢查數組中是否存在偶數。
   - `everyeven`：檢查數組中的所有元素是否為偶數。
   - `firsttwo`：獲取數組的前兩個元素。
   - `lasttwo`：獲取數組的最後兩個元素。
   - `has2`：檢查數組中是否包含數字 2。
   - `increment`：將數組中的每個元素加 1。
   - [random](cci:1://file:///c:/Users/User/Desktop/python%E4%BD%9C%E6%A5%AD/winter_practice/week3_typescript/JS%E5%88%B7%E9%A1%8C/2025-2-12/Functional_Programming_Spreadsheet/script.js:47:2-47:55)：生成指定範圍內的隨機數。
   - [range](cci:1://file:///c:/Users/User/Desktop/python%E4%BD%9C%E6%A5%AD/winter_practice/week3_typescript/JS%E5%88%B7%E9%A1%8C/2025-2-12/Functional_Programming_Spreadsheet/script.js:63:0-64:106)：生成數字範圍。
   - `nodupes`：去除數組中的重複元素。
4. **公式評估**：支持用戶輸入公式並自動更新單元格的值。
5. **事件處理**：在頁面加載時初始化電子表格，並處理單元格更新事件。

## 使用方法

1. 打開 [index.html](cci:7://file:///c:/Users/User/Desktop/python%E4%BD%9C%E6%A5%AD/winter_practice/week3_typescript/JS%E5%88%B7%E9%A1%8C/2025-2-12/Functional_Programming_Spreadsheet/index.html:0:0-0:0) 文件以啟動電子表格。
2. 在單元格中輸入公式，例如 `=sum(1, 2, 3)`，按下 Enter 鍵後，單元格將顯示計算結果。
3. 可以使用各種內置函數來操作數據，例如 `=average(A1:A10)` 計算 A1 到 A10 單元格的平均值。

## 技術細節

- **HTML**：定義網頁結構。
- **CSS**：使用 CSS Grid 佈局來創建電子表格的外觀。
- **JavaScript**：基於功能性程式設計實現核心邏輯，所有函數均為純函數，不產生副作用。

## 未來擴展

- 支持更多數學函數和統計函數。
- 添加單元格格式設置功能。
- 支持導入和導出數據。
