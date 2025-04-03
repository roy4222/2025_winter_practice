/**
 * @param {number[]} nums - 輸入的數字陣列
 * @param {number} target - 目標總和
 * @return {number[]} - 返回兩個數字的索引，這兩個數字的和等於目標值
 */
var twoSum = function(nums, target) {
    // 創建一個映射表來存儲已遍歷過的數字及其索引
    const map = new Map();

    // 遍歷整個數組
    for(let i = 0; i < nums.length; i++) {
        // 計算當前數字需要的配對數字
        const complement = target - nums[i];
        // 檢查配對數字是否已經在映射表中
        if (map.has(complement)) {
            // 如果找到配對，返回兩個數字的索引
            return [map.get(complement), i];
        }
        // 將當前數字及其索引添加到映射表中
        map.set(nums[i], i);
    }
    // 如果沒有找到解，返回空數組
    return [];
};