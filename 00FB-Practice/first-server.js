const express = require('express');

const server = express();
const PORT = 8888;
server.listen(PORT);
console.log('Server is running on port ' + PORT);

server.get('/', function (req, res) {
    console.log("Dear client connected");
    res.send("Привіт, шановний відвідувач!");
});

