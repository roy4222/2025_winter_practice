/**
 * 創建一個可取消的定時執行函數
 * @param {Function} fn - 要定時執行的函數
 * @param {Array} args - 傳遞給函數的參數陣列
 * @param {number} t - 定時間隔(毫秒)
 * @return {Function} 返回用於取消定時執行的函數
 */
var cancellable = function(fn, args, t) {
    // 立即執行一次函數
    fn(...args);

    // 設定定時器,每隔 t 毫秒執行一次函數
    const intervalId = setInterval(() =>{
        fn(...args);
    },t);

    // 返回取消函數
    return function cancelFn() {
        clearInterval(intervalId) // 清除定時器
    }
};

/**
 * 使用範例:
 * 
 * // 初始化結果陣列
 * const result = [];
 *
 * // 定義測試函數和參數
 * const fn = (x) => x * 2;
 * const args = [4], t = 35, cancelTimeMs = 190;
 *
 * // 記錄開始時間
 * const start = performance.now();
 *
 * // 定義記錄函數,用於記錄執行時間和返回值
 * const log = (...argsArr) => {
 *     const diff = Math.floor(performance.now() - start);
 *     result.push({"time": diff, "returned": fn(...argsArr)});
 * }
 *       
 * // 創建可取消的定時執行
 * const cancel = cancellable(log, args, t);
 *
 * // 190ms 後取消定時執行
 * setTimeout(cancel, cancelTimeMs);
 *   
 * // 等待一段時間後輸出結果
 * setTimeout(() => {
 *     console.log(result); // [
 *                          //     {"time":0,"returned":8},
 *                          //     {"time":35,"returned":8},
 *                          //     {"time":70,"returned":8},
 *                          //     {"time":105,"returned":8},
 *                          //     {"time":140,"returned":8},
 *                          //     {"time":175,"returned":8}
 *                          // ]
 * }, cancelTimeMs + t + 15)    
 */