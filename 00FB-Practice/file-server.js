const express = require('express');

const server = express();
const PORT = 8888;
server.listen(PORT);
console.log('Server is running on port ' + PORT);

server.use(express.static(__dirname));

server.get('/', function (req, res) {
    console.log("Dear client connected");
    res.sendFile(__dirname + "/simple-page.html");
});
server.get('/second-page', function (req, res) {
    console.log("Link has been clicked")
    res.sendFile(__dirname + "/second-page.html")
});