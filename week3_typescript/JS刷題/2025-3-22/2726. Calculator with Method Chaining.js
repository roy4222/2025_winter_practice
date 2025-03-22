class Calculator {
    
    /** 
     * 初始化計算器
     * @param {number} value 初始值
     */
    constructor(value) {
        this.result = value;
    }
    
    /** 
     * 加法運算
     * @param {number} value 要加的值
     * @return {Calculator} 返回計算器實例，支持鏈式調用
     */
    add(value){
        this.result += value;
        return this;
    }
    
    /** 
     * 減法運算
     * @param {number} value 要減的值
     * @return {Calculator} 返回計算器實例，支持鏈式調用
     */
    subtract(value){
        this.result -= value;
        return this;
    }
    
    /** 
     * 乘法運算
     * @param {number} value 要乘的值
     * @return {Calculator} 返回計算器實例，支持鏈式調用
     */  
    multiply(value) {
        this.result *= value;
        return this;
    }
    
    /** 
     * 除法運算
     * @param {number} value 要除的值
     * @return {Calculator} 返回計算器實例，支持鏈式調用
     * @throws {Error} 當除數為零時拋出錯誤
     */
    divide(value) {
        if (value === 0){
            throw new Error("Division by zero is not allowed");
        }
        this.result /= value;
        return this;
    }
    
    /** 
     * 冪運算
     * @param {number} value 指數
     * @return {Calculator} 返回計算器實例，支持鏈式調用
     */
    power(value) {
        this.result **= value;
        return this;
    }
    
    /** 
     * 獲取當前計算結果
     * @return {number} 當前計算結果
     */
    getResult() {
        return this.result;
    }
}