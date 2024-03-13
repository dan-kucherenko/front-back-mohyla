"use strict";
const MongoClient = require("mongodb").MongoClient;
let express = require('express');

let server=express();
server.listen(8888);
console.log('Server is running on port 8888');

const url = "mongodb://localhost:27017/test";
const mongoClient = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoClient.connect(function (err, client) {
    if (err)
        throw err;
    const db = client.db("test");
    const collect = db.collection("users");
    collect.find().toArray(function (err, results) {
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].name + " - " + results[i].age);
        }
        client.close();
    });
});

server.get('/', function(req, res){
    res.send(JSON.stringify(arr));
});

server.post('/:elem', function(req, res){
    arr.push(req.params.elem); // need to use req.body, and 201 in response
    res.writeHead(200,{"Content-type": "text/html"});
    res.end();
});

server.delete('/:elem', function(req, res){
    arr.pop(); // need to use delete for particular element
    res.writeHead(200,{"Content-type": "text/html"});
    res.end();
});



