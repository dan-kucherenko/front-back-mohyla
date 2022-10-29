"use strict";
const waittime = 5000;

let p = new Promise((resolve, reject) =>
    setTimeout(() => {
        console.log("Operation finished");
        resolve("Program finished");
    }, waittime));
console.log("Program finished");
// console.log(p.then((r)=> console.log(r)));


