"use strict";
let arr = [2, 1, 5, 11, 22, 4];
//by default array is sorted as string
arr.sort((a, b) => {
    return a - b;
});
console.log(arr);