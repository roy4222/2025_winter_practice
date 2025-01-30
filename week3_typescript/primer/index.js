// 表達式函式（Function Expression）範例

// 匿名函式表達式
let greet = function(name) {
    return `Hello, ${name}!`;
};
console.log(greet("Alice"));  // "Hello, Alice!"

// 具名函式表達式
let factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
};
console.log(factorial(5));  // 120

// 箭頭函式表達式
let square = (x) => x * x;
console.log(square(4));  // 16

// 立即調用的函式表達式 (IIFE)
let result = (function() {
    let x = 10;
    return x * 2;
})();
console.log(result);  // 20

// 函式表達式作為參數
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(function(num) {
    return num * 2;
});
console.log(doubled);  // [2, 4, 6, 8, 10]
