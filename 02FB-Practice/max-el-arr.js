"use strict";
let a = [-1, -12, -3, -6];
let maxA = a[0];
for (let i of a) {
    if (i > maxA)
        maxA = i;
}
console.log("Max value in array is", maxA);

let b = [-1, -12, -3, -6];
let maxB = a.reduce((acc, curr) => Math.max(acc, curr), b[0]);
console.log("Max value in array is", maxB);
