/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    let Arr=[];
    for(let i=0;i<arr.length;i++){
        Arr.push(fn(arr[i],i));
    }
    return Arr;
};