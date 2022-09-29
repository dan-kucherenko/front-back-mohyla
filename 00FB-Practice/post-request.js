const bodyParser = require("body-parser");
const express = require('express');

const server = express();
const PORT = 8888;
server.listen(PORT);
let parser = bodyParser.urlencoded({extended: false});
server.use(express.static(__dirname));

console.log("Application is running")
server.get('/', function (req, res) {
    console.log("User has connected")
    res.sendFile(__dirname + "/post-req.html")
})
server.post('/reply', parser, function (req, res) {
    console.log("POST request has been sent")
    res.writeHead(200, {"Content-type": "text/plain"});
    res.write("Hello, " + req.body.inp);
    res.end();
});