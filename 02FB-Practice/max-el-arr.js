"use strict";
let a = [-1, -12, -3, -6];
let max = a[0];
for (let i of a) {
    if (i > max)
        max = i;
}
console.log("Max value in array is", max);