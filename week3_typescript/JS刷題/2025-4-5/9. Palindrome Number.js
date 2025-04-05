/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // 負數不可能是回文數，因為有負號
    // 例如：-121 反轉後會變成 121-，與原數不同
    if (x < 0) {
        return false;
    }
    
    if(x<0){
        return false;
    }

    // 將數字轉換為字符串
    let str = x.toString();

    // 將字符串反轉：先分割為字符數組，然後反轉數組，最後合併為字符串
    // 例如：123 -> ["1","2","3"] -> ["3","2","1"] -> "321"
    let reversedStr = str.split("").reverse().join("");
    
    // 比較原字符串與反轉後的字符串是否相等
    // 如果相等，則是回文數（如：121反轉後仍為121）
    // 如果不相等，則不是回文數（如：123反轉後為321，不相等）
    return str === reversedStr;
};