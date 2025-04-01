/**
 * @param {Function} fn - 要被防抖動的函數
 * @param {number} t milliseconds - 延遲執行的時間(毫秒)
 * @return {Function} - 返回具有防抖動功能的新函數
 */
var debounce = function(fn, t) {
    // 用於存儲計時器ID的變數
    let timer;
    
    // 返回一個新函數,該函數接受任意數量的參數
    return function(...args) {
        // 如果已存在計時器,則清除它
        // 這是防抖動的核心:取消之前的執行計劃
        if (timer){
            clearTimeout(timer);
        }
        
        // 設置新的計時器,延遲t毫秒後執行fn
        timer = setTimeout(()=>{
            fn(...args); // 使用傳入的參數執行原始函數
        },t);
    }
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled - 被取消,因為在100ms內又調用了log
 * log('Hello'); // cancelled - 被取消,因為在100ms內又調用了log
 * log('Hello'); // Logged at t=100ms - 最後一次調用,等待100ms後執行
 */