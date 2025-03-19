/**
 * 根據提供的函數對陣列進行排序
 * @param {Array} arr - 要排序的陣列
 * @param {Function} fn - 用於計算排序值的函數
 * @return {Array} - 排序後的陣列
 * 
 * 使用範例:
 * sortBy([5, 4, 1, 2, 3], (x) => x) // [1, 2, 3, 4, 5]
 * sortBy([{"x": 1}, {"x": 0}, {"x": -1}], (d) => d.x) // [{"x": -1}, {"x": 0}, {"x": 1}]
 * sortBy([[3, 4], [5, 2], [10, 1]], (x) => x[1]) // [[10, 1], [5, 2], [3, 4]]
 */
var sortBy = function(arr, fn) {
    // 使用 sort 方法對陣列進行排序
    // 比較函數使用 fn 計算每個元素的值進行比較
    return arr.sort((a, b) => fn(a) - fn(b));
}; 
