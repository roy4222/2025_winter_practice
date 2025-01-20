// 閉包範例：計數器
function createCounter() {
    // 在外部函數中定義的變數
    let count = 0;

    // 返回一個內部函數
    return {
        increment: function() {
            count += 1;
            return count;
        },
        decrement: function() {
            count -= 1;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

// 創建一個計數器實例
const counter = createCounter();

// 使用範例
console.log('當前計數：', counter.getCount());    // 輸出: 0
console.log('增加後：', counter.increment());     // 輸出: 1
console.log('增加後：', counter.increment());     // 輸出: 2
console.log('減少後：', counter.decrement());     // 輸出: 1
console.log('當前計數：', counter.getCount());    // 輸出: 1

// 創建另一個計數器實例（擁有獨立的count變數）
const counter2 = createCounter();
console.log('counter2 當前計數：', counter2.getCount());    // 輸出: 0
