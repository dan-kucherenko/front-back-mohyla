"use strict";

//Basic function

async function foo(x) {
     return x * 2;
}
async function await_foo(x) {
    return await x * 2;
}

let r = foo(5);
let await_r = await_foo(5).then(onFulfilled);
console.log(r);
console.log(await_r);
