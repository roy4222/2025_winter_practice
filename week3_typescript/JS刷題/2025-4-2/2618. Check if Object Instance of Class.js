/**
 * 檢查一個對象是否為指定類別的實例
 * @param {any} obj - 要檢查的對象
 * @param {any} classFunction - 類別函數
 * @return {boolean} - 如果 obj 是 classFunction 的實例則返回 true，否則返回 false
 */
var checkIfInstanceOf = function(obj, classFunction) {
    // 檢查 classFunction 是否有效（必須是函數）
    if (classFunction == null || typeof classFunction !== 'function') {
        return false;
    }
    
    // 檢查 obj 是否為 null 或 undefined
    if (obj == null) {
        return false;
    }
    
    // 檢查原始類型（number, string, boolean 等）
    if(Object(obj) !== obj){
        // 對於原始類型，如果 classFunction 是 Object，則返回 true
        if(classFunction === Object){
            return true
        }

        // 建立原始類型到對應包裝類的映射
        const typeMap = {
            'number': Number,
            'string': String,
            'boolean': Boolean,
            "symbol": Symbol,
            'bigint': BigInt,
        }

        // 獲取 obj 的類型
        const objType = typeof obj;

        // 檢查原始類型是否與指定的類別匹配
        return typeMap[objType] === classFunction; 
    }
    
    // 如果 obj 是物件，使用 instanceof 運算符檢查
    return obj instanceof classFunction;
};