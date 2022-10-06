"use strict";
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoClient.connect(function (err, client) {
    if (err)
        throw err;
    const db = client.db("bookmart");
    const collect = db.collection("users");
    collect.find().toArray(function (err, results) {
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].name + " - " + results[i].age);
        }
        client.close();
    });
});
