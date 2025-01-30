let hatPrice = 100;
console.log(hatPrice);
let bootPrice = 200;
console.log(bootPrice);

function sumPrice(a,b,c){
    return a + b+c;
}

let totalPrice = sumPrice(hatPrice,bootPrice);
console.log(totalPrice);

totalPrice = sumPrice(100,200,300);
console.log(totalPrice);

// 定義一個函數 sumPrices，使用剩餘參數語法接收任意數量的價格
function sumPrices(...prices) {
    // 使用 reduce 方法計算所有價格的總和
    // 初始值設為 0，遍歷每個價格並加到總和中
    return prices.reduce((total, price) => total + price, 0);
}

// 調用 sumPrices 函數並打印結果
// 傳入四個價格：100, 200, 300, 400
console.log(sumPrices(100, 200, 300, 400));

// 使用展開運算子合併陣列
const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'tomato'];
const allItems = [...fruits, ...vegetables];
console.log(allItems);

// 使用展開運算子複製物件並添加新屬性
const person = { name: 'John', age: 30 };
const updatedPerson = { ...person, job: 'Developer' };
console.log(updatedPerson);

// 在函數調用中使用展開運算子
function greet(firstName, lastName) {
    console.log(`Hello, ${firstName} ${lastName}!`);
}
const names = ['Jane', 'Doe'];
greet(...names);
