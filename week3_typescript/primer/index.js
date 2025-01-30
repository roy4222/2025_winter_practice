
// 使用 reduce 計算數組中所有數字的總和
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 輸出: 15

// 使用 reduce 找出數組中的最大值
const maxNumber = numbers.reduce((max, current) => Math.max(max, current), numbers[0]);
console.log(maxNumber); // 輸出: 5

// 使用 reduce 將數組轉換為對象
const fruits = ['apple', 'banana', 'apple', 'cherry', 'banana', 'cherry'];
const fruitCount = fruits.reduce((count, fruit) => {
    count[fruit] = (count[fruit] || 0) + 1;
    return count;
}, {});
console.log(fruitCount); // 輸出: { apple: 2, banana: 2, cherry: 2 }
