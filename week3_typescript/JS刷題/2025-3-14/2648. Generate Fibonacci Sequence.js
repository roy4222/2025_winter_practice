/**
 * 生成斐波那契數列的生成器函式
 * 斐波那契數列定義: 每個數字都是前兩個數字的和
 * 例如: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
 * 
 * @return {Generator<number>} 返回一個可以無限產生斐波那契數列的生成器
 */
var fibGenerator = function*() {
    // 初始化前兩個數字 a=0, b=1
    let [a,b]=[0,1];
    
    // 無限循環生成斐波那契數列
    while(true){
        // 產生當前的數字 a
        yield a;
        
        // 更新 a 和 b 的值:
        // - a 變成原來的 b
        // - b 變成原來的 a+b
        [a,b]=[b,a+b];
    }
};

/**
 * 使用範例:
 * const gen = fibGenerator(); // 創建生成器實例
 * gen.next().value; // 返回 0 (第一個數)
 * gen.next().value; // 返回 1 (第二個數)
 */