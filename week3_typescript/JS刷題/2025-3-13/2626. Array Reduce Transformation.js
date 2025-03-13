/**
 * 自定義 reduce 函式，將陣列元素透過函式累積為單一值
 * 
 * @param {number[]} nums - 要處理的數字陣列
 * @param {Function} fn - 累積函式，格式 (accumulator, currentValue) => newAccumulator
 * @param {number} init - 初始累積值
 * @return {number} 經過所有元素處理後的最終累積值
 */
var reduce = function(nums, fn, init) {
    // 初始化累加器為傳入的初始值
    let ans = init; 
    
    // 遍歷陣列中的每個元素
    for(let i = 0; i < nums.length; i++){
        // 使用提供的回調函式 fn 來更新累加器值
        // fn 接收兩個參數:
        // 1. ans: 當前的累加器值
        // 2. nums[i]: 當前正在處理的陣列元素
        // 將 fn 的返回值賦值給 ans，作為新的累加器值
        ans = fn(ans, nums[i]);
    }
    
    // 回傳最終的累積結果
    return ans;
};