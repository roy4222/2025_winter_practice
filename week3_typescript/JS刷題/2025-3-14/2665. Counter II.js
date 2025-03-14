/**
 * 創建一個計數器對象,包含增加、減少和重置功能
 * @param {integer} init - 初始值
 * @return {Object} 返回一個包含三個方法的對象:
 *   - increment: 將當前值加1並返回
 *   - decrement: 將當前值減1並返回  
 *   - reset: 將當前值重置為初始值並返回
 */
var createCounter = function(init) {
    // 保存當前計數值
    let current = init

    // 返回包含三個方法的對象
    return {
        // 增加方法:當前值加1
        increment:function(){
            current+=1;
            return current;
        },
        // 減少方法:當前值減1
        decrement: function() {
            current-=1;
            return current;
        },
        // 重置方法:恢復到初始值
        reset: function() {
            current=init;
            return current;
        }
    }
};

/**
 * 使用範例:
 * const counter = createCounter(5)
 * counter.increment(); // 6 (5+1)
 * counter.reset(); // 5 (重置回初始值)
 * counter.decrement(); // 4 (5-1)
 */