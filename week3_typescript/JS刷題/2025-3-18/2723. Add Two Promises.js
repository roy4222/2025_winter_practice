/**
 * 將兩個 Promise 的解析值相加後返回新 Promise
 * @param {Promise<number>} promise1 - 第一個數值型 Promise
 * @param {Promise<number>} promise2 - 第二個數值型 Promise
 * @return {Promise<number>} 兩者解析值之和的 Promise
 */
var addTwoPromises = async function(promise1, promise2) {
    // 並行執行兩個 Promise 並等待結果
    const [value1, value2] = await Promise.all([promise1, promise2]);
    // 返回兩數之和
    return value1 + value2;
};

/**
 * 使用範例:
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 * 
 * addTwoPromises(Promise.resolve(-5), Promise.resolve(10))
 *   .then(console.log); // 5
 * 
 * addTwoPromises(Promise.resolve(3.14), Promise.resolve(2.86))
 *   .then(console.log); // 6
 */