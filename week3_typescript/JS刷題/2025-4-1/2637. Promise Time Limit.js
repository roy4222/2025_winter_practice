/**
 * @param {Function} fn - 要被限制時間的非同步函數
 * @param {number} t - 時間限制（毫秒）
 * @return {Function} - 返回一個有時間限制的新函數
 */
var timeLimit = function(fn, t) {
    
    return async function(...args) {
        // 創建原始函數的 Promise
        const fnPromise = fn(...args);

        // 創建一個計時器 Promise，在 t 毫秒後拒絕
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("Time Limit Exceeded")
            }, t)
        })

        // 使用 Promise.race 競賽兩個 Promise
        // 哪個先完成（解決或拒絕）就返回哪個的結果
        return Promise.race([fnPromise, timeoutPromise]);
    }
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */