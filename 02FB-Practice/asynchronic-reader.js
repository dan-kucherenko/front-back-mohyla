"use strict";

let fs=require("fs");
let s=undefined;
fs.readFile("test.txt", "utf8",
    function(error,data){
        if(error) throw error;
        s=data;
        console.log(s);
    });
//Why undefined? Try to fix it
