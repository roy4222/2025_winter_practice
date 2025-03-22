/**
 * 判斷一個物件或陣列是否為空
 * @param {Object|Array} obj - 要檢查的物件或陣列
 * @return {boolean} - 如果物件或陣列為空則返回 true，否則返回 false
 */
var isEmpty = function(obj) {
    // 使用 Object.keys() 獲取物件的所有屬性名稱，並檢查其長度是否為 0
    return Object.keys(obj).length === 0;
};